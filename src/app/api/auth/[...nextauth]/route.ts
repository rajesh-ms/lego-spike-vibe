import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { getUserByEmail } from '@/lib/users'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: (() => {
    const providers = [Google]
    // Only enable Email provider if SMTP settings are present
    if (
      process.env.EMAIL_SERVER_HOST &&
      process.env.EMAIL_SERVER_USER &&
      process.env.EMAIL_SERVER_PASSWORD
    ) {
      providers.push(
        EmailProvider({
          server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT || 587),
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
            },
            secure: Boolean(process.env.EMAIL_SERVER_SECURE === 'true'),
          },
          from: process.env.EMAIL_FROM,
        })
      )
    }
    return providers
  })(),
  callbacks: {
    async jwt({ token, user }) {
      // Attach our app-specific role/display_name from Users table
      if (user?.email) {
        const u = await getUserByEmail(user.email)
        if (u) {
          token.role = u.role
          token.display_name = u.display_name
          token.appUserId = u.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token as any).role || 'kid'
        session.user.name = (token as any).display_name || session.user.name
        ;(session as any).appUserId = (token as any).appUserId
      }
      return session
    },
  },
})

export { handlers as GET, handlers as POST }