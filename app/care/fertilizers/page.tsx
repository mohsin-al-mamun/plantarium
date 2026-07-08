import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import FertilizerGuide from "@/app/components/FertilizerGuide"

export const metadata = {
  title: "Fertilizer Guide — Plantarium",
  description: "Full reference for every fertilizer used in the garden — what it does, how much to dose, and how to diagnose a deficiency.",
}

export default function FertilizerGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        <FertilizerGuide />
      </main>
      <Footer />
    </>
  )
}
