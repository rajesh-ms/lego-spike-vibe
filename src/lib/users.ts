import { executeQuery } from './database'

export type AppUser = {
  id: number
  username: string
  display_name: string
  role: 'kid' | 'coach'
  email: string | null
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const q = `SELECT TOP 1 id, username, display_name, role, email FROM Users WHERE email = @email`;
  const res = await executeQuery(q, { email })
  const rows = (res as { recordset: AppUser[] }).recordset
  return rows && rows.length ? rows[0] : null
}
