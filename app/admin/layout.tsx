import Link from "next/link"
import { redirect } from "next/navigation"
import AdminNav from "@/app/admin/components/AdminNav"
import LogoutButton from "@/app/admin/components/LogoutButton"
import { createClient } from "@/lib/supabase/server"

async function logout() {
  "use server"
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <nav className="admin-nav-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/admin" style={{
            textDecoration: "none", display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "var(--green-surface)", color: "var(--green-ink)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c0-7 5-12 9-12-1 7-5 12-9 12Z" />
                <path d="M12 21c-4 0-8-3-9-9 6 0 9 4 9 9Z" />
                <path d="M12 21V11" />
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-fraunces)", fontSize: "20px",
              fontWeight: 300, color: "var(--green-ink)", letterSpacing: "-0.01em",
            }}>
              Plant<em style={{ fontStyle: "italic", fontWeight: 400 }}>arium</em>
            </span>
          </Link>
          <AdminNav logoutAction={logout} />
        </div>
        <div className="admin-nav-right">
          <span style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--paper)",
            background: "var(--green-ink)", padding: "2px 7px", borderRadius: "999px",
          }}>
            admin
          </span>
          <Link href="/" style={{
            fontSize: "12px", color: "var(--ink-mute)", textDecoration: "none",
            padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--line)",
          }}>
            ← View site
          </Link>
          <LogoutButton action={logout} />
        </div>
      </nav>
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
