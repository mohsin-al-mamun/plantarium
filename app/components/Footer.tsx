import Link from "next/link"

const exploreLinks = [
  { label: "Plant collection", href: "#plants" },
  { label: "Photo gallery", href: "#gallery" },
  { label: "Growth journal", href: "#journal" },
  { label: "Care philosophy", href: "#about" },
]

const moreLinks = [
  { label: "Seasonal calendar", href: "#" },
  { label: "Seed swap list", href: "#" },
  { label: "Newsletter", href: "#" },
  { label: "Get in touch", href: "#" },
]

const LeafIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c0-7 5-12 9-12-1 7-5 12-9 12Z" />
    <path d="M12 21c-4 0-8-3-9-9 6 0 9 4 9 9Z" />
    <path d="M12 21V11" />
  </svg>
)

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohsinalmamun/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/mohsin-al-mamun",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/oxg.mamun",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4h-2a3 3 0 0 0-3 3v3H7v3h2v8h3v-8h2.5l.5-3H12V7a1 1 0 0 1 1-1h1Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:oxgmohsin@gmail.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: "var(--green-ink-2, #062618)", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "40px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Top */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "40px 60px",
            padding: "48px 0 40px",
          }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5" style={{ marginBottom: "16px" }}>
              <div
                className="grid place-items-center shrink-0"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <LeafIcon />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "20px",
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
              >
                Plant
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
                  arium
                </em>
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.65, maxWidth: "320px", margin: 0 }}>
              A personal garden journal from Khulna, Bangladesh. Gardening is my way of staying close to nature — one plant at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h5
              style={{
                margin: "0 0 18px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              Explore
            </h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h5
              style={{
                margin: "0 0 18px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              More
            </h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            padding: "22px 0 28px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <div>© 2024 Plantarium · Khulna, Bangladesh · Tended by Mohsin</div>
          <div className="flex items-center" style={{ gap: "10px" }}>
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center transition-opacity hover:opacity-80"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
