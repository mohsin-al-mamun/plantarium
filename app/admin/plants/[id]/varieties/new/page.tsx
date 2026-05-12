import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"

export default async function NewVarietyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = await prisma.plant.findUnique({
    where: { id: Number(id) },
    include: { _count: { select: { varieties: true } } },
  })
  if (!plant) notFound()

  async function createVariety(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const photo = formData.get("photo") as string
    const trait = (formData.get("trait") as string) || null
    const season = (formData.get("season") as string) || null
    const note = (formData.get("note") as string) || null
    const position = Number(formData.get("position") ?? plant!._count.varieties)

    await prisma.variety.create({
      data: { plantId: Number(id), name, photo, trait, season, note, position },
    })
    redirect(`/admin/plants/${id}/edit`)
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href={`/admin/plants/${id}/edit`} style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← {plant.name}
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Add variety
        </h1>
      </div>

      <form action={createVariety} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Field label="Name *" name="name" required placeholder="e.g. Cherry Belle" />
        <ImageUploadField label="Cover photo" name="photo" required />
        <Field label="Trait" name="trait" placeholder="e.g. Sweet, Crisp" />
        <Field label="Season" name="season" placeholder="e.g. Spring–Summer" />
        <Field label="Note" name="note" placeholder="Any notes about this variety…" multiline />
        <Field label="Position" name="position" placeholder={String(plant._count.varieties)} hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer",
          }}>
            Add variety
          </button>
          <Link href={`/admin/plants/${id}/edit`} style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "12px", fontWeight: 500,
  color: "var(--ink-soft)", marginBottom: "6px",
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: "8px",
  border: "1px solid var(--line)", background: "var(--paper)",
  fontSize: "14px", color: "var(--green-ink)", outline: "none",
  boxSizing: "border-box",
}

function Field({
  label, name, required, placeholder, hint, multiline,
}: {
  label: string; name: string; required?: boolean
  placeholder?: string; hint?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} placeholder={placeholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" name={name} required={required} placeholder={placeholder} style={inputStyle} />
      }
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
