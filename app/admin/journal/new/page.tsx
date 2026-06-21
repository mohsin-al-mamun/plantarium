export const dynamic = "force-dynamic"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ImageUploadField from "@/app/admin/components/ImageUploadField"
import SaveButton from "@/app/admin/components/SaveButton"

export default async function NewJournalEntryPage() {
  async function createEntry(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const body = formData.get("body") as string
    const img = (formData.get("img") as string) || null
    const date = new Date(formData.get("date") as string)
    const accent = (formData.get("accent") as string) || null
    const rawPos = (formData.get("position") as string).trim()
    const count = await prisma.journalEntry.count()
    const position = rawPos !== "" ? Number(rawPos) : count

    await prisma.journalEntry.create({ data: { title, body, img, date, accent, position } })
    redirect("/admin/journal")
  }

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
          Add entry
        </h1>
      </div>

      <form action={createEntry} style={{
        display: "flex", flexDirection: "column", gap: "20px",
        background: "var(--card)", border: "1px solid var(--line)",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 1px 4px rgba(14,59,42,0.06)",
      }}>
        <Field label="Title *" name="title" required placeholder="e.g. First Eden rose of the season opened." />
        <Field label="Body *" name="body" required multiline placeholder="Write the journal note here…" />
        <ImageUploadField label="Photo" name="img" />
        <Field label="Date *" name="date" type="date" required />
        <div>
          <label style={labelStyle}>Accent colour</label>
          <select name="accent" style={inputStyle}>
            <option value="">Default (green)</option>
            <option value="amber">Amber</option>
          </select>
          <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>Controls the timeline dot colour</div>
        </div>
        <Field label="Position" name="position" placeholder="0" hint="Display order (0 = first). Defaults to end of list." />

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <SaveButton label="Add entry" />
          <Link href="/admin/journal" style={{
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

function Field({ label, name, required, placeholder, hint, type = "text", multiline }: {
  label: string; name: string; required?: boolean
  placeholder?: string; hint?: string; type?: string; multiline?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea name={name} required={required} placeholder={placeholder} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
        : <input type={type} name={name} required={required} placeholder={placeholder} style={inputStyle} />
      }
      {hint && <div style={{ fontSize: "11px", color: "var(--ink-mute)", marginTop: "4px" }}>{hint}</div>}
    </div>
  )
}
