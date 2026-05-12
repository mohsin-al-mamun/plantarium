"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { Variety } from "@/app/data/plants"

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default function VarietyGrid({ varieties }: { varieties: Variety[] }) {
  const [selected, setSelected] = useState<Variety | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selected])

  return (
    <>
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {varieties.map((v) => (
          <article
            key={v.name}
            className="flex flex-col overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px" }}
          >
            <button
              onClick={() => setSelected(v)}
              className="relative block overflow-hidden group"
              style={{ aspectRatio: "5/4", border: "none", padding: 0, cursor: "zoom-in", background: "transparent" }}
              aria-label={`View ${v.name}`}
            >
              <Image
                src={v.photo}
                alt={v.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center"
                style={{ background: "rgba(10,30,16,0.28)" }}
              >
                <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", fontWeight: 600, background: "rgba(10,30,16,0.5)", padding: "6px 14px", borderRadius: "999px" }}>
                  View
                </span>
              </div>
            </button>

            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "19px", color: "var(--green-ink)", lineHeight: 1.2, marginBottom: "6px" }}>
                {v.name}
              </div>
              <div style={{ fontSize: "13px", color: "var(--ink-soft)", marginBottom: "16px", lineHeight: 1.5 }}>
                {v.trait}
              </div>
              <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", background: "var(--teal)", color: "var(--green-ink)", fontWeight: 500 }}>
                {v.season}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8"
          style={{ background: "rgba(10,30,16,0.82)", backdropFilter: "blur(10px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full flex flex-col lg:flex-row overflow-hidden"
            style={{
              maxWidth: "1140px",
              height: "clamp(520px, 88vh, 760px)",
              background: "var(--card)",
              borderRadius: "24px",
              boxShadow: "0 48px 120px rgba(10,30,16,0.55)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-20 grid place-items-center transition-opacity hover:opacity-70"
              style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(10,30,16,0.6)", color: "#fff", border: "none", cursor: "pointer" }}
              aria-label="Close"
            >
              <XIcon />
            </button>

            {/* Image 2×2 grid */}
            <div
              className="shrink-0 w-full lg:w-[60%] lg:self-stretch overflow-hidden"
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                minHeight: "320px",
              }}
            >
              {[
                { pos: "center top",    label: "" },
                { pos: "right center",  label: "detail" },
                { pos: "left bottom",   label: "close-up" },
                { pos: "center bottom", label: "view" },
              ].map(({ pos, label }) => (
                <div key={pos} className="relative overflow-hidden group">
                  <Image
                    src={selected.photo}
                    alt={label ? `${selected.name} ${label}` : selected.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 340px"
                    priority
                    style={{ objectPosition: pos }}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Info panel */}
            <div
              className="flex flex-col justify-center overflow-y-auto"
              style={{ padding: "48px 52px", flex: 1, minHeight: "0" }}
            >
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "14px" }}>
                Variety
              </div>

              <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--green-ink)", margin: "0 0 10px" }}>
                {selected.name}
              </h2>

              <div style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: "16px" }}>
                {selected.trait}
              </div>

              <span style={{ fontSize: "11px", padding: "5px 12px", borderRadius: "999px", background: "var(--teal)", color: "var(--green-ink)", fontWeight: 500, display: "inline-block", alignSelf: "flex-start", marginBottom: "28px" }}>
                {selected.season}
              </span>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)", fontWeight: 600, marginBottom: "10px" }}>
                  Garden note
                </div>
                <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                  {selected.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
