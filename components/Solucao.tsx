"use client"
import { useLang } from "@/lib/LangContext"
export default function Solucao() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="solucao">
      <div className="max-w-5xl mx-auto">
        <div className="text-center"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.solucao.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.solucao.title}<br className="hidden sm:block" /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent"> {t.solucao.titleHighlight}</span></h2><p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">{t.solucao.subtitle}</p></div>
        <div className="mt-10 sm:mt-16 grid md:grid-cols-2 gap-8 items-center">
          <img src="/images/descoberta.jpeg" alt="" className="rounded-2xl shadow-xl w-full object-cover" />
          <div className="grid grid-cols-1 gap-6">{t.solucao.cards.map((c: {icon:string;title:string;desc:string}, i: number) => (<div key={i} className="flex items-start gap-4 group"><div className="w-14 h-14 bg-rosa-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{c.icon}</div><div><h3 className="font-playfair text-lg font-bold text-gray-900 mb-1">{c.title}</h3><p className="text-gray-600 text-sm">{c.desc}</p></div></div>))}</div>
        </div>
      </div>
    </section>
  )
}
