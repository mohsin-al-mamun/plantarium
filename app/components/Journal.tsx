import Image from "next/image"

type JournalEntry = {
  date: string
  month: string
  year: string
  img: string
  title: string
  excerpt: string
  tags: string[]
}

const entries: JournalEntry[] = [
  {
    date: "15",
    month: "Mar",
    year: "2024",
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=300&q=80",
    title: "First Blooms of Spring",
    excerpt:
      "After a long dormant winter, my heritage roses finally broke through with the most gorgeous deep-pink buds. The warm afternoon light caught them perfectly just after the morning frost melted away.",
    tags: ["Roses", "Spring", "Blooms"],
  },
  {
    date: "28",
    month: "Feb",
    year: "2024",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=300&q=80",
    title: "Raised Bed Assembly Day",
    excerpt:
      "Finally assembled the new cedar raised beds I'd been planning since autumn. Filled them with a mix of compost, topsoil and perlite. The tomatoes and peppers will love this come summer.",
    tags: ["Raised Beds", "Soil", "Planning"],
  },
  {
    date: "10",
    month: "Jan",
    year: "2024",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=300&q=80",
    title: "Winter Herb Window Garden",
    excerpt:
      "Moved all my tender herbs indoors before the hard frost. Set up a south-facing shelf with grow lights. Basil, mint, and chives are thriving already — fresh herbs all winter long.",
    tags: ["Herbs", "Winter", "Indoors"],
  },
]

export default function Journal() {
  return (
    <section id="journal" className="py-24" style={{ background: "var(--paper)" }}>
      <div className="max-w-5xl mx-auto px-8">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--green-highlight)" }}
            >
              Garden Journal
            </span>
            <h2
              className="text-4xl font-medium"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
            >
              Recent Entries
            </h2>
          </div>
          <button
            className="px-5 py-2.5 text-sm font-medium rounded-full border transition-opacity hover:opacity-70 hidden md:block"
            style={{ color: "var(--green-ink)", borderColor: "var(--green-ink)" }}
          >
            + New Entry
          </button>
        </div>

        <div className="relative">
          <div
            className="absolute left-[52px] top-6 bottom-6"
            style={{ width: "1px", background: "var(--line)" }}
          />

          <div className="flex flex-col gap-10">
            {entries.map((entry, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 flex flex-col items-center w-[52px] pt-1">
                  <div
                    className="text-2xl font-medium leading-none"
                    style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
                  >
                    {entry.date}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "var(--ink-mute)" }}>
                    {entry.month}
                  </div>
                  <div className="text-xs" style={{ color: "var(--ink-mute)" }}>
                    {entry.year}
                  </div>
                </div>

                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-2 relative z-10"
                  style={{ background: "var(--green-highlight)", border: "2px solid var(--paper)" }}
                />

                <div
                  className="flex-1 rounded-2xl overflow-hidden flex"
                  style={{ border: "1px solid var(--line)", background: "var(--paper-warm)" }}
                >
                  <div className="relative w-36 flex-shrink-0">
                    <Image
                      src={entry.img}
                      alt={entry.title}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3
                      className="text-xl font-medium mb-2"
                      style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
                    >
                      {entry.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                      {entry.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full"
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--green-ink)" }}
          >
            View all journal entries →
          </button>
        </div>
      </div>
    </section>
  )
}
