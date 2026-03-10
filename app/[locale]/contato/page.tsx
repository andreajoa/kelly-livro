"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { useLang } from "@/lib/LangContext"

export default function ContatoPage() {
  const { t, locale } = useLang()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
      await fetch(`${API}/api/orders/lead-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      })
      setSent(true)
    } catch { alert("Error") }
  }

  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-3">{t.contatoPage.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.contatoPage.titleHighlight}</span></h1>
            <p className="text-gray-600 text-sm sm:text-base">{t.contatoPage.subtitle}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 md:p-12">
            {sent ? (
              <div className="text-center py-8"><div className="text-5xl mb-4">✅</div><p className="text-xl font-bold">Message sent!</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div><label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 block">{t.contatoPage.name}</label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" /></div>
                <div><label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 block">{t.contatoPage.email}</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" /></div>
                <div><label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 block">{t.contatoPage.message}</label><textarea rows={4} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 resize-none text-sm sm:text-base" /></div>
                <button type="submit" className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3 sm:py-4 rounded-full text-sm sm:text-lg uppercase tracking-wide mt-2">{t.contatoPage.cta}</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
