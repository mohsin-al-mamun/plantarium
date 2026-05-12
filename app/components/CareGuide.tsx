"use client"

import { useEffect, useState, Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS, type Product } from "@/app/data/care"
import { PLANTS, type Plant } from "@/app/data/plants"
import { Overlay } from "@/app/components/ModalShell"

type View = "products" | "plants"
type KindFilter = "all" | "fertilizer" | "pesticide"
type TypeFilter = "all" | "organic" | "chemical"

const DosageIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
    <path d="M8.5 2h7" /><path d="M7 16h10" />
  </svg>
)

const FrequencyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

function KindBadge({ kind }: { kind: Product["kind"] }) {
  const isF = kind === "fertilizer"
  return (
    <span style={{
      fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: "999px",
      background: isF ? "var(--green-surface)" : "var(--clay-surface)",
      color: isF ? "var(--green-ink)" : "var(--clay-deep)",
    }}>
      {isF ? "Fertilizer" : "Pesticide"}
    </span>
  )
}

function TypeBadge({ type }: { type: Product["type"] }) {
  const isO = type === "organic"
  return (
    <span style={{
      fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: "999px",
      background: "rgba(255,255,255,0.92)",
      color: isO ? "var(--green-ink)" : "var(--clay-deep)",
    }}>
      {isO ? "Organic" : "Chemical"}
    </span>
  )
}

