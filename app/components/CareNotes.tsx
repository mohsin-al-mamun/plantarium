"use client"

import { useState } from "react"
import type { Care } from "@/app/data/plants"

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 0.25s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export default function CareNotes({ care }: { care: Care }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "48px",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between transition-colors hover:bg-[var(--green-surface)]"
        style={{
          padding: "16px 20px",
          background: open ? "var(--green-surface)" : "var(--card)",
          cursor: "pointer",
          border: "none",
          textAlign: "left",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--green-ink)",
              fontWeight: 600,
            }}
          >
            Care notes
          </span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "999px",
              background: "var(--green-surface)",
              color: "var(--green-ink)",
              fontWeight: 500,
            }}
          >
            {care.fertilizers.length + care.insecticides.length} items
          </span>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          style={{
            padding: "20px",
            borderTop: "1px solid var(--line)",
            background: "var(--card)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--clay)",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Fertilizers
            </div>
            <div className="flex flex-col gap-2">
              {care.fertilizers.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "13px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "var(--green-surface)",
                    color: "var(--green-ink)",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--clay)",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              Pest control
            </div>
            <div className="flex flex-col gap-2">
              {care.insecticides.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "13px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "var(--clay-surface)",
                    color: "var(--clay-deep)",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
