"use client";
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <div className="flex flex-col gap-3">
        <button className="px-4 py-2 bg-black text-white rounded" onClick={() => signIn('google')}>Sign in with Google</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => signIn('email')}>Sign in with Email</button>
      </div>
    </div>
  )
}
