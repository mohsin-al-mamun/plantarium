import { cookies } from "next/headers"

const COOKIE = "admin_token"

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies()
  return jar.get(COOKIE)?.value === process.env.ADMIN_SECRET
}

export function getAuthCookieName() {
  return COOKIE
}
