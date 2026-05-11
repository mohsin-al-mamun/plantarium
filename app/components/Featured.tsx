import Image from "next/image"

type CarePill = { label: string; icon: React.ReactNode }

type FeaturedPlant = {
  img: string
  tag: string
  name: string
  species: string
  desc: string
  care: CarePill[]
}

const WaterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2C7 2 3 6 3 9C3 11.2 4.8 13 7 13C9.2 13 11 11.2 11 9C11 6 7 2 7 2Z"
      stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
)

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1.5V3M7 11V12.5M1.5 7H3M11 7H12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const SoilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 9H12M2 11.5H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7 8C7 8 5 6 5 4.5C5 3.1 6 2.5 7 2.5C8 2.5 9 3.1 9 4.5C9 6 7 8 7 8Z"
      stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
)

const plants: FeaturedPlant[] = [
  {
    img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80",
    tag: "Houseplant",
    name: "Fiddle Leaf Fig",
    species: "Ficus lyrata",
    desc: "A dramatic tropical statement plant with broad, violin-shaped leaves. Perfect for bright corners and open living spaces where it can stretch towards the light.",
    care: [
      { label: "Bright indirect light", icon: <SunIcon /> },
      { label: "Water weekly", icon: <WaterIcon /> },
      { label: "Well-draining soil", icon: <SoilIcon /> },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    tag: "Garden Rose",
    name: "Heritage Rose",
    species: "Rosa × hybrida",
    desc: "A classic fragrant rose with layers of velvety petals in warm blush tones. Blooms repeatedly through the season when given proper care and regular feeding.",
    care: [
      { label: "Full sun 6h+", icon: <SunIcon /> },
      { label: "Water twice weekly", icon: <WaterIcon /> },
      { label: "Rich compost", icon: <SoilIcon /> },
    ],
  },
]

export default function Featured() {
  return (
    <section id="plants" className="py-24" style={{ background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-14 text-center">
          <span
            className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--green-highlight)" }}
          >
            Featured Plants
          </span>
          <h2
            className="text-4xl font-medium"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
          >
            Plants Worth Knowing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.name}
              className="overflow-hidden rounded-2xl"
              style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={plant.img}
                  alt={plant.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "var(--green-ink)", color: "white" }}
                  >
                    {plant.tag}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <h3
                    className="text-2xl font-medium mb-1"
                    style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
                  >
                    {plant.name}
                  </h3>
                  <p className="text-sm italic" style={{ color: "var(--ink-mute)" }}>
                    {plant.species}
                  </p>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-soft)" }}>
                  {plant.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {plant.care.map((pill) => (
                    <span
                      key={pill.label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: "var(--green-surface)",
                        color: "var(--green-ink)",
                      }}
                    >
                      {pill.icon}
                      {pill.label}
                    </span>
                  ))}
                </div>

                <button
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--green-ink)" }}
                >
                  Add to Journal →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
