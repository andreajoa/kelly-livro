"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import Link from "next/link"

export default function Hero() {
  const addItem = useCart((s) => s.addItem)

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rosa-900 via-rosa-800 to-rosa-950" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rosa-300 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-center md:text-left animate-fade-in-up">
          <span className="inline-block text-rosa-200 text-sm font-medium tracking-[0.3em] uppercase mb-6 border border-rosa-400/30 px-4 py-2 rounded-full">Lancamento 2025</span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight mb-6">
            Antes que eu <span className="italic text-rosa-200">entendesse</span>
          </h1>

          <p className="text-lg md:text-xl text-rosa-100/80 leading-relaxed mb-4 max-w-lg">
            A jornada real de uma mae ao descobrir o autismo do seu filho. Uma historia de <strong className="text-white">amor, descoberta e transformacao</strong> que vai mudar sua perspectiva para sempre.
          </p>

          <p className="text-rosa-200/60 text-sm mb-6">por <strong className="text-rosa-100">Kelly Marques</strong></p>

          <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
            <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            <span className="text-rosa-200/70 text-sm">Centenas de maes ja se identificaram</span>
          </div>

          <div className="flex items-baseline gap-3 justify-center md:justify-start mb-6">
            <span className="text-rosa-300/60 line-through text-lg">R$ 169,90</span>
            <span className="text-white text-4xl font-playfair font-bold">R$ 119,00</span>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">-30%</span>
          </div>

          <p className="text-rosa-200/50 text-sm mb-8">ou em ate 3x de R$ 39,67 sem juros</p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={handleComprar} className="bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-6 px-16 rounded-full text-xl shadow-2xl shadow-rosa-500/40 hover:shadow-rosa-500/50 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider animate-pulse-slow">
              🛒 Quero meu exemplar — R$ 119,00
            </button>
          </div>

          <div className="flex items-center gap-6 justify-center md:justify-start mt-8 text-rosa-200/50 text-xs">
            <span>🔒 Compra Segura</span>
            <span>📦 Envio para todo Brasil</span>
            <span>🛡️ Garantia 7 dias</span>
          </div>
        </div>

        <div className="flex justify-center animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-rosa-400 to-rosa-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <img src="/images/capa-livro.png" alt="Capa do livro Antes que eu entendesse" className="relative w-80 md:w-96 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute -top-4 -right-4 bg-dourado-400 text-rosa-900 font-bold text-sm px-4 py-2 rounded-full shadow-lg animate-bounce">-30%</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
