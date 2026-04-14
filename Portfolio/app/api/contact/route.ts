import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

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

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
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
