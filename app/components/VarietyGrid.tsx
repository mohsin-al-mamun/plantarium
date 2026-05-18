"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Overlay } from "@/app/components/ModalShell"

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

const cleanUrl = (url: string) => url.replace(/^["']+|["']+$/g, "").trim()

type Variety = {
  name: string
  photo: string
  photos?: string[]
  trait: string
  season: string
  note: string
}

function PhotoTile({ src, alt, pos = "center center" }: { src: string; alt: string; pos?: string }) {
  return (
    <div className="relative overflow-hidden group h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        sizes="(max-width: 1024px) 50vw, 340px"
        priority
        style={{ objectPosition: pos }}
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
    </div>
  )
}

const OBJ_POSITIONS = ["center top", "right center", "left bottom", "center bottom"]

function EmptyCell() {
  return (
    <div className="relative overflow-hidden" style={{ background: "var(--green-surface)" }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.25 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-ink)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c0-7 5-12 9-12-1 7-5 12-9 12Z" />
          <path d="M12 21c-4 0-8-3-9-9 6 0 9 4 9 9Z" />
          <path d="M12 21V11" />
        </svg>
      </div>
    </div>
  )
}

function AdaptiveGrid({ photos, name }: { photos: string[]; name: string }) {
  const count = photos.length

  if (count === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--green-surface)", padding: "28px" }}>
        <div className="relative overflow-hidden group" style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
          <Image src={photos[0]} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="340px" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>
      </div>
    )
  }

  // 5+ photos: shuffle, pick 4 randomly each time modal opens
  const visible = count > 4
    ? [...photos].sort(() => Math.random() - 0.5).slice(0, 4)
    : photos

  // Always 2×2 grid for 2, 3, 4 images
  // 2 images → positions 0 and 3 (diagonal: top-left, bottom-right)
  // 3 images → positions 0, 1, 2 (top-left, top-right, bottom-left)
  // 4       → all four cells
  const cellSrcs: (string | null)[] =
    count === 2 ? [visible[0], null, null, visible[1]] :
    count === 3 ? [visible[0], visible[1], visible[2], null] :
                  visible.slice(0, 4)

  return (
    <div className="w-full h-full grid gap-1" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
      {cellSrcs.map((src, i) =>
        src === null ? (
          <EmptyCell key={i} />
        ) : (
          <div key={i} className="relative overflow-hidden group">
            <Image
              src={src}
              alt={`${name} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="340px"
              priority
              style={{ objectPosition: OBJ_POSITIONS[i] }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </div>
        )
      )}
    </div>
  )
}

export default function VarietyGrid({ varieties, plantName, plantSlug }: { varieties: Variety[]; plantName: string; plantSlug: string }) {
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
                src={cleanUrl(v.photo)}
                alt={v.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center" style={{ background: "rgba(10,30,16,0.28)" }}>
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
        <Overlay onClose={() => setSelected(null)} maxWidth="1140px">
          <div
            className="relative w-full flex flex-col lg:flex-row overflow-hidden"
            style={{ height: "clamp(520px, 88vh, 760px)" }}
          >
            {/* Adaptive image grid */}
            <div className="shrink-0 w-full lg:w-[60%] lg:self-stretch overflow-hidden" style={{ minHeight: "320px" }}>
              <AdaptiveGrid
                photos={Array.from(new Set([selected.photo, ...(selected.photos ?? [])]))}
                name={selected.name}
              />
            </div>

            {/* Info panel */}
            <div className="flex flex-col justify-center overflow-y-auto" style={{ padding: "48px 52px", flex: 1, minHeight: "0" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "10px" }}>
                Variety
              </div>
              <div style={{ fontSize: "13px", color: "var(--ink-mute)", marginBottom: "6px", fontStyle: "italic" }}>
                {plantName}
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
              <Link
                href={`/plants/${plantSlug}/${slugify(selected.name)}`}
                style={{ marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--green-ink)", textDecoration: "none", fontWeight: 500 }}
              >
                View full page
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Overlay>
      )}
    </>
  )
}
