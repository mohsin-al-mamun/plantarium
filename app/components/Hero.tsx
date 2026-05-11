import Image from "next/image"

const HERO_IMG =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2000&q=80"

const stats = [
  { value: "2,400+", label: "Plants Documented" },
  { value: "180+", label: "Species Tracked" },
  { value: "15k+", label: "Active Gardeners" },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <Image
        src={HERO_IMG}
        alt="Lush garden landscape"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(6,38,24,0.45) 0%, rgba(6,38,24,0.65) 100%)" }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8 pt-16 pb-8">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-8 tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Your Plant Companion
        </span>

        <h1
          className="text-white font-light leading-[1.05] mb-6"
          style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(48px,7vw,76px)" }}
        >
          Your Living
          <br />
          <em className="not-italic font-medium">Plant Journal</em>
        </h1>

        <p
          className="max-w-xl mb-10 text-lg text-white/75 leading-relaxed"
        >
          Document every bloom, track growth over seasons, and build your personal botanical
          archive — for curious gardeners who love their plants.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            className="px-8 py-3.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--clay)" }}
          >
            Start Your Journal
          </button>
          <button
            className="px-8 py-3.5 rounded-full text-sm font-medium text-white border border-white/40 transition-opacity hover:opacity-80"
          >
            Explore Plants →
          </button>
        </div>
      </div>

      <div
        className="relative z-10 w-full"
        style={{ background: "rgba(6,38,24,0.72)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-3xl mx-auto px-8 py-8 flex items-stretch justify-center">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="text-center px-10 lg:px-16">
                <div
                  className="text-3xl font-medium text-white mb-1"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {s.value}
                </div>
                <div className="text-xs tracking-widest uppercase text-white/55">
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div
                  className="self-stretch"
                  style={{ width: "1px", background: "rgba(255,255,255,0.18)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
