"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/admin/plants", label: "Plants" },
  { href: "/admin/varieties", label: "Varieties" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/optimize", label: "Optimize" },
]

export default function AdminNav() {
  const path = usePathname()

  return (
    <div style={{ display: "flex", gap: "4px" }}>
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
  )
}
