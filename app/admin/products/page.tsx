export const dynamic = "force-dynamic"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

const css = `.edit-btn svg { transition: transform 0.2s ease; } .edit-btn:hover svg { transform: translateX(4px); }`

export default async function AdminProductsPage() {
  const [products, kindCounts, typeCounts] = await Promise.all([
    prisma.product.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { plants: true } } },
    }),
    prisma.product.groupBy({ by: ["kind"], _count: { id: true } }),
    prisma.product.groupBy({ by: ["type"], _count: { id: true } }),
  ])

  const byKind = Object.fromEntries(kindCounts.map(c => [c.kind, c._count.id]))
  const byType = Object.fromEntries(typeCounts.map(c => [c.type, c._count.id]))

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 style={{
            fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "30px",
            color: "var(--green-ink)", margin: "0 0 6px",
          }}>
            Products
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-mute)", margin: 0 }}>
            Manage fertilizers and pesticides for your garden.
          </p>
        </div>
        <Link href="/admin/products/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          + Add product
        </Link>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid-4">
        <StatCard label="Total Products" value={products.length} accent="var(--green-ink)" />
        <StatCard label="Fertilizers" value={byKind["fertilizer"] ?? 0} accent="var(--green-highlight)" bg="var(--green-surface)" />
        <StatCard label="Pesticides" value={byKind["pesticide"] ?? 0} accent="#c2720a" bg="#fef5e8" />
        <StatCard label="Organic" value={byType["organic"] ?? 0} accent="#6b8f3e" bg="#eef4e6" />
      </div>

      {/* Table */}
      <div style={{
        border: "1px solid var(--line)", borderRadius: "14px", overflowX: "auto",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)", WebkitOverflowScrolling: "touch",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th>Name</Th>
              <Th>Kind</Th>
              <Th>Type</Th>
              <Th>Plants</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "56px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>🧪</div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--green-ink)", marginBottom: "4px" }}>No products yet</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-mute)" }}>Add your first fertilizer or pesticide.</div>
                </td>
              </tr>
            ) : products.map((p, i) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: i < products.length - 1 ? "1px solid var(--line-soft)" : "none",
                  background: i % 2 === 0 ? "var(--paper)" : "var(--card)",
                }}
              >
                {/* Name */}
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontWeight: 500, color: "var(--green-ink)", fontSize: "13px" }}>{p.name}</span>
                  {p.dosage && (
                    <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "1px" }}>{p.dosage}</div>
                  )}
                </td>

                {/* Kind */}
                <td style={{ padding: "12px 16px" }}>
                  <KindBadge kind={p.kind} />
                </td>

                {/* Type */}
                <td style={{ padding: "12px 16px" }}>
                  <TypeBadge type={p.type} />
                </td>

                {/* Plants */}
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
                    background: "var(--green-surface)", padding: "2px 8px",
                    borderRadius: "5px", display: "inline-block",
                  }}>
                    {p._count.plants}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <Link href={`/admin/products/${p.id}/edit`} className="edit-btn" style={{
                    fontSize: "12px", fontWeight: 500, color: "var(--green-ink)",
                    textDecoration: "none", padding: "6px 14px", borderRadius: "7px",
                    border: "1px solid var(--green-highlight)", background: "var(--green-surface)",
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    letterSpacing: "0.01em",
                  }}>
                    Edit
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent, bg }: { label: string; value: number; accent: string; bg?: string }) {
  return (
    <div style={{
      background: bg ?? "var(--card)", borderRadius: "12px", padding: "18px 20px",
      border: "1px solid var(--line)", borderLeft: `3px solid ${accent}`,
      boxShadow: "0 1px 3px rgba(14,59,42,0.05)",
    }}>
      <div style={{ fontSize: "24px", fontWeight: 300, fontFamily: "var(--font-fraunces)", color: accent, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "6px", fontWeight: 500, letterSpacing: "0.04em" }}>
        {label}
      </div>
    </div>
  )
}

function KindBadge({ kind }: { kind: string }) {
  const isFerti = kind === "fertilizer"
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
      background: isFerti ? "var(--green-surface)" : "#fef5e8",
      color: isFerti ? "var(--green-ink)" : "#a85a0a",
      letterSpacing: "0.03em",
    }}>
      {kind.charAt(0).toUpperCase() + kind.slice(1)}
    </span>
  )
}

function TypeBadge({ type }: { type: string }) {
  const isOrganic = type === "organic"
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
      background: isOrganic ? "#eef4e6" : "#f0f0f5",
      color: isOrganic ? "#6b8f3e" : "#5a5a7a",
      letterSpacing: "0.03em",
    }}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

function Th({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <th style={{
      padding: "11px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600,
      letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mute)",
      ...style,
    }}>
      {children}
    </th>
  )
}
