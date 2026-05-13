import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import SaveButton from "@/app/admin/components/SaveButton"
import SavedBanner from "@/app/admin/components/SavedBanner"
import LinkedPlantsForm from "@/app/admin/components/LinkedPlantsForm"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import { deleteStorageFile } from "@/lib/supabase"

export default async function EditProductPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params
  const { saved } = await searchParams
  const [product, allPlants] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        _count: { select: { plants: true } },
        plants: { select: { plantId: true } },
      },
    }),
    prisma.plant.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, category: true } }),
  ])
  if (!product) notFound()

  const linkedPlantIds = new Set(product.plants.map(p => p.plantId))

  async function updateProduct(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const kind = formData.get("kind") as "fertilizer" | "pesticide"
    const type = formData.get("type") as "organic" | "chemical"
    const dosage = (formData.get("dosage") as string) || null
    const frequency = (formData.get("frequency") as string) || null
    const notes = (formData.get("notes") as string) || null
    const img = (formData.get("img") as string) || null

    if (product!.img && product!.img !== img) await deleteStorageFile(product!.img)
    await prisma.product.update({ where: { id }, data: { name, kind, type, dosage, frequency, notes, img } })
    redirect(`/admin/products/${id}/edit?saved=details`)
  }

  async function updateLinkedPlants(_prev: { ok: boolean } | null, formData: FormData) {
    "use server"
    const selectedIds = formData.getAll("plantIds").map(v => Number(v))
    await prisma.plantProduct.deleteMany({ where: { productId: id } })
    if (selectedIds.length > 0) {
      await prisma.plantProduct.createMany({
        data: selectedIds.map(plantId => ({ plantId, productId: id })),
      })
    }
    return { ok: true }
  }

  async function deleteProduct() {
    "use server"
    await prisma.product.delete({ where: { id } })
    redirect("/admin/products")
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/products" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Products
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Edit — {product.name}
        </h1>
      </div>

      {saved === "details" && <SavedBanner message="Product details saved" />}

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginBottom: "10px" }}>
        Product details
      </div>
      {/* Main form */}
      <form action={updateProduct} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Name *" name="name" required defaultValue={product.name} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Kind *</label>
            <select name="kind" required defaultValue={product.kind} style={inputStyle}>
              <option value="fertilizer">Fertilizer</option>
              <option value="pesticide">Pesticide</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Type *</label>
            <select name="type" required defaultValue={product.type} style={inputStyle}>
              <option value="organic">Organic</option>
              <option value="chemical">Chemical</option>
            </select>
          </div>
        </div>

        <Field label="Dosage" name="dosage" defaultValue={product.dosage ?? ""} placeholder="e.g. 5ml per litre" />
        <Field label="Frequency" name="frequency" defaultValue={product.frequency ?? ""} placeholder="e.g. Every 2 weeks" />
        <Field label="Notes" name="notes" defaultValue={product.notes ?? ""} multiline />
        <ImageUploadField label="Image" name="img" defaultValue={product.img ?? ""} />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton />
          <Link href="/admin/products" style={{
            padding: "10px 24px", borderRadius: "8px", fontSize: "13px",
            border: "1px solid var(--line)", color: "var(--ink-soft)", textDecoration: "none",
          }}>
            Cancel
          </Link>
        </div>
      </form>

      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-mute)", marginTop: "32px", marginBottom: "10px" }}>
        Linked plants — saved separately
      </div>
      <LinkedPlantsForm
        action={updateLinkedPlants}
        allPlants={allPlants}
        initialLinkedIds={[...linkedPlantIds]}
        count={product._count.plants}
      />

      {/* Danger zone */}
      <div style={{
        marginTop: "24px", padding: "24px 28px",
        background: "var(--card)", border: "1px solid #fde8e8",
        borderRadius: "16px", boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
          Danger zone
        </div>
        <DeleteConfirmButton
          action={deleteProduct}
          label="Delete product"
          title="Delete product"
          name={product.name}
          message={`Permanently deletes ${product.name}. It is currently linked to ${product._count.plants} plant${product._count.plants === 1 ? "" : "s"}.`}
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
  label, name, required, defaultValue, placeholder, multiline,
}: {
  label: string; name: string; required?: boolean
  defaultValue?: string; placeholder?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
      }
    </div>
  )
}
