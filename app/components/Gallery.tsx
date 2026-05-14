"use client"

import Image from "next/image"
import { useState } from "react"

type GardenPhoto = { id: number; url: string; caption: string | null; takenAt: Date; position: number }

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase().replace(/ /g, " · ")
}

const PAGE_SIZE = 8

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

function PhotoTile({ photo, rowSpan = false }: { photo: GardenPhoto; rowSpan?: boolean }) {
  return (
    <div className={`relative rounded-xl overflow-hidden group${rowSpan ? " gallery-tall" : ""}`}>
      <Image
        src={photo.url}
        alt={photo.caption ?? ""}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="20vw"
      />
      {/* Always-visible date at top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          background: "linear-gradient(to bottom, rgba(6,20,10,0.55) 0%, transparent 60%)",
          padding: "12px 14px 28px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {formatDate(photo.takenAt)}
        </span>
      </div>
      {/* Caption fades in on hover */}
      {photo.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(to top, rgba(6,20,10,0.75) 0%, transparent 100%)",
            padding: "28px 14px 14px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.35,
            }}
          >
            {photo.caption}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Gallery({ photos }: { photos: GardenPhoto[] }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(photos.length / PAGE_SIZE)
  const p = photos.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section id="gallery" className="py-24" style={{ background: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10 mb-8 md:mb-14">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--green-highlight)" }}
            >
              From the album
            </span>
            <h2
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)", fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 500 }}
            >
              A year on the roof,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>in pictures</em>.
            </h2>
          </div>
          <p
            className="hidden md:block"
            style={{
              fontSize: "15px",
              color: "var(--ink-soft)",
              maxWidth: "360px",
              flexShrink: 0,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            A handful of frames from the last twelve months — taken on a phone, mostly at golden hour.
          </p>
        </div>

        {photos.length === 0 ? (
          <p style={{ fontSize: "15px", color: "var(--ink-mute)", fontStyle: "italic" }}>No photos yet.</p>
        ) : (
          <div className="gallery-grid">
            {p[0] && <PhotoTile photo={p[0]} rowSpan />}
            {p.slice(1, 4).map((photo) => <PhotoTile key={photo.id} photo={photo} />)}
            {p[4] && <PhotoTile photo={p[4]} rowSpan />}
            {p.slice(5, 8).map((photo) => <PhotoTile key={photo.id} photo={photo} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="grid place-items-center transition-opacity"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "#fff",
                color: "var(--ink-soft)",
                cursor: page === 0 ? "not-allowed" : "pointer",
                opacity: page === 0 ? 0.35 : 1,
              }}
            >
              <ChevronLeft />
            </button>
            <span style={{ fontSize: "13px", color: "var(--ink-mute)" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages - 1}
              className="grid place-items-center transition-opacity"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "#fff",
                color: "var(--ink-soft)",
                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                opacity: page === totalPages - 1 ? 0.35 : 1,
              }}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
