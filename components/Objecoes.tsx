"use client"
import { useLang } from "@/lib/LangContext"
export default function Objecoes() {
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="objecoes">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.objecoes.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.objecoes.title}</h2></div>
        <div className="space-y-4 sm:space-y-6">{t.objecoes.items.map((obj: {q:string;a:string}, i: number) => (<div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-5 md:p-7"><div className="flex items-start gap-3"><span className="text-rosa-500 text-base sm:text-xl mt-0.5 flex-shrink-0">❓</span><div><p className="font-bold text-gray-900 text-sm sm:text-base mb-2">&quot;{obj.q}&quot;</p><div className="flex items-start gap-2"><span className="text-green-500 text-base sm:text-xl mt-0.5 flex-shrink-0">✅</span><p className="text-gray-600 text-xs sm:text-sm">{obj.a}</p></div></div></div></div>))}</div>
      </div>
    </section>
  )
}
