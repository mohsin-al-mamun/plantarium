export default function About() {
  return (
    <section id="about" style={{ padding: "24px 0 96px" }}>
      <div className="max-w-7xl mx-auto px-16">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
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
              I&apos;m Maren — a slow gardener with a small{" "}
              <em style={{ fontStyle: "italic", color: "var(--green-ink)" }}>tar-paper roof</em>
              , a watering can, and more thyme than is reasonable.
            </p>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "18px" }}>
              I started this rooftop with two pots of basil in the spring of 2024. Two years on,
              it&apos;s grown into something that genuinely surprises me most weeks. This page is a
              way to keep an honest record of what&apos;s working, what isn&apos;t, and what the
              bees turn up to in the mornings.
            </p>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
              Everything here is grown without synthetic inputs and watered with collected rain
              whenever the weather allows. I&apos;m always happy to swap cuttings or seeds — say
              hello.
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
                title: "Water gently, deeply, less often",
                desc: "Twice a week in summer, mornings only. A long slow soak beats a daily splash on every count.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 18c4-4 12-4 16 0" />
                    <path d="M8 18V8a4 4 0 0 1 8 0v10" />
                    <path d="M12 4v4" />
                  </svg>
                ),
                title: "Organic inputs, always",
                desc: "Compost from the building's bins, kelp every fortnight, a fish-emulsion drench when the leaves look tired.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
                  </svg>
                ),
                title: "Match the plant to the sun",
                desc: "South rail for fruits, west corner for shade-tolerants, the windy north edge for the things that don't mind a fight.",
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
