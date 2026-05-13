"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploadField from "./ImageUploadField"

type State = { ok: boolean } | null

export default function AddPhotoForm({
  action,
}: {
  action: (prev: State, formData: FormData) => Promise<State>
}) {
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const [imgKey, setImgKey] = useState(0)
  const [state, formAction, pending] = useActionState(action, null)

  useEffect(() => {
    if (state?.ok) {
      setAdded(true)
      setImgKey(k => k + 1)
      router.refresh()
    }
  }, [state, router])

  const isAdded = added && !pending
  const label = pending ? "Adding…" : isAdded ? "Photo added" : "Add photo"

  return (
    <form action={formAction} onChange={() => setAdded(false)} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <ImageUploadField key={imgKey} label="Photo URL" name="url" required />
      <div>
        <button
          type="submit"
          disabled={pending}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 14px", borderRadius: "8px",
            fontSize: "12px", fontWeight: 500,
            background: "var(--green-ink)",
            color: "#fff",
            border: "none",
            cursor: pending ? "not-allowed" : "pointer",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          {isAdded && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
          {label}
        </button>
      </div>
    </form>
  )
}
