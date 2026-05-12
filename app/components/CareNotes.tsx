"use client"

import { useState } from "react"

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const DosageIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
    <path d="M8.5 2h7" /><path d="M7 16h10" />
  </svg>
)

const FrequencyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

type ProductRow = {
  id: string
  name: string
  kind: string
  dosage: string | null
  frequency: string | null
}

export default function CareNotes({ products }: { products: ProductRow[] }) {
  const [open, setOpen] = useState(false)

  const fertilizers = products.filter(p => p.kind === "fertilizer")
  const pesticides = products.filter(p => p.kind === "pesticide")
  const total = products.length

  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", marginBottom: "48px" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between transition-colors hover:bg-[var(--green-surface)]"
        style={{ padding: "16px 20px", background: open ? "var(--green-surface)" : "var(--card)", cursor: "pointer", border: "none", textAlign: "left" }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--green-ink)", fontWeight: 600 }}>
            Care notes
          </span>
          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: "var(--green-surface)", color: "var(--green-ink)", fontWeight: 500 }}>
            {total} items
          </span>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          style={{ padding: "20px", borderTop: "1px solid var(--line)", background: "var(--card)" }}
        >
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "12px" }}>
              Fertilizers
            </div>
            <div className="flex flex-col gap-3">
              {fertilizers.length === 0
                ? <span style={{ fontSize: "12px", color: "var(--ink-mute)", fontStyle: "italic" }}>None recorded</span>
                : fertilizers.map(f => (
                  <div key={f.id} style={{ borderRadius: "8px", background: "var(--green-surface)", padding: "10px 12px" }}>
                    <div style={{ color: "var(--green-ink)", fontWeight: 500, fontSize: "13px", marginBottom: "6px" }}>{f.name}</div>
                    <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px", marginBottom: "3px" }}>
                      <span style={{ marginTop: "1px", flexShrink: 0 }}><DosageIcon /></span>
                      <span>{f.dosage}</span>
                    </div>
                    <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px" }}>
                      <span style={{ marginTop: "1px", flexShrink: 0 }}><FrequencyIcon /></span>
                      <span>{f.frequency}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "12px" }}>
              Pest control
            </div>
            <div className="flex flex-col gap-3">
              {pesticides.length === 0
                ? <span style={{ fontSize: "12px", color: "var(--ink-mute)", fontStyle: "italic" }}>None recorded</span>
                : pesticides.map(p => (
                  <div key={p.id} style={{ borderRadius: "8px", background: "var(--clay-surface)", padding: "10px 12px" }}>
                    <div style={{ color: "var(--clay-deep)", fontWeight: 500, fontSize: "13px", marginBottom: "6px" }}>{p.name}</div>
                    <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px", marginBottom: "3px" }}>
                      <span style={{ marginTop: "1px", flexShrink: 0 }}><DosageIcon /></span>
                      <span>{p.dosage}</span>
                    </div>
                    <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px" }}>
                      <span style={{ marginTop: "1px", flexShrink: 0 }}><FrequencyIcon /></span>
                      <span>{p.frequency}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
