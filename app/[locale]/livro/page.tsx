"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function LivroPage() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()

  const currencySymbol = t.currency === "USD" ? "$" : "R$"

  const handleComprar = () => {
    addItem({ 
      id: uuidv4(), 
      name: t.productName, 
      price: t.price, 
      quantity: 1 
    })
    trackEvent("add_to_cart", "/livro", { source: "livro_page" })
    router.push(`/${locale}/carrinho`)
  }

  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="flex justify-center animate-fade-in">
              <img src="/images/livro-produto.png" alt="Book" className="w-48 sm:w-64 md:w-80 rounded-xl shadow-2xl" />
            </div>
            <div className="animate-fade-in-up text-center md:text-left">
              <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.livroPage.badge}</span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-3 mb-4 sm:mb-6">{t.livroPage.title}<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.livroPage.titleHighlight}</span></h1>
              <p className="text-sm sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">{t.livroPage.desc}</p>
              <div className="flex items-baseline gap-3 justify-center md:justify-start mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700">{currencySymbol} {t.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through">{currencySymbol} {t.oldPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleComprar} className="w-full sm:w-auto bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-lg shadow-lg transform hover:scale-105 transition-all uppercase tracking-wide">{t.livroPage.cta}</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
