"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({ label = "Save changes" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
        background: "var(--green-ink)", color: "var(--paper)", border: "none",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.7 : 1,
        transition: "opacity 0.15s",
        display: "inline-flex", alignItems: "center", gap: "8px",
      }}
    >
      {pending && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {pending ? "Saving…" : label}
    </button>
  );
}
