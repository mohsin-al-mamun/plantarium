import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function logout() {
  "use server"
  const jar = await cookies()
  jar.delete("admin_token")
  redirect("/admin/login")
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <nav style={{
        borderBottom: "1px solid var(--line)", background: "var(--card)",
        padding: "0 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "56px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="/admin" style={{
            fontFamily: "var(--font-fraunces)", fontSize: "18px", fontWeight: 300,
            color: "var(--green-ink)", textDecoration: "none",
          }}>
            Plantarium <span style={{ color: "var(--ink-mute)", fontSize: "12px" }}>admin</span>
          </Link>
          <div style={{ display: "flex", gap: "4px" }}>
            <NavLink href="/admin/plants">Plants</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ fontSize: "12px", color: "var(--ink-mute)", textDecoration: "none" }}>
            ← View site
          </Link>
          <form action={logout}>
            <button type="submit" style={{
              fontSize: "12px", color: "var(--ink-mute)", background: "none",
              border: "none", cursor: "pointer", padding: 0,
            }}>
              Log out
            </button>
          </form>
        </div>
      </nav>
      <main style={{ padding: "40px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      fontSize: "13px", color: "var(--ink-soft)", textDecoration: "none",
      padding: "6px 12px", borderRadius: "6px",
    }}>
      {children}
    </Link>
  )
}
