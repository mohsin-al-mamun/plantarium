"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useFormStatus } from "react-dom"

function LogoutBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%", textAlign: "left", fontSize: "13px", color: "var(--ink-mute)",
        background: "none", border: "none", cursor: pending ? "not-allowed" : "pointer",
        padding: "10px 12px", borderRadius: "8px",
        opacity: pending ? 0.6 : 1, transition: "opacity 0.15s",
      }}
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  )
}

const links = [
  { href: "/admin/plants", label: "Plants" },
  { href: "/admin/varieties", label: "Varieties" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/optimize", label: "Optimize" },
]

export default function AdminNav({ logoutAction }: { logoutAction: () => Promise<void> }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="admin-nav-links">
        {links.map(({ href, label }) => {
          const active = path.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              fontSize: "13px", textDecoration: "none",
              padding: "6px 14px", borderRadius: "6px", fontWeight: active ? 500 : 400,
              background: active ? "var(--green-surface)" : "transparent",
              color: active ? "var(--green-ink)" : "var(--ink-soft)",
            }}>
              {label}
            </Link>
          )
        })}
      </div>

      <button
        className="admin-nav-hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div className={`admin-mobile-menu${open ? " open" : ""}`}>
        {links.map(({ href, label }) => {
          const active = path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: "15px", textDecoration: "none", display: "block",
                padding: "10px 12px", borderRadius: "8px",
                fontWeight: active ? 500 : 400,
                background: active ? "var(--green-surface)" : "transparent",
                color: active ? "var(--green-ink)" : "var(--ink-soft)",
              }}
            >
              {label}
            </Link>
          )
        })}
        <div style={{
          borderTop: "1px solid var(--line-soft)",
          marginTop: "8px", paddingTop: "8px",
          display: "flex", flexDirection: "column", gap: "2px",
        }}>
          <Link href="/" style={{
            fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none",
            padding: "10px 12px", borderRadius: "8px", display: "block",
          }}>
            ← View site
          </Link>
          <form action={logoutAction}>
            <LogoutBtn />
          </form>
        </div>
      </div>
    </>
  )
}
