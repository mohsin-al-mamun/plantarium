"use client"

import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Plants", href: "#plants" },
  { label: "Gallery", href: "#gallery" },
  { label: "Journal", href: "#journal" },
  { label: "About", href: "#about" },
]

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

const LeafIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c0-7 5-12 9-12-1 7-5 12-9 12Z" />
    <path d="M12 21c-4 0-8-3-9-9 6 0 9 4 9 9Z" />
    <path d="M12 21V11" />
  </svg>
)

export default function Navbar() {
  const [active, setActive] = useState("Home")

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-16 grid items-center"
        style={{ gridTemplateColumns: "1fr auto 1fr", height: "72px" }}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="grid place-items-center flex-shrink-0"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "var(--green-surface)",
              color: "var(--green-ink)",
            }}
          >
            <LeafIcon />
          </div>
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            Plant
            <em style={{ fontStyle: "italic", color: "var(--green-ink)", fontWeight: 400 }}>
              arium
            </em>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center" style={{ gap: "36px" }}>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className="flex flex-col items-center text-sm transition-colors"
              style={{
                color: active === item.label ? "var(--green-ink)" : "var(--ink-soft)",
                padding: "6px 2px",
                textDecoration: "none",
              }}
            >
              {item.label}
              {active === item.label && (
                <span
                  className="block rounded-full mt-1"
                  style={{
                    height: "2px",
                    width: "14px",
                    background: "var(--green-ink)",
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center justify-end" style={{ gap: "14px" }}>
          <button
            aria-label="Search"
            className="grid place-items-center transition-opacity hover:opacity-70"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--paper)",
              color: "var(--ink-soft)",
            }}
          >
            <SearchIcon />
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "999px",
              padding: "10px 18px",
              border: "1px solid var(--green-ink)",
              color: "var(--green-ink)",
              textDecoration: "none",
            }}
          >
            Get in touch
            <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  )
}
