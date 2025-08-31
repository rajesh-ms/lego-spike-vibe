"use client";
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'kid' | 'coach'>('kid')
  const [message, setMessage] = useState<string | null>(null)

  if (status === 'loading') return <div className="p-6">Loading…</div>
  if (!session) return (
    <div className="p-6">
      <p className="mb-4">Please sign in to access Admin.</p>
      <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => signIn()}>Sign in</button>
    </div>
  )

  const sessionRole = (session?.user as { role?: 'kid' | 'coach' } | undefined)?.role

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
  {sessionRole !== 'coach' ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-4">
          Only coaches can invite members. Ask a coach to grant access.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Invite Team Member / Coach</h2>
        <div className="flex flex-col gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <select className="border rounded px-3 py-2" value={inviteRole} onChange={(e) => setInviteRole(e.target.value as 'kid' | 'coach')}>
            <option value="kid">Kid</option>
            <option value="coach">Coach</option>
          </select>
          <button
            className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
            disabled={!email}
            onClick={async () => {
              setMessage(null)
              const res = await fetch('/api/admin/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role: inviteRole }),
              })
              const txt = await res.text()
              setMessage(`${res.status}: ${txt}`)
            }}
          >Send Invite</button>
          {message && <div className="text-sm text-gray-600">{message}</div>}
        </div>
      </div>
      )}
    </div>
  )
}
