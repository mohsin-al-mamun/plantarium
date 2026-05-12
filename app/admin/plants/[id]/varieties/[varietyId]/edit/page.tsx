import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import { deleteStorageFile, deleteStorageFiles } from "@/lib/supabase"

export default async function EditVarietyPage({
  params,
}: {
  params: Promise<{ id: string; varietyId: string }>
}) {
  const { id, varietyId } = await params
  const variety = await prisma.variety.findUnique({
    where: { id: Number(varietyId) },
    include: { photos: { orderBy: { position: "asc" } } },
  })
  if (!variety || variety.plantId !== Number(id)) notFound()

  async function updateVariety(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const photo = formData.get("photo") as string
    const trait = (formData.get("trait") as string) || null
    const season = (formData.get("season") as string) || null
    const note = (formData.get("note") as string) || null
    const position = Number(formData.get("position") ?? variety!.position)

    if (variety!.photo && variety!.photo !== photo) await deleteStorageFile(variety!.photo)
    await prisma.variety.update({
      where: { id: Number(varietyId) },
      data: { name, photo, trait, season, note, position },
    })
    redirect(`/admin/plants/${id}/varieties/${varietyId}/edit`)
  }

  async function addPhoto(formData: FormData) {
    "use server"
    const url = formData.get("url") as string
    const position = variety!.photos.length
    await prisma.varietyPhoto.create({
      data: { varietyId: Number(varietyId), url, position },
    })
    redirect(`/admin/plants/${id}/varieties/${varietyId}/edit`)
  }

  async function deleteVariety() {
    "use server"
    const allUrls = [variety!.photo, ...variety!.photos.map(p => p.url)]
    await prisma.variety.delete({ where: { id: Number(varietyId) } })
    await deleteStorageFiles(allUrls)
    redirect(`/admin/plants/${id}/edit`)
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href={`/admin/plants/${id}/edit`} style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Back to plant
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Edit variety — {variety.name}
        </h1>
      </div>

      <form action={updateVariety} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Field label="Name *" name="name" required defaultValue={variety.name} />
        <ImageUploadField label="Cover photo" name="photo" required defaultValue={variety.photo} />
        <Field label="Trait" name="trait" defaultValue={variety.trait ?? ""} placeholder="e.g. Sweet, Crisp" />
        <Field label="Season" name="season" defaultValue={variety.season ?? ""} placeholder="e.g. Spring–Summer" />
        <Field label="Note" name="note" defaultValue={variety.note ?? ""} multiline />
        <Field label="Position" name="position" defaultValue={String(variety.position)} hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer",
          }}>
            Save changes
          </button>
          <Link href={`/admin/plants/${id}/edit`} style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      {/* Gallery photos */}
      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--line)" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
          Gallery photos · {variety.photos.length}
        </div>

        {variety.photos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {variety.photos.map((p) => {
              async function deletePhoto() {
                "use server"
                await prisma.varietyPhoto.delete({ where: { id: p.id } })
                await deleteStorageFile(p.url)
                redirect(`/admin/plants/${id}/varieties/${varietyId}/edit`)
              }
              return (
                <div key={p.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                  padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--line)", background: "var(--card)",
                }}>
                  <span style={{
                    fontSize: "12px", color: "var(--ink-mute)", overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
                  }}>
                    {p.url}
                  </span>
                  <form action={deletePhoto} style={{ flexShrink: 0 }}>
                    <button type="submit" style={{
                      fontSize: "12px", color: "#ef4444", background: "none",
                      border: "none", cursor: "pointer", padding: 0,
                    }}>
                      Remove
                    </button>
                  </form>
                </div>
              )
            })}
          </div>
        )}

        <form action={addPhoto} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <ImageUploadField label="Photo URL" name="url" required />
          <button type="submit" style={{
            padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "var(--green-ink)", color: "var(--paper)", border: "none", cursor: "pointer", alignSelf: "flex-start",
          }}>
            Add photo
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--line)" }}>
        <div style={{ fontSize: "12px", color: "var(--ink-mute)", marginBottom: "12px" }}>Danger zone</div>
        <form action={deleteVariety}>
          <button type="submit" style={{
            padding: "9px 18px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid #ef4444", color: "#ef4444", background: "none", cursor: "pointer",
          }}>
            Delete variety
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
  label, name, required, defaultValue, placeholder, hint, multiline,
}: {
  label: string; name: string; required?: boolean
  defaultValue?: string; placeholder?: string; hint?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
      }
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
