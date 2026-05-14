export default function About() {
  return (
    <section id="about" style={{ padding: "24px 0 96px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20"
          style={{ alignItems: "start" }}
        >
          {/* Left — personal text */}
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
              About the gardener
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: 1.4,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                marginBottom: "22px",
              }}
            >
              I&apos;m Mohsin — a slow gardener with a small{" "}
              <em style={{ fontStyle: "italic", color: "var(--green-ink)" }}>rooftop garden</em>{" "}
              on the seventh floor.
            </p>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "18px" }}>
              It started with a few roses and bougainvillaea, and quietly grew from there. Flowers
              still make up most of it — nearly everything up here blooms. Fruits and vegetables
              came later, in smaller numbers, mostly out of curiosity.
            </p>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "18px" }}>
              My father is retired and spends more time on this rooftop than I do. He&apos;s the
              one who keeps things going between my visits — the garden is as much his as it is mine.
            </p>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
              We use organic fertiliser where we can, chemical pesticides when we have to, and try
              to pay attention to what each plant actually needs.
            </p>
          </div>

          {/* Right — care rows */}
          <div style={{ display: "grid", gap: "18px" }}>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z" />
                  </svg>
                ),
                title: "Water well — the sun demands it",
                desc: "Bangladesh summers are scorching. Most plants get watered daily; thirsty ones like hibiscus, bougainvillaea, crape jasmine, and rangoon creeper often get a second round.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 18c4-4 12-4 16 0" />
                    <path d="M8 18V8a4 4 0 0 1 8 0v10" />
                    <path d="M12 4v4" />
                  </svg>
                ),
                title: "Organic fertiliser, chemical pest control",
                desc: "We feed with organic fertiliser as a first choice, but reach for chemical pesticides when pests get the upper hand.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
                  </svg>
                ),
                title: "Work around the heat",
                desc: "On a seventh-floor rooftop the sun is relentless all day. Sensitive plants go near the parapet wall, which gives them a little shelter from the worst of the heat and wind.",
              },
            ].map((row) => (
              <div
                key={row.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "20px",
                  padding: "22px",
                  background: "var(--paper-warm)",
                  border: "1px solid var(--line-soft)",
                  borderRadius: "14px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(14,59,42,0.14)",
                    color: "var(--green-ink)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {row.icon}
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 4px",
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 400,
                      fontSize: "18px",
                      letterSpacing: "-0.01em",
                      color: "var(--green-ink)",
                    }}
                  >
                    {row.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.55 }}>
                    {row.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
