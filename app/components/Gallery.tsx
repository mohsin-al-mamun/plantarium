"use client"

import Image from "next/image"
import { useState } from "react"

type Photo = { src: string; alt: string; date: string; caption: string }

const photos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    alt: "Garden path through blooming flowers",
    date: "08 · MAY · 2026",
    caption: "The side path finally came into its own.",
  },
  {
    src: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80",
    alt: "Potted plants on a sunny windowsill",
    date: "02 · MAY · 2026",
    caption: "Morning light on the windowsill pots.",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    alt: "Close-up of blooming flowers",
    date: "27 · APR · 2026",
    caption: "First sweet peas of the year.",
  },
  {
    src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
    alt: "Fresh herbs growing in garden",
    date: "19 · APR · 2026",
    caption: "Herbs taking off after the warm spell.",
  },
  {
    src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
    alt: "Raised garden beds in sunlight",
    date: "11 · APR · 2026",
    caption: "Beds filled and ready for the season.",
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    alt: "Tropical plant leaves",
    date: "03 · APR · 2026",
    caption: "Monstera unfurling its third new leaf.",
  },
  {
    src: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=600&q=80",
    alt: "Wildflower meadow in bloom",
    date: "24 · MAR · 2026",
    caption: "Direct-sown larkspur already showing colour.",
  },
  {
    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80",
    alt: "Wisteria in full bloom",
    date: "16 · MAR · 2026",
    caption: "Wisteria peak — lasted exactly four days.",
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
    alt: "Cosmos flowers in morning light",
    date: "07 · MAR · 2026",
    caption: "Cosmos seedlings under the grow light.",
  },
  {
    src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    alt: "Dahlia close-up",
    date: "21 · FEB · 2026",
    caption: "Tubers arrived. Started them in damp compost.",
  },
  {
    src: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=80",
    alt: "Climbing rose on trellis",
    date: "14 · FEB · 2026",
    caption: "Rose pruned hard. Looks brutal, works every time.",
  },
  {
    src: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    alt: "Tomatoes ripening on vine",
    date: "30 · JAN · 2026",
    caption: "Last San Marzanos of the season. Made sauce.",
  },
  {
    src: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=600&q=80",
    alt: "Strawberries in punnet",
    date: "18 · JAN · 2026",
    caption: "Second flush, smaller but sweeter.",
  },
  {
    src: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=600&q=80",
    alt: "Kale leaves in raised bed",
    date: "05 · JAN · 2026",
    caption: "Kale thriving in the cold. Best time for it.",
  },
  {
    src: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=600&q=80",
    alt: "Lemon tree in container",
    date: "22 · DEC · 2025",
    caption: "Lemon tree moved inside for winter.",
  },
  {
    src: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=600&q=80",
    alt: "Shishito peppers in pot",
    date: "10 · DEC · 2025",
    caption: "Final pepper harvest before the frost.",
  },
]

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

function PhotoTile({ photo, rowSpan = false }: { photo: Photo; rowSpan?: boolean }) {
  return (
    <div className={`relative rounded-xl overflow-hidden group${rowSpan ? " row-span-2" : ""}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
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
          {photo.date}
        </span>
      </div>
      {/* Caption fades in on hover */}
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
    </div>
  )
}

export default function Gallery() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(photos.length / PAGE_SIZE)
  const p = photos.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section id="gallery" className="py-24" style={{ background: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-14 flex items-end justify-between gap-10">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--green-highlight)" }}
            >
              From the album
            </span>
            <h2
              className="text-4xl font-medium"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
            >
              A year on the roof,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>in pictures</em>.
            </h2>
          </div>
          <p
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

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "220px 220px",
          }}
        >
          {p[0] && <PhotoTile photo={p[0]} rowSpan />}
          {p.slice(1, 4).map((photo) => <PhotoTile key={photo.src} photo={photo} />)}
          {p[4] && <PhotoTile photo={p[4]} rowSpan />}
          {p.slice(5, 8).map((photo) => <PhotoTile key={photo.src} photo={photo} />)}
        </div>

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
