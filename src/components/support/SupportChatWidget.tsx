'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TicketCategory =
  | 'complaint'
  | 'billing'
  | 'technical_support'
  | 'website_support'
  | 'whatsapp_integration'
  | 'general_enquiry';

type TicketAttachment = {
  id: string;
  name: string;
  url: string;
  size?: number;
  contentType?: string;
  uploadedAt: string;
};

type LiveChatSession = {
  id: string;
  sessionNumber: string;
  subject: string;
  category: TicketCategory;
  status: 'queued' | 'active' | 'awaiting_client' | 'ended' | 'converted';
  linkedTicketNumber: string | null;
};

type LiveChatMessage = {
  id: string;
  authorType: 'client' | 'support' | 'system';
  authorName: string;
  messageHtml: string;
  createdAt: string;
  attachments?: TicketAttachment[];
};

type ExistingSessionHint = {
  id: string;
  sessionNumber: string;
  status: string;
  subject: string;
  updatedAt: string;
};

const CATEGORY_OPTIONS: Array<{ value: TicketCategory; label: string }> = [
  { value: 'general_enquiry', label: 'General enquiry' },
  { value: 'website_support', label: 'Website support' },
  { value: 'whatsapp_integration', label: 'WhatsApp integration' },
  { value: 'billing', label: 'Billing' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'technical_support', label: 'Technical support' },
];

const CATEGORY_DEFAULT_SUBJECT: Record<TicketCategory, string> = {
  complaint: 'Complaint',
  billing: 'Billing',
  technical_support: 'Technical support',
  website_support: 'Website support',
  whatsapp_integration: 'WhatsApp integration',
  general_enquiry: 'General enquiry',
};

const MAX_ATTACHMENTS = 3;

