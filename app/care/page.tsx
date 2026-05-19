export const dynamic = "force-dynamic"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CareGuide from "@/app/components/CareGuide"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Care Guide — Plantarium",
  description: "Fertilizers and pest control products for every plant in the garden — doses, timing, and which plants they belong to.",
}

export default async function CarePage() {
  const rawProducts = await prisma.product.findMany({
    include: {
      plants: { include: { plant: { select: { slug: true, name: true, img: true } } } },
    },
    orderBy: { name: "asc" },
  })

  const rawPlants = await prisma.plant.findMany({
    where: { products: { some: {} } },
    include: {
      products: {
        include: { product: { select: { id: true, name: true, kind: true, dosage: true, frequency: true } } },
      },
    },
    orderBy: { name: "asc" },
  })

  const products = rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind as "fertilizer" | "pesticide",
    type: p.type as "organic" | "chemical",
    dosage: p.dosage,
    frequency: p.frequency,
    notes: p.notes,
    img: p.img,
    linkedPlants: p.plants.map((pp) => pp.plant),
  }))

  const plants = rawPlants.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category as string,
    img: p.img,
    products: p.products.map((pp) => ({
      id: pp.product.id,
      name: pp.product.name,
      kind: pp.product.kind as "fertilizer" | "pesticide",
      dosage: pp.product.dosage,
      frequency: pp.product.frequency,
    })),
  }))

  return (
    <>
      <Navbar />
      <main>
        <CareGuide products={products} plants={plants} />
      </main>
      <Footer />
    </>
  )
}
