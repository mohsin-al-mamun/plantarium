"use client"

import { useState } from "react"

export default function DeleteConfirmButton({
  action,
  label = "Delete",
  title,
  message,
}: {
  action: () => Promise<void>
  label?: string
  title: string
  message: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px",
          border: "1px solid #ef4444", color: "#ef4444", background: "none", cursor: "pointer",
        }}
      >
        {label}
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
            <h2 style={{
              fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "24px",
              color: "var(--green-ink)", margin: "0 0 12px", letterSpacing: "-0.02em",
            }}>
              {title}
            </h2>

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
                <button type="submit" style={{
                  width: "100%", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
                  background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
                }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
