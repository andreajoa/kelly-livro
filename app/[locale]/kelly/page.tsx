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
          {/* Header com foto e intro */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center mb-12 sm:mb-16">
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

          {/* História completa */}
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-6 text-center">
              {t.locale === "pt" ? "A Jornada de Kelly" : t.locale === "es" ? "El Viaje de Kelly" : "Kelly's Journey"}
            </h2>
            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              {t.kellyPage.paragraphs.map((p: string, i: number) => (
                <p key={i} className={i === 0 ? "first-letter:text-4xl first-letter:font-playfair first-letter:text-rosa-600 first-letter:mr-1 first-letter:float-left" : ""}>
                  {p}
                </p>
              ))}
            </div>
            
            {/* Nota final */}
            <div className="mt-8 pt-6 border-t border-rosa-200">
              <p className="text-rosa-700 font-medium text-center italic text-sm sm:text-base">
                {t.kellyPage.finalNote}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
