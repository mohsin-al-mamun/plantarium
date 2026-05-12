import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function EditPlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = await prisma.plant.findUnique({ where: { id: Number(id) } })
  if (!plant) notFound()

  async function updatePlant(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const category = formData.get("category") as "Flowers" | "Fruits" | "Vegetables"
    const meta = (formData.get("meta") as string) || null
    const description = (formData.get("description") as string) || null
    const img = (formData.get("img") as string) || null

    await prisma.plant.update({ where: { id: Number(id) }, data: { name, slug, category, meta, description, img } })
    redirect("/admin/plants")
  }

  async function deletePlant() {
    "use server"
    await prisma.plant.delete({ where: { id: Number(id) } })
    redirect("/admin/plants")
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/plants" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Plants
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Edit — {plant.name}
        </h1>
      </div>

      <form action={updatePlant} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Field label="Name *" name="name" required defaultValue={plant.name} />
        <Field label="Slug *" name="slug" required defaultValue={plant.slug} hint="Changing this breaks existing URLs" />

        <div>
          <label style={labelStyle}>Category *</label>
          <select name="category" required defaultValue={plant.category} style={inputStyle}>
            <option value="Flowers">Flowers</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>

        <Field label="Meta" name="meta" defaultValue={plant.meta ?? ""} />
        <Field label="Description" name="description" defaultValue={plant.description ?? ""} multiline />
        <Field label="Image URL" name="img" defaultValue={plant.img ?? ""} />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer",
          }}>
            Save changes
          </button>
          <Link href="/admin/plants" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--line)" }}>
        <div style={{ fontSize: "12px", color: "var(--ink-mute)", marginBottom: "12px" }}>Danger zone</div>
        <form action={deletePlant}>
          <button type="submit" style={{
            padding: "9px 18px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid #ef4444", color: "#ef4444", background: "none", cursor: "pointer",
          }}>
            Delete plant
          </button>
        </form>
      </div>
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
  label, name, required, defaultValue, hint, multiline,
}: {
  label: string; name: string; required?: boolean
  defaultValue?: string; hint?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} defaultValue={defaultValue} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" name={name} required={required} defaultValue={defaultValue} style={inputStyle} />
      }
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
