import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Problema from "@/components/Problema"
import Solucao from "@/components/Solucao"
import Historia from "@/components/Historia"
import Beneficios from "@/components/Beneficios"
import Depoimentos from "@/components/Depoimentos"
import Oferta from "@/components/Oferta"
import Objecoes from "@/components/Objecoes"
import Urgencia from "@/components/Urgencia"
import FAQ from "@/components/FAQ"
import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import StickyBuyButton from "@/components/StickyBuyButton"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problema />
      <Solucao />
      <Historia />
      <Beneficios />
      <Depoimentos />
      <Oferta />
      <Objecoes />
      <Urgencia />
      <FAQ />
      <CTAFinal />
      <Footer />
      <FloatingWhatsApp />
      <StickyBuyButton />
    </main>
  )
}
