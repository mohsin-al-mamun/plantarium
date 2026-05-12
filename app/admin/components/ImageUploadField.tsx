"use client"

import { useState, useRef } from "react"
import Image from "next/image"

export default function ImageUploadField({
  name,
  label,
  required,
  defaultValue,
}: {
  name: string
  label: string
  required?: boolean
  defaultValue?: string
}) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) setUrl(data.url)
      else setError(data.error ?? "Upload failed")
    } catch {
      setError("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label style={labelStyle}>{label}{required ? " *" : ""}</label>

      {url && (
        <div style={{
          position: "relative", height: "160px", borderRadius: "8px",
          overflow: "hidden", marginBottom: "8px", background: "var(--green-surface)",
        }}>
          <Image src={url} alt="Preview" fill className="object-cover" sizes="640px" />
        </div>
      )}

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          name={name}
          required={required}
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://… or upload a file"
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            padding: "10px 14px", borderRadius: "8px", fontSize: "13px", flexShrink: 0,
            border: "1px solid var(--line)", background: "var(--card)",
            color: "var(--ink-soft)", cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      {error && <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{error}</div>}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "12px", fontWeight: 500,
  color: "var(--ink-soft)", marginBottom: "6px",
}

const inputStyle: React.CSSProperties = {
  flex: 1, padding: "10px 14px", borderRadius: "8px",
  border: "1px solid var(--line)", background: "var(--paper)",
  fontSize: "14px", color: "var(--green-ink)", outline: "none",
}
