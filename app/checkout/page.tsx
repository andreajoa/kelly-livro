"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, shipping } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shipping?.price || 0
  const total = subtotal + shippingCost

  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    cep: shipping?.cep || "",
    logradouro: shipping?.logradouro || "",
    numero: "",
    complemento: "",
    bairro: shipping?.bairro || "",
    cidade: shipping?.city || "",
    estado: shipping?.state || "",
    referencia: "",
  })

  const [cepLoading, setCepLoading] = useState(false)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11)
    if (nums.length > 6) return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`
    if (nums.length > 2) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`
    return nums
  }

  const formatCep = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 8)
    if (nums.length > 5) return nums.slice(0, 5) + "-" + nums.slice(5)
    return nums
  }

  const buscarCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, "")
    if (clean.length !== 8) return

    setCepLoading(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro || prev.logradouro,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          estado: data.uf || prev.estado,
        }))
      }
    } catch {}
    setCepLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.nome || !form.whatsapp || !form.email || !form.cep || !form.logradouro || !form.numero || !form.bairro || !form.cidade || !form.estado) {
      alert("Por favor, preencha todos os campos obrigatorios.")
      return
    }

    alert("Redirecionando para pagamento seguro via Stripe...\n\nEm producao, aqui voce seria redirecionado para a pagina de pagamento da Stripe.")
  }

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-14">
              <div className="text-6xl mb-6">🛒</div>
              <p className="text-gray-500 text-lg mb-6">Seu carrinho esta vazio</p>
              <Link href="/livro" className="bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wide inline-block">← Ver o livro</Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Finalize sua compra</span>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mt-4">Checkout <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Seguro</span></h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 md:p-8">
                  <h2 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">👤 Dados Pessoais</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Nome completo *</label>
                      <input type="text" value={form.nome} onChange={(e) => updateField("nome", e.target.value)} placeholder="Seu nome completo" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">WhatsApp *</label>
                        <input type="tel" value={form.whatsapp} onChange={(e) => updateField("whatsapp", formatPhone(e.target.value))} placeholder="(00) 00000-0000" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">E-mail *</label>
                        <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="seuemail@exemplo.com" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 md:p-8">
                  <h2 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">📍 Endereco de Entrega</h2>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">CEP *</label>
                        <input
                          type="text"
                          value={form.cep}
                          onChange={(e) => {
                            const v = formatCep(e.target.value)
                            updateField("cep", v)
                            if (v.replace(/\D/g, "").length === 8) buscarCep(v)
                          }}
                          placeholder="00000-000"
                          maxLength={9}
                          className="w-full border-2 border-gray-200 p-3 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                          required
                        />
                        {cepLoading && <p className="text-rosa-500 text-xs mt-1">Buscando endereco...</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Rua / Logradouro *</label>
                        <input type="text" value={form.logradouro} onChange={(e) => updateField("logradouro", e.target.value)} placeholder="Rua, Avenida..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Numero *</label>
                        <input type="text" value={form.numero} onChange={(e) => updateField("numero", e.target.value)} placeholder="123" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Complemento</label>
                        <input type="text" value={form.complemento} onChange={(e) => updateField("complemento", e.target.value)} placeholder="Apto, Bloco..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Bairro *</label>
                        <input type="text" value={form.bairro} onChange={(e) => updateField("bairro", e.target.value)} placeholder="Bairro" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Cidade *</label>
                        <input type="text" value={form.cidade} onChange={(e) => updateField("cidade", e.target.value)} placeholder="Cidade" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Estado *</label>
                        <input type="text" value={form.estado} onChange={(e) => updateField("estado", e.target.value.toUpperCase().slice(0, 2))} placeholder="UF" maxLength={2} className="w-full border-2 border-gray-200 p-3 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Ponto de Referencia</label>
                      <input type="text" value={form.referencia} onChange={(e) => updateField("referencia", e.target.value)} placeholder="Proximo a, em frente a..." className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-5 px-10 rounded-full text-xl shadow-2xl shadow-rosa-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider">
                  🔒 Ir para pagamento seguro
                </button>

                <p className="text-center text-gray-400 text-xs">Voce sera redirecionado para o ambiente seguro da Stripe para finalizar o pagamento.</p>
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sticky top-32">
                <h2 className="font-bold text-gray-900 text-lg mb-6">Resumo do Pedido</h2>

                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <img src="/images/capa-livro.png" alt={item.name} className="w-14 h-18 object-cover rounded-lg shadow" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                      <p className="text-rosa-600 font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 text-sm mt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete ({shipping?.method || "—"})</span>
                    <span>{shipping ? `R$ ${shipping.price.toFixed(2)}` : "—"}</span>
                  </div>
                  {shipping && (
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span>Entrega</span>
                      <span>{shipping.estimatedDays} dias uteis</span>
                    </div>
                  )}
                  <div className="border-t-2 border-dashed border-gray-200 my-3" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900 text-lg">Total</span>
                    <span className="text-2xl font-playfair font-bold text-rosa-700">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-gray-400 text-xs text-center">
                  <p>🔒 Pagamento seguro via Stripe</p>
                  <p>🛡️ Garantia de 7 dias</p>
                  <p>📦 Envio pelos Correios</p>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-700 text-xs font-semibold text-center">✅ Incluso: Carta da autora + Guia digital + Garantia 7 dias</p>
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
