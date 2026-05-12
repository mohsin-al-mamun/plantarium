const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-20 grid place-items-center transition-opacity hover:opacity-70"
      style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(10,30,16,0.6)", color: "#fff", border: "none", cursor: "pointer" }}
      aria-label="Close"
    >
      <XIcon />
    </button>
  )
}

export function Overlay({ onClose, children, maxWidth = "960px" }: {
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(10,30,16,0.82)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ maxWidth, maxHeight: "88vh", background: "var(--card)", borderRadius: "24px", boxShadow: "0 48px 120px rgba(10,30,16,0.55)" }}
        onClick={e => e.stopPropagation()}
      >
        <CloseBtn onClose={onClose} />
        {children}
      </div>
    </div>
  )
}