function resolveApiBase() {
  const raw = process.env.NEXT_PUBLIC_MARVEOS_API_BASE_URL || '';
  return raw.replace(/\/$/, '');
}

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'workspace' | 'name' | 'email' | 'category' | 'chat'>('workspace');

  const [workspaceId, setWorkspaceId] = useState(process.env.NEXT_PUBLIC_MARVEO_CHAT_WORKSPACE_ID || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<TicketCategory>('general_enquiry');
  const [supportPin, setSupportPin] = useState('');

  const [sessionId, setSessionId] = useState('');
  const [sessionNumber, setSessionNumber] = useState('');
  const [linkedTicketNumber, setLinkedTicketNumber] = useState('');
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [existingSessionHint, setExistingSessionHint] = useState<ExistingSessionHint | null>(null);

  const [composer, setComposer] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<TicketAttachment[]>([]);

  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const threadBottomRef = useRef<HTMLDivElement | null>(null);
  const threadViewportRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const shouldStickToBottomRef = useRef(true);

  const apiBase = useMemo(() => resolveApiBase(), []);
  const requiresPin = category === 'technical_support';
  const subject = CATEGORY_DEFAULT_SUBJECT[category];

  const loadThread = useCallback(async (nextSessionId: string, nextEmail: string) => {
    if (!apiBase || !nextSessionId || !nextEmail) return;

    const viewport = threadViewportRef.current;
    if (viewport) {
      const distanceFromBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      shouldStickToBottomRef.current = distanceFromBottom < 72;
    }

    try {
      const params = new URLSearchParams({ email: nextEmail });
      const res = await fetch(`${apiBase}/api/public/support-chat/sessions/${encodeURIComponent(nextSessionId)}/thread?${params.toString()}`, {
        cache: 'no-store',
      });
      const payload = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        session?: LiveChatSession;
        messages?: LiveChatMessage[];
      } | null;

      if (!res.ok || !payload?.ok || !payload.session) {
        throw new Error(payload?.error || 'Unable to load live thread.');
      }

      setSessionNumber(payload.session.sessionNumber || '');
      setLinkedTicketNumber(payload.session.linkedTicketNumber || '');
      setMessages(Array.isArray(payload.messages) ? payload.messages : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load live thread.');
    }
  }, [apiBase]);

  const pingPresence = useCallback(async (online: boolean) => {
    if (!apiBase || !sessionId || !email) return;
    try {
      await fetch(`${apiBase}/api/public/support-chat/sessions/${encodeURIComponent(sessionId)}/presence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, online }),
      });
    } catch {
      // Presence updates should not block chat.
    }
  }, [apiBase, email, sessionId]);

  useEffect(() => {
    if (!sessionId || !email) return;

    const intervalId = window.setInterval(() => {
      void loadThread(sessionId, email);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [email, loadThread, sessionId]);

  useEffect(() => {
    if (!open || step !== 'chat' || !sessionId || !email) return;

    void pingPresence(true);
    const heartbeat = window.setInterval(() => {
      void pingPresence(true);
    }, 15000);

    return () => {
      window.clearInterval(heartbeat);
      void pingPresence(false);
    };
  }, [email, open, pingPresence, sessionId, step]);

  useEffect(() => {
    if (!shouldStickToBottomRef.current) return;
    threadBottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [messages]);

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0 || !apiBase) return;
    if (!email.trim()) {
      setError('Please finish the email step before attaching files.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const next = [...pendingAttachments];
      for (const file of Array.from(files)) {
        if (next.length >= MAX_ATTACHMENTS) break;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email.trim());

        const res = await fetch(`${apiBase}/api/public/support-chat/upload`, {
          method: 'POST',
          body: formData,
        });

        const payload = (await res.json().catch(() => null)) as {
          ok?: boolean;
          error?: string;
          attachment?: TicketAttachment;
        } | null;

        if (!res.ok || !payload?.ok || !payload.attachment) {
          throw new Error(payload?.error || `Failed to upload ${file.name}.`);
        }

        next.push(payload.attachment);
      }

      setPendingAttachments(next.slice(0, MAX_ATTACHMENTS));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function removePendingAttachment(id: string) {
    setPendingAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  }

  async function startSession(firstMessage: string, existingSessionAction?: 'update' | 'create_new') {
    if (!apiBase) {
      setError('Chat API base URL is not configured. Set NEXT_PUBLIC_MARVEOS_API_BASE_URL.');
      return;
    }

    if (!name.trim()) return setError('Name is required.');
    if (!email.trim()) return setError('Email is required.');
    if (!firstMessage.trim()) return setError('Type your message to start the chat.');
    if (requiresPin && !workspaceId.trim()) return setError('Workspace ID is required for technical support.');
    if (requiresPin && !supportPin.trim()) return setError('Support PIN is required for technical support.');

    setBusy(true);
    setError('');
    setNotice('');

    try {
      const res = await fetch(`${apiBase}/api/public/support-chat/sessions/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspaceId.trim() || undefined,
          name,
          email,
          category,
          subject,
          supportPin,
          message: firstMessage,
          attachments: pendingAttachments,
          existingSessionAction,
        }),
      });

      const payload = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        requiresExistingSessionAction?: boolean;
        existingSession?: ExistingSessionHint;
        reusedExistingSession?: boolean;
        session?: LiveChatSession;
      } | null;

      if (res.status === 409 && payload?.requiresExistingSessionAction && payload.existingSession) {
        setExistingSessionHint(payload.existingSession);
        setNotice('You already have an open live chat for this category. Continue or start a fresh one.');
        return;
      }

      if (!res.ok || !payload?.ok || !payload.session) {
        throw new Error(payload?.error || 'Unable to start live chat session.');
      }

      setSessionId(payload.session.id);
      setSessionNumber(payload.session.sessionNumber || '');
      setComposer('');
      setPendingAttachments([]);
      setExistingSessionHint(null);
      setNotice(payload.reusedExistingSession ? 'Reused your open session.' : 'Live chat connected.');
      shouldStickToBottomRef.current = true;

      await loadThread(payload.session.id, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start live chat session.');
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage() {
    if (!apiBase || !email.trim()) return;

    if (!sessionId) {
      await startSession(composer);
      return;
    }

    if (!composer.trim()) return;

    setBusy(true);
    setError('');

    try {
      const res = await fetch(`${apiBase}/api/public/support-chat/sessions/${encodeURIComponent(sessionId)}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          message: composer,
          attachments: pendingAttachments,
        }),
      });

      const payload = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !payload?.ok) {
        throw new Error(payload?.error || 'Failed to send message.');
      }

      setComposer('');
      setPendingAttachments([]);
      shouldStickToBottomRef.current = true;
      await loadThread(sessionId, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setBusy(false);
    }
  }

  async function endAndConvert() {
    if (!apiBase || !sessionId || !email) return;

    setBusy(true);
    setError('');

    try {
      const endRes = await fetch(`${apiBase}/api/public/support-chat/sessions/${encodeURIComponent(sessionId)}/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const endPayload = (await endRes.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!endRes.ok || !endPayload?.ok) {
        throw new Error(endPayload?.error || 'Unable to end live chat session.');
      }

      const convertRes = await fetch(`${apiBase}/api/public/support-chat/sessions/${encodeURIComponent(sessionId)}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, closeTicket: false }),
      });
      const convertPayload = (await convertRes.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        ticket?: { ticketNumber?: string };
      } | null;
      if (!convertRes.ok || !convertPayload?.ok) {
        throw new Error(convertPayload?.error || 'Unable to convert session to support ticket.');
      }

      const ticketNumber = String(convertPayload.ticket?.ticketNumber || '').trim();
      setNotice(ticketNumber ? `Chat ended. Saved as ticket ${ticketNumber}.` : 'Chat ended and converted to ticket.');
      setLinkedTicketNumber(ticketNumber);
      setSessionId('');
      setSessionNumber('');
      setMessages([]);
      setComposer('');
      setPendingAttachments([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to end chat.');
    } finally {
      setBusy(false);
    }
  }

  const canGoNextFromWorkspace = true;
  const canGoNextFromName = Boolean(name.trim());
  const canGoNextFromEmail = Boolean(email.trim());

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setStep('workspace');
          }}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200/70 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-[0_16px_38px_rgba(16,185,129,0.45)]"
          aria-label="Open Marveo live chat"
        >
          <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-white px-1 text-center text-[10px] font-bold leading-5 text-emerald-600">
            Live
          </span>
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M20 11.5a8 8 0 0 1-8 8H7l-3 2 1-3.5A8 8 0 1 1 20 11.5Z" />
            <circle cx="9" cy="11.5" r="1" fill="currentColor" />
            <circle cx="12" cy="11.5" r="1" fill="currentColor" />
            <circle cx="15" cy="11.5" r="1" fill="currentColor" />
          </svg>
        </button>
      ) : (
        <div className="w-[min(95vw,390px)] overflow-hidden rounded-[28px] border border-slate-200 bg-[#f4f5f7] shadow-[0_35px_80px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Marveo Live Chat</p>
              <p className="text-sm font-semibold text-slate-900">{sessionNumber || subject}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>

          {step !== 'chat' ? (
            <div className="space-y-4 p-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                {['workspace', 'name', 'email', 'category'].map((item, index) => (
                  <span key={item} className={`rounded-full px-2 py-1 ${step === item ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {index + 1}
                  </span>
                ))}
              </div>

              {step === 'workspace' ? (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Workspace ID</p>
                  <p className="text-xs text-slate-500">Optional for enquiry, required for technical support.</p>
                  <input
                    value={workspaceId}
                    onChange={(event) => setWorkspaceId(event.target.value)}
                    placeholder="workspace_..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep('name')} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Skip</button>
                    <button type="button" onClick={() => setStep('name')} disabled={!canGoNextFromWorkspace} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">Next</button>
                  </div>
                </div>
              ) : null}

              {step === 'name' ? (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">What is your name?</p>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep('workspace')} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Back</button>
                    <button type="button" onClick={() => setStep('email')} disabled={!canGoNextFromName} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">Next</button>
                  </div>
                </div>
              ) : null}

              {step === 'email' ? (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">What is your email?</p>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep('name')} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Back</button>
                    <button type="button" onClick={() => setStep('category')} disabled={!canGoNextFromEmail} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">Next</button>
                  </div>
                </div>
              ) : null}

              {step === 'category' ? (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Select category</p>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as TicketCategory)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  >
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  {requiresPin ? (
                    <input
                      value={supportPin}
                      onChange={(event) => setSupportPin(event.target.value)}
                      placeholder="Support PIN"
                      className="w-full rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm"
                    />
                  ) : null}
                  <p className="text-xs text-slate-500">Subject: {subject}</p>
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep('email')} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Back</button>
                    <button type="button" onClick={() => setStep('chat')} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">Start chat</button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-[76vh] flex-col">
              <div ref={threadViewportRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.length === 0 ? (
                  <article className="max-w-[92%] rounded-2xl bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Marveo assistant</p>
                    <p>Hello {name || 'there'}, send your first message to start this live chat.</p>
                  </article>
                ) : null}

                {messages.map((message) => {
                  const mine = message.authorType === 'client';
                  return (
                    <article key={message.id} className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm shadow-sm ${mine ? 'ml-auto bg-[#0969da] text-white' : 'bg-white text-slate-900'}`}>
                      <p className={`mb-1 text-[10px] font-semibold uppercase tracking-wide ${mine ? 'text-blue-100' : 'text-slate-500'}`}>
                        {message.authorName}
                      </p>
                      <div className={`prose prose-sm max-w-none ${mine ? 'prose-invert' : ''}`} dangerouslySetInnerHTML={{ __html: message.messageHtml }} />
                      {Array.isArray(message.attachments) && message.attachments.length > 0 ? (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment) => (
                            <a key={attachment.id} href={attachment.url} target="_blank" rel="noreferrer" className="block text-xs underline underline-offset-2">
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}

                {existingSessionHint ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                    <p className="font-semibold">Open session found: {existingSessionHint.sessionNumber}</p>
                    <p className="mt-1">{existingSessionHint.subject}</p>
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => void startSession(composer, 'update')} className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-900">Continue it</button>
                      <button type="button" onClick={() => void startSession(composer, 'create_new')} className="rounded-full border border-amber-400 bg-white px-3 py-1 text-xs font-semibold text-amber-800">New one</button>
                    </div>
                  </div>
                ) : null}

                <div ref={threadBottomRef} />
              </div>

              {pendingAttachments.length > 0 ? (
                <div className="mx-3 mb-2 flex flex-wrap gap-2">
                  {pendingAttachments.map((attachment) => (
                    <button key={attachment.id} type="button" onClick={() => removePendingAttachment(attachment.id)} className="rounded-full border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700">
                      {attachment.name} x
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="border-t border-slate-200 bg-white p-3">
                <div className="flex items-end gap-2 rounded-full border border-slate-300 px-2 py-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || busy}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 disabled:opacity-60"
                    aria-label="Attach file"
                  >
                    +
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    onChange={(event) => void uploadFiles(event.target.files)}
                    className="hidden"
                  />

                  <textarea
                    value={composer}
                    onChange={(event) => setComposer(event.target.value)}
                    rows={1}
                    placeholder={sessionId ? 'Write a message...' : 'Write your first message...'}
                    className="max-h-28 w-full resize-none bg-transparent px-1 py-1 text-sm outline-none"
                    disabled={busy}
                  />

                  <button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={busy || !composer.trim()}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white disabled:opacity-60"
                    aria-label="Send"
                  >
                    ↑
                  </button>
                </div>

                <button type="button" onClick={() => void endAndConvert()} disabled={busy || !sessionId} className="mt-2 w-full rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">
                  End chat and convert to ticket
                </button>
              </div>
            </div>
          )}

          {error ? <p className="px-4 pb-2 text-xs font-semibold text-rose-600">{error}</p> : null}
          {notice ? <p className="px-4 pb-2 text-xs font-semibold text-emerald-700">{notice}</p> : null}
          {linkedTicketNumber ? <p className="px-4 pb-3 text-[11px] font-semibold text-slate-500">Linked ticket: {linkedTicketNumber}</p> : null}
        </div>
      )}
    </div>
  );
}
