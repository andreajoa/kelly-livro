"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import ShippingCalculator from "@/components/ShippingCalculator"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"

export default function LivroPage() {
  const addItem = useCart((s) => s.addItem)

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="animate-fade-in sticky top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-rosa-200 to-rosa-300 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <img src="/images/capa-livro.png" alt="Capa do livro" className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute -top-3 -right-3 bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">-30%</div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">O Livro</span>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-6">Antes que eu<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">entendesse</span></h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                <span className="text-gray-500 text-sm">(4.9/5 - Centenas de avaliacoes)</span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">Este livro narra a jornada real de uma mae ao descobrir o autismo do seu filho. Uma historia de amor, descoberta e transformacao que vai tocar seu coracao e mudar sua perspectiva para sempre.</p>

              <div className="bg-rosa-50 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-gray-400 line-through text-lg">R$ 169,90</span>
                  <span className="text-4xl font-playfair font-bold text-rosa-700">R$ 119,00</span>
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">-30%</span>
                </div>
                <p className="text-gray-500 text-sm">ou em ate <strong>3x de R$ 39,67</strong> sem juros</p>
                <p className="text-green-600 text-sm font-semibold mt-1">Economia de R$ 50,90</p>
              </div>

              <button onClick={handleComprar} className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-5 px-10 rounded-full text-xl shadow-lg shadow-rosa-500/30 hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide mb-6">
                🛒 Adicionar ao carrinho
              </button>

              <div className="flex items-center justify-center gap-4 text-gray-400 text-xs mb-8">
                <span>🔒 Compra Segura</span>
                <span>📦 Envio para todo Brasil</span>
                <span>🛡️ Garantia 7 dias</span>
              </div>

              <ShippingCalculator />

              <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
                <h3 className="font-playfair text-xl font-bold text-gray-900">Sobre o livro</h3>
                <p>Kelly Marques compartilha com coragem e vulnerabilidade cada etapa dessa jornada — da primeira suspeita ao diagnostico, da culpa a aceitacao, do medo a forca inabalavel de ser mae.</p>
                <p>Escrito com linguagem simples e profundamente emocional, &quot;Antes que eu entendesse&quot; nao e um manual medico — e um abraco. E aquela conversa que voce queria ter tido com alguem que realmente entende.</p>
                <p>Ideal para maes, pais, avos, professores e todos que querem compreender o autismo pela lente do amor.</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <span className="text-2xl">📖</span>
                  <p className="text-sm font-semibold text-gray-900 mt-2">Livro Fisico</p>
                  <p className="text-xs text-gray-500">Enviado pelos Correios</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <span className="text-2xl">🎁</span>
                  <p className="text-sm font-semibold text-gray-900 mt-2">3 Bonus</p>
                  <p className="text-xs text-gray-500">Inclusos na compra</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <span className="text-2xl">🛡️</span>
                  <p className="text-sm font-semibold text-gray-900 mt-2">Garantia 7 dias</p>
                  <p className="text-xs text-gray-500">Dinheiro de volta</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <span className="text-2xl">💳</span>
                  <p className="text-sm font-semibold text-gray-900 mt-2">Parcelamento</p>
                  <p className="text-xs text-gray-500">Ate 3x sem juros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
