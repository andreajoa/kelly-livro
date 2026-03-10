"use client"

import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"

export default function CTAFinal() {
  const addItem = useCart((s) => s.addItem)

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-white to-rosa-50" id="comprar">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">Voce merece se sentir<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">acolhida e compreendida</span></h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">Nao espere mais. Cada dia que passa e um dia a mais carregando esse peso sozinha. Este livro pode ser o inicio da sua transformacao.</p>

          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 md:p-10 mb-10 text-left max-w-xl mx-auto">
            <p className="font-semibold text-gray-900 text-lg mb-6 text-center">Hoje voce leva:</p>
            <div className="space-y-3">
              <p className="flex items-center gap-3"><span className="text-green-500">✅</span> Livro &quot;Antes que eu entendesse&quot;</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✅</span> Carta exclusiva da autora</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✅</span> Guia &quot;Primeiros Passos apos o Diagnostico&quot;</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✅</span> Garantia incondicional de 7 dias</p>
            </div>
            <div className="border-t mt-6 pt-6 text-center">
              <p className="text-gray-500 line-through text-sm">De R$ 169,90</p>
              <p className="text-4xl font-playfair font-bold text-rosa-700 mt-2">R$ 119,00</p>
              <p className="text-gray-500 text-sm mt-1">ou 3x de R$ 39,67 sem juros</p>
            </div>
          </div>

          <button onClick={handleComprar} className="bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-6 px-20 rounded-full text-2xl shadow-2xl shadow-rosa-500/40 hover:shadow-rosa-500/50 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider animate-pulse-slow">
            🛒 QUERO MEU EXEMPLAR AGORA
          </button>
          <p className="text-gray-500 text-sm mt-6">🛡️ Sua compra esta 100% protegida pela nossa garantia de 7 dias.</p>

          <div className="mt-14 text-left max-w-2xl mx-auto space-y-4 text-gray-600">
            <p><strong className="text-gray-900">P.S.:</strong> O preco de lancamento de R$ 119,00 e temporario. Em breve, o valor volta para R$ 169,90. Garanta agora.</p>
            <p><strong className="text-gray-900">P.P.S.:</strong> &quot;Li em uma noite e chorei de alivio. Me senti vista pela primeira vez.&quot; — Ana Paula, Sao Paulo</p>
          </div>
        </div>
      </div>
    </section>
  )
}
