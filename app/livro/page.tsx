"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"

export default function LivroPage() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 })
    trackEvent("add_to_cart", "/livro", { source: "livro_page" })
    router.push("/carrinho")
  }

  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="flex justify-center animate-fade-in">
              <img src="/images/livro-produto.png" alt="Capa do livro" className="w-48 sm:w-64 md:w-80 rounded-xl shadow-2xl" />
            </div>
            <div className="animate-fade-in-up text-center md:text-left">
              <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">O Livro</span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
                Antes que eu <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">entendesse</span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                A jornada real de uma mae ao descobrir o autismo do seu filho. Uma historia de amor, descoberta e transformacao.
              </p>
              <div className="flex items-baseline gap-3 justify-center md:justify-start mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700">R$ 119,00</span>
                <span className="text-gray-400 line-through text-sm sm:text-base">R$ 149,00</span>
              </div>
              <button onClick={handleComprar} className="w-full sm:w-auto bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-lg shadow-lg transform hover:scale-105 transition-all uppercase tracking-wide">🛒 Comprar agora</button>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 grid md:grid-cols-2 gap-6 sm:gap-8">
            <img src="/images/apoio.jpeg" alt="Apoio para outras maes" className="rounded-2xl shadow-xl w-full object-cover h-48 sm:h-64 md:h-auto" />
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>Quando Kelly recebeu o diagnostico de autismo do seu filho, o chao se abriu. A culpa, o medo, a solidao — tudo veio de uma vez.</p>
              <p>Este livro e o resultado dessa descoberta. Cada capitulo e um passo na jornada de aceitacao e transformacao.</p>
              <p>Escrito com linguagem simples e profundamente emocional, nao e um manual medico — e um abraco.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
