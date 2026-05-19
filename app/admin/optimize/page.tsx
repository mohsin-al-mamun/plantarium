"use client"

import { useRef, useState } from "react"

type ImageEntry = {
  id: string
  file: File
  previewUrl: string
  originalSize: number
  status: "idle" | "processing" | "done" | "error"
  optimizedSize?: number
  downloadUrl?: string
  downloadName?: string
  errorMsg?: string
}

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function pct(original: number, optimized: number) {
  return Math.round((1 - optimized / original) * 100)
}

export default function OptimizePage() {
  const [entries, setEntries] = useState<ImageEntry[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(files: FileList | null) {
    if (!files) return
    const newEntries: ImageEntry[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        previewUrl: URL.createObjectURL(f),
        originalSize: f.size,
        status: "idle",
      }))
    setEntries((prev) => [...prev, ...newEntries])
  }

  async function optimizeOne(id: string) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, status: "processing" } : e))
    const entry = entries.find((e) => e.id === id)!

    const form = new FormData()
    form.append("image", entry.file)

    try {
      const res = await fetch("/api/optimize", { method: "POST", body: form })
      if (!res.ok) throw new Error(await res.text())

      const blob = await res.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const optimizedSize = Number(res.headers.get("X-Optimized-Size"))
      const disposition = res.headers.get("Content-Disposition") ?? ""
      const match = disposition.match(/filename="([^"]+)"/)
      const downloadName = match ? match[1] : entry.file.name

      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status: "done", optimizedSize, downloadUrl, downloadName } : e
        )
      )
    } catch (err) {
      setEntries((prev) =>
        prev.map((e) => e.id === id ? { ...e, status: "error", errorMsg: String(err) } : e)
      )
    }
  }

  async function optimizeAll() {
    for (const e of entries.filter((e) => e.status === "idle")) {
      await optimizeOne(e.id)
    }
  }

  function remove(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const hasIdle = entries.some((e) => e.status === "idle")

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "28px", fontWeight: 400, color: "var(--green-ink)", marginBottom: "6px" }}>
        Image Optimizer
      </h1>
      <p style={{ fontSize: "14px", color: "var(--ink-mute)", marginBottom: "32px" }}>
        Target: under 500 KB · Converts to WebP
      </p>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        style={{
          border: `2px dashed ${dragging ? "var(--green-ink)" : "var(--line)"}`,
          borderRadius: "12px",
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "var(--green-surface)" : "var(--paper)",
          transition: "all 0.2s",
          marginBottom: "24px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p style={{ fontSize: "15px", color: "var(--ink-soft)", margin: "0 0 4px" }}>
          Drop images here or click to browse
        </p>
        <p style={{ fontSize: "12px", color: "var(--ink-mute)", margin: 0 }}>JPG, PNG, WebP, HEIC</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {entries.length > 0 && (
        <>
          {hasIdle && (
            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={optimizeAll}
                style={{
                  padding: "10px 24px", borderRadius: "999px", border: "none",
                  background: "var(--green-ink)", color: "#fff", fontSize: "14px",
                  fontWeight: 500, cursor: "pointer",
                }}
              >
                Optimize all
              </button>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {entries.map((e) => (
              <div
                key={e.id}
                style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  background: "#fff", borderRadius: "10px", padding: "14px 16px",
                  border: "1px solid var(--line)",
                }}
              >
                <img src={e.previewUrl} alt="" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--green-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {e.file.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--ink-mute)", marginTop: "3px" }}>
                    {fmt(e.originalSize)}
                    {e.status === "done" && e.optimizedSize != null && (
                      <>
                        {" → "}
                        <span style={{ color: e.optimizedSize < 500 * 1024 ? "#2d7a4f" : "#b45309", fontWeight: 600 }}>
                          {fmt(e.optimizedSize)}
                        </span>
                        {" "}
                        <span style={{ color: "var(--ink-mute)" }}>
                          ({pct(e.originalSize, e.optimizedSize)}% smaller)
                        </span>
                      </>
                    )}
                    {e.status === "error" && (
                      <span style={{ color: "#dc2626" }}> — {e.errorMsg}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {e.status === "idle" && (
                    <button
                      onClick={() => optimizeOne(e.id)}
                      style={{ padding: "7px 16px", borderRadius: "999px", border: "1px solid var(--line)", background: "#fff", fontSize: "13px", cursor: "pointer", color: "var(--green-ink)", fontWeight: 500 }}
                    >
                      Optimize
                    </button>
                  )}
                  {e.status === "processing" && (
                    <span style={{ fontSize: "13px", color: "var(--ink-mute)" }}>Processing…</span>
                  )}
                  {e.status === "done" && e.downloadUrl && (
                    <a
                      href={e.downloadUrl}
                      download={e.downloadName}
                      style={{ padding: "7px 16px", borderRadius: "999px", border: "none", background: "var(--green-ink)", color: "#fff", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}
                    >
                      Download
                    </a>
                  )}
                  <button
                    onClick={() => remove(e.id)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid var(--line)", background: "#fff", cursor: "pointer", color: "var(--ink-mute)", fontSize: "16px", display: "grid", placeItems: "center" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
