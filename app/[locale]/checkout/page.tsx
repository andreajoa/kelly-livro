"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { createOrder, trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function CheckoutPage() {
  const { items, shippingCost, cep, address } = useCart()
  const { t, locale } = useLang()
  const isDigital = items.some(i => i.productType === "digital")
  const needsShipping = t.showShipping && !isDigital
  const [useUSD, setUseUSD] = useState(false)
  const currencySymbol = (useUSD || t.currency === "USD") ? "$" : "R$"
  const usdRate = 5.75
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const subtotalDisplay = useUSD ? subtotal / usdRate : subtotal
  const shipping = needsShipping ? (shippingCost || 0) : 0
  const total = subtotalDisplay + shipping
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ full_name: "", email: "", whatsapp: "", address: "", cep: "", city_state: "", reference_point: "" })

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      cep: cep || "",
      address: address ? `${address.street}, ${address.neighborhood}` : "",
      city_state: address?.cityState || "",
    }))
  }, [cep, address])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await trackEvent("submit_checkout", `/${locale}/checkout`, { total, locale })
      const productType = isDigital ? "digital" : (items[0]?.productType || "physical")
      const result = await createOrder({ ...form, subtotal: subtotalDisplay, shipping_cost: shipping, total, locale, currency: useUSD ? "USD" : t.currency, product_type: productType })
      if (result.ok && result.checkout_url) {
        window.location.href = result.checkout_url
      } else {
        alert("Error creating order")
      }
    } catch (err) {
      console.error(err)
      alert("Error processing payment")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 sm:p-14 max-w-lg">
            <div className="text-5xl sm:text-6xl mb-4">🛒</div>
            <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-4">{t.carrinho.empty}</h1>
            <a href={`/${locale}`} className="text-rosa-600 underline">{t.carrinho.back}</a>
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
          <h1 className="text-center text-2xl sm:text-4xl font-playfair font-bold text-gray-900 mb-8 sm:mb-12">{t.checkoutPage.title}</h1>
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-3">
              {isDigital && locale === "pt" && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
                  <span className="text-xs text-blue-700">💳 Pagar em dólar (USD)?</span>
                  <button type="button" onClick={() => setUseUSD(!useUSD)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${useUSD ? "bg-blue-600 text-white" : "bg-white border border-blue-400 text-blue-600"}`}>
                    {useUSD ? "$ USD ✓" : "R$ BRL"}
                  </button>
                </div>
              )}
              {isDigital && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700">
                  📦 <strong>Entrega digital:</strong> Você receberá o acesso por e-mail após o pagamento. Nenhum endereço necessário.
                </div>
              )}
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">{t.checkoutPage.deliveryInfo}</h2>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.fullName} *</label><input name="full_name" required value={form.full_name} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.email} *</label><input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                  <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.whatsapp} *</label><input name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" /></div>
                </div>
                {needsShipping && (
                  <>
                    <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.address} *</label><input name="address" required value={form.address} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" placeholder="Rua, numero, bairro" /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.cep} *</label><input name="cep" required value={form.cep} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm bg-gray-50" /></div>
                      <div><label className="text-xs sm:text-sm font-semibold">{t.checkoutPage.cityState} *</label><input name="city_state" required value={form.city_state} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm bg-gray-50" /></div>
                    </div>
                    <div><label className="text-xs sm:text-sm font-semibold">Numero e Complemento *</label><input name="reference_point" required value={form.reference_point} onChange={handleChange} className="w-full mt-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm" placeholder="Ex: Nr 123, Apto 45, proximo ao mercado" /></div>
                  </>
                )}
                <div className="pt-4">
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 sm:py-4 rounded-lg text-sm sm:text-lg disabled:bg-gray-400">
                    {loading ? t.checkoutPage.processing : t.checkoutPage.cta}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2">🔒 {t.currency === "USD" ? "Secure payment powered by Stripe" : "Pagamento seguro via Stripe"}</p>
                </div>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold mb-3 border-b pb-3">{t.checkoutPage.yourOrder}</h2>
                {items.map(item => (<div key={item.id} className="flex justify-between py-2 text-xs sm:text-sm"><span className="truncate pr-2">{item.name}</span><span className="font-semibold flex-shrink-0">{currencySymbol} {item.price.toFixed(2)}</span></div>))}
                <div className="border-t mt-3 pt-3 space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between"><span>{t.carrinho.subtotal}</span><span>{currencySymbol} {subtotalDisplay.toFixed(2)}</span></div>
                  {needsShipping && <div className="flex justify-between"><span>{t.carrinho.shipping}</span><span>{currencySymbol} {shipping.toFixed(2)}</span></div>}
                  <div className="flex justify-between font-bold text-base mt-2"><span>{t.carrinho.total}</span><span>{currencySymbol} {total.toFixed(2)}</span></div>
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
