import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function login(formData: FormData) {
  "use server"
  const password = formData.get("password") as string
  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies()
    jar.set("admin_token", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    redirect("/admin")
  }
  redirect("/admin/login?error=1")
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--green-surface)",
    }}>
      <div style={{
        width: "100%", maxWidth: "360px", padding: "40px",
        border: "1px solid var(--line)", borderRadius: "16px",
        background: "var(--card)", boxShadow: "0 4px 24px rgba(14,59,42,0.08)",
      }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            fontFamily: "var(--font-fraunces)", fontSize: "28px", fontWeight: 300,
            color: "var(--green-ink)", marginBottom: "4px",
          }}>
            Plantarium
          </div>
          <div style={{ fontSize: "13px", color: "var(--ink-mute)" }}>
            Admin access
          </div>
        </div>

        {error && (
          <div style={{
            fontSize: "13px", color: "#b91c1c", background: "#fef2f2",
            border: "1px solid #fecaca", borderRadius: "8px",
            padding: "10px 14px", marginBottom: "16px",
          }}>
            Incorrect password. Try again.
          </div>
        )}

        <form action={login} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
              display: "block", marginBottom: "6px",
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "8px",
                border: "1px solid var(--line)", background: "var(--paper)",
                fontSize: "14px", color: "var(--green-ink)", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "11px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
              background: "var(--green-ink)", color: "var(--paper)",
              border: "none", cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
