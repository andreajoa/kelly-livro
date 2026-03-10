"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ShippingCalculator from "@/components/ShippingCalculator"
import { useCart } from "@/store/cartStore"
import Link from "next/link"

export default function CarrinhoPage() {
  const { items, removeItem, clearCart, shipping } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shipping?.price || 0
  const total = subtotal + shippingCost

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Seu carrinho</span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4">Carrinho de <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Compras</span></h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-14">
              <div className="text-6xl mb-6">🛒</div>
              <p className="text-gray-500 text-lg mb-6">Seu carrinho esta vazio</p>
              <Link href="/livro" className="bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wide inline-block">← Ver o livro</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">Itens ({items.length})</h2>

                {items.map((item) => (
                  <div key={item.id} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src="/images/capa-livro.png" alt={item.name} className="w-20 h-28 object-cover rounded-lg shadow" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-gray-400 line-through text-sm">R$ 169,90</span>
                          <span className="text-rosa-600 font-bold text-xl">R$ {item.price.toFixed(2)}</span>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">-30%</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors text-sm font-medium">✕ Remover</button>
                  </div>
                ))}

                <div className="mt-6">
                  <ShippingCalculator />
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sticky top-32">
                  <h2 className="font-bold text-gray-900 text-lg mb-6">Resumo do Pedido</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Frete</span>
                      {shipping ? (
                        <span className="text-gray-900 font-semibold">
                          R$ {shipping.price.toFixed(2)}
                          <span className="text-gray-400 font-normal text-xs block text-right">{shipping.method} - {shipping.estimatedDays} dias</span>
                        </span>
                      ) : (
                        <span className="text-rosa-500 text-xs">Calcule acima ↑</span>
                      )}
                    </div>

                    {shipping && (
                      <div className="flex justify-between text-gray-400 text-xs">
                        <span>Destino</span>
                        <span>{shipping.city} - {shipping.state}</span>
                      </div>
                    )}

                    <div className="border-t-2 border-dashed border-gray-200 my-4" />

                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-lg">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-playfair font-bold text-rosa-700">R$ {total.toFixed(2)}</span>
                        <p className="text-gray-500 text-xs">ou 3x de R$ {(total / 3).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {shipping ? (
                    <Link href="/checkout" className="block w-full bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 px-6 rounded-full text-center text-lg shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide mt-6">
                      💳 Finalizar Compra
                    </Link>
                  ) : (
                    <div className="mt-6 p-4 bg-rosa-50 rounded-xl border border-rosa-200 text-center">
                      <p className="text-rosa-700 text-sm font-semibold">📦 Calcule o frete para continuar</p>
                      <p className="text-rosa-500 text-xs mt-1">Digite seu CEP ao lado</p>
                    </div>
                  )}

                  <button onClick={clearCart} className="w-full text-center text-gray-400 hover:text-red-500 text-sm mt-4 transition-colors">Limpar carrinho</button>

                  <div className="mt-6 space-y-2 text-gray-400 text-xs text-center">
                    <p>🔒 Pagamento seguro</p>
                    <p>🛡️ Garantia de 7 dias</p>
                    <p>📦 Envio pelos Correios</p>
                  </div>
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
