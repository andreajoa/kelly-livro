"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import CountdownTimer from "./CountdownTimer"

export default function Urgencia() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "urgencia" })
    router.push("/carrinho")
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-rosa-800 to-rosa-900 text-white" id="urgencia">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <span className="text-rosa-200 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">⚠️ Oferta por tempo limitado</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">Esta oferta expira em breve</h2>
          <CountdownTimer />
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-rosa-100/80 text-sm sm:text-base">
            <p>🔥 <strong className="text-white">47 pessoas</strong> visualizando agora</p>
            <p>📦 <strong className="text-white">Estoque limitado</strong></p>
          </div>
          <div className="mt-8 sm:mt-10">
            <button onClick={handleComprar} className="w-full sm:w-auto bg-white text-rosa-800 font-bold py-4 sm:py-5 px-8 sm:px-14 rounded-full text-base sm:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">🛒 Garantir agora</button>
          </div>
        </div>
      </div>
    </section>
  )
}
