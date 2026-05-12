"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PLANTS } from "@/app/data/plants"

type Category = "All" | "Flowers" | "Fruits" | "Vegetables"

const tabs: Category[] = ["All", "Flowers", "Fruits", "Vegetables"]

export default function PlantGrid() {
  const [active, setActive] = useState<Category>("All")
  const [visible, setVisible] = useState(8)

  const filtered = active === "All" ? PLANTS : PLANTS.filter((p) => p.category === active)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length
  const isExpanded = visible >= filtered.length && filtered.length > 8

  return (
    <section id="plants" style={{ padding: "60px 0 96px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Section head: title left, sub right */}
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
              The collection
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
              Forty plants,{" "}
              <em style={{ fontStyle: "italic", color: "var(--green-ink)", fontWeight: 400 }}>
                three families
              </em>
              , one small sky.
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
            Browse by category. Each card is hand-tended and updated as the season turns.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-9">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActive(tab); setVisible(8) }}
              className="inline-flex items-center transition-colors"
              style={{
                padding: "9px 16px",
                borderRadius: "999px",
                fontSize: "13px",
                border: active === tab
                  ? "1px solid var(--green-ink)"
                  : "1px solid var(--line)",
                background: active === tab ? "var(--green-ink)" : "#fff",
                color: active === tab ? "var(--paper)" : "var(--ink-soft)",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Plant grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.slug}`}
              className="flex flex-col overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              <div className="relative aspect-5/4 overflow-hidden">
                <Image
                  src={plant.img}
                  alt={plant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              <div style={{ padding: "18px 20px 20px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "19px",
                      color: "var(--green-ink)",
                      lineHeight: 1.2,
                    }}
                  >
                    {plant.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-mute)",
                      marginTop: "4px",
                    }}
                  >
                    {plant.meta}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "var(--green-surface)",
                      color: "var(--green-ink)",
                      fontWeight: 500,
                    }}
                  >
                    {plant.category}
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{ fontSize: "11px", color: "var(--ink-mute)" }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "var(--green-ink)",
                        boxShadow: "0 0 0 3px rgba(59,109,17,0.12)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    Thriving
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {(hasMore || isExpanded) && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                if (hasMore) setVisible((v) => v + 8)
                else setVisible(8)
              }}
              style={{
                padding: "11px 32px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid var(--line)",
                background: "#fff",
                color: "var(--ink-soft)",
                cursor: "pointer",
              }}
            >
              {hasMore
                ? `View next ${Math.min(8, filtered.length - visible)} plants`
                : "View less"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
