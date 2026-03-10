"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { createOrder, trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function CheckoutPage() {
  const { items, shippingCost, clearCart } = useCart()
  const { t, locale } = useLang()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = t.showShipping ? (shippingCost || 0) : 0
  const total = subtotal + shipping
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ full_name: "", email: "", whatsapp: "", address: "", cep: "", city_state: "", reference_point: "" })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      await trackEvent("submit_checkout", `/${locale}/checkout`, { total, locale })
      const result = await createOrder({ ...form, subtotal, shipping_cost: shipping, total, locale } as any)
      if (result.ok) { setSuccess(true); clearCart() }
    } catch { alert("Error") } finally { setLoading(false) }
  }

  if (success) return (
    <main><Navbar /><section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center"><div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 sm:p-14 max-w-lg"><div className="text-5xl sm:text-6xl mb-4">✅</div><h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-4">{t.checkoutPage.successTitle}</h1><p className="text-gray-600 text-sm sm:text-base">{t.checkoutPage.successText}</p></div></section><Footer /></main>
  )

  const sym = t.currency === "USD" ? "$" : "R$"

  return (
    <main><Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl sm:text-4xl font-playfair font-bold text-gray-900 mb-8 sm:mb-12">{t.checkoutPage.title}</h1>
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">{t.checkoutPage.deliveryInfo}</h2>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.fullName} *</label><input name="full_name" required value={form.full_name} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.email} *</label><input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                  <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.whatsapp} *</label><input name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                </div>
                {t.showShipping && (
                  <>
                    <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.address} *</label><input name="address" required value={form.address} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.cep} *</label><input name="cep" required value={form.cep} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                      <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.cityState} *</label><input name="city_state" required value={form.city_state} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                    </div>
                    <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.reference}</label><input name="reference_point" value={form.reference_point} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                  </>
                )}
                <div className="pt-4"><button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 sm:py-4 rounded-lg text-sm sm:text-lg disabled:bg-gray-400">{loading ? t.checkoutPage.processing : t.checkoutPage.cta}</button></div>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold mb-3 border-b pb-3">{t.checkoutPage.yourOrder}</h2>
                {items.map(item => (<div key={item.id} className="flex justify-between py-2 text-xs sm:text-sm"><span className="truncate pr-2">{item.name}</span><span className="font-semibold flex-shrink-0">{sym} {item.price.toFixed(2)}</span></div>))}
                <div className="border-t mt-3 pt-3 space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between"><span>{t.carrinho.subtotal}</span><span>{sym} {subtotal.toFixed(2)}</span></div>
                  {t.showShipping && <div className="flex justify-between"><span>{t.carrinho.shipping}</span><span>{sym} {shipping.toFixed(2)}</span></div>}
                  <div className="flex justify-between font-bold text-base mt-2"><span>{t.carrinho.total}</span><span>{sym} {total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section><Footer />
    </main>
  )
}
