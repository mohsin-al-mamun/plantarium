"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default function VarietyPhotoViewer({ photos, name }: { photos: string[]; name: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length])
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null), [photos.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, close, prev, next])

  const count = photos.length
  const visible = count > 4 ? photos.slice(0, 4) : photos
  const cellSrcs: (string | null)[] =
    count === 2 ? [visible[0], null, null, visible[1]] :
    count === 3 ? [visible[0], visible[1], visible[2], null] :
                  visible.slice(0, 4)

  return (
    <>
      {/* Grid */}
      {count === 1 ? (
        <button
          onClick={() => setLightboxIndex(0)}
          className="group w-full text-left"
          style={{ position: "relative", aspectRatio: "4/5", borderRadius: "14px", overflow: "hidden", background: "var(--green-surface)", display: "block", border: "none", padding: 0, cursor: "zoom-in" }}
        >
          <Image src={photos[0]} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center"
            style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(10,30,16,0.6)", color: "#fff" }}>
            <ExpandIcon />
          </div>
        </button>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr", borderRadius: "14px", overflow: "hidden" }}>
          {cellSrcs.map((src, i) =>
            src === null ? (
              <div key={i} style={{ aspectRatio: "1/1", background: "var(--green-surface)", display: "grid", placeItems: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-ink)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.25 }}>
                  <path d="M12 21c0-7 5-12 9-12-1 7-5 12-9 12Z" />
                  <path d="M12 21c-4 0-8-3-9-9 6 0 9 4 9 9Z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
            ) : (
              <button
                key={i}
                onClick={() => setLightboxIndex(photos.indexOf(src))}
                className="group"
                style={{ position: "relative", aspectRatio: "1/1", background: "var(--green-surface)", overflow: "hidden", display: "block", border: "none", padding: 0, cursor: "zoom-in" }}
              >
                <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" priority={i === 0} />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center"
                  style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(10,30,16,0.6)", color: "#fff" }}>
                  <ExpandIcon />
                </div>
              </button>
            )
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 grid place-items-center transition-opacity hover:opacity-70"
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", cursor: "pointer" }}
            aria-label="Close"
          >
            <XIcon />
          </button>

          {/* Counter */}
          {photos.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              {lightboxIndex + 1} / {photos.length}
            </div>
          )}

          {/* Image — renders at actual dimensions, capped by viewport */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[lightboxIndex]}
            alt={`${name} ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "85vh", width: "auto", height: "auto", display: "block", borderRadius: "8px" }}
          />

          {/* Prev / Next */}
          {photos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-4 grid place-items-center transition-opacity hover:opacity-70"
                style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", cursor: "pointer" }}
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-4 grid place-items-center transition-opacity hover:opacity-70"
                style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", cursor: "pointer" }}
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
