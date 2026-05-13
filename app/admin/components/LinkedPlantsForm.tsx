"use client"

import { useActionState, useEffect, useState } from "react"

type Plant = { id: number; name: string; category: string }
type State = { ok: boolean } | null

export default function LinkedPlantsForm({
  action,
  allPlants,
  initialLinkedIds,
  count,
}: {
  action: (prev: State, formData: FormData) => Promise<State>
  allPlants: Plant[]
  initialLinkedIds: number[]
  count: number
}) {
  const linkedSet = new Set(initialLinkedIds)
  const [saved, setSaved] = useState(false)
  const [state, formAction, pending] = useActionState(action, null)

  useEffect(() => {
    if (state?.ok) setSaved(true)
  }, [state])

  const isSaved = saved && !pending

  return (
    <form action={formAction} onChange={() => setSaved(false)} style={{
      padding: "24px 28px",
      background: "var(--card)", border: "1px solid var(--line)",
      borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
    }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
        Linked plants · {count}
      </div>

      {allPlants.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--ink-mute)", fontStyle: "italic" }}>No plants in database yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
          {allPlants.map(plant => (
            <label key={plant.id} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
              border: "1px solid var(--line-soft)", background: linkedSet.has(plant.id) ? "var(--green-surface)" : "var(--paper)",
            }}>
              <input
                type="checkbox"
                name="plantIds"
                value={plant.id}
                defaultChecked={linkedSet.has(plant.id)}
                style={{ accentColor: "var(--green-ink)", width: "15px", height: "15px", flexShrink: 0 }}
              />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--green-ink)", flex: 1 }}>{plant.name}</span>
              <span style={{
                fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "5px",
                background: plant.category === "Flowers" ? "#fde8ef" : plant.category === "Fruits" ? "#fef0e0" : "var(--green-surface)",
                color: plant.category === "Flowers" ? "#a83050" : plant.category === "Fruits" ? "#a85a0a" : "var(--green-ink)",
              }}>
                {plant.category}
              </span>
            </label>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "#fff", border: "none",
          cursor: pending ? "not-allowed" : "pointer",
          opacity: pending ? 0.7 : 1,
        }}
      >
        {pending && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        {isSaved && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
        {pending ? "Saving…" : isSaved ? "Linked plants saved" : "Save linked plants"}
      </button>
    </form>
  )
}
