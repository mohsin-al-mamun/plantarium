import Link from "next/link"
import { prisma } from "@/lib/prisma"

const css = `.edit-btn svg { transition: transform 0.2s ease; } .edit-btn:hover svg { transform: translateX(4px); }`


export default async function AdminPlantsPage() {
  const [plants, categoryCounts] = await Promise.all([
    prisma.plant.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { varieties: true } } },
    }),
    prisma.plant.groupBy({ by: ["category"], _count: { id: true } }),
  ])

  const byCategory = Object.fromEntries(categoryCounts.map(c => [c.category, c._count.id]))

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "30px",
            color: "var(--green-ink)", margin: "0 0 6px",
          }}>
            Plants
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-mute)", margin: 0 }}>
            Manage and organize your garden collection.
          </p>
        </div>
        <Link href="/admin/plants/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          + Add plant
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
        <StatCard label="Total Plants" value={plants.length} accent="var(--green-ink)" />
        <StatCard label="Flowers" value={byCategory["Flowers"] ?? 0} accent="#c2637a" bg="#fdf0f3" />
        <StatCard label="Fruits" value={byCategory["Fruits"] ?? 0} accent="#c2720a" bg="#fef5e8" />
        <StatCard label="Vegetables" value={byCategory["Vegetables"] ?? 0} accent="var(--green-highlight)" bg="var(--green-surface)" />
      </div>

      {/* Table */}
      <div style={{
        border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th style={{ width: "52px" }} />
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Varieties</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {plants.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "56px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>🌱</div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--green-ink)", marginBottom: "4px" }}>No plants yet</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-mute)" }}>Add your first plant to get started.</div>
                </td>
              </tr>
            ) : plants.map((plant, i) => (
                <tr
                  key={plant.id}
                  style={{
                    borderBottom: i < plants.length - 1 ? "1px solid var(--line-soft)" : "none",
                    background: i % 2 === 0 ? "var(--paper)" : "var(--card)",
                  }}
                >
                  {/* Thumbnail */}
                  <td style={{ padding: "10px 8px 10px 16px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "8px", flexShrink: 0,
                      border: "1px solid var(--line)", overflow: "hidden",
                      background: "var(--green-surface)", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: "16px",
                    }}>
                      {plant.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={plant.img}
                          alt={plant.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : "🌿"}
                    </div>
                  </td>

                  {/* Name */}
                  <td style={{ padding: "10px 16px 10px 8px" }}>
                    <span style={{ fontWeight: 500, color: "var(--green-ink)", fontSize: "13px" }}>{plant.name}</span>
                    {plant.meta && (
                      <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "1px", fontStyle: "italic" }}>{plant.meta}</div>
                    )}
                  </td>

                  {/* Category */}
                  <td style={{ padding: "10px 16px" }}>
                    <CategoryBadge category={plant.category} />
                  </td>

                  {/* Varieties */}
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{
                      fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
                      background: "var(--green-surface)", padding: "2px 8px",
                      borderRadius: "5px", display: "inline-block",
                    }}>
                      {plant._count.varieties}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "10px 16px", textAlign: "right" }}>
                    <Link href={`/admin/plants/${plant.id}/edit`} className="edit-btn" style={{
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

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Flowers: { bg: "#fde8ef", color: "#a83050" },
    Fruits:  { bg: "#fef0e0", color: "#a85a0a" },
    Vegetables: { bg: "var(--green-surface)", color: "var(--green-ink)" },
  }
  const s = styles[category] ?? { bg: "var(--paper-warm)", color: "var(--ink-soft)" }
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
      background: s.bg, color: s.color, letterSpacing: "0.03em",
    }}>
      {category}
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
