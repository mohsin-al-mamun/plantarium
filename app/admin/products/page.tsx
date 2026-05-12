import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { plants: true } } },
  })

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: 0,
        }}>
          Products
        </h1>
        <Link href="/admin/products/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
        }}>
          + Add product
        </Link>
      </div>

      <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th>Name</Th>
              <Th>Kind</Th>
              <Th>Type</Th>
              <Th>Plants</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: i < products.length - 1 ? "1px solid var(--line)" : "none",
                  background: i % 2 === 0 ? "var(--paper)" : "var(--card)",
                }}
              >
                <Td><span style={{ fontWeight: 500, color: "var(--green-ink)" }}>{p.name}</span></Td>
                <Td>
                  <span style={{
                    fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500,
                    background: p.kind === "fertilizer" ? "var(--green-surface)" : "var(--clay-surface)",
                    color: p.kind === "fertilizer" ? "var(--green-ink)" : "var(--clay-deep)",
                  }}>
                    {p.kind}
                  </span>
                </Td>
                <Td>{p.type}</Td>
                <Td>{p._count.plants}</Td>
                <Td>
                  <Link href={`/admin/products/${p.id}/edit`} style={{ color: "var(--green-ink)", textDecoration: "none", fontSize: "12px" }}>
                    Edit
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "12px 16px", color: "var(--ink-soft)" }}>{children}</td>
}
