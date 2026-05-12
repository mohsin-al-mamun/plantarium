import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AdminPlantsPage() {
  const plants = await prisma.plant.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { varieties: true } } },
  })

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: 0,
        }}>
          Plants
        </h1>
        <Link href="/admin/plants/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
        }}>
          + Add plant
        </Link>
      </div>

      <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
              <Th>Name</Th>
              <Th>Slug</Th>
              <Th>Category</Th>
              <Th>Varieties</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, i) => (
              <tr
                key={plant.id}
                style={{
                  borderBottom: i < plants.length - 1 ? "1px solid var(--line)" : "none",
                  background: i % 2 === 0 ? "var(--paper)" : "var(--card)",
                }}
              >
                <Td>
                  <span style={{ fontWeight: 500, color: "var(--green-ink)" }}>{plant.name}</span>
                </Td>
                <Td>
                  <code style={{ fontSize: "11px", color: "var(--ink-mute)" }}>{plant.slug}</code>
                </Td>
                <Td>{plant.category}</Td>
                <Td>{plant._count.varieties}</Td>
                <Td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link href={`/admin/plants/${plant.id}/edit`} style={{ color: "var(--green-ink)", textDecoration: "none", fontSize: "12px" }}>
                      Edit
                    </Link>
                    <Link href={`/admin/plants/${plant.id}/varieties/new`} style={{ color: "var(--ink-mute)", textDecoration: "none", fontSize: "12px" }}>
                      + Variety
                    </Link>
                  </div>
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
  return (
    <td style={{ padding: "12px 16px", color: "var(--ink-soft)" }}>
      {children}
    </td>
  )
}
