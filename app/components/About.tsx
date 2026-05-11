const philosophyCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.9 4.9L7 7M17 17L19.1 19.1M4.9 19.1L7 17M17 7L19.1 4.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Observe",
    desc: "Notice the subtle daily changes in your plants — a new leaf unfurling, a shift in colour, a change in posture. Careful observation is the foundation of good growing.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C12 3 7 7 6 12C5 17 8 20 12 20C16 20 19 17 18 12C17 7 12 3 12 3Z"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 20V12M12 12C10 10 8 8 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Nurture",
    desc: "Learn each plant's unique language — how it signals thirst, sunlight cravings, or the need for space. Respond with patience and consistency.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21V10M12 10L8 14M12 10L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 17C5 17 4 14 6 12C8 10 10 11 10 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M19 17C19 17 20 14 18 12C16 10 14 11 14 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Grow",
    desc: "Watch your garden and your knowledge flourish together. Every season teaches you something new — about plants, about soil, and about yourself as a gardener.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--green-highlight)" }}
            >
              Our Philosophy
            </span>
            <h2
              className="text-4xl font-medium mb-6 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
            >
              Every plant has a story worth telling
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
              Plantarium was born from a simple love of gardening and the desire to remember every
              season&apos;s journey — the first shoots of spring, the long summer harvests, the quiet
              beauty of a garden resting in winter.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink-soft)" }}>
              We built a tool that helps gardeners of all levels document their growing story with
              beauty and ease. Whether you tend a window ledge of herbs or a sprawling kitchen garden,
              your plants deserve to be remembered.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Mindful growing", "Seasonal rhythms", "Community wisdom", "Plant heritage"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "var(--green-surface)",
                    color: "var(--green-ink)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {philosophyCards.map((card) => (
              <div
                key={card.title}
                className="flex gap-5 p-6 rounded-2xl"
                style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--green-surface)", color: "var(--green-ink)" }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-medium mb-1.5"
                    style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {card.desc}
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
