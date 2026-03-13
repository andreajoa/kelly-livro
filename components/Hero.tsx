"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function Hero() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: t.productName, price: t.price, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "hero" })
    router.push(`/${locale}/carrinho`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="inicio">
      <div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-br from-rosa-50 via-white to-rosa-100" /><div className="absolute top-20 left-10 w-72 h-72 bg-rosa-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" /><div className="absolute bottom-20 right-10 w-96 h-96 bg-rosa-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" /></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in-up">
            <div><span className="inline-block bg-gradient-to-r from-rosa-100 to-rosa-200 text-rosa-700 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-4 tracking-wide">{t.hero.badge}</span><h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 leading-tight">{t.hero.title1}<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.hero.title2}</span></h1></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">{t.hero.subtitle} <span className="font-semibold text-rosa-700">{t.hero.subtitleBold}</span>.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={handleComprar} className="group relative bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg shadow-xl transform hover:scale-105 transition-all overflow-hidden"><span className="relative z-10">{t.hero.cta}</span><div className="absolute inset-0 bg-gradient-to-r from-rosa-400 to-rosa-500 opacity-0 group-hover:opacity-100 transition-opacity" /></button>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">{t.hero.trust.map((item: string, i: number) => <span key={i}>{item}</span>)}</div>
            <div className="pt-2"><span className="inline-block bg-rosa-100 text-rosa-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-full">{t.hero.format}</span></div>
          </div>
          <div className="hidden md:flex justify-center animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-rosa-400 to-rosa-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50" />
              <img src={t.bookImage} alt="Book" className="relative w-64 lg:w-96 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
