"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { createOrder, trackEvent } from "@/lib/api"

export default function CheckoutPage() {
  const { items, shippingCost, clearCart } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + (shippingCost || 0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    full_name: "", email: "", whatsapp: "", address: "", cep: "", city_state: "", reference_point: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await trackEvent("submit_checkout", "/checkout", { total })
      const result = await createOrder({ ...form, subtotal, shipping_cost: shippingCost || 0, total })
      if (result.ok) { setSuccess(true); clearCart() }
    } catch { alert("Erro ao processar. Tente novamente.") }
    finally { setLoading(false) }
  }

  if (success) {
    return (
      <main>
        <Navbar />
        <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 sm:p-14 max-w-lg">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">✅</div>
            <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-4">Pedido Registrado!</h1>
            <p className="text-gray-600 text-sm sm:text-base mb-6">Seus dados foram salvos. Em breve voce sera redirecionado para o pagamento.</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-8 sm:mb-12">Finalizar Pedido</h1>

          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Informacoes de Entrega</h2>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold">Nome Completo *</label>
                  <input name="full_name" type="text" required value={form.full_name} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold">WhatsApp *</label>
                    <input name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold">Endereco Completo *</label>
                  <input name="address" type="text" required value={form.address} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold">CEP *</label>
                    <input name="cep" type="text" required value={form.cep} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold">Cidade / Estado *</label>
                    <input name="city_state" type="text" required value={form.city_state} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold">Ponto de Referencia</label>
                  <input name="reference_point" type="text" value={form.reference_point} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
                </div>
                <div className="pt-4 sm:pt-6">
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 text-white font-bold py-3 sm:py-4 rounded-lg text-sm sm:text-lg disabled:bg-gray-400">
                    {loading ? "Processando..." : "💳 Pagar com Stripe"}
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-28">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b pb-3 sm:pb-4">Seu Pedido</h2>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 text-xs sm:text-sm">
                    <span className="truncate pr-2">{item.name}</span>
                    <span className="font-semibold flex-shrink-0">R$ {item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Frete</span><span>R$ {(shippingCost || 0).toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-base sm:text-lg mt-2"><span>Total</span><span>R$ {total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
