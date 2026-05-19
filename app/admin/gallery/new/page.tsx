export const dynamic = "force-dynamic"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"

export default async function NewGardenPhotoPage() {
  async function createPhoto(formData: FormData) {
    "use server"
    const url = formData.get("url") as string
    const caption = (formData.get("caption") as string) || null
    const takenAt = new Date(formData.get("takenAt") as string)
    const rawPos = (formData.get("position") as string).trim()
    const count = await prisma.gardenPhoto.count()
    const position = rawPos !== "" ? Number(rawPos) : count

    await prisma.gardenPhoto.create({ data: { url, caption, takenAt, position } })
    redirect("/admin/gallery")
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/gallery" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Gallery
        </Link>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px", color: "var(--green-ink)", margin: "12px 0 0" }}>
          Add photo
        </h1>
      </div>

      <form action={createPhoto} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <ImageUploadField label="Photo *" name="url" required />
        <Field label="Caption" name="caption" placeholder="A short note about this moment…" />
        <Field label="Date taken *" name="takenAt" type="date" required />
        <Field label="Position" name="position" placeholder="0" hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer",
          }}>
            Add photo
          </button>
          <Link href="/admin/gallery" style={{
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

function Field({ label, name, required, placeholder, hint, type = "text" }: {
  label: string; name: string; required?: boolean
  placeholder?: string; hint?: string; type?: string
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} style={inputStyle} />
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
