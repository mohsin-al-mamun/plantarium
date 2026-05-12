import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CareGuide from "@/app/components/CareGuide"

export const metadata = {
  title: "Care Guide — Plantarium",
  description: "Fertilizers and pest control products for every plant in the garden — doses, timing, and which plants they belong to.",
}

export default function CarePage() {
  return (
    <>
      <Navbar />
      <main>
        <CareGuide />
      </main>
      <Footer />
    </>
  )
}
