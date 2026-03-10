"use client"
import { useLang } from "@/lib/LangContext"
export default function Problema() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="problema">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.problema.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.problema.title}<br className="hidden sm:block" /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent"> {t.problema.titleHighlight}</span></h2></div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">{t.problema.items.map((item: string, i: number) => (<div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-sm border-l-4 border-red-400"><span className="text-red-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">❌</span><p className="text-gray-700 leading-relaxed text-sm sm:text-base">{item}</p></div>))}</div>
          <div><img src="/images/problema.jpeg" alt="" className="rounded-2xl shadow-xl w-full object-cover" /></div>
        </div>
      </div>
    </section>
  )
}
