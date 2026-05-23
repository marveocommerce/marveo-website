// Beautiful HTML email templates for Marveo


  return `
  <div style="font-family: 'Inter', Arial, sans-serif; background: #f8fafc; padding: 32px; color: #1a2233;">
    <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 4px 32px rgba(79,142,247,0.07); overflow: hidden;">
      <div style="background: linear-gradient(90deg,#4f8ef7 0%,#6ee7b7 100%); padding: 32px 0; text-align: center;">
        <img src='https://getmarveo.com/logo-mark.svg' alt='Marveo Logo' style='height: 48px; margin-bottom: 12px;' />
        <h2 style="color: #fff; font-size: 1.5rem; margin: 0; font-weight: 700;">Welcome${name ? ", " + name : ""}!</h2>
      </div>
      <div style="padding: 32px 28px 24px 28px;">
        <p style="font-size: 1.1rem; margin-bottom: 18px;">You’re officially on the Marveo waitlist!</p>
        <ul style="padding-left: 18px; margin-bottom: 18px; color: #4f8ef7;">
          <li>You’ll get early access updates as we roll out.</li>
          <li>We’ll keep you posted on launch and platform improvements.</li>
        </ul>
        <p style="font-size: 1rem; color: #64748b; margin-bottom: 0;">Questions? Just reply to this email or visit <a href="https://getmarveo.com" style="color: #4f8ef7; text-decoration: underline;">getmarveo.com</a>.</p>
        <div style="margin-top: 32px; text-align: right; color: #1a2233; font-weight: 600;">— Marveo Team</div>
      </div>
    </div>
  </div>
  `;
}

export function contactConfirmationEmailHTML({ name }: { name?: string }) {
  return `
  <div style="font-family: 'Inter', Arial, sans-serif; background: #f8fafc; padding: 32px; color: #1a2233;">
    <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 4px 32px rgba(79,142,247,0.07); overflow: hidden;">
      <div style="background: linear-gradient(90deg,#4f8ef7 0%,#6ee7b7 100%); padding: 32px 0; text-align: center;">
        <img src='https://getmarveo.com/logo-mark.svg' alt='Marveo Logo' style='height: 48px; margin-bottom: 12px;' />
        <h2 style="color: #fff; font-size: 1.5rem; margin: 0; font-weight: 700;">Thank you${name ? ", " + name : ""}!</h2>
      </div>
      <div style="padding: 32px 28px 24px 28px;">
        <p style="font-size: 1.1rem; margin-bottom: 18px;">We’ve received your message and the Marveo Team will be in touch soon.</p>
        <ul style="padding-left: 18px; margin-bottom: 18px; color: #4f8ef7;">
          <li>Our team will respond within one business day.</li>
          <li>If your inquiry is urgent, reply to this email for priority support.</li>
        </ul>
        <p style="font-size: 1rem; color: #64748b; margin-bottom: 0;">You can also visit <a href="https://getmarveo.com" style="color: #4f8ef7; text-decoration: underline;">getmarveo.com</a> for more info.</p>
        <div style="margin-top: 32px; text-align: right; color: #1a2233; font-weight: 600;">— Marveo Team</div>
      </div>
    </div>
  </div>
  `;
}
