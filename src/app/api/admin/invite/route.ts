import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { executeQuery } from '@/lib/database'
import { hasGmailOAuthEnv, createGmailOAuth2Transport } from '@/lib/gmail-oauth2'

export async function POST(req: NextRequest) {
  const { email, role } = await req.json().catch(() => ({})) as { email?: string, role?: 'kid' | 'coach' }
  if (!email || !role) return NextResponse.json({ error: 'email and role required' }, { status: 400 })

  // Ensure user exists in our app Users table (create a placeholder username/display_name)
  const safeName = email.split('@')[0]
  const insertSql = `
    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @email)
    BEGIN
      INSERT INTO Users (username, display_name, role, email)
      VALUES (@username, @display_name, @role, @email)
    END
  `
  await executeQuery(insertSql, {
    email,
    username: safeName,
    display_name: safeName,
    role,
  })
  // Note: executeQuery type is scoped to meeting-related fields; we pass minimal mapping.

  // Send email invite link via NextAuth Email provider (magic link)
  const from = process.env.EMAIL_FROM || 'no-reply@example.com'
  let transport: nodemailer.Transporter
  if (hasGmailOAuthEnv()) {
    transport = await createGmailOAuth2Transport()
  } else if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
    const host = process.env.EMAIL_SERVER_HOST
    const port = Number(process.env.EMAIL_SERVER_PORT || 587)
    const user = process.env.EMAIL_SERVER_USER
    const pass = process.env.EMAIL_SERVER_PASSWORD
    transport = nodemailer.createTransport({ host, port, auth: { user, pass }, secure: process.env.EMAIL_SERVER_SECURE === 'true' })
  } else {
    // Dev fallback: Ethereal test account
    const testAccount = await nodemailer.createTestAccount()
    transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    })
  }
  const site = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  // Simple invite content with signin link
  const html = `
    <p>You have been invited to LEGO Vibe as <b>${role}</b>.</p>
    <p>Click to sign in: <a href="${site}/api/auth/signin">Sign in</a></p>
  `
  const info = await transport.sendMail({ to: email, from, subject: 'LEGO Vibe Invite', html })
  const preview = nodemailer.getTestMessageUrl(info) || undefined

  return NextResponse.json({ ok: true, preview }, { status: 200 })
}