// ── Product modal ──────────────────────────────────────────────────────────────

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const linkedPlants = product.plants
    .map(slug => PLANTS.find(p => p.slug === slug))
    .filter(Boolean) as Plant[]
  const coverImg = linkedPlants[0]?.img

  return (
    <Overlay onClose={onClose}>
      <div className="flex flex-col lg:flex-row" style={{ height: "clamp(460px, 80vh, 640px)" }}>
        {coverImg && (
          <div className="relative shrink-0 w-full lg:w-[50%] overflow-hidden" style={{ minHeight: "240px" }}>
            <Image src={coverImg} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 432px" />
            <div className="absolute inset-0" style={{ background: "rgba(10,30,16,0.22)" }} />
            <div className="absolute bottom-0 left-0 right-0 flex gap-2 flex-wrap" style={{ padding: "20px 24px", background: "linear-gradient(to top, rgba(10,30,16,0.7), transparent)" }}>
              <KindBadge kind={product.kind} />
              <TypeBadge type={product.type} />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center overflow-y-auto" style={{ padding: "40px 44px", flex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", color: "var(--green-ink)", margin: "0 0 20px" }}>
            {product.name}
          </h2>
          <div className="flex flex-col gap-3" style={{ marginBottom: "20px" }}>
            <div className="flex items-start gap-2" style={{ color: "var(--ink-soft)", fontSize: "14px" }}>
              <span style={{ color: "var(--ink-mute)", marginTop: "2px", flexShrink: 0 }}><DosageIcon /></span>
              <span><strong style={{ fontWeight: 500 }}>Dose: </strong>{product.dosage}</span>
            </div>
            <div className="flex items-start gap-2" style={{ color: "var(--ink-soft)", fontSize: "14px" }}>
              <span style={{ color: "var(--ink-mute)", marginTop: "2px", flexShrink: 0 }}><FrequencyIcon /></span>
              <span><strong style={{ fontWeight: 500 }}>Frequency: </strong>{product.frequency}</span>
            </div>
          </div>
          {product.notes && (
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 24px", padding: "14px 16px", background: "var(--green-surface)", borderRadius: "8px" }}>
              {product.notes}
            </p>
          )}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)", fontWeight: 600, marginBottom: "10px" }}>
              Used for
            </div>
            <div className="flex flex-wrap gap-2">
              {linkedPlants.map(p => (
                <Link key={p.slug} href={`/plants/${p.slug}`} onClick={onClose}
                  style={{ fontSize: "13px", padding: "5px 12px", borderRadius: "999px", background: "var(--green-surface)", color: "var(--green-ink)", textDecoration: "none", fontWeight: 500 }}
                  className="hover:opacity-70 transition-opacity"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

// ── Plant modal ────────────────────────────────────────────────────────────────

function PlantModal({ plant, onClose }: { plant: Plant; onClose: () => void }) {
  const products = PRODUCTS.filter(p => p.plants.includes(plant.slug))
  const fertilizers = products.filter(p => p.kind === "fertilizer")
  const pesticides = products.filter(p => p.kind === "pesticide")

  return (
    <Overlay onClose={onClose}>
      <div className="flex flex-col lg:flex-row" style={{ height: "clamp(460px, 80vh, 640px)" }}>
        <div className="relative shrink-0 w-full lg:w-[48%] overflow-hidden" style={{ minHeight: "220px" }}>
          <Image src={plant.img} alt={plant.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 365px" />
          <div className="absolute inset-0" style={{ background: "rgba(10,30,16,0.3)" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ padding: "20px 24px", background: "linear-gradient(to top, rgba(10,30,16,0.75), transparent)" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: "4px" }}>
              {plant.category}
            </div>
            <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "24px", color: "#fff", fontWeight: 300, lineHeight: 1.1 }}>
              {plant.name}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto" style={{ padding: "36px 40px", flex: 1 }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--green-ink)", fontWeight: 600, minHeight: "28px", display: "flex", alignItems: "center" }}>
              Fertilizers · {fertilizers.length}
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--clay-deep)", fontWeight: 600, minHeight: "28px", display: "flex", alignItems: "center" }}>
              Pest control · {pesticides.length}
            </div>
            {Array.from({ length: Math.max(fertilizers.length, pesticides.length, 1) }).map((_, i) => (
              <Fragment key={i}>
                {i === 0 && fertilizers.length === 0
                  ? <span style={{ fontSize: "13px", color: "var(--ink-mute)", fontStyle: "italic" }}>None recorded</span>
                  : fertilizers[i]
                    ? <div style={{ padding: "12px 14px", borderRadius: "10px", background: "var(--green-surface)" }}>
                        <div style={{ color: "var(--green-ink)", fontWeight: 500, fontSize: "14px", marginBottom: "6px" }}>{fertilizers[i].name}</div>
                        <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px", marginBottom: "3px" }}>
                          <span style={{ marginTop: "1px", flexShrink: 0 }}><DosageIcon /></span>
                          <span>{fertilizers[i].dosage}</span>
                        </div>
                        <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px" }}>
                          <span style={{ marginTop: "1px", flexShrink: 0 }}><FrequencyIcon /></span>
                          <span>{fertilizers[i].frequency}</span>
                        </div>
                      </div>
                    : <div />
                }
                {i === 0 && pesticides.length === 0
                  ? <span style={{ fontSize: "13px", color: "var(--ink-mute)", fontStyle: "italic" }}>None recorded</span>
                  : pesticides[i]
                    ? <div style={{ padding: "12px 14px", borderRadius: "10px", background: "var(--clay-surface)" }}>
                        <div style={{ color: "var(--clay-deep)", fontWeight: 500, fontSize: "14px", marginBottom: "6px" }}>{pesticides[i].name}</div>
                        <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px", marginBottom: "3px" }}>
                          <span style={{ marginTop: "1px", flexShrink: 0 }}><DosageIcon /></span>
                          <span>{pesticides[i].dosage}</span>
                        </div>
                        <div className="flex items-start gap-2" style={{ color: "var(--ink-mute)", fontSize: "12px" }}>
                          <span style={{ marginTop: "1px", flexShrink: 0 }}><FrequencyIcon /></span>
                          <span>{pesticides[i].frequency}</span>
                        </div>
                      </div>
                    : <div />
                }
              </Fragment>
            ))}
          </div>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--line)" }}>
            <Link href={`/plants/${plant.slug}`} onClick={onClose}
              style={{ fontSize: "13px", padding: "5px 12px", borderRadius: "999px", background: "var(--green-surface)", color: "var(--green-ink)", textDecoration: "none", fontWeight: 500, display: "inline-block" }}
              className="hover:opacity-70 transition-opacity"
            >
              View varieties →
            </Link>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

// ── Cards ──────────────────────────────────────────────────────────────────────

function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const coverImg = product.plants
    .map(slug => PLANTS.find(p => p.slug === slug))
    .filter(Boolean)[0]?.img

  return (
    <div
      onClick={() => onSelect(product)}
      style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s" }}
      className="hover:shadow-md"
    >
      {coverImg && (
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <Image src={coverImg} alt={product.name} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 flex-wrap" style={{ padding: "10px 12px", background: "linear-gradient(to top, rgba(10,30,16,0.65), transparent)" }}>
            <KindBadge kind={product.kind} />
            <TypeBadge type={product.type} />
          </div>
        </div>
      )}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--green-ink)", lineHeight: 1.2 }}>
          {product.name}
        </div>
        <div className="flex items-start gap-2" style={{ color: "var(--ink-soft)", fontSize: "12px" }}>
          <span style={{ color: "var(--ink-mute)", marginTop: "1px", flexShrink: 0 }}><DosageIcon /></span>
          <span>{product.dosage}</span>
        </div>
        <div className="flex items-start gap-2" style={{ color: "var(--ink-soft)", fontSize: "12px" }}>
          <span style={{ color: "var(--ink-mute)", marginTop: "1px", flexShrink: 0 }}><FrequencyIcon /></span>
          <span>{product.frequency}</span>
        </div>
      </div>
    </div>
  )
}

