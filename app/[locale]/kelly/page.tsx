"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { useLang } from "@/lib/LangContext"

export default function KellyPage() {
  const { t } = useLang()
  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="flex justify-center animate-fade-in">
              <img src="/images/autora.png" alt="Kelly Marques" className="w-48 sm:w-64 md:w-80 rounded-2xl shadow-2xl object-cover" />
            </div>
            <div className="animate-fade-in-up text-center md:text-left">
              <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.kellyPage.badge}</span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-3 mb-4 sm:mb-6">{t.kellyPage.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.kellyPage.titleHighlight}</span></h1>
              <div className="space-y-3 sm:space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>{t.kellyPage.desc1}</p>
                <blockquote className="border-l-4 border-rosa-400 pl-4 sm:pl-6 py-2 italic text-rosa-700 text-base sm:text-lg font-playfair">{t.kellyPage.quote}</blockquote>
                <p>{t.kellyPage.desc2}</p>
                <p>{t.kellyPage.desc3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
