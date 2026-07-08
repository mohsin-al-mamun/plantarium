import Link from "next/link"
import {
  surfaceData, midData, bedrockData, glossary, diagData, chiliStages, scheduleData,
  beforeChecklist, afterChecklist, storageTips, safetyTips, comingSoon, quickRefRows,
  type Fertilizer, type Layer,
} from "@/app/data/fertilizers"

const RUST = "#A63D2F"
const RUST_LIGHT = "#C97264"

const layerAccent: Record<Layer, { border: string; text: string; surface: string; dot: string }> = {
  surface: { border: "var(--green-highlight)", text: "var(--green-ink)", surface: "var(--green-surface)", dot: "var(--green-highlight)" },
  mid: { border: "var(--ochre)", text: "var(--clay-deep)", surface: "var(--ochre-surface)", dot: "var(--ochre)" },
  bedrock: { border: "var(--clay)", text: "var(--clay-deep)", surface: "var(--clay-surface)", dot: "var(--clay)" },
}

const eyebrowStyle = (color: string): React.CSSProperties => ({
  fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color, fontWeight: 600,
  marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px",
})

const eyebrowDash = (color: string): React.CSSProperties => ({ width: "16px", height: "1px", background: color, display: "inline-block" })

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div style={{ marginTop: "11px" }}>
      <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", fontWeight: 600, marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: 1.55 }}>{value}</div>
    </div>
  )
}

function FertilizerCard({ d, layer }: { d: Fertilizer; layer: Layer }) {
  const a = layerAccent[layer]
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px 24px 22px" }}>
      <div className="flex items-start justify-between gap-3" style={{ marginBottom: "4px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "18px", color: "var(--green-ink)", lineHeight: 1.2 }}>{d.name}</div>
          <div style={{ fontSize: "12px", color: "var(--ink-mute)", marginTop: "2px" }}>{d.local}</div>
          {d.chemical && <div style={{ fontSize: "11.5px", color: "var(--ink-mute)", fontStyle: "italic", marginTop: "2px" }}>{d.chemical}</div>}
        </div>
        <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", border: `1px solid ${a.border}`, color: a.text, whiteSpace: "nowrap", flexShrink: 0 }}>{d.symbol}</span>
      </div>

      <div style={{ background: "var(--green-ink-2, #062618)", color: "var(--paper)", borderRadius: "8px", padding: "13px 15px", margin: "14px 0" }}>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", marginBottom: "5px" }}>Dosage</div>
        <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--ochre)" }}>{d.dose} <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>/ {d.per}</span></div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>{d.freq}</div>
      </div>

      <p style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: 1.6, margin: "0", paddingBottom: "14px", borderBottom: "1px dashed var(--line)" }}>{d.purpose}</p>
      <p style={{ fontSize: "12.5px", color: "var(--ink-mute)", lineHeight: 1.6, margin: "12px 0 0" }}>{d.how}</p>

      <div className="grid grid-cols-2" style={{ gap: "0 14px" }}>
        <Field label="Best time" value={d.bestTime} />
        <Field label="Method" value={d.method} />
      </div>

      <Field label="Visible results" value={d.results} />
      <Field label="Common mistake" value={d.mistake} />

      {d.notUse && (
        <div style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--ink-soft)", background: "rgba(43,38,32,0.05)", borderLeft: "2px solid var(--ink-soft)", padding: "8px 12px", borderRadius: "0 5px 5px 0" }}>
          <b style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: RUST, marginBottom: "3px" }}>Do not use when</b>
          {d.notUse}
        </div>
      )}
      {d.caution && (
        <div style={{ marginTop: "12px", fontSize: "12.5px", color: RUST, background: "rgba(166,61,47,0.08)", borderLeft: `2px solid ${RUST}`, padding: "8px 12px", borderRadius: "0 5px 5px 0" }}>
          <b style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>Caution</b>
          {d.caution}
        </div>
      )}

      <Field label="Signs of overuse" value={d.overuse} />
      <Field label="Natural sources" value={d.sources} />
      <Field label="Why it matters" value={d.why} />
      {d.notes?.map(([label, value]) => <Field key={label} label={label} value={value} />)}
    </div>
  )
}

function LayerSection({ id, layerNo, title, desc, layer, data }: { id: string; layerNo: string; title: string; desc: string; layer: Layer; data: Fertilizer[] }) {
  const a = layerAccent[layer]
  return (
    <section id={id} style={{ padding: "56px 0 8px", scrollMarginTop: "88px" }}>
      <div style={{ maxWidth: "680px", marginBottom: "28px" }}>
        <div style={eyebrowStyle(a.text)}><span style={eyebrowDash(a.text)} />{layerNo}</div>
        <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 34px)", letterSpacing: "-0.02em", color: "var(--green-ink)", margin: "0 0 10px" }}>{title}</h2>
        <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((d) => <FertilizerCard key={d.name} d={d} layer={layer} />)}
      </div>
    </section>
  )
}

