"use client"

import Image from "next/image"
import { useState } from "react"

type Plant = { name: string; img: string }

const plants: Plant[] = [
  {
    name: "Eden Climbing Rose",
    img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "San Marzano Tomato",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Café au Lait Dahlia",
    img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cosmos bipinnatus",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Albion Strawberry",
    img: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lacinato Kale",
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sweet Pea",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Wisteria",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Nasturtium",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Shishito Pepper",
    img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lemon Tree",
    img: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Larkspur",
    img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
  },
]

const PAGE_SIZE = 6

type CardProps = { plant: Plant; sizes: string }

function PlantCard({ plant, sizes }: CardProps) {
  return (
    <div className="relative overflow-hidden h-full group" style={{ borderRadius: "12px" }}>
      <Image
        src={plant.img}
        alt={plant.name}
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
          {plant.name}
        </span>
      </div>
    </div>
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

export default function Featured() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(plants.length / PAGE_SIZE)
  const pageItems = plants.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section style={{ paddingTop: "24px", paddingBottom: "96px", background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-16">

        {/* Section head */}
        <div className="flex items-end justify-between gap-10 mb-11">
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
                fontSize: "48px",
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

        {/* Bookend grid — first & last big */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "280px 280px",
            gap: "10px",
          }}
        >
          {/* Row 1 */}
          <div style={{ gridColumn: "1 / 3" }}>
            <PlantCard plant={pageItems[0]} sizes="50vw" />
          </div>
          {pageItems[1] && (
            <div style={{ gridColumn: "3" }}>
              <PlantCard plant={pageItems[1]} sizes="25vw" />
            </div>
          )}
          {pageItems[2] && (
            <div style={{ gridColumn: "4" }}>
              <PlantCard plant={pageItems[2]} sizes="25vw" />
            </div>
          )}

          {/* Row 2 */}
          {pageItems[3] && (
            <div style={{ gridColumn: "1" }}>
              <PlantCard plant={pageItems[3]} sizes="25vw" />
            </div>
          )}
          {pageItems[4] && (
            <div style={{ gridColumn: "2" }}>
              <PlantCard plant={pageItems[4]} sizes="25vw" />
            </div>
          )}
          {pageItems[5] && (
            <div style={{ gridColumn: "3 / 5" }}>
              <PlantCard plant={pageItems[5]} sizes="50vw" />
            </div>
          )}
        </div>

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
