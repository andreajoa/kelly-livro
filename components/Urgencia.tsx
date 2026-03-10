"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"
import CountdownTimer from "./CountdownTimer"

export default function Urgencia() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()
  const handleComprar = () => { addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 }); trackEvent("add_to_cart", "/", { source: "urgencia" }); router.push(`/${locale}/carrinho`) }

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-rosa-800 to-rosa-900 text-white" id="urgencia">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-rosa-200 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.urgencia.badge}</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mt-3 mb-4 sm:mb-6">{t.urgencia.title}</h2>
        <CountdownTimer />
        <div className="mt-6 sm:mt-8 space-y-2 text-rosa-100/80 text-sm sm:text-base">{t.urgencia.stats.map((s: string, i: number) => <p key={i}>🔥 <strong className="text-white">{s}</strong></p>)}</div>
        <div className="mt-8"><button onClick={handleComprar} className="w-full sm:w-auto bg-white text-rosa-800 font-bold py-4 sm:py-5 px-8 sm:px-14 rounded-full text-base sm:text-xl shadow-2xl transform hover:scale-105 transition-all uppercase tracking-wider">{t.urgencia.cta}</button></div>
      </div>
    </section>
  )
}
