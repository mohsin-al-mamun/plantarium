const items = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4C16 4 8 10 7 17C6 24 10 28 16 28C22 28 26 24 25 17C24 10 16 4 16 4Z"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <path
          d="M16 28V17M16 17C13 14 10 11 9 8"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    value: "2,400+",
    label: "Plants Documented",
    desc: "Species from every corner of the globe",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <path d="M16 4V7M16 25V28M4 16H7M25 16H28" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 7.5L9.6 9.6M22.4 22.4L24.5 24.5M7.5 24.5L9.6 22.4M22.4 9.6L24.5 7.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: "180+",
    label: "Species Tracked",
    desc: "Botanical varieties in our library",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="7" width="22" height="18" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <path d="M5 12H27" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <path d="M11 5V9M21 5V9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 18H22M10 22H17" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: "5,000+",
    label: "Active Journals",
    desc: "Growing stories shared daily",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 5L19.1 11.4L26.2 12.4L21.1 17.3L22.3 24.4L16 21.1L9.7 24.4L10.9 17.3L5.8 12.4L12.9 11.4L16 5Z"
          fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    value: "98%",
    label: "Gardener Satisfaction",
    desc: "Loved by our growing community",
  },
]

export default function StatsStrip() {
  return (
    <section style={{ background: "var(--green-ink)" }} className="py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center px-8 py-4"
              style={{
                borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined,
              }}
            >
              <div className="mb-4">{item.icon}</div>
              <div
                className="text-3xl font-medium text-white mb-1"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {item.value}
              </div>
              <div className="text-sm font-medium text-white/80 mb-1.5">{item.label}</div>
              <div className="text-xs text-white/45 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
