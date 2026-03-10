"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import ShippingCalculator from "./ShippingCalculator"

export default function Oferta() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "oferta_section" })
    router.push("/carrinho")
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Oferta Especial</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">
            Garante o seu <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">exemplar agora</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in-up">
          <div className="flex justify-center">
            <img src="/images/livro-produto.png" alt="O Livro" className="w-48 sm:w-64 md:w-80 rounded-xl shadow-2xl" />
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {["Livro fisico completo", "Carta exclusiva da autora", "Guia digital Primeiros Passos (Bonus)", "Garantia incondicional de 7 dias"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-green-500 text-base sm:text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-rosa-200 my-4 sm:my-6" />

            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm mb-1">De <span className="line-through">R$ 149,00</span> por:</p>
              <div className="flex items-baseline justify-center gap-1 sm:gap-2 mb-1">
                <span className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-rosa-700">R$ 119</span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">ou em ate 12x no cartao</p>

              <ShippingCalculator />

              <button onClick={handleComprar} className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg shadow-2xl shadow-rosa-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">
                🛒 Quero meu exemplar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
