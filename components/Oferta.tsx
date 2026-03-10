"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import ShippingCalculator from "./ShippingCalculator"

export default function Oferta() {
  const addItem = useCart((s) => s.addItem)

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Oferta Especial de Lancamento</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">Tudo isso por um valor<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">que cabe no seu coracao</span></h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 md:p-14 animate-fade-in-up">
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-lg"><span className="text-green-500 text-xl">✓</span><span className="text-gray-700">Livro completo &quot;Antes que eu entendesse&quot;</span><span className="ml-auto text-gray-400 line-through text-sm">R$ 169,90</span></div>
            <div className="flex items-center gap-3 text-lg"><span className="text-green-500 text-xl">✓</span><span className="text-gray-700">Carta exclusiva da autora Kelly Marques</span><span className="ml-auto text-gray-400 line-through text-sm">R$ 29,90</span></div>
            <div className="flex items-center gap-3 text-lg"><span className="text-green-500 text-xl">✓</span><span className="text-gray-700">Guia digital: &quot;Primeiros Passos apos o Diagnostico&quot;</span><span className="ml-auto text-gray-400 line-through text-sm">R$ 49,90</span></div>
            <div className="flex items-center gap-3 text-lg"><span className="text-green-500 text-xl">✓</span><span className="text-gray-700">Garantia incondicional de 7 dias</span><span className="ml-auto text-gray-400 text-sm">Sem custo</span></div>
          </div>

          <div className="border-t-2 border-dashed border-rosa-200 my-8" />

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">Valor total se comprado separadamente: <span className="line-through ml-1">R$ 249,70</span></p>
            <p className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase mb-3">Voce paga hoje apenas</p>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-gray-400 line-through text-xl">R$ 169,90</span>
              <span className="text-5xl md:text-7xl font-playfair font-bold text-rosa-700">R$ 119</span>
              <span className="text-2xl font-playfair text-rosa-700">,00</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">ou em ate <strong>3x de R$ 39,67</strong> sem juros</p>
            <p className="text-green-600 font-bold text-lg mb-8">Economia de R$ 130,70 🎉</p>

            <button onClick={handleComprar} className="bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-6 px-16 rounded-full text-xl shadow-2xl shadow-rosa-500/40 hover:shadow-rosa-500/50 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider animate-pulse-slow">
              🛒 SIM! Quero garantir meu exemplar
            </button>
            <div className="flex items-center justify-center gap-6 mt-6 text-gray-400 text-xs">
              <span>🔒 Pagamento Seguro</span>
              <span>📦 Envio para todo Brasil</span>
              <span>🛡️ Garantia 7 dias</span>
            </div>
          </div>
        </div>

        <div className="mt-8 animate-fade-in-up">
          <ShippingCalculator />
        </div>

        <div className="mt-8 text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 animate-fade-in-up">
          <div className="text-5xl mb-4">🛡️</div>
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Garantia Incondicional de 7 Dias</h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">Se por qualquer motivo voce sentir que este livro nao e para voce, devolvemos 100% do seu dinheiro. Sem perguntas. Sem burocracia. <strong className="text-rosa-700">O risco e 100% nosso.</strong></p>
        </div>
      </div>
    </section>
  )
}
