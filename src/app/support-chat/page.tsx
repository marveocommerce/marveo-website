'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type TicketCategory =
  | 'complaint'
  | 'billing'
  | 'technical_support'
  | 'website_support'
  | 'whatsapp_integration'
  | 'general_enquiry';

type TicketMessage = {
  id: string;
  authorType: 'client' | 'support' | 'system';
  authorName: string;
  messageHtml: string;
  createdAt: string;
};

function resolveApiBase() {
  const raw = process.env.NEXT_PUBLIC_MARVEOS_API_BASE_URL || '';
  return raw.replace(/\/$/, '');
}

const CATEGORY_OPTIONS: Array<{ value: TicketCategory; label: string }> = [
  { value: 'general_enquiry', label: 'General enquiry' },
  { value: 'website_support', label: 'Website support' },
  { value: 'whatsapp_integration', label: 'WhatsApp integration' },
  { value: 'billing', label: 'Billing' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'technical_support', label: 'Technical support (PIN required)' },
];

const CATEGORY_DEFAULT_SUBJECT: Record<TicketCategory, string> = {
  complaint: 'Complaint follow-up',
  billing: 'Billing clarification',
  technical_support: 'Technical support request',
  website_support: 'Website support request',
  whatsapp_integration: 'WhatsApp integration support',
  general_enquiry: 'General enquiry',
};

export default function SupportChatPage() {
  const [category, setCategory] = useState<TicketCategory>('general_enquiry');
  const [subject, setSubject] = useState(CATEGORY_DEFAULT_SUBJECT.general_enquiry);
  const [workspaceId, setWorkspaceId] = useState(process.env.NEXT_PUBLIC_MARVEO_CHAT_WORKSPACE_ID || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [supportPin, setSupportPin] = useState('');
  const [startMessage, setStartMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const [ticketId, setTicketId] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [messages, setMessages] = useState<TicketMessage[]>([]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const apiBase = useMemo(() => resolveApiBase(), []);
  const requiresPin = category === 'technical_support';

  const loadThread = useCallback(async (nextTicketId: string, nextEmail: string) => {
    if (!apiBase || !nextTicketId || !nextEmail) return;

    try {
      const params = new URLSearchParams({ ticketId: nextTicketId, email: nextEmail });
      const res = await fetch(`${apiBase}/api/public/support-chat/thread?${params.toString()}`, { cache: 'no-store' });
      const payload = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        ticket?: { ticketNumber: string };
        messages?: TicketMessage[];
      } | null;

      if (!res.ok || !payload?.ok) {
        throw new Error(payload?.error || 'Unable to load thread.');
      }

      setTicketNumber(payload.ticket?.ticketNumber || '');
      setMessages(Array.isArray(payload.messages) ? payload.messages : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load thread.');
    }
  }, [apiBase]);

  useEffect(() => {
    if (!ticketId || !email) return;

    const id = window.setInterval(() => {
      void loadThread(ticketId, email);
    }, 8000);

    return () => window.clearInterval(id);
  }, [email, loadThread, ticketId]);

  async function startChat() {
    if (!apiBase) {
      setError('Chat API base URL is not configured. Set NEXT_PUBLIC_MARVEOS_API_BASE_URL.');
      return;
    }

    if (!name.trim() || !email.trim() || !subject.trim() || !startMessage.trim()) {
      setError('Name, email, subject and first message are required.');
      return;
    }
    if (requiresPin && !workspaceId.trim()) {
      setError('Workspace ID is required for technical support chat.');
      return;
    }
    if (requiresPin && !supportPin.trim()) {
      setError('Support PIN is required for technical support chat.');
      return;
    }

    setBusy(true);
    setError('');
    setNotice('');

    try {
      const res = await fetch(`${apiBase}/api/public/support-chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspaceId.trim() || undefined,
          name,
          email,
          type: requiresPin ? 'technical' : 'enquiry',
          category,
          subject,
          supportPin,
          message: startMessage,
        }),
      });
      const payload = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        ticket?: { id: string; ticketNumber: string };
      } | null;

      if (!res.ok || !payload?.ok || !payload.ticket) {
        throw new Error(payload?.error || 'Failed to start chat.');
      }

      setTicketId(payload.ticket.id);
      setTicketNumber(payload.ticket.ticketNumber);
      setStartMessage('');
      setNotice('Chat started successfully.');
      await loadThread(payload.ticket.id, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start chat.');
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage() {
    if (!apiBase || !ticketId || !email || !replyMessage.trim()) return;

    setBusy(true);
    setError('');

    try {
      const res = await fetch(`${apiBase}/api/public/support-chat/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          email,
          message: replyMessage,
        }),
      });
      const payload = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !payload?.ok) {
        throw new Error(payload?.error || 'Failed to send message.');
      }

      setReplyMessage('');
      await loadThread(ticketId, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,transparent_45%),radial-gradient(circle_at_bottom,#dbeafe,transparent_45%)] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">Marveo Live Support</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Customer Chat</h1>
            <p className="mt-2 text-sm text-slate-600">Enquiry chat needs name/email. Technical support chat requires support PIN.</p>
          </div>
          <Link href="/" className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700">
            Back to website
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur">
            <h2 className="text-base font-semibold text-slate-900">Start chat</h2>

            <label className="block text-sm font-medium text-slate-700">
              Workspace ID (optional for enquiry)
              <input value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="workspace_..." />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Category
              <select
                value={category}
                onChange={(e) => {
                  const nextCategory = e.target.value as TicketCategory;
                  setCategory(nextCategory);
                  setSubject(CATEGORY_DEFAULT_SUBJECT[nextCategory]);
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Subject
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
            </label>

            {requiresPin ? (
              <label className="block text-sm font-medium text-slate-700">
                Support PIN
                <input value={supportPin} onChange={(e) => setSupportPin(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="6-digit pin" />
              </label>
            ) : null}

            <label className="block text-sm font-medium text-slate-700">
              First message
              <textarea value={startMessage} onChange={(e) => setStartMessage(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
            </label>

            <button type="button" onClick={() => void startChat()} disabled={busy} className="w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {busy ? 'Starting...' : 'Start Chat'}
            </button>
          </aside>

          <section className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-sm font-semibold text-slate-900">{ticketNumber || 'No active thread'}</p>
              <p className="text-xs text-slate-500">Live updates every 8s</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-white to-slate-50 p-5">
              {!ticketId ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Start a chat to open your thread.</div>
              ) : null}

              {messages.map((message) => {
                const isClient = message.authorType === 'client';
                return (
                  <article key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isClient
                      ? 'ml-auto bg-slate-900 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}>
                    <p className={`mb-1 text-[11px] font-semibold uppercase tracking-wide ${isClient ? 'text-slate-200' : 'text-slate-500'}`}>
                      {message.authorName}
                    </p>
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: message.messageHtml }} />
                    <p className={`mt-2 text-[10px] ${isClient ? 'text-slate-300' : 'text-slate-400'}`}>
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex items-end gap-2">
                <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} rows={2} className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm" placeholder={ticketId ? 'Type your message…' : 'Start a chat first…'} disabled={!ticketId || busy} />
                <button type="button" onClick={() => void sendMessage()} disabled={!ticketId || busy || !replyMessage.trim()} className="rounded-2xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  Send
                </button>
              </div>

              {error ? <p className="mt-2 text-xs font-semibold text-rose-700">{error}</p> : null}
              {notice ? <p className="mt-2 text-xs font-semibold text-emerald-700">{notice}</p> : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
