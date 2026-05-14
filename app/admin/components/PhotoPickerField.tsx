"use client"

import { useState } from "react"

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "12px", fontWeight: 500,
  color: "var(--ink-soft)", marginBottom: "6px",
}

export default function PhotoPickerField({ label, name, current, cover, gallery, hint }: {
  label: string; name: string; current: string | null; cover: string; gallery: string[]; hint?: string
}) {
  const allPhotos = Array.from(new Set([cover, ...gallery]))
  const [selected, setSelected] = useState(current ?? cover)

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
        {allPhotos.map((url, i) => (
          <label key={i} style={{ cursor: "pointer", position: "relative" }} onClick={() => setSelected(url)}>
            <input
              type="radio"
              name={name}
              value={url}
              checked={selected === url}
              onChange={() => setSelected(url)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
            <div style={{
              width: "64px", height: "64px", borderRadius: "8px", overflow: "hidden",
              border: selected === url ? "2px solid var(--green-ink)" : "2px solid var(--line)",
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={i === 0 ? "Cover" : `Photo ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </label>
        ))}
      </div>
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "6px" }}>{hint}</div>}
    </div>
  )
}
