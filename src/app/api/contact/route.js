import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body || {};

    // Honeypot
    if (company) return Response.json({ ok: true });

    // Basic validation
    if (!name || name.trim().length < 2) return Response.json({ error: 'Invalid name' }, { status: 400 });
    if (!email || !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) return Response.json({ error: 'Invalid email' }, { status: 400 });
    if (!message || message.trim().length < 10) return Response.json({ error: 'Invalid message' }, { status: 400 });

    const {
      SMTP_HOST,
      SMTP_PORT = '587',
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env;

    const required = ['SMTP_HOST','SMTP_USER','SMTP_PASS'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      console.error('Missing SMTP env vars', missing);
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Normalize config
    const primaryPort = Number(SMTP_PORT) || 587;
    const primarySecure = SMTP_SECURE === 'true' || primaryPort === 465;

    const baseConfig = {
      host: SMTP_HOST,
      port: primaryPort,
      secure: primarySecure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    };

    let transporter = nodemailer.createTransport(baseConfig);

    // Verify / fallback logic
    let verified = false;
    try {
      await transporter.verify();
      verified = true;
    } catch (e) {
      console.warn('Primary SMTP verify failed, attempting fallback', e.code, e.message);
      // Fallback: try STARTTLS on 587 if not already
      if (primaryPort !== 587 || primarySecure) {
        try {
          const fallback = nodemailer.createTransport({
            host: SMTP_HOST,
            port: 587,
            secure: false,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          });
          await fallback.verify();
          transporter = fallback;
          verified = true;
          console.info('Fallback SMTP verify succeeded on port 587 (secure:false)');
        } catch (f) {
          console.error('Fallback SMTP verify failed', f.code, f.message);
        }
      }
    }

    if (!verified) {
      return Response.json({ error: 'Email service unavailable' }, { status: 500 });
    }

    const toAddress = CONTACT_TO || SMTP_USER;
    const fromRaw = CONTACT_FROM || SMTP_USER;
    const fromAddress = /</.test(fromRaw) ? fromRaw : `Garbage Hero <${fromRaw}>`;

    const safe = escapeHtml;
    const html = `
      <div style="font-family:system-ui,Arial,sans-serif;line-height:1.55;color:#333">
        <h2 style="margin:0 0 12px;color:#1E611B">New Website Message</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 0;width:140px;font-weight:600;color:#1E611B">Name</td><td>${safe(name)}</td></tr>
          <tr><td style="padding:6px 0;width:140px;font-weight:600;color:#1E611B">Email</td><td><a href="mailto:${safe(email)}">${safe(email)}</a></td></tr>
          <tr><td style="padding:6px 0;width:140px;font-weight:600;color:#1E611B">Phone</td><td>${safe(phone || '-')}</td></tr>
          <tr><td style="padding:6px 0;width:140px;font-weight:600;color:#1E611B">Message</td><td>${safe(message).replace(/\n/g,'<br/>')}</td></tr>
        </table>
      </div>`;

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: toAddress,
        replyTo: `${name} <${email}>`,
        subject: `New message from ${name} via Garbage Hero website`,
        html,
      });
    } catch (err) {
      const code = err.code || 'SEND_FAIL';
      console.error('SMTP send error', code, err.response, err.message);
      const cause = code === 'EAUTH' ? 'Authentication failed' :
        (code === 'ENOTFOUND' || code === 'ECONNECTION') ? 'Connection issue' :
        code === 'ETIMEDOUT' ? 'Timeout' : 'Send failed';
      return Response.json({ error: 'Failed to send message', cause }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact route error', err);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
