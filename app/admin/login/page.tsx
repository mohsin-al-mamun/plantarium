"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Incorrect email or password.")
      setLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="admin-login-bg">
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
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
              display: "block", marginBottom: "6px",
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <label style={{
              fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
              display: "block", marginBottom: "6px",
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            disabled={loading}
            style={{
              padding: "11px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
              background: "var(--green-ink)", color: "var(--paper)",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  )
}
