"use client"

import { useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type Plant = { id: number; name: string }

export default function VarietyFilterBar({
  plants,
  selectedPlantId,
  bloomingFilter,
}: {
  plants: Plant[]
  selectedPlantId?: number
  bloomingFilter?: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const selectStyle: React.CSSProperties = {
    fontSize: "13px", padding: "7px 12px", borderRadius: "8px",
    border: "1px solid var(--line)", background: "var(--card)",
    color: "var(--green-ink)", cursor: "pointer", outline: "none",
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "12px", color: "var(--ink-mute)", fontWeight: 500, whiteSpace: "nowrap",
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", opacity: isPending ? 0.6 : 1, transition: "opacity 0.15s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={labelStyle}>Plant</label>
        <select
          value={selectedPlantId ?? ""}
          onChange={e => update("plant", e.target.value)}
          disabled={isPending}
          style={{ ...selectStyle, minWidth: "160px" }}
        >
          <option value="">All plants</option>
          {plants.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={labelStyle}>Blooming</label>
        <select
          value={bloomingFilter ?? ""}
          onChange={e => update("blooming", e.target.value)}
          disabled={isPending}
          style={{ ...selectStyle, minWidth: "140px" }}
        >
          <option value="">All</option>
          <option value="yes">In bloom</option>
          <option value="no">Not blooming</option>
        </select>
      </div>
    </div>
  )
}
