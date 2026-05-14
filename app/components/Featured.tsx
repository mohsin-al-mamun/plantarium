"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type BloomingItem = { name: string; photo: string; plant: { slug: string } }

const PAGE_SIZE = 6

type CardProps = { item: BloomingItem; sizes: string }

function PlantCard({ item, sizes }: CardProps) {
  return (
    <Link href={`/plants/${item.plant.slug}`} className="relative overflow-hidden h-full group" style={{ borderRadius: "12px", display: "block", textDecoration: "none" }}>
      <Image
        src={item.photo}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={sizes}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(6,30,14,0.65) 0%, transparent 55%)",
        }}
      />
      <div className="absolute bottom-0 left-0 p-4">
        <span
          className="text-white"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "15px",
            fontWeight: 300,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </span>
      </div>
    </Link>
  )
}

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

export default function Featured({ items }: { items: BloomingItem[] }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(items.length / PAGE_SIZE)
  const pageItems = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section style={{ paddingTop: "24px", paddingBottom: "96px", background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10 mb-8 md:mb-11">
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--clay)",
                fontWeight: 600,
                marginBottom: "14px",
              }}
            >
              In bloom this week
            </div>
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontWeight: 300,
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: 0,
                color: "var(--green-ink)",
              }}
            >
              Currently{" "}
              <em style={{ fontStyle: "italic", color: "var(--green-ink)", fontWeight: 400 }}>
                flowering
              </em>{" "}
              on the rooftop.
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
            Six of the year's favourites getting their best light right now — tap any card to read
            the full growing note.
          </p>
        </div>

        {/* Bookend grid — first & last big on desktop, 2-col on mobile */}
        {items.length === 0 ? (
          <p style={{ fontSize: "15px", color: "var(--ink-mute)", fontStyle: "italic" }}>
            Nothing marked as blooming right now.
          </p>
        ) : (
          <div className="featured-grid">
            <div className="f-big-left">
              <PlantCard item={pageItems[0]} sizes="(max-width: 1024px) 50vw, 50vw" />
            </div>
            {pageItems[1] && (
              <div className="f-col-3">
                <PlantCard item={pageItems[1]} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            )}
            {pageItems[2] && (
              <div className="f-col-4">
                <PlantCard item={pageItems[2]} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            )}
            {pageItems[3] && (
              <div className="f-col-1">
                <PlantCard item={pageItems[3]} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            )}
            {pageItems[4] && (
              <div className="f-col-2">
                <PlantCard item={pageItems[4]} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            )}
            {pageItems[5] && (
              <div className="f-big-right">
                <PlantCard item={pageItems[5]} sizes="(max-width: 1024px) 50vw, 50vw" />
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
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
