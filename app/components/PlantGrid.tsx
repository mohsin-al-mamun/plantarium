"use client"

import { useState } from "react"
import Image from "next/image"

type Category = "All" | "Flowers" | "Fruits" | "Vegetables"

type Plant = {
  id: number
  name: string
  species: string
  category: Exclude<Category, "All">
  care: "Easy" | "Medium" | "Moderate"
  img: string
}

const plants: Plant[] = [
  {
    id: 1,
    name: "English Rose",
    species: "Rosa gallica",
    category: "Flowers",
    care: "Medium",
    img: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Lavender",
    species: "Lavandula angustifolia",
    category: "Flowers",
    care: "Easy",
    img: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Cherry Tomato",
    species: "Solanum lycopersicum",
    category: "Fruits",
    care: "Easy",
    img: "https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Sweet Basil",
    species: "Ocimum basilicum",
    category: "Vegetables",
    care: "Easy",
    img: "https://images.unsplash.com/photo-1609358905581-e5381612486e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Sunflower",
    species: "Helianthus annuus",
    category: "Flowers",
    care: "Easy",
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Blueberry",
    species: "Vaccinium corymbosum",
    category: "Fruits",
    care: "Medium",
    img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Peppermint",
    species: "Mentha × piperita",
    category: "Vegetables",
    care: "Easy",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Purple Orchid",
    species: "Phalaenopsis",
    category: "Flowers",
    care: "Moderate",
    img: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=600&q=80",
  },
]

const careBadge: Record<Plant["care"], { bg: string; color: string }> = {
  Easy: { bg: "var(--green-surface)", color: "var(--green-ink)" },
  Medium: { bg: "var(--ochre-surface, #F1E0B8)", color: "#7A5500" },
  Moderate: { bg: "var(--clay-surface, #F4D9C2)", color: "var(--clay-deep, #9A552A)" },
}

const tabs: Category[] = ["All", "Flowers", "Fruits", "Vegetables"]

export default function PlantGrid() {
  const [active, setActive] = useState<Category>("All")

  const filtered = active === "All" ? plants : plants.filter((p) => p.category === active)

  return (
    <section id="plants" className="py-24" style={{ background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--green-highlight)" }}
            >
              Plant Library
            </span>
            <h2
              className="text-4xl font-medium"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
            >
              Explore Our Plants
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--ink-mute)" }}>
              Care guides and journaling inspiration for thousands of species
            </p>
          </div>

          <div
            className="flex rounded-full p-1 gap-1"
            style={{ background: "var(--line-soft)", width: "fit-content" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="px-5 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  active === tab
                    ? { background: "var(--green-ink)", color: "white" }
                    : { color: "var(--ink-soft)" }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((plant) => {
            const badge = careBadge[plant.care]
            return (
              <div
                key={plant.id}
                className="rounded-2xl overflow-hidden flex flex-col group"
                style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plant.img}
                    alt={plant.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {plant.care}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span
                    className="inline-block text-xs font-medium mb-2"
                    style={{ color: "var(--green-highlight)" }}
                  >
                    {plant.category}
                  </span>
                  <h3
                    className="text-lg font-medium leading-tight mb-0.5"
                    style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
                  >
                    {plant.name}
                  </h3>
                  <p className="text-xs italic mb-4 flex-1" style={{ color: "var(--ink-mute)" }}>
                    {plant.species}
                  </p>
                  <button
                    className="w-full py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: "var(--green-surface)", color: "var(--green-ink)" }}
                  >
                    + Add to Journal
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            className="px-8 py-3 rounded-full text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ color: "var(--green-ink)", borderColor: "var(--line)" }}
          >
            Browse all 2,400+ plants →
          </button>
        </div>
      </div>
    </section>
  )
}
