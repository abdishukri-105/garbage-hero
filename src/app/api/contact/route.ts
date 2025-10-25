import sgMail from '@sendgrid/mail';

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

    // Check for SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Missing SENDGRID_API_KEY environment variable');
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Destination: send to the team's inbox (defaults to info@garbagehero.co.ke)
  const toEmail = process.env.CONTACT_TO || 'info@garbagehero.co.ke';
    // From/sender must be a verified domain (not Yahoo/Gmail due to DMARC)
    const configuredFrom = process.env.CONTACT_FROM || 'info@garbagehero.co.ke';
    const fromName = 'Garbage Hero Limited';

    // Guard against using free webmail domains as From (poor deliverability)
    const freeDomains = ['yahoo.com', 'gmail.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const cfgFromDomain = configuredFrom.split('@')[1]?.toLowerCase();
    const safeFromEmail = cfgFromDomain && freeDomains.includes(cfgFromDomain)
      ? 'info@garbagehero.co.ke'
      : configuredFrom;

    const safe = escapeHtml;
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
              <td style="padding:12px 0;">${safe(name)}</td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;font-weight:600;color:#1E611B;">Email:</td>
              <td style="padding:12px 0;"><a href="mailto:${safe(email)}" style="color:#3AA335;text-decoration:none;">${safe(email)}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;font-weight:600;color:#1E611B;">Phone:</td>
              <td style="padding:12px 0;">${safe(phone || 'Not provided')}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <h3 style="margin:0 0 12px;color:#1E611B;font-size:18px;">Message:</h3>
            <div style="background:#fff;padding:16px;border-left:4px solid #3AA335;border-radius:4px;">
              ${safe(message).replace(/\n/g,'<br/>')}
            </div>
          </div>
        </div>
        <div style="background:#f0f0f0;padding:16px;text-align:center;">
          <p style="margin:0;color:#666;font-size:12px;">
            This message was sent from the Garbage Hero website contact form.<br/>
            Reply directly to this email to respond to ${safe(name)}.
          </p>
        </div>
      </div>`;

    try {
      console.log('Sending email via SendGrid to:', toEmail);
  console.log('From email:', safeFromEmail);
      console.log('Reply to:', email);

      const plainText = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`;

      const msg = {
        to: toEmail,
        from: { email: safeFromEmail, name: fromName },
        replyTo: email,
        subject: `New Contact: ${name} - Garbage Hero Website`,
        text: plainText,
        html: htmlContent,
      };

      const response = await sgMail.send(msg);

      console.log('✅ Email sent successfully via SendGrid!');
      console.log('Response status:', response[0].statusCode);

      return Response.json({
        ok: true,
        message: 'Message sent successfully!'
      });

    } catch (err) {
      console.error('❌ SendGrid error:', err);
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);

      if (err.response) {
        console.error('SendGrid response body:', err.response.body);
        console.error('SendGrid response headers:', err.response.headers);
      }

      return Response.json({
        error: 'Failed to send message',
        details: err.message,
        code: err.code
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
