"use client"
import { useLang } from "@/lib/LangContext"
export default function Depoimentos() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="depoimentos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.depoimentos.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.depoimentos.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.depoimentos.titleHighlight}</span></h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{t.depoimentos.items.map((dep: {nome:string;local:string;texto:string}, i: number) => (<div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-7 hover:shadow-2xl transition-all hover:-translate-y-1"><div className="flex text-yellow-400 text-sm mb-3">⭐⭐⭐⭐⭐</div><p className="text-gray-700 leading-relaxed italic mb-4 text-sm sm:text-base">&quot;{dep.texto}&quot;</p><div className="border-t pt-3"><p className="font-bold text-gray-900 text-sm">{dep.nome}</p><p className="text-rosa-500 text-xs">{dep.local}</p></div></div>))}</div>
      </div>
    </section>
  )
}
