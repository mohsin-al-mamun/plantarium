"use client"

import { useFormStatus } from "react-dom"

function LogoutBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        fontSize: "12px", color: "var(--ink-mute)", background: "none",
        border: "none", cursor: pending ? "not-allowed" : "pointer", padding: 0,
        opacity: pending ? 0.6 : 1, transition: "opacity 0.15s",
      }}
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  )
}

export default function LogoutButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <LogoutBtn />
    </form>
  )
}
