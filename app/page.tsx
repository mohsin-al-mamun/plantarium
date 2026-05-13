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
  const plants = await prisma.plant.findMany({
    select: { id: true, slug: true, name: true, meta: true, category: true, img: true, _count: { select: { varieties: true } } },
    orderBy: { id: "asc" },
  })

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <PlantGrid plants={plants} />
        <Featured />
        <Gallery />
        <Journal />
        <About />
      </main>
      <Footer />
    </>
  )
}
