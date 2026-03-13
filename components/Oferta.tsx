"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"
import ShippingCalculator from "./ShippingCalculator"

export default function Oferta() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()
  const currencySymbol = t.currency === "USD" ? "$" : "R$"
  
  const handleComprar = () => { 
    addItem({ id: uuidv4(), name: t.productName, price: t.price, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "oferta" })
    router.push(`/${locale}/carrinho`) 
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.oferta.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.oferta.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.oferta.titleHighlight}</span></h2></div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center"><img src={t.bookImage} alt="Book" className="w-48 sm:w-64 md:w-80 rounded-xl shadow-2xl" /></div>
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
            <div className="space-y-3 mb-6">{t.oferta.items.map((item: string, i: number) => (<div key={i} className="flex items-center gap-2 text-sm sm:text-base"><span className="text-green-500 flex-shrink-0">✓</span><span className="text-gray-700">{item}</span></div>))}</div>
            <div className="border-t-2 border-dashed border-rosa-200 my-4" />
            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm mb-1">{t.oferta.from} <span className="line-through">{currencySymbol} {t.oldPrice.toFixed(2)}</span> {t.oferta.priceLabel}</p>
              <span className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-rosa-700">{currencySymbol} {t.price.toFixed(2)}</span>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 mt-1">{t.oferta.installments}</p>
              {t.showShipping && <ShippingCalculator />}
              <button onClick={handleComprar} className="w-full mt-4 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 rounded-full text-sm sm:text-lg shadow-2xl uppercase tracking-wider">{t.oferta.cta}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
