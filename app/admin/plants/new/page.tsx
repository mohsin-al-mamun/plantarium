import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"

async function createPlant(formData: FormData) {
  "use server"
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const category = formData.get("category") as "Flowers" | "Fruits" | "Vegetables"
  const status = (formData.get("status") as "Seedling" | "Growing" | "Thriving" | "Dormant") || "Thriving"
  const meta = (formData.get("meta") as string) || null
  const description = (formData.get("description") as string) || null
  const img = (formData.get("img") as string) || null

  await prisma.plant.create({ data: { name, slug, category, status, meta, description, img } })
  redirect("/admin/plants")
}

export default function NewPlantPage() {
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/plants" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Plants
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Add plant
        </h1>
      </div>

      <form action={createPlant} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Name *" name="name" required placeholder="e.g. Tomato" />
        <Field label="Slug *" name="slug" required placeholder="e.g. tomato" hint="URL-safe, lowercase, no spaces" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" required style={inputStyle}>
              <option value="">Select…</option>
              <option value="Flowers">Flowers</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" style={inputStyle} defaultValue="Thriving">
              <option value="Seedling">🌱 Seedling</option>
              <option value="Growing">🌿 Growing</option>
              <option value="Thriving">✨ Thriving</option>
              <option value="Dormant">💤 Dormant</option>
            </select>
          </div>
        </div>

        <Field label="Meta" name="meta" placeholder="e.g. Solanum lycopersicum" hint="Latin name or short descriptor" />
        <Field label="Description" name="description" placeholder="A brief description of this plant…" multiline />
        <ImageUploadField label="Image" name="img" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer",
          }}>
            Create plant
          </button>
          <Link href="/admin/plants" style={{
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
