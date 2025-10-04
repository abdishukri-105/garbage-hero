import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body || {};
    if (company) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    if (!name || name.trim().length < 2)
      return new Response(JSON.stringify({ error: 'Invalid name' }), { status: 400 });
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email || '');
    if (!emailOk)
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    if (!message || message.trim().length < 10)
      return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400 });

    const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);

    const toAddress = CONTACT_TO || 'info@garbagehero.co.ke';
    const fromAddress = CONTACT_FROM || 'Garbage Hero <no-reply@garbagehero.co.ke>';

    const html = `
      <div style="font-family: system-ui, Arial, sans-serif; line-height:1.55; color:#333">
        <h2 style="margin:0 0 12px;color:#1E611B">New Website Message</h2>
        <p style="margin:0 0 18px;">A new message was submitted from the contact form.</p>
        <table style="border-collapse:collapse; width:100%; font-size:14px">
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Sender Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Sender Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Phone</td><td>${escapeHtml(phone || '-')}</td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Message</td><td>${escapeHtml(message).replace(/\n/g,'<br/>')}</td></tr>
        </table>
      </div>`;

    try {
      const result = await resend.emails.send({
        from: fromAddress,
        to: [toAddress],
        reply_to: email,
        subject: `New message from ${name} via Garbage Hero website`,
        html,
      });

      if (result.error) {
        console.error('Resend send error', result.error);
        return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
      console.error('Resend API error', e);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
    }
  } catch (err) {
    console.error('/api/contact error', err);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
  }
}

function escapeHtml(str='') {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
