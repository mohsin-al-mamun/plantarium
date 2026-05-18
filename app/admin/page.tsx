import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [plantCount, productCount, varietyCount, photoCount, journalCount] = await Promise.all([
    prisma.plant.count(),
    prisma.product.count(),
    prisma.variety.count(),
    prisma.gardenPhoto.count(),
    prisma.journalEntry.count(),
  ])

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "32px",
          color: "var(--green-ink)", margin: "0 0 6px",
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "var(--ink-mute)", margin: 0 }}>
          Manage your garden data
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 180px)", gap: "16px", marginBottom: "48px" }}>
        <StatCard label="Plants" value={plantCount} href="/admin/plants" accent="var(--green-ink)" />
        <StatCard label="Varieties" value={varietyCount} href="/admin/varieties" accent="var(--green-ink)" />
        <StatCard label="Products" value={productCount} href="/admin/products" accent="var(--clay-deep)" />
        <StatCard label="Gallery" value={photoCount} href="/admin/gallery" accent="#7a6a9a" />
        <StatCard label="Journal" value={journalCount} href="/admin/journal" accent="var(--ochre)" />
      </div>

      <div style={{
        padding: "24px", borderRadius: "12px", background: "var(--green-surface)",
        border: "1px solid var(--line)", marginBottom: "32px", maxWidth: "640px",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--green-ink)", fontWeight: 600, marginBottom: "16px" }}>
          Quick actions
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <ActionLink href="/admin/plants/new">+ Add plant</ActionLink>
          <ActionLink href="/admin/products/new" outline>+ Add product</ActionLink>
          <ActionLink href="/admin/gallery/new" outline>+ Add photo</ActionLink>
          <ActionLink href="/admin/journal/new" outline>+ Add entry</ActionLink>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, href, accent }: { label: string; value: number; href: string; accent: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        padding: "20px 24px", border: "1px solid var(--line)", borderRadius: "12px",
        background: "var(--card)", cursor: "pointer", borderLeft: `3px solid ${accent}`,
      }}
        className="hover:shadow-sm transition-shadow"
      >
        <div style={{ fontSize: "36px", fontWeight: 600, color: accent, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: "12px", color: "var(--ink-mute)", marginTop: "6px", fontWeight: 500, letterSpacing: "0.04em" }}>
          {label}
        </div>
      </div>
    </Link>
  )
}

function ActionLink({ href, children, outline }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return (
    <Link href={href} style={{
      display: "inline-block", padding: "9px 18px", borderRadius: "8px",
      border: "1px solid var(--green-ink)",
      background: outline ? "transparent" : "var(--green-ink)",
      color: outline ? "var(--green-ink)" : "var(--paper)",
      fontSize: "13px", fontWeight: 500, textDecoration: "none",
    }}>
      {children}
    </Link>
  )
}
