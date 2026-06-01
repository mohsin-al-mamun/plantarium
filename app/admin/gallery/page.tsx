export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteStorageFile } from "@/lib/supabase"
import { redirect } from "next/navigation"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import Image from "next/image"

export default async function AdminGalleryPage() {
  const photos = await prisma.gardenPhoto.findMany({ orderBy: [{ position: "asc" }, { takenAt: "desc" }] })

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div className="admin-page-header">
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px", color: "var(--green-ink)", margin: 0 }}>
          Garden Photos
        </h1>
        <Link href="/admin/gallery/new" style={{
          padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
          background: "var(--green-ink)", color: "var(--paper)", textDecoration: "none",
        }}>
          + Add photo
        </Link>
      </div>

      {photos.length === 0 ? (
        <p style={{ fontSize: "14px", color: "var(--ink-mute)", fontStyle: "italic" }}>No photos yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {photos.map(p => {
            async function deletePhoto() {
              "use server"
              await prisma.gardenPhoto.delete({ where: { id: p.id } })
              await deleteStorageFile(p.url)
              redirect("/admin/gallery")
            }
            const dateStr = p.takenAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()
            return (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "12px 16px", borderRadius: "10px",
                border: "1px solid var(--line)", background: "var(--card)",
              }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image src={p.url} alt={p.caption ?? ""} fill style={{ objectFit: "cover" }} sizes="56px" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--green-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.caption ?? <span style={{ color: "var(--ink-mute)", fontStyle: "italic" }}>No caption</span>}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "2px", letterSpacing: "0.06em" }}>{dateStr}</div>
                </div>
                <Link href={`/admin/gallery/${p.id}/edit`} style={{
                  fontSize: "12px", color: "var(--green-ink)", textDecoration: "none",
                  padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--line)",
                }}>
                  Edit
                </Link>
                <DeleteConfirmButton
                  action={deletePhoto}
                  title="Delete photo"
                  name={p.caption ?? "this photo"}
                  message="Photo will be permanently deleted from storage."
                  icon
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
