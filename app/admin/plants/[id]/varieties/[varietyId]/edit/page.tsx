import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import { deleteStorageFile, deleteStorageFiles } from "@/lib/supabase"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import SaveButton from "@/app/admin/components/SaveButton"
import SavedBanner from "@/app/admin/components/SavedBanner"
import AddPhotoForm from "@/app/admin/components/AddPhotoForm"
import PhotoPickerField from "@/app/admin/components/PhotoPickerField"

export default async function EditVarietyPage({
  params, searchParams,
}: {
  params: Promise<{ id: string; varietyId: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id, varietyId } = await params
  const { saved } = await searchParams
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
    const rawPos = (formData.get("position") as string).trim()
    const position = rawPos !== "" ? Number(rawPos) : variety!.position
    const bloomingNow = formData.get("bloomingNow") === "on"
    const bloomingPhoto = (formData.get("bloomingPhoto") as string) || null

    if (variety!.photo && variety!.photo !== photo) await deleteStorageFile(variety!.photo)
    await prisma.variety.update({
      where: { id: Number(varietyId) },
      data: { name, photo, trait, season, note, position, bloomingNow, bloomingPhoto },
    })
    redirect(`/admin/plants/${id}/varieties/${varietyId}/edit?saved=variety`)
  }

  async function addPhoto(_prev: { ok: boolean } | null, formData: FormData) {
    "use server"
    const url = formData.get("url") as string
    const position = variety!.photos.length
    await prisma.varietyPhoto.create({
      data: { varietyId: Number(varietyId), url, position },
    })
    return { ok: true }
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

      {saved === "variety" && <SavedBanner message="Variety details saved" />}

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginBottom: "10px" }}>
        Variety details
      </div>
      <form action={updateVariety} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Name *" name="name" required defaultValue={variety.name} />
        <ImageUploadField label="Cover photo" name="photo" required defaultValue={variety.photo} />
        <Field label="Trait" name="trait" defaultValue={variety.trait ?? ""} placeholder="e.g. Sweet, Crisp" />
        <Field label="Season" name="season" defaultValue={variety.season ?? ""} placeholder="e.g. Spring–Summer" />
        <CheckboxField label="Currently blooming" name="bloomingNow" defaultChecked={variety.bloomingNow} hint="Toggle when this variety is actively blooming right now" />
        <PhotoPickerField
          label="Blooming section photo"
          name="bloomingPhoto"
          current={variety.bloomingPhoto}
          cover={variety.photo}
          gallery={variety.photos.map(p => p.url)}
          hint="Which photo shows in the Currently Blooming section. Defaults to cover."
        />
        <Field label="Note" name="note" defaultValue={variety.note ?? ""} multiline />
        <Field label="Position" name="position" defaultValue={String(variety.position)} hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton />
          <Link href={`/admin/plants/${id}/edit`} style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginTop: "32px", marginBottom: "10px" }}>
        Gallery photos — added independently
      </div>
      {/* Gallery photos */}
      <div style={{
        padding: "24px 28px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
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
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{
                      fontSize: "12px", color: "var(--ink-mute)", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textDecoration: "none",
                    }}>
                      {p.url}
                    </a>
                  </div>
                  <DeleteConfirmButton
                    action={deletePhoto}
                    title="Remove photo"
                    message="This photo will be permanently deleted from storage."
                    icon
                  />
                </div>
              )
            })}
          </div>
        )}

        <AddPhotoForm action={addPhoto} />
      </div>

      {/* Danger zone */}
      <div style={{
        marginTop: "24px", padding: "24px 28px",
        background: "var(--card)", border: "1px solid #fde8e8",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Danger zone</div>
        <DeleteConfirmButton
          action={deleteVariety}
          label="Delete variety"
          title="Delete variety"
          name={variety.name}
          message={`Permanently deletes this variety and its ${variety.photos.length} gallery photo${variety.photos.length === 1 ? "" : "s"}.`}
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

function CheckboxField({ label, name, defaultChecked, hint }: {
  label: string; name: string; defaultChecked?: boolean; hint?: string
}) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <input type="checkbox" name={name} defaultChecked={defaultChecked} style={{ width: "16px", height: "16px", accentColor: "var(--green-ink)", cursor: "pointer" }} />
        <span style={{ fontSize: "14px", color: "var(--green-ink)" }}>{label}</span>
      </label>
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px", marginLeft: "26px" }}>{hint}</div>}
    </div>
  )
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