function PlantCard({ plant, onSelect }: { plant: Plant; onSelect: (p: Plant) => void }) {
  const products = PRODUCTS.filter(p => p.plants.includes(plant.slug))
  const fCount = products.filter(p => p.kind === "fertilizer").length
  const pCount = products.filter(p => p.kind === "pesticide").length

  return (
    <div
      onClick={() => onSelect(plant)}
      style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s" }}
      className="hover:shadow-md"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image src={plant.img} alt={plant.name} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 flex-wrap" style={{ padding: "10px 12px", background: "linear-gradient(to top, rgba(10,30,16,0.65), transparent)" }}>
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "999px", background: "rgba(255,255,255,0.92)", color: "var(--green-ink)" }}>
            {plant.category}
          </span>
        </div>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "16px", color: "var(--green-ink)", lineHeight: 1.2 }}>
          {plant.name}
        </div>
        <div className="flex gap-3" style={{ fontSize: "12px", color: "var(--ink-mute)" }}>
          <span style={{ color: "var(--green-ink)" }}>{fCount} fertilizer{fCount !== 1 ? "s" : ""}</span>
          <span>{pCount} pesticide{pCount !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function CareGuide() {
  const [view, setView] = useState<View>("products")
  const [kind, setKind] = useState<KindFilter>("all")
  const [type, setType] = useState<TypeFilter>("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedProduct(null); setSelectedPlant(null) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (selectedProduct || selectedPlant) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selectedProduct, selectedPlant])

  const filteredProducts = PRODUCTS.filter(p => {
    if (kind !== "all" && p.kind !== kind) return false
    if (type !== "all" && p.type !== type) return false
    return true
  })

  const plantsWithProducts = PLANTS.filter(plant =>
    PRODUCTS.some(p => p.plants.includes(plant.slug))
  )

  const filterBtn = (active: boolean) => ({
    padding: "8px 16px", borderRadius: "999px", fontSize: "13px", cursor: "pointer",
    border: active ? "1px solid var(--green-ink)" : "1px solid var(--line)",
    background: active ? "var(--green-ink)" : "var(--card)",
    color: active ? "var(--paper)" : "var(--ink-soft)",
  } as React.CSSProperties)

  return (
    <>
      <section style={{ padding: "48px 0 96px" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-16">

          <div style={{ maxWidth: "600px", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "14px" }}>
              Care guide
            </div>
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--green-ink)", margin: "0 0 16px" }}>
              What goes where,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>and when.</em>
            </h1>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>
              Every fertilizer and pesticide used across the garden — doses, timing, and which plants they belong to.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: "28px" }}>
            <button onClick={() => setView("products")} style={filterBtn(view === "products")}>By product</button>
            <button onClick={() => setView("plants")} style={filterBtn(view === "plants")}>By plant</button>
          </div>

          {view === "products" && (
            <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "32px" }}>
              <div className="flex items-center gap-2">
                {(["all", "fertilizer", "pesticide"] as KindFilter[]).map(k => (
                  <button key={k} onClick={() => setKind(k)} style={filterBtn(kind === k)}>
                    {k === "all" ? "All" : k === "fertilizer" ? "Fertilizers" : "Pesticides"}
                  </button>
                ))}
              </div>
              <div style={{ width: "1px", height: "20px", background: "var(--line)", margin: "0 4px" }} />
              <div className="flex items-center gap-2">
                {(["all", "organic", "chemical"] as TypeFilter[]).map(t => (
                  <button key={t} onClick={() => setType(t)} style={filterBtn(type === t)}>
                    {t === "all" ? "All types" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: "12px", color: "var(--ink-mute)", marginLeft: "8px" }}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {view === "products" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />)}
            </div>
          )}

          {view === "plants" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {plantsWithProducts.map(p => <PlantCard key={p.slug} plant={p} onSelect={setSelectedPlant} />)}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {selectedPlant && <PlantModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />}
    </>
  )
}
