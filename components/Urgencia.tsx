"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import CountdownTimer from "./CountdownTimer"

export default function Urgencia() {
  const addItem = useCart((s) => s.addItem)

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-r from-rosa-800 to-rosa-900 text-white" id="urgencia">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <span className="text-rosa-200 text-sm font-semibold tracking-[0.2em] uppercase">⚠️ Oferta por tempo limitado</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mt-4 mb-6">Esta oferta especial expira em breve</h2>
          <CountdownTimer />
          <div className="mt-8 space-y-3 text-rosa-100/80">
            <p>🔥 <strong className="text-white">47 pessoas</strong> estao visualizando esta pagina agora</p>
            <p>💳 <strong className="text-white">23 exemplares</strong> vendidos nas ultimas 24 horas</p>
            <p>📦 <strong className="text-white">Estoque limitado</strong> — Primeiros pedidos com frete prioritario</p>
          </div>
          <div className="mt-10 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 inline-block">
            <p className="text-rosa-200 text-sm mb-2">🎁 BONUS EXCLUSIVO — so hoje:</p>
            <p className="text-white font-bold text-lg">Guia digital &quot;Primeiros Passos apos o Diagnostico&quot; — <span className="text-dourado-300">GRATIS</span></p>
            <p className="text-rosa-300 text-xs mt-2">Apos esse prazo, o bonus desaparece e o preco volta para R$ 169,90</p>
          </div>
          <div className="mt-10">
            <button onClick={handleComprar} className="bg-white text-rosa-800 font-bold py-5 px-14 rounded-full text-xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">🛒 Garantir por R$ 119,00</button>
          </div>
        </div>
      </div>
    </section>
  )
}
