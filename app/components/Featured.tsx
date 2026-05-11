import Image from "next/image"

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
]

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

export default function Featured() {
  return (
    <section style={{ paddingTop: "24px", paddingBottom: "96px" }}>
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
            <PlantCard plant={plants[0]} sizes="50vw" />
          </div>
          <div style={{ gridColumn: "3" }}>
            <PlantCard plant={plants[1]} sizes="25vw" />
          </div>
          <div style={{ gridColumn: "4" }}>
            <PlantCard plant={plants[2]} sizes="25vw" />
          </div>

          {/* Row 2 */}
          <div style={{ gridColumn: "1" }}>
            <PlantCard plant={plants[3]} sizes="25vw" />
          </div>
          <div style={{ gridColumn: "2" }}>
            <PlantCard plant={plants[4]} sizes="25vw" />
          </div>
          <div style={{ gridColumn: "3 / 5" }}>
            <PlantCard plant={plants[5]} sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
