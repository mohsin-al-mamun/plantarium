export const dynamic = "force-dynamic"
import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import DeleteConfirmButton from "@/app/admin/components/DeleteConfirmButton"
import SaveButton from "@/app/admin/components/SaveButton"
import SavedBanner from "@/app/admin/components/SavedBanner"

export default async function EditJournalEntryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id } = await params
  const { saved } = await searchParams
  const entry = await prisma.journalEntry.findUnique({ where: { id: Number(id) } })
  if (!entry) notFound()

  async function updateEntry(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const body = formData.get("body") as string
    const img = (formData.get("img") as string) || null
    const date = new Date(formData.get("date") as string)
    const accent = (formData.get("accent") as string) || null
    const rawPos = (formData.get("position") as string).trim()
    const position = rawPos !== "" ? Number(rawPos) : entry!.position

    await prisma.journalEntry.update({
      where: { id: Number(id) },
      data: { title, body, img, date, accent, position },
    })
    redirect(`/admin/journal/${id}/edit?saved=1`)
  }

  async function deleteEntry() {
    "use server"
    await prisma.journalEntry.delete({ where: { id: Number(id) } })
    redirect("/admin/journal")
  }

  const dateValue = entry.date.toISOString().slice(0, 10)

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link href="/admin/journal" style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}>
          ← Journal
        </Link>
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "28px",
          color: "var(--green-ink)", margin: "12px 0 0",
        }}>
          Edit entry
        </h1>
      </div>

      {saved && <SavedBanner message="Entry saved" />}

      <form action={updateEntry} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Title *" name="title" required defaultValue={entry.title} />
        <Field label="Body *" name="body" required multiline defaultValue={entry.body} />
        <ImageUploadField label="Photo" name="img" defaultValue={entry.img ?? ""} />
        <Field label="Date *" name="date" type="date" required defaultValue={dateValue} />
        <div>
          <label style={labelStyle}>Accent colour</label>
          <select name="accent" defaultValue={entry.accent ?? ""} style={inputStyle}>
            <option value="">Default (green)</option>
            <option value="amber">Amber</option>
          </select>
          <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>Controls the timeline dot colour</div>
        </div>
        <Field label="Position" name="position" defaultValue={String(entry.position)} hint="Display order (0 = first)" />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton />
          <Link href="/admin/journal" style={{
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
        <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
          Danger zone
        </div>
        <DeleteConfirmButton
          action={deleteEntry}
          label="Delete entry"
          title="Delete entry"
          name={entry.title}
          message="This journal entry will be permanently deleted."
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

function Field({ label, name, required, defaultValue, placeholder, hint, type = "text", multiline }: {
  label: string; name: string; required?: boolean
  defaultValue?: string; placeholder?: string; hint?: string; type?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type={type} name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
      }
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
