import Image from "next/image"

const HERO_IMG =
  "https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=2000&q=80"

const stats = [
  { value: "40+", label: "Varieties" },
  { value: "3", label: "Categories" },
  { value: "2 yrs", label: "Growing" },
]

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "740px", paddingBottom: "100px" }}
    >
      <Image
        src={HERO_IMG}
        alt="Rooftop garden landscape"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,30,16,0.72) 0%, rgba(10,30,16,0.38) 55%, rgba(10,30,16,0.18) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-16 w-full">
        <div style={{ paddingTop: "64px", maxWidth: "660px" }}>
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              fontSize: "76px",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: "0 0 24px",
            }}
          >
            A living garden{" "}
            <em style={{ fontStyle: "italic", color: "#E8C97A", fontWeight: 400 }}>
              above
            </em>{" "}
            the city.
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.88)",
              maxWidth: "480px",
              lineHeight: 1.65,
              marginBottom: "32px",
            }}
          >
            A small, slow-growing collection of forty-some plants tended on a sunlit rooftop in
            Williamsburg — flowers I cut for the kitchen table, fruits I share with neighbours,
            vegetables that mostly make it to dinner.
          </p>

          <div className="flex items-center" style={{ gap: "12px", marginBottom: "48px" }}>
            <a
              href="#plants"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--green-ink)" }}
            >
              Tour the garden
              <ArrowIcon />
            </a>
            <a
              href="#journal"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              Read the journal
            </a>
          </div>

          <div
            className="flex"
            style={{
              gap: "44px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "30px",
                    fontWeight: 400,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.72)",
                    marginTop: "6px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
