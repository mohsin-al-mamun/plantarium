import Link from "next/link"

const exploreLinks = ["Journal", "Plant Library", "Garden Planner", "Seasonal Guide", "Community"]
const moreLinks = ["Help Centre", "Privacy Policy", "Terms of Service", "Contact Us"]

export default function Footer() {
  return (
    <footer style={{ background: "var(--green-ink-2, #062618)" }}>
      <div
        className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 6 7 5 13C4 19 8 22 12 22C16 22 20 19 19 13C18 7 12 2 12 2Z"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.3"
              />
              <path
                d="M12 22V13M12 13C10 11 8 9 7 7"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="text-lg font-medium text-white"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Plantarium
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            A living journal for curious gardeners. Document every bloom, track every season, grow
            every day.
          </p>

          <div className="flex gap-3">
            {[
              {
                label: "Instagram",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: "Twitter",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 4s-3 1-4.5 1.5L4 20M4 4l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: "Pinterest",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.5 2 2 6.5 2 12C2 16.2 4.5 19.8 8 21.5C8 20.5 8 19.2 8.3 18L9.8 12C9.4 11.2 9.2 10.3 9.2 9.4C9.2 7.7 10.1 6.4 11.3 6.4C12.3 6.4 12.8 7.1 12.8 8C12.8 9.1 12.1 10.7 11.8 12.2C11.5 13.5 12.4 14.5 13.7 14.5C16 14.5 17.6 12 17.6 9C17.6 6 15.5 4 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4
            className="text-sm font-medium text-white mb-5 tracking-wide"
          >
            Explore
          </h4>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More */}
        <div>
          <h4
            className="text-sm font-medium text-white mb-5 tracking-wide"
          >
            More
          </h4>
          <ul className="flex flex-col gap-3">
            {moreLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 Plantarium. Made with care for gardeners everywhere.
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Designed to help you grow
        </p>
      </div>
    </footer>
  )
}
