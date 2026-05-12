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
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(10,30,16,0.4)", backdropFilter: "blur(2px)",
        }}>
          <div style={{
            background: "var(--card)", border: "1px solid var(--line)",
            borderRadius: "16px", padding: "32px", maxWidth: "400px", width: "90%",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}>
            <div style={{
              fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#ef4444", fontWeight: 600, marginBottom: "12px",
            }}>
              Confirm deletion
            </div>
            <h2 style={{
              fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "22px",
              color: "var(--green-ink)", margin: "0 0 12px",
            }}>
              {title}
            </h2>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 8px" }}>
              {message}
            </p>
            <p style={{
              fontSize: "12px", color: "var(--ink-mute)", lineHeight: 1.6,
              margin: "0 0 28px", padding: "10px 12px",
              background: "var(--clay-surface)", borderRadius: "8px",
              borderLeft: "3px solid var(--clay-deep)",
            }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <form action={action} style={{ flex: 1 }}>
                <button type="submit" style={{
                  width: "100%", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
                  background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
                }}>
                  Yes, delete
                </button>
              </form>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
