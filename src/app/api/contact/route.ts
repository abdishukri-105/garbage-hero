import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function GET() {
  return Response.json({ ok: true, message: 'Contact API is reachable' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body || {};

    // Honeypot
    if (company) return Response.json({ ok: true });

    // Basic validation
    if (!name || name.trim().length < 2) {
      return Response.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (!email || !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!message || message.trim().length < 10) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const hasSmtpConfig = Boolean(
      process.env.SMTP_HOST &&
      smtpPort &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    );

    if (!sendgridApiKey && !hasSmtpConfig) {
      console.error('Missing email provider configuration. Set SENDGRID_API_KEY or SMTP_* env vars.');
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_TO || 'info@garbagehero.co.ke';
    const fromEmail = process.env.CONTACT_FROM || 'info@garbagehero.co.ke';
    const fromName = process.env.CONTACT_FROM_NAME;

    const safe = escapeHtml;
    const sanitizedName = safe(name);
    const sanitizedEmail = safe(email);
    const sanitizedPhone = safe(phone || 'Not provided');
    const sanitizedMessage = safe(message);

    const htmlContent = `
      <div style="font-family:system-ui,Arial,sans-serif;line-height:1.55;color:#333;max-width:600px;margin:0 auto;">
        <div style="background:#1E611B;padding:20px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">New Contact Form Submission</h1>
        </div>
        <div style="background:#f9f9f9;padding:30px;">
          <h2 style="margin:0 0 20px;color:#1E611B;font-size:20px;">Contact Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;width:120px;font-weight:600;color:#1E611B;">Name:</td>
              <td style="padding:12px 0;">${sanitizedName}</td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;font-weight:600;color:#1E611B;">Email:</td>
              <td style="padding:12px 0;"><a href="mailto:${sanitizedEmail}" style="color:#3AA335;text-decoration:none;">${sanitizedEmail}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;font-weight:600;color:#1E611B;">Phone:</td>
              <td style="padding:12px 0;">${sanitizedPhone}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <h3 style="margin:0 0 12px;color:#1E611B;font-size:18px;">Message:</h3>
            <div style="background:#fff;padding:16px;border-left:4px solid #3AA335;border-radius:4px;">
              ${sanitizedMessage.replace(/\n/g,'<br/>')}
            </div>
          </div>
        </div>
        <div style="background:#f0f0f0;padding:16px;text-align:center;">
          <p style="margin:0;color:#666;font-size:12px;">
            This message was sent from the Garbage Hero website contact form.<br/>
            Reply directly to this email to respond to ${sanitizedName}.
          </p>
        </div>
      </div>`;

    const textContent = `New contact form submission
------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}`;

    try {
      if (sendgridApiKey) {
        console.log('Sending email via SendGrid to:', toEmail);
        sgMail.setApiKey(sendgridApiKey);

        const msg = {
          to: toEmail,
          from: fromName ? { email: fromEmail, name: fromName } : fromEmail,
          replyTo: email,
          subject: `New Contact: ${sanitizedName} - Garbage Hero Website`,
          html: htmlContent,
          text: textContent,
        };

        const response = await sgMail.send(msg);

        console.log('✅ Email sent successfully via SendGrid!');
        console.log('Response status:', response[0].statusCode);
      } else if (hasSmtpConfig) {
        const port = typeof smtpPort === 'number' && Number.isFinite(smtpPort) ? smtpPort : 587;
        console.log('Sending email via SMTP transport to:', toEmail, 'using host', process.env.SMTP_HOST, 'on port', port);

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: port === 465,
          auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
          },
        });

        await transporter.sendMail({
          to: toEmail,
          from: fromName ? `${fromName} <${fromEmail}>` : fromEmail,
          replyTo: email,
          subject: `New Contact: ${sanitizedName} - Garbage Hero Website`,
          html: htmlContent,
          text: textContent,
        });

        console.log('✅ Email sent successfully via SMTP!');
      }

      return Response.json({
        ok: true,
        message: 'Message sent successfully!'
      });

    } catch (err) {
      console.error('❌ Email provider error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const errorCode = typeof err === 'object' && err && 'code' in err ? (err as { code?: string }).code : undefined;

      if (typeof err === 'object' && err && 'response' in err) {
        const response = (err as { response?: { body?: unknown; headers?: unknown } }).response;
        if (response) {
          console.error('Provider response body:', response.body);
          console.error('Provider response headers:', response.headers);
        }
      }

      return Response.json({
        error: 'Failed to send message',
        details: errorMessage,
        code: errorCode,
      }, { status: 500 });
    }

  } catch (err) {
    console.error('❌ Contact route error:', err);
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
