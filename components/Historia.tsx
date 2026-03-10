"use client"
import { useLang } from "@/lib/LangContext"
export default function Historia() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="historia">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.historia.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.historia.title}<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.historia.titleHighlight}</span></h2></div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex justify-center"><img src="/images/autora.png" alt={t.historia.authorName} className="w-48 sm:w-56 md:w-full rounded-2xl shadow-xl object-cover" /></div>
          <div className="md:col-span-2 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6"><div><p className="font-playfair font-bold text-gray-900">{t.historia.authorName}</p><p className="text-rosa-600 text-sm">{t.historia.authorRole}</p></div></div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-light">{t.historia.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
