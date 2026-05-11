import Link from "next/link"

const navLinks = ["Journal", "Plants", "Garden", "About"]

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(244,239,227,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-3 items-center">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M13 3C13 3 6 8 5 14C4 20 8 23 13 23C18 23 22 20 21 14C20 8 13 3 13 3Z"
              fill="var(--green-ink)"
            />
            <path
              d="M13 23V13M13 13C11 11 8 9 7 7"
              stroke="var(--green-highlight)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="text-xl font-medium"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--green-ink)" }}
          >
            Plantarium
          </span>
        </Link>

        <nav className="flex items-center justify-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--ink-soft)" }}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <button
            className="px-5 py-2 text-sm rounded-full border transition-opacity hover:opacity-70"
            style={{ color: "var(--green-ink)", borderColor: "var(--green-ink)" }}
          >
            Sign In
          </button>
          <button
            className="px-5 py-2 text-sm rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--green-ink)" }}
          >
            Start Garden →
          </button>
        </div>
      </div>
    </header>
  )
}