function ChecklistBox({ title, items, tone }: { title: string; items: string[]; tone: "leaf" | "ochre" | "rust" }) {
  const styles = {
    leaf: { border: "var(--green-highlight)", text: "var(--green-ink)", mark: "✓" },
    ochre: { border: "var(--ochre)", text: "var(--clay-deep)", mark: "•" },
    rust: { border: RUST_LIGHT, text: RUST, mark: "!" },
  }[tone]
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderLeft: `3px solid ${styles.border}`, borderRadius: "0 10px 10px 0", padding: "22px 24px" }}>
      <div style={eyebrowStyle(styles.text)}>{title}</div>
      <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0 }}>
        {items.map((item) => (
          <li key={item} style={{ fontSize: "13px", color: "var(--ink-soft)", padding: "5px 0 5px 22px", position: "relative", lineHeight: 1.5 }}>
            <span style={{ position: "absolute", left: 0, color: styles.text, fontWeight: 700 }}>{styles.mark}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const navItems = [
  { href: "#surface", label: "Surface · Primary NPK" },
  { href: "#midground", label: "Midground · Secondary" },
  { href: "#bedrock", label: "Bedrock · Micro & organic" },
  { href: "#glossary", label: "Glossary" },
  { href: "#quickref", label: "Cheat sheet" },
  { href: "#diagnose", label: "Diagnose" },
  { href: "#chili", label: "Chili focus" },
  { href: "#schedule", label: "Calendar" },
]

export default function FertilizerGuide() {
  return (
    <section style={{ padding: "48px 0 96px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Back nav */}
        <Link href="/care"
          className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ marginBottom: "28px", fontSize: "13px", fontWeight: 500, color: "var(--ink-soft)", textDecoration: "none" }}
        >
          ← Back to care guide
        </Link>

        {/* Hero */}
        <div style={{ maxWidth: "680px", marginBottom: "24px" }}>
          <div style={eyebrowStyle("var(--clay)")}><span style={eyebrowDash("var(--clay)")} />Reference · Rooftop Garden</div>
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--green-ink)", margin: "0 0 16px" }}>
            Feeding forty pots, <em style={{ fontStyle: "italic", fontWeight: 400 }}>surface to bedrock.</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
            A working reference for the fertilizers actually used in a rooftop garden — what each one does, what happens when it&apos;s missing, and exactly how much to dissolve per litre of water. Organised like soil itself: fast-acting nutrients near the surface, slow-release builders in the bedrock below.
          </p>
          <div className="flex flex-wrap gap-2" style={{ marginTop: "22px" }}>
            {[`${quickRefRows.length} fertilizers`, "g/L and ml/L dosing", "deficiency diagnosis", "chili-specific notes"].map((t) => (
              <span key={t} style={{ fontSize: "12px", padding: "6px 12px", border: "1px solid var(--line)", borderRadius: "999px", color: "var(--ink-soft)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px" }}>
          {navItems.map((n) => (
            <a key={n.href} href={n.href} style={{ padding: "7px 14px", borderRadius: "999px", fontSize: "12.5px", border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink-soft)", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">
              {n.label}
            </a>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ background: "var(--ochre-surface)", border: "1px solid var(--line)", borderLeft: "3px solid var(--ochre)", borderRadius: "0 10px 10px 0", padding: "20px 26px", marginBottom: "56px" }}>
          <div style={eyebrowStyle("var(--clay-deep)")}>Before you mix anything</div>
          <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "740px", margin: 0 }}>
            Every dose below is calibrated for a <b>healthy, established</b> plant in a container. For seedlings, freshly transplanted pots, or anything already under stress (wilting, pest damage, recent repotting), start at <b>half strength</b> and watch the response before going further.
          </p>
          <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "740px", margin: "8px 0 0" }}>
            Treat every number as a starting point, not a rule — actual need shifts with the species, pot size, growing medium, and season. A 6-inch pot of coriander and a 15-inch pot of chili don&apos;t want the same feed.
          </p>
        </div>

        {/* Glossary */}
        <section id="glossary" style={{ marginBottom: "56px", scrollMarginTop: "88px" }}>
          <div style={{ maxWidth: "640px", marginBottom: "18px" }}>
            <div style={eyebrowStyle("var(--clay)")}>Before you start</div>
            <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", margin: 0 }}>Five terms that show up throughout this guide — quick definitions before the dosing tables.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {glossary.map((g) => (
              <div key={g.term} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "10px", padding: "16px 18px" }}>
                <div style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontWeight: 600, fontSize: "15px", color: "var(--green-ink)", marginBottom: "5px" }}>{g.term}</div>
                <div style={{ fontSize: "12.5px", color: "var(--ink-soft)", lineHeight: 1.55 }}>{g.def}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick reference table */}
        <section id="quickref" style={{ marginBottom: "56px", scrollMarginTop: "88px" }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", background: "var(--paper-warm)", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "18px", color: "var(--green-ink)", margin: 0 }}>Cheat sheet</h3>
              <p style={{ fontSize: "12.5px", color: "var(--ink-mute)", margin: "4px 0 0" }}>Every liquid dose in one table. Solid/soil-applied fertilizers are marked separately. Apply only to moist soil — never apply concentrated fertilizer to completely dry potting mix.</p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--card)" }}>
                <thead>
                  <tr>
                    {["Fertilizer", "Gives", "Dose / litre water", "Frequency"].map((h) => (
                      <th key={h} style={{ textAlign: "left", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-mute)", padding: "11px 18px", borderBottom: "1px solid var(--line)", background: "var(--paper-warm)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quickRefRows.map((d) => (
                    <tr key={d.name}>
                      <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-fraunces)", fontWeight: 600, fontSize: "14px", color: "var(--green-ink)", whiteSpace: "nowrap" }}>
                        <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: layerAccent[d.layer].dot, marginRight: "8px" }} />{d.name}
                      </td>
                      <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", fontSize: "13px", color: "var(--ink-soft)" }}>{d.symbol}</td>
                      <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", fontSize: "13px", color: "var(--clay-deep)", fontWeight: 500, whiteSpace: "nowrap" }}>{d.dose} / {d.per}</td>
                      <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", fontSize: "13px", color: "var(--ink-soft)" }}>{d.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div style={{ marginBottom: "24px" }}>
          <ChecklistBox title="Before you fertilize" items={beforeChecklist} tone="leaf" />
        </div>

        {/* Layers */}
        <LayerSection id="surface" layerNo="Layer 01 — Surface" title="Primary nutrients (N-P-K)" layer="surface"
          desc="The three the plant asks for constantly. These move fastest through the pot and need topping up every couple of weeks through active growth."
          data={surfaceData} />

        <LayerSection id="midground" layerNo="Layer 02 — Midground" title="Secondary nutrients" layer="mid"
          desc="Needed in smaller amounts than N-P-K, but their absence shows up clearly — pale leaves, weak stems, bitter fruit. These correct the most common rooftop-pot deficiencies."
          data={midData} />

        <LayerSection id="bedrock" layerNo="Layer 03 — Bedrock" title="Micronutrients & organic builders" layer="bedrock"
          desc="Used sparingly and precisely (micronutrients), or as slow, foundational feeding (organics). This is the layer that builds soil health over seasons rather than days."
          data={bedrockData} />

        {/* Diagnose */}
        <section id="diagnose" style={{ margin: "64px -16px 0", padding: "48px 16px", background: "var(--green-ink-2, #062618)", borderRadius: "16px", scrollMarginTop: "88px" }}>
          <div style={{ maxWidth: "680px", marginBottom: "10px" }}>
            <div style={eyebrowStyle("var(--ochre)")}>Read the leaf first</div>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 34px)", color: "#fff", margin: "0 0 10px" }}>Symptom → likely deficiency</h2>
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>Diagnose before you dose. Overfeeding causes real damage, especially with boron and nitrogen.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginTop: "28px" }}>
            {diagData.map((d) => (
              <div key={d.symptom} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "16px 18px" }}>
                <div style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontWeight: 500, fontSize: "14px", color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>{d.symptom}</div>
                <div style={{ fontSize: "11px", color: "var(--ochre)", fontWeight: 600, marginBottom: "6px" }}>{d.cause}</div>
                <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{d.fix}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "24px", maxWidth: "720px", fontSize: "12.5px", color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
            <b style={{ color: "var(--ochre)", fontWeight: 600 }}>Before reaching for a fertilizer:</b> nutrient deficiency is only one possible cause of these symptoms. Overwatering or underwatering, pests, root disease, and heat or cold stress can all produce similar-looking leaves. Rule those out first — feeding a plant that&apos;s actually struggling with drainage or pests won&apos;t fix it, and can make things worse.
          </p>
        </section>

        {/* Chili callout */}
        <section id="chili" style={{ margin: "40px -16px 0", scrollMarginTop: "88px" }}>
          <div style={{ borderRadius: "16px", padding: "40px 32px", background: "linear-gradient(135deg, #4A1F16 0%, #2E1510 100%)", border: "1px solid rgba(201,114,100,0.25)", position: "relative", overflow: "hidden" }}>
            <span style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%) rotate(12deg)", fontSize: "5rem", opacity: 0.12 }}>🌶</span>
            <div style={{ position: "relative" }}>
              <div style={eyebrowStyle(RUST_LIGHT)}>Case study</div>
              <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "clamp(20px, 2.6vw, 28px)", color: "#fff", margin: "0 0 14px" }}>Mirich gach — chili, stage by stage</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.72)", maxWidth: "680px", lineHeight: 1.6, marginBottom: "24px" }}>
                Chili is the most planted pot crop on the rooftop and the most sensitive to fertilizer timing. The feed should follow the plant&apos;s growth stage, not the calendar — nitrogen held too long delays flowering, and boron given too strong can kill the plant outright. Here&apos;s the sequence that actually works.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {chiliStages.map((c) => (
                  <div key={c.stage} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px 16px", borderLeft: `2px solid ${RUST_LIGHT}` }}>
                    <div style={{ fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.07em", color: RUST_LIGHT, marginBottom: "6px", fontWeight: 600 }}>{c.stage}</div>
                    <div style={{ fontSize: "13px", color: "#fff", lineHeight: 1.5 }}>{c.what}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" style={{ marginTop: "56px", scrollMarginTop: "88px" }}>
          <div style={{ maxWidth: "680px", marginBottom: "18px" }}>
            <div style={eyebrowStyle("var(--green-ink)")}>Rhythm</div>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 34px)", color: "var(--green-ink)", margin: "0 0 10px" }}>A feeding calendar, by growth stage</h2>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>Fertilizer needs track the plant&apos;s stage, not the month — so this calendar follows growth stage instead of a fixed week number. That keeps it useful whenever a pot was started, whatever season it&apos;s in.</p>
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--card)" }}>
                <thead>
                  <tr>
                    {["Stage", "Focus", "Action"].map((h) => (
                      <th key={h} style={{ textAlign: "left", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-mute)", padding: "11px 18px", borderBottom: "1px solid var(--line)", background: "var(--paper-warm)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((s) => (
                    <tr key={s.week}>
                      <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontWeight: 600, fontSize: "14.5px", color: "var(--green-ink)", whiteSpace: "nowrap", verticalAlign: "top" }}>{s.week}</td>
                      <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", fontSize: "13px", color: "var(--clay-deep)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>{s.focus}</td>
                      <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", fontSize: "13px", color: "var(--ink-soft)", lineHeight: 1.55, verticalAlign: "top" }}>{s.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Golden rule */}
        <div style={{ marginTop: "56px", background: "var(--green-surface)", borderLeft: "3px solid var(--green-highlight)", borderRadius: "0 12px 12px 0", padding: "26px 30px" }}>
          <div style={eyebrowStyle("var(--green-ink)")}>The one rule that matters most</div>
          <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontSize: "22px", color: "var(--green-ink)", margin: "6px 0 10px" }}>When in doubt, underfeed.</h3>
          <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: "660px", margin: 0 }}>
            Most container plants recover far more easily from a mild nutrient deficiency than from fertilizer burn. If you&apos;re unsure of a dose, halve it — you can always feed again in a few days, but you can&apos;t undo an overdose.
          </p>
        </div>

        {/* After / storage / safety */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginTop: "24px" }}>
          <ChecklistBox title="After fertilizing" items={afterChecklist} tone="leaf" />
          <ChecklistBox title="Storage tips" items={storageTips} tone="ochre" />
          <ChecklistBox title="Safety reminder" items={safetyTips} tone="rust" />
        </div>

        {/* Coming soon */}
        <div style={{ marginTop: "40px", border: "1px dashed var(--line)", borderRadius: "12px", padding: "22px 26px" }}>
          <div style={eyebrowStyle("var(--clay)")}>Planned additions</div>
          <p style={{ fontSize: "13px", color: "var(--ink-mute)", margin: "6px 0 0" }}>This guide will keep growing. Next in line:</p>
          <div className="flex flex-wrap gap-2" style={{ marginTop: "12px" }}>
            {comingSoon.map((c) => (
              <span key={c} style={{ fontSize: "12px", color: "var(--ink-soft)", border: "1px solid var(--line)", borderRadius: "999px", padding: "5px 12px" }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div style={{ margin: "40px 0 0", padding: "30px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <p style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "19px", lineHeight: 1.5, color: "var(--green-ink)", maxWidth: "700px", margin: 0, fontWeight: 400 }}>
            Healthy plants are built through consistent care, proper watering, healthy soil, and balanced nutrition. Fertilizers support plant growth, but they cannot replace good gardening practices.
          </p>
        </div>

      </div>
    </section>
  )
}
