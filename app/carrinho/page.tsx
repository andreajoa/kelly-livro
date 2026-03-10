"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import Link from "next/link"
import ShippingCalculator from "@/components/ShippingCalculator"
import { trackEvent } from "@/lib/api"

export default function CarrinhoPage() {
  const { items, removeItem, shippingCost } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + (shippingCost || 0)

  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-8 sm:mb-12">
            Carrinho de <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Compras</span>
          </h1>

          {items.length === 0 ? (
            <div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 sm:p-14">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🛒</div>
              <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6">Seu carrinho esta vazio</p>
              <Link href="/" className="bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-sm sm:text-base">← Voltar para a loja</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <img src="/images/capa-livro.png" alt={item.name} className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded-lg shadow flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{item.name}</p>
                        <p className="text-rosa-600 font-bold text-sm sm:text-base">R$ {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs sm:text-sm flex-shrink-0">Remover</button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-28">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b pb-3 sm:pb-4">Resumo</h2>
                  <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Frete</span><span>{shippingCost ? `R$ ${shippingCost.toFixed(2)}` : "—"}</span></div>
                  </div>

                  <ShippingCalculator />

                  <div className="flex justify-between font-bold text-lg sm:text-xl mt-4 sm:mt-6 border-t pt-3 sm:pt-4">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>

                  {shippingCost ? (
                    <Link href="/checkout" onClick={() => trackEvent("click_checkout", "/carrinho", { total })} className="block w-full text-center mt-4 sm:mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 text-white font-bold py-3 sm:py-4 rounded-lg text-sm sm:text-base">
                      Ir para Pagamento
                    </Link>
                  ) : (
                    <div>
                      <button disabled className="w-full mt-4 sm:mt-6 bg-gray-300 text-gray-500 font-bold py-3 sm:py-4 rounded-lg cursor-not-allowed text-sm sm:text-base">Ir para Pagamento</button>
                      <p className="text-[10px] sm:text-xs text-center mt-2 text-gray-500">Calcule o frete para continuar</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
