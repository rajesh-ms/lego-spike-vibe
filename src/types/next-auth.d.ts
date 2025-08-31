import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'kid' | 'coach'
    }
    appUserId?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'kid' | 'coach'
    display_name?: string
    appUserId?: number
  }
}
