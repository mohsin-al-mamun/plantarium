import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [plantCount, productCount] = await Promise.all([
    prisma.plant.count(),
    prisma.product.count(),
  ])

  return (
    <div>
      <h1 style={{
        fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "32px",
        color: "var(--green-ink)", margin: "0 0 8px",
      }}>
        Dashboard
      </h1>
      <p style={{ fontSize: "14px", color: "var(--ink-mute)", margin: "0 0 40px" }}>
        Manage your garden data
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        <StatCard label="Plants" value={plantCount} href="/admin/plants" />
        <StatCard label="Products" value={productCount} href="/admin/products" />
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <ActionLink href="/admin/plants/new">+ Add plant</ActionLink>
        <ActionLink href="/admin/products/new">+ Add product</ActionLink>
      </div>
    </div>
  )
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        padding: "24px", border: "1px solid var(--line)", borderRadius: "12px",
        background: "var(--card)", cursor: "pointer",
      }}
        className="hover:shadow-sm transition-shadow"
      >
        <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--green-ink)", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: "13px", color: "var(--ink-mute)", marginTop: "6px" }}>
          {label}
        </div>
      </div>
    </Link>
  )
}

function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      display: "inline-block", padding: "10px 20px", borderRadius: "8px",
      border: "1px solid var(--green-ink)", background: "var(--green-ink)",
      color: "var(--paper)", fontSize: "13px", fontWeight: 500, textDecoration: "none",
    }}>
      {children}
    </Link>
  )
}
