"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"

export default function CTAFinal() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "cta_final" })
    router.push("/carrinho")
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden" id="comprar">
      <div className="absolute inset-0 z-0">
        <img src="/images/cta-final.png" alt="CTA" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
            Voce merece se sentir <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">acolhida</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Nao espere mais. Este livro pode ser o inicio da sua transformacao.
          </p>

          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 mb-8 sm:mb-10 text-left max-w-md mx-auto">
            <p className="font-semibold text-gray-900 text-base sm:text-lg mb-4 sm:mb-6 text-center">Hoje voce leva:</p>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p className="flex items-center gap-2 sm:gap-3"><span className="text-green-500 flex-shrink-0">✅</span> Livro fisico completo</p>
              <p className="flex items-center gap-2 sm:gap-3"><span className="text-green-500 flex-shrink-0">✅</span> Carta exclusiva da autora</p>
              <p className="flex items-center gap-2 sm:gap-3"><span className="text-green-500 flex-shrink-0">✅</span> Guia digital (Bonus)</p>
              <p className="flex items-center gap-2 sm:gap-3"><span className="text-green-500 flex-shrink-0">✅</span> Garantia de 7 dias</p>
            </div>
            <div className="border-t mt-4 sm:mt-6 pt-4 sm:pt-6 text-center">
              <p className="text-gray-500 line-through text-xs sm:text-sm">R$ 149,00</p>
              <p className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700 mt-1 sm:mt-2">R$ 119,00</p>
            </div>
          </div>

          <button onClick={handleComprar} className="w-full sm:w-auto bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 sm:py-6 px-10 sm:px-20 rounded-full text-lg sm:text-2xl shadow-2xl shadow-rosa-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">
            🛒 QUERO MEU EXEMPLAR
          </button>
        </div>
      </div>
    </section>
  )
}
