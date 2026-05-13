import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import { deleteStorageFile, deleteStorageFiles } from "@/lib/supabase"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import SaveButton from "@/app/admin/components/SaveButton"

export default async function EditPlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = await prisma.plant.findUnique({
    where: { id: Number(id) },
    include: {
      varieties: {
        orderBy: { position: "asc" },
        include: { photos: true },
      },
    },
  })
  if (!plant) notFound()

  async function updatePlant(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const category = formData.get("category") as "Flowers" | "Fruits" | "Vegetables"
    const status = formData.get("status") as "Seedling" | "Growing" | "Thriving" | "Dormant"
    const meta = (formData.get("meta") as string) || null
    const description = (formData.get("description") as string) || null
    const img = (formData.get("img") as string) || null

    if (plant!.img && plant!.img !== img) await deleteStorageFile(plant!.img)
    await prisma.plant.update({ where: { id: Number(id) }, data: { name, slug, category, status, meta, description, img } })
    redirect("/admin/plants")
  }

  async function deletePlant() {
    "use server"
    const allUrls = [
      plant!.img,
      ...plant!.varieties.map(v => v.photo),
      ...plant!.varieties.flatMap(v => v.photos.map(p => p.url)),
    ]
    await prisma.plant.delete({ where: { id: Number(id) } })
    await deleteStorageFiles(allUrls)
    redirect("/admin/plants")
  }

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
          Edit — {plant.name}
        </h1>
      </div>

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginBottom: "10px" }}>
        Plant details
      </div>
      <form action={updatePlant} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Name *" name="name" required defaultValue={plant.name} />
        <Field label="Slug *" name="slug" required defaultValue={plant.slug} hint="Changing this breaks existing URLs" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" required defaultValue={plant.category} style={inputStyle}>
              <option value="Flowers">Flowers</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" defaultValue={plant.status} style={inputStyle}>
              <option value="Seedling">🌱 Seedling</option>
              <option value="Growing">🌿 Growing</option>
              <option value="Thriving">✨ Thriving</option>
              <option value="Dormant">💤 Dormant</option>
            </select>
          </div>
        </div>

        <Field label="Meta" name="meta" defaultValue={plant.meta ?? ""} />
        <Field label="Description" name="description" defaultValue={plant.description ?? ""} multiline />
        <ImageUploadField label="Image" name="img" defaultValue={plant.img ?? ""} />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton />
          <Link href="/admin/plants" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginTop: "32px", marginBottom: "10px" }}>
        Varieties — saved independently
      </div>
      <div style={{
        padding: "24px 28px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {plant.varieties.length} {plant.varieties.length === 1 ? "variety" : "varieties"}
          </div>
          <Link href={`/admin/plants/${id}/varieties/new`} style={{
            fontSize: "12px", color: "var(--green-ink)", textDecoration: "none", fontWeight: 500,
          }}>
            + Add variety
          </Link>
        </div>
        {plant.varieties.length === 0
          ? <p style={{ fontSize: "13px", color: "var(--ink-mute)", fontStyle: "italic" }}>No varieties yet</p>
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "40px" }}>
              {plant.varieties.map(v => (
                <div key={v.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--line)", background: "var(--card)",
                }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--green-ink)" }}>{v.name}</span>
                    {v.season && <span style={{ fontSize: "12px", color: "var(--ink-mute)", marginLeft: "10px" }}>{v.season}</span>}
                  </div>
                  <Link href={`/admin/plants/${id}/varieties/${v.id}/edit`} style={{
                    fontSize: "12px", color: "var(--green-ink)", textDecoration: "none",
                  }}>
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )
        }
      </div>

      <div style={{
        marginTop: "24px", padding: "24px 28px",
        background: "var(--card)", border: "1px solid #fde8e8",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Danger zone</div>
        <DeleteConfirmButton
          action={deletePlant}
          label="Delete plant"
          title="Delete plant"
          name={plant.name}
          message={`Permanently deletes ${plant.name} and all ${plant.varieties.length} variet${plant.varieties.length === 1 ? "y" : "ies"} with their gallery photos.`}
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
