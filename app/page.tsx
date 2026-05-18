import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import StatsStrip from "./components/StatsStrip"
import PlantGrid from "./components/PlantGrid"
import Featured from "./components/Featured"
import Gallery from "./components/Gallery"
import Journal from "./components/Journal"
import About from "./components/About"
import Footer from "./components/Footer"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const [plants, bloomingVarieties, gardenPhotos, varietyCount] = await Promise.all([
    prisma.plant.findMany({
      select: { id: true, slug: true, name: true, meta: true, category: true, img: true, status: true, _count: { select: { varieties: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.variety.findMany({
      where: { bloomingNow: true },
      select: { name: true, photo: true, bloomingPhoto: true, plant: { select: { slug: true } } },
      orderBy: { position: "asc" },
    }),
    prisma.gardenPhoto.findMany({
      orderBy: [{ position: "asc" }, { takenAt: "desc" }],
    }),
    prisma.variety.count(),
  ])

  const flowerCount = plants.filter(p => p.category === "Flowers").length
  const fruitCount = plants.filter(p => p.category === "Fruits").length
  const vegetableCount = plants.filter(p => p.category === "Vegetables").length

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip flowers={flowerCount} fruits={fruitCount} vegetables={vegetableCount} varieties={varietyCount} />
        <PlantGrid plants={plants} />
        <Featured items={bloomingVarieties} />
        <Gallery photos={gardenPhotos} />
        <Journal />
        <About />
      </main>
      <Footer />
    </>
  )
}
