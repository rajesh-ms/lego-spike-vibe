import nodemailer from 'nodemailer'

export function hasGmailOAuthEnv() {
  return Boolean(
    process.env.GOOGLE_OAUTH_USER &&
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  )
}

export async function createGmailOAuth2Transport() {
  const user = process.env.GOOGLE_OAUTH_USER as string
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID as string
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET as string
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN as string
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || 'https://developers.google.com/oauthplayground'

  // Exchange refresh token for access token via Google OAuth2 token endpoint
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    redirect_uri: redirectUri,
  })
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to obtain access token from Google: ${res.status} ${text}`)
  }
  const data = (await res.json()) as { access_token?: string }
  const accessToken = data.access_token

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  })
  return transport
}
