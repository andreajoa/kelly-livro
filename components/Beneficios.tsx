"use client"
import { useLang } from "@/lib/LangContext"
export default function Beneficios() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="beneficios">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
          <div><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.beneficios.badge}</span><h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.beneficios.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.beneficios.titleHighlight}</span></h2></div>
          <div className="grid grid-cols-2 gap-3"><img src="/images/desafios.jpeg" alt="" className="rounded-xl shadow-lg object-cover w-full h-32 sm:h-40 md:h-48" /><img src="/images/amor.jpeg" alt="" className="rounded-xl shadow-lg object-cover w-full h-32 sm:h-40 md:h-48" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">{t.beneficios.items.map((b: {icon:string;title:string;desc:string}, i: number) => (<div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 group"><div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-5 group-hover:scale-110 transition-transform">{b.icon}</div><h3 className="font-playfair text-base sm:text-lg font-bold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-xs sm:text-sm">{b.desc}</p></div>))}</div>
      </div>
    </section>
  )
}
