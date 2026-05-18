type Props = { flowers: number; fruits: number; vegetables: number; varieties: number }

export default function StatsStrip({ flowers, fruits, vegetables, varieties }: Props) {
  const items = [
    {
      label: "Flowers",
      value: flowers,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 4a3 3 0 0 1 0 6M12 14a3 3 0 0 1 0 6M4 12a3 3 0 0 1 6 0M14 12a3 3 0 0 1 6 0"/>
        </svg>
      ),
    },
    {
      label: "Fruits",
      value: fruits,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 7c4 0 8 3 8 8 0 3-2 5-5 5h-6c-3 0-5-2-5-5 0-5 4-8 8-8Z"/>
          <path d="M12 7V4M10 4l2-2 2 2"/>
        </svg>
      ),
    },
    {
      label: "Vegetables",
      value: vegetables,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12c0-4 3-7 7-7s7 3 7 7-3 8-7 8-7-4-7-8Z"/>
          <path d="M12 5v15"/>
        </svg>
      ),
    },
    {
      label: "Varieties",
      value: varieties,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v4M6 7c0 0 2 2 6 2s6 2 6 2v4M6 7c0 0 2 2 6 2s6 2 6 2"/>
          <path d="M6 13v4M12 9v6"/>
          <circle cx="6" cy="3" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="6" cy="17" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="18" cy="13" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
  ]

  return (
    <section style={{ background: "var(--green-ink)" }}>
      <div className="max-w-7xl mx-auto px-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ padding: "44px 0" }}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-[18px]"
              style={{
                padding: "0 32px",
                borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
              }}
            >
              <div
                className="shrink-0 grid place-items-center"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.08)",
                  color: "var(--green-highlight)",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "32px",
                    color: "var(--paper)",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(244,239,227,0.7)",
                    marginTop: "4px",
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
