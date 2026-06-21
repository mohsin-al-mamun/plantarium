"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"

function DeleteSubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
        background: "#ef4444", color: "#fff", border: "none",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.7 : 1, transition: "opacity 0.15s",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
      }}
    >
      {pending && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {pending ? "Deleting…" : "Delete"}
    </button>
  )
}

export default function DeleteConfirmButton({
  action,
  label = "Delete",
  title,
  name,
  message,
  compact,
  icon,
}: {
  action: () => Promise<void>
  label?: string
  title: string
  name?: string
  message: string
  compact?: boolean
  icon?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={icon ? title : undefined}
        style={icon ? {
          padding: "6px", background: "none", border: "none", cursor: "pointer",
          color: "#ef4444", display: "flex", alignItems: "center", flexShrink: 0, borderRadius: "6px",
        } : compact ? {
          padding: 0, background: "none", border: "none", cursor: "pointer",
          fontSize: "12px", color: "#ef4444", flexShrink: 0,
        } : {
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px",
          border: "1px solid #ef4444", color: "#ef4444", background: "none", cursor: "pointer",
        }}
      >
        {icon ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        ) : label}
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
            background: "rgba(10,30,16,0.82)", backdropFilter: "blur(10px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "var(--card)", borderRadius: "20px", padding: "36px",
              maxWidth: "380px", width: "100%",
              boxShadow: "0 48px 120px rgba(10,30,16,0.4)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ marginBottom: "12px" }}>
              <div style={{
                fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#ef4444", fontWeight: 600, marginBottom: "6px",
              }}>
                {title}
              </div>
              {name && (
                <div style={{
                  fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "26px",
                  color: "var(--green-ink)", letterSpacing: "-0.02em",
                  fontStyle: "italic",
                }}>
                  {name}
                </div>
              )}
            </div>

            <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.65, margin: "0 0 20px" }}>
              {message}
            </p>

            <p style={{ fontSize: "12px", color: "var(--ink-mute)", margin: "0 0 28px" }}>
              This cannot be undone.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  flex: 1, padding: "10px", borderRadius: "8px", fontSize: "13px",
                  border: "1px solid var(--line)", background: "var(--paper)",
                  color: "var(--ink-soft)", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <form action={action} style={{ flex: 1 }}>
                <DeleteSubmitBtn />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
