"use client"

import { useState } from "react"
import Image from "next/image"

type Category = "All" | "Flowers" | "Fruits" | "Vegetables"

type Plant = {
  id: number
  name: string
  meta: string
  category: Exclude<Category, "All">
  img: string
}

const plants: Plant[] = [
  {
    id: 1,
    name: "Cosmos bipinnatus",
    meta: "3 varieties · sown March",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "San Marzano",
    meta: "2 varieties · staked",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Lacinato kale",
    meta: "1 variety · cool-loving",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Café au Lait dahlia",
    meta: "4 varieties · tubered",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Albion strawberry",
    meta: "2 varieties · ever-bearing",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Eden climbing rose",
    meta: "2 varieties · trellised",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Shishito pepper",
    meta: "3 varieties · in pots",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Brown Turkey fig",
    meta: "1 variety · 2nd year",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Sweet pea",
    meta: "5 varieties · climbing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Nasturtium",
    meta: "2 varieties · trailing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Wisteria",
    meta: "1 variety · 3rd year",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Monstera deliciosa",
    meta: "1 variety · indoor",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 13,
    name: "Larkspur",
    meta: "4 varieties · direct sown",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    name: "Lemon tree",
    meta: "1 variety · container",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    name: "Rainbow chard",
    meta: "3 varieties · cut-and-come",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
  },
]

const tabs: Category[] = ["All", "Flowers", "Fruits", "Vegetables"]

export default function PlantGrid() {
  const [active, setActive] = useState<Category>("All")
  const [visible, setVisible] = useState(8)

  const filtered = active === "All" ? plants : plants.filter((p) => p.category === active)
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map((plant) => (
            <article
              key={plant.id}
              className="flex flex-col overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "12px",
              }}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
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
            </article>
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
