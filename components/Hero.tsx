"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"

export default function Hero() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 })
    trackEvent("add_to_cart", "/", { source: "hero" })
    router.push("/carrinho")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video desktop */}
      <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover hidden md:block">
        <source src="/videos/banner1.mp4" type="video/mp4" />
      </video>

      {/* Imagem mobile */}
      <div className="absolute z-0 w-full h-full md:hidden">
        <img src="/images/hero-mobile.jpeg" alt="Hero" className="w-full h-full object-cover" />
      </div>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
            <span className="inline-block text-rosa-200 text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 border border-rosa-400/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              Lancamento
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-bold text-white leading-tight mb-4 sm:mb-6">
              Antes que eu <br className="sm:hidden" /><span className="italic text-rosa-200">entendesse</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-rosa-100/80 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
              A jornada real de uma mae ao descobrir o autismo do seu filho. Uma historia de <strong className="text-white">amor, descoberta e transformacao</strong>.
            </p>

            <div className="flex items-baseline justify-center md:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">R$ 119</span>
              <span className="text-lg sm:text-2xl text-gray-400 line-through">R$ 149</span>
            </div>

            <button onClick={handleComprar} className="w-full sm:w-auto bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-base sm:text-xl shadow-2xl shadow-rosa-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">
              🛒 Comprar Agora
            </button>

            <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-start mt-6 sm:mt-8 text-rosa-200/50 text-xs">
              <span>🔒 Compra Segura</span>
              <span>📦 Envio Rapido</span>
              <span>🛡️ Garantia 7 dias</span>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-rosa-400 to-rosa-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50" />
              <img src="/images/capa-livro.png" alt="Capa do livro" className="relative w-64 lg:w-96 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
