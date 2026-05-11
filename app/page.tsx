import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import StatsStrip from "./components/StatsStrip"
import PlantGrid from "./components/PlantGrid"
import Featured from "./components/Featured"
import Gallery from "./components/Gallery"
import Journal from "./components/Journal"
import About from "./components/About"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <PlantGrid />
        <Featured />
        <Gallery />
        <Journal />
        <About />
      </main>
      <Footer />
    </>
  )
}
