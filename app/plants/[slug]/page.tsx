import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CareNotes from "@/app/components/CareNotes"
import VarietyGrid from "@/app/components/VarietyGrid"
import { PLANTS } from "@/app/data/plants"

export function generateStaticParams() {
  return PLANTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const plant = PLANTS.find((p) => p.slug === slug)
  if (!plant) return {}
  return {
    title: `${plant.name} — Plantarium`,
    description: plant.description,
  }
}

const BackArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M11 5l-7 7 7 7" />
  </svg>
)

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const plant = PLANTS.find((p) => p.slug === slug)
  if (!plant) notFound()

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "48px 0 96px" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-16">

            {/* Back link */}
            <Link
              href="/#plants"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                fontSize: "13px",
                color: "var(--ink-mute)",
                textDecoration: "none",
                marginBottom: "36px",
                display: "inline-flex",
              }}
            >
              <BackArrow />
              The collection
            </Link>

            {/* Plant header */}
            <div
              style={{
                maxWidth: "640px",
                marginBottom: "48px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--clay)",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                {plant.category}
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 5vw, 56px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  color: "var(--green-ink)",
                  margin: "0 0 12px",
                }}
              >
                {plant.name}
              </h1>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--ink-mute)",
                  marginBottom: "20px",
                }}
              >
                {plant.meta}
              </div>
              <p
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  color: "var(--ink-soft)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {plant.description}
              </p>
            </div>

            {/* Varieties header */}
            <div
              style={{
                paddingTop: "36px",
                borderTop: "1px solid var(--line)",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--clay)",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Varieties
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--ink-mute)",
                  margin: 0,
                }}
              >
                {plant.varieties.length} {plant.varieties.length === 1 ? "variety" : "varieties"} growing this season
              </p>
            </div>

            {/* Varieties grid */}
            <VarietyGrid varieties={plant.varieties} plantName={plant.name} />
            <CareNotes plantSlug={plant.slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
