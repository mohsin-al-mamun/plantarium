import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { prisma } from "@/lib/prisma"

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export async function generateStaticParams() {
  const varieties = await prisma.variety.findMany({
    select: { name: true, plant: { select: { slug: true } } },
  })
  return varieties.map((v) => ({
    slug: v.plant.slug,
    varietySlug: slugify(v.name),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; varietySlug: string }>
}) {
  const { slug, varietySlug } = await params
  const plant = await prisma.plant.findUnique({
    where: { slug },
    include: { varieties: { select: { name: true } } },
  })
  if (!plant) return {}
  const variety = plant.varieties.find((v) => slugify(v.name) === varietySlug)
  if (!variety) return {}
  return {
    title: `${variety.name} — ${plant.name} — Plantarium`,
  }
}

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 5l-7 7 7 7" />
  </svg>
)

export default async function VarietyPage({
  params,
}: {
  params: Promise<{ slug: string; varietySlug: string }>
}) {
  const { slug, varietySlug } = await params

  const plant = await prisma.plant.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      varieties: {
        include: { photos: { orderBy: { position: "asc" } } },
      },
    },
  })

  if (!plant) notFound()

  const variety = plant.varieties.find((v) => slugify(v.name) === varietySlug)
  if (!variety) notFound()

  const allPhotos = [variety.photo, ...variety.photos.map((p) => p.url)]

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "48px 0 96px" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-16">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2" style={{ marginBottom: "36px", fontSize: "13px", color: "var(--ink-mute)" }}>
              <Link href="/#plants" className="hover:opacity-70 transition-opacity" style={{ color: "inherit", textDecoration: "none" }}>
                Collection
              </Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href={`/plants/${plant.slug}`} className="hover:opacity-70 transition-opacity" style={{ color: "inherit", textDecoration: "none" }}>
                {plant.name}
              </Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "var(--green-ink)", fontWeight: 500 }}>{variety.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16" style={{ alignItems: "start" }}>

              {/* Left — details */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--clay)", fontWeight: 600, marginBottom: "10px" }}>
                  Variety · {plant.name}
                </div>

                <h1
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 300,
                    fontSize: "clamp(32px, 4vw, 52px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                    color: "var(--green-ink)",
                    margin: "0 0 16px",
                  }}
                >
                  {variety.name}
                </h1>

                {variety.season && (
                  <span style={{ fontSize: "11px", padding: "5px 12px", borderRadius: "999px", background: "var(--teal)", color: "var(--green-ink)", fontWeight: 500, display: "inline-block", marginBottom: "24px" }}>
                    {variety.season}
                  </span>
                )}

                {variety.trait && (
                  <p style={{ fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.65, margin: "0 0 32px" }}>
                    {variety.trait}
                  </p>
                )}

                {variety.note && (
                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "28px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)", fontWeight: 600, marginBottom: "12px" }}>
                      Garden note
                    </div>
                    <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                      {variety.note}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: "40px" }}>
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                    style={{ fontSize: "13px", color: "var(--ink-mute)", textDecoration: "none" }}
                  >
                    <BackArrow />
                    All {plant.name} varieties
                  </Link>
                </div>
              </div>

              {/* Right — photo */}
              <div>
                {allPhotos.length === 1 ? (
                  <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "14px", overflow: "hidden", background: "var(--green-surface)" }}>
                    <Image
                      src={allPhotos[0]}
                      alt={variety.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    {allPhotos.slice(0, 4).map((src, i) => (
                      <div key={i} style={{ position: "relative", aspectRatio: "1/1", background: "var(--green-surface)" }}>
                        <Image
                          src={src}
                          alt={`${variety.name} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
