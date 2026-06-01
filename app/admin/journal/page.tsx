export const dynamic = "force-dynamic"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

const css = `.edit-btn svg { transition: transform 0.2s ease; } .edit-btn:hover svg { transform: translateX(4px); }`

export default async function AdminJournalPage() {
  const entries = await prisma.journalEntry.findMany({
    orderBy: [{ position: "asc" }, { date: "desc" }],
  })

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="admin-page-header">
        <div>
          <h1 style={{
            fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "30px",
            color: "var(--green-ink)", margin: "0 0 6px",
          }}>
            Growth Journal
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-mute)", margin: 0 }}>
            Notes and updates from the rooftop garden.
          </p>
        </div>
        <Link href="/admin/journal/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          + Add entry
        </Link>
      </div>

      <div style={{
        border: "1px solid var(--line)", borderRadius: "14px", overflowX: "auto",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)", WebkitOverflowScrolling: "touch",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th style={{ width: "52px" }} />
              <Th>Date</Th>
              <Th>Title</Th>
              <Th>Accent</Th>
              <Th>Position</Th>
              <Th style={{ textAlign: "right", position: "sticky", right: 0, background: "var(--card)", boxShadow: "-3px 0 6px -2px rgba(14,59,42,0.08)" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "56px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>📓</div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--green-ink)", marginBottom: "4px" }}>No entries yet</div>
                  <div style={{ fontSize: "12px", color: "var(--ink-mute)" }}>Add your first journal entry.</div>
                </td>
              </tr>
            ) : entries.map((entry, i) => (
              <tr
                key={entry.id}
                style={{
                  borderBottom: i < entries.length - 1 ? "1px solid var(--line-soft)" : "none",
                  background: i % 2 === 0 ? "var(--paper)" : "var(--card)",
                }}
              >
                {/* Dot indicator */}
                <td style={{ padding: "10px 8px 10px 16px" }}>
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "50%", margin: "auto",
                    background: entry.accent === "amber" ? "var(--ochre)" : "var(--green-ink)",
                  }} />
                </td>

                {/* Date */}
                <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--ink-mute)" }}>
                    {entry.date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                </td>

                {/* Title */}
                <td style={{ padding: "10px 16px" }}>
                  <span style={{ fontWeight: 500, color: "var(--green-ink)" }}>{entry.title}</span>
                  {entry.body && (
                    <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "400px" }}>
                      {entry.body}
                    </div>
                  )}
                </td>

                {/* Accent */}
                <td style={{ padding: "10px 16px" }}>
                  {entry.accent ? (
                    <span style={{
                      fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "5px",
                      background: entry.accent === "amber" ? "#fef0e0" : "var(--green-surface)",
                      color: entry.accent === "amber" ? "#a85a0a" : "var(--green-ink)",
                    }}>
                      {entry.accent}
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
                    {entry.position}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: "10px 16px", textAlign: "right", position: "sticky", right: 0, background: "inherit", boxShadow: "-3px 0 6px -2px rgba(14,59,42,0.08)" }}>
                  <Link href={`/admin/journal/${entry.id}/edit`} className="edit-btn" style={{
                    fontSize: "12px", fontWeight: 500, color: "var(--green-ink)",
                    textDecoration: "none", padding: "6px 14px", borderRadius: "7px",
                    border: "1px solid var(--green-highlight)", background: "var(--green-surface)",
                    display: "inline-flex", alignItems: "center", gap: "5px",
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
