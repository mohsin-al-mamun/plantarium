export const dynamic = "force-dynamic"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"
import VarietyFilterBar from "./VarietyFilterBar"

const css = `.edit-btn svg { transition: transform 0.2s ease; } .edit-btn:hover svg { transform: translateX(4px); }`

export default async function AdminVarietiesPage({
  searchParams,
}: {
  searchParams: Promise<{ plant?: string; blooming?: string }>
}) {
  const { plant, blooming } = await searchParams
  const plantId = plant ? Number(plant) : undefined
  const bloomingFilter = blooming === "yes" ? true : blooming === "no" ? false : undefined

  const [varieties, plants] = await Promise.all([
    prisma.variety.findMany({
      where: {
        ...(plantId !== undefined && { plantId }),
        ...(bloomingFilter !== undefined && { bloomingNow: bloomingFilter }),
      },
      orderBy: [{ plant: { name: "asc" } }, { position: "asc" }],
      include: { plant: { select: { id: true, name: true } } },
    }),
    prisma.plant.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ])

  const bloomingCount = varieties.filter(v => v.bloomingNow).length

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "30px",
            color: "var(--green-ink)", margin: "0 0 6px",
          }}>
            Varieties
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-mute)", margin: 0 }}>
            All varieties across every plant.
          </p>
        </div>
        <Suspense>
          <VarietyFilterBar plants={plants} selectedPlantId={plantId} bloomingFilter={blooming} />
        </Suspense>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
        <StatCard label="Total Varieties" value={varieties.length} accent="var(--green-ink)" />
        <StatCard label="Currently Blooming" value={bloomingCount} accent="#c2637a" bg="#fdf0f3" />
        <StatCard label="Not Blooming" value={varieties.length - bloomingCount} accent="var(--ink-mute)" bg="var(--paper-warm)" />
      </div>

      <div style={{
        border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th style={{ width: "52px" }} />
              <Th>Variety</Th>
              <Th>Plant</Th>
              <Th>Trait</Th>
              <Th>Blooming</Th>
              <Th>Position</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {varieties.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "56px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>🌿</div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--green-ink)", marginBottom: "4px" }}>No varieties yet</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-mute)" }}>Add varieties from a plant's edit page.</div>
                </td>
              </tr>
            ) : varieties.map((v, i) => (
              <tr
                key={v.id}
                style={{
                  borderBottom: i < varieties.length - 1 ? "1px solid var(--line-soft)" : "none",
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
                    {(v.bloomingPhoto ?? v.photo) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={v.bloomingPhoto ?? v.photo}
                        alt={v.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : "🌸"}
                  </div>
                </td>

                {/* Variety name */}
                <td style={{ padding: "10px 16px 10px 8px" }}>
                  <span style={{ fontWeight: 500, color: "var(--green-ink)" }}>{v.name}</span>
                  {v.season && (
                    <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "1px" }}>{v.season}</div>
                  )}
                </td>

                {/* Plant */}
                <td style={{ padding: "10px 16px" }}>
                  <Link href={`/admin/plants/${v.plant.id}/edit`} style={{
                    fontSize: "12px", color: "var(--ink-soft)", textDecoration: "none",
                    fontWeight: 500,
                  }}>
                    {v.plant.name}
                  </Link>
                </td>

                {/* Trait */}
                <td style={{ padding: "10px 16px" }}>
                  {v.trait ? (
                    <span style={{ fontSize: "12px", color: "var(--ink-mute)" }}>{v.trait}</span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "var(--line)" }}>—</span>
                  )}
                </td>

                {/* Blooming */}
                <td style={{ padding: "10px 16px" }}>
                  {v.bloomingNow ? (
                    <span style={{
                      fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
                      background: "#fdf0f3", color: "#c2637a", letterSpacing: "0.03em",
                    }}>
                      In bloom
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "var(--line)" }}>—</span>
                  )}
                </td>

                {/* Position */}
                <td style={{ padding: "10px 16px" }}>
                  <span style={{
                    fontSize: "12px", fontWeight: 500, color: "var(--ink-soft)",
                    background: "var(--green-surface)", padding: "2px 8px",
                    borderRadius: "5px", display: "inline-block",
                  }}>
                    {v.position}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: "10px 16px", textAlign: "right" }}>
                  <Link href={`/admin/plants/${v.plant.id}/varieties/${v.id}/edit`} className="edit-btn" style={{
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
