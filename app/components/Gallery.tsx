import Image from "next/image"

const photos = [
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    alt: "Garden path through blooming flowers",
  },
  {
    src: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80",
    alt: "Potted plants on a sunny windowsill",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    alt: "Close-up of blooming flowers",
  },
  {
    src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
    alt: "Fresh herbs growing in garden",
  },
  {
    src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
    alt: "Raised garden beds in sunlight",
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
    alt: "Tropical plant leaves",
  },
  {
    src: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=600&q=80",
    alt: "Wildflower meadow in bloom",
  },
]

export default function Gallery() {
  return (
    <section className="py-24" style={{ background: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--green-highlight)" }}
            >
              Community Gallery
            </span>
            <h2
              className="text-4xl font-medium"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
            >
              Gardens in Bloom
            </h2>
          </div>
          <button
            className="text-sm font-medium transition-opacity hover:opacity-70 hidden md:block"
            style={{ color: "var(--green-ink)" }}
          >
            View all photos →
          </button>
        </div>

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "220px 220px",
          }}
        >
          {/* Large photo — col 1, spans 2 rows */}
          <div className="relative rounded-xl overflow-hidden row-span-2">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="20vw"
            />
          </div>

          {/* Row 1, cols 2–4 */}
          {photos.slice(1, 4).map((photo) => (
            <div key={photo.src} className="relative rounded-xl overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="20vw"
              />
            </div>
          ))}

          {/* CTA tile — col 5, spans 2 rows */}
          <div
            className="rounded-xl row-span-2 flex flex-col items-center justify-center text-center p-8"
            style={{ background: "var(--green-ink)" }}
          >
            <div className="mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5C20 5 10 12 9 21C8 30 13 35 20 35C27 35 32 30 31 21C30 12 20 5 20 5Z"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-medium text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Share Your Garden Story
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Join thousands of gardeners sharing their growing journey
            </p>
            <button
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--clay)", color: "white" }}
            >
              Upload Photos
            </button>
          </div>

          {/* Row 2, cols 2–4 */}
          {photos.slice(4, 7).map((photo) => (
            <div key={photo.src} className="relative rounded-xl overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
