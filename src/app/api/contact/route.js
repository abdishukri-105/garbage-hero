import nodemailer from "nodemailer";

export const runtime = 'nodejs'; // ensure Node.js runtime (not edge) so SMTP works

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company } = body || {};

    // Honeypot (bot) check
    if (company) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Basic validation
    if (!name || name.trim().length < 2)
      return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400 });
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email || "");
    if (!emailOk)
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    if (!message || message.trim().length < 10)
      return new Response(JSON.stringify({ error: "Invalid message" }), { status: 400 });

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env;

    // Enhanced debug-friendly check (temporary; remove once stable)
    const required = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      console.error('Missing SMTP env vars:', missing);
      return new Response(
        JSON.stringify({ error: 'SMTP not configured', missing }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true", // true for 465, false for 587/25
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const toAddress = CONTACT_TO || "it@garbagehero.co.ke";
    const fromRaw = CONTACT_FROM || SMTP_USER || `no-reply@${new URL(req.url).host}`;
    const fromAddress = /</.test(fromRaw) ? fromRaw : `Garbage Hero <${fromRaw}>`;

    const html = `
      <div style="font-family: Roboto, Arial, sans-serif; line-height:1.6; color:#333">
        <h2 style="margin:0 0 8px;color:#1E611B">New Website Message</h2>
        <p style="margin:0 0 16px;color:#333">A new message was submitted from the contact form.</p>
        <table style="border-collapse:collapse; width:100%">
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Sender Name</td><td>${
            name
          }</td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Sender Email</td><td><a href="mailto:${
            email
          }">${email}</a></td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Phone</td><td>${
            phone || "-"
          }</td></tr>
          <tr><td style="padding:6px 0; width:140px; color:#1E611B; font-weight:600">Message</td><td>${(message || "").replace(/\n/g, "<br/>")}</td></tr>
        </table>
      </div>`;

    const mailOptions = {
      from: fromAddress,
      to: toAddress,
      subject: `New message from ${name} via Garbage Hero website`,
      replyTo: `${name} <${email}>`,
      html,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("/api/contact error", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500 }
    );
  }
}
