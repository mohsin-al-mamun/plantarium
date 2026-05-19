import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

function formatDate(date: Date) {
  const d = String(date.getUTCDate()).padStart(2, "0")
  const m = MONTHS[date.getUTCMonth()]
  const y = date.getUTCFullYear()
  return `${d} · ${m} · ${y}`
}

export default async function Journal() {
  const entries = await prisma.journalEntry.findMany({
    orderBy: [{ position: "asc" }, { date: "desc" }],
    take: 3,
  })

  return (
    <section id="journal" style={{ padding: "24px 0 96px", background: "var(--paper-warm)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10 mb-8 md:mb-11">
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
              Growth journal
            </div>
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontWeight: 300,
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: 0,
                color: "var(--green-ink)",
              }}
            >
              Notes from{" "}
              <em style={{ fontStyle: "italic", color: "var(--green-ink)", fontWeight: 400 }}>
                the watering can
              </em>
              .
            </h2>
          </div>
          <p
            className="hidden md:block"
            style={{
              fontSize: "15px",
              color: "var(--ink-soft)",
              maxWidth: "360px",
              flexShrink: 0,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Small updates, posted whenever something changes — a sprout, a setback, a first fruit.
          </p>
        </div>

        {entries.length === 0 ? (
          <p style={{ fontSize: "15px", color: "var(--ink-mute)", fontStyle: "italic", paddingLeft: "28px" }}>
            No journal entries yet.
          </p>
        ) : (
          <div className="relative" style={{ paddingLeft: "28px" }}>
            {/* Vertical line */}
            <div
              className="absolute"
              style={{
                left: "6px",
                top: "8px",
                bottom: "8px",
                width: "1px",
                background: "var(--line)",
              }}
            />

            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="relative"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "32px",
                  padding: "24px 0",
                  borderBottom: i < entries.length - 1 ? "1px solid var(--line-soft)" : "none",
                }}
              >
                {/* Dot */}
                <div
                  className="absolute"
                  style={{
                    left: "-28px",
                    top: "32px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    background: entry.accent === "amber" ? "var(--ochre)" : "var(--green-ink)",
                    boxShadow: entry.accent === "amber"
                      ? "0 0 0 4px var(--ochre-surface)"
                      : "0 0 0 4px var(--green-surface)",
                  }}
                />

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "var(--ink-mute)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {formatDate(entry.date)}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "22px",
                      letterSpacing: "-0.01em",
                      margin: "6px 0",
                      color: "var(--green-ink)",
                    }}
                  >
                    {entry.title}
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--ink-soft)",
                      maxWidth: "560px",
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    {entry.body}
                  </p>
                </div>

                {/* Thumb */}
                {entry.img && (
                  <div
                    className="relative shrink-0 hidden sm:block"
                    style={{
                      width: "140px",
                      height: "100px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      src={entry.img}
                      alt={entry.title}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10" style={{ paddingLeft: "28px" }}>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ textDecoration: "none" }}
          >
            <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
              View all notes
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--green-ink)" }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
