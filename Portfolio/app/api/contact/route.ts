import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = typeof body?.name === "string" ? body.name.trim() : ""
    const email = typeof body?.email === "string" ? body.email.trim() : ""
    const message = typeof body?.message === "string" ? body.message.trim() : ""

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required.", code: "VALIDATION_ERROR" },
        { status: 400 }
      )
    }

    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "")

    if (!gmailUser || !gmailAppPassword) {
      const missing = [
        !gmailUser ? "GMAIL_USER" : null,
        !gmailAppPassword ? "GMAIL_APP_PASSWORD" : null,
      ].filter(Boolean)

      return NextResponse.json(
        {
          error: "Email service is not configured on this environment.",
          code: "EMAIL_NOT_CONFIGURED",
          missing,
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
      <div style="margin:0;padding:24px;background:#0b0f1f;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#12182d;border:1px solid #2c3357;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#eaf1ff;">
          <tr>
            <td style="padding:24px 28px;background:linear-gradient(135deg,#1a2142 0%,#151b34 60%,#101427 100%);border-bottom:1px solid #313a66;">
              <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8db6ff;">Portfolio Contact Feed</p>
              <h1 style="margin:0;font-size:24px;line-height:1.2;color:#ffffff;">Incoming Message Received</h1>
              <p style="margin:10px 0 0 0;font-size:13px;color:#a6b8e8;">${submittedAt}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0e1428;border:1px solid #283054;border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;border-bottom:1px solid #253057;">
                    <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#84a6f5;">Name</p>
                    <p style="margin:0;font-size:16px;color:#f5f8ff;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 18px;border-bottom:1px solid #253057;">
                    <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#84a6f5;">Email</p>
                    <p style="margin:0;font-size:16px;color:#f5f8ff;">
                      <a href="mailto:${safeEmail}" style="color:#77b2ff;text-decoration:none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#84a6f5;">Message</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#e6eeff;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 24px 28px;">
              <a href="mailto:${safeEmail}?subject=Re:%20Portfolio%20Inquiry" style="display:inline-block;padding:12px 18px;background:linear-gradient(135deg,#4e7eff 0%,#66a0ff 100%);border-radius:10px;color:#03122f;font-weight:700;font-size:14px;text-decoration:none;">
                Reply to ${safeName}
              </a>
            </td>
          </tr>
        </table>
      </div>
    `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubmitted: ${submittedAt}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact email send failed:", error)
    const maybeError = error as { code?: string; responseCode?: number }
    const isAuthFailure = maybeError?.code === "EAUTH" || maybeError?.responseCode === 535

    return NextResponse.json(
      {
        error: isAuthFailure
          ? "Email authentication failed. Check GMAIL_USER and GMAIL_APP_PASSWORD in Vercel."
          : "Unable to send email right now.",
        code: isAuthFailure ? "EMAIL_AUTH_FAILED" : "EMAIL_SEND_FAILED",
      },
      { status: 500 }
    )
  }
}
