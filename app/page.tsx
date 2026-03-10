import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Problema from "@/components/Problema"
import Solucao from "@/components/Solucao"
import VideoBanner from "@/components/VideoBanner"
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
      <VideoBanner
        src="/videos/video1.mp4"
        title="Uma historia que precisa ser contada"
        subtitle="A jornada de uma mae que encontrou forca onde so existia medo"
      />
      <Historia />
      <Beneficios />
      <Depoimentos />
      <VideoBanner
        src="/videos/video2.mp4"
        title="Voce nao esta sozinha"
        subtitle="Milhares de maes ja se transformaram com esta leitura"
      />
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
