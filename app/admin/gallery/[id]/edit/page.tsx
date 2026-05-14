import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import { deleteStorageFile } from "@/lib/supabase"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import SaveButton from "@/app/admin/components/SaveButton"
import SavedBanner from "@/app/admin/components/SavedBanner"

export default async function EditGardenPhotoPage({
  params, searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id } = await params
  const { saved } = await searchParams
  const photo = await prisma.gardenPhoto.findUnique({ where: { id: Number(id) } })
  if (!photo) notFound()

  async function updatePhoto(formData: FormData) {
    "use server"
    const url = formData.get("url") as string
    const caption = (formData.get("caption") as string) || null
    const takenAt = new Date(formData.get("takenAt") as string)
    const rawPos = (formData.get("position") as string).trim()
    const position = rawPos !== "" ? Number(rawPos) : photo!.position

    if (photo!.url && photo!.url !== url) await deleteStorageFile(photo!.url)
    await prisma.gardenPhoto.update({ where: { id: Number(id) }, data: { url, caption, takenAt, position } })
    redirect(`/admin/gallery/${id}/edit?saved=1`)
  }

  async function deletePhoto() {
    "use server"
    await prisma.gardenPhoto.delete({ where: { id: Number(id) } })
    await deleteStorageFile(photo!.url)
    redirect("/admin/gallery")
  }

  const takenAtValue = photo.takenAt.toISOString().split("T")[0]

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/gallery" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Gallery
        </Link>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px", color: "var(--green-ink)", margin: "12px 0 0" }}>
          Edit photo
        </h1>
      </div>

      {saved && <SavedBanner message="Photo saved" />}

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginBottom: "10px" }}>
        Photo details
      </div>
      <form action={updatePhoto} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <ImageUploadField label="Photo *" name="url" required defaultValue={photo.url} />
        <Field label="Caption" name="caption" defaultValue={photo.caption ?? ""} placeholder="A short note about this moment…" />
        <Field label="Date taken *" name="takenAt" type="date" required defaultValue={takenAtValue} />
        <Field label="Position" name="position" defaultValue={String(photo.position)} hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton />
          <Link href="/admin/gallery" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      <div style={{
        marginTop: "24px", padding: "24px 28px",
        background: "var(--card)", border: "1px solid #fde8e8",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Danger zone</div>
        <DeleteConfirmButton
          action={deletePhoto}
          label="Delete photo"
          title="Delete photo"
          message="Permanently deletes this photo from storage."
        />
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

function Field({ label, name, required, defaultValue, placeholder, hint, type = "text" }: {
  label: string; name: string; required?: boolean
  defaultValue?: string; placeholder?: string; hint?: string; type?: string
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
