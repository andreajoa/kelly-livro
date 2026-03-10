"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function CTAFinal() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()
  const handleComprar = () => { addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 }); trackEvent("add_to_cart", "/", { source: "cta_final" }); router.push(`/${locale}/carrinho`) }

  return (
    <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden" id="comprar">
      <div className="absolute inset-0 z-0"><img src="/images/cta-final.png" alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-white/85" /></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">{t.ctaFinal.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.ctaFinal.titleHighlight}</span></h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">{t.ctaFinal.subtitle}</p>
        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 mb-8 text-left max-w-md mx-auto">
          <p className="font-semibold text-gray-900 text-base mb-4 text-center">{t.ctaFinal.todayYouGet}</p>
          <div className="space-y-2 text-sm sm:text-base">{t.ctaFinal.items.map((item: string, i: number) => <p key={i} className="flex items-center gap-2"><span className="text-green-500 flex-shrink-0">✅</span>{item}</p>)}</div>
          <div className="border-t mt-4 pt-4 text-center"><p className="text-gray-500 line-through text-xs">R$ 149,00</p><p className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700 mt-1">R$ 119,00</p></div>
        </div>
        <button onClick={handleComprar} className="w-full sm:w-auto bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 sm:py-6 px-10 sm:px-20 rounded-full text-lg sm:text-2xl shadow-2xl transform hover:scale-105 transition-all uppercase tracking-wider">{t.ctaFinal.cta}</button>
      </div>
    </section>
  )
}
