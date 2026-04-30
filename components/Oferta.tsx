"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"
import ShippingCalculator from "./ShippingCalculator"
import { useState } from "react"

function ShippingNotice({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8 text-xs sm:text-sm">
      <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
        🌍 eBook + Audiobook — Disponível globalmente
      </span>
      <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-medium">
        🇧🇷 Livro físico — Envio apenas para o Brasil
      </span>
    </div>
  )
}

export default function Oferta() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()
  const currencySymbol = t.currency === "USD" ? "$" : "R$"
  const [showLangModal, setShowLangModal] = useState(false)

  const addToCart = (type: "physical" | "digital", lang: "pt" | "en") => {
    const isDigital = type === "digital"
    const price = isDigital ? ((t as any).digitalPrice ?? t.price) : t.price
    const name = isDigital ? ((t as any).digitalProductName ?? t.productName) : t.productName
    addItem({ id: uuidv4(), name, price, quantity: 1, productType: type, language: lang } as any)
    trackEvent("add_to_cart", `/${locale}`, { source: "oferta", type, lang })
    setShowLangModal(false)
    router.push(`/${locale}/carrinho`)
  }

  const handleComprar = (type: "physical" | "digital") => {
    if (type === "digital") {
      setShowLangModal(true)
      return
    }
    addToCart("physical", "pt")
  }

  const LangModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={() => setShowLangModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">🌍</div>
        <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2">
          {locale === "pt" ? "Escolha o idioma" : locale === "es" ? "Elige el idioma" : "Choose language"}
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          {locale === "pt"
            ? "Em qual idioma você quer receber o eBook e Audiobook?"
            : locale === "es"
            ? "¿En qué idioma quieres recibir el eBook y el Audiolibro?"
            : "In which language would you like to receive the eBook and Audiobook?"}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => addToCart("digital", "pt")}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-base shadow-lg transition-all"
          >
            🇧🇷 Português
          </button>
          <button
            onClick={() => addToCart("digital", "en")}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base shadow-lg transition-all"
          >
            🇺🇸 English
          </button>
        </div>
        <button
          onClick={() => setShowLangModal(false)}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600"
        >
          {locale === "pt" ? "Cancelar" : "Cancel"}
        </button>
      </div>
    </div>
  )

  // EN e ES: só produto digital
  if (locale !== "pt") {
    return (
      <>
        {showLangModal && <LangModal />}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.oferta.badge}</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">
                {t.oferta.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.oferta.titleHighlight}</span>
              </h2>
              <ShippingNotice locale={locale} />
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img src={t.bookImage} alt="Book" className="w-48 sm:w-64 md:w-72 rounded-xl shadow-2xl" />
              </div>
              <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-rosa-100 text-rosa-700">🎧 eBook + Audiobook</span>
                </div>
                <div className="space-y-3 mb-6">
                  {t.oferta.items.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-dashed border-rosa-200 my-4" />
                <div className="text-center">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">
                    {t.oferta.from} <span className="line-through">{currencySymbol} {t.oldPrice.toFixed(2)}</span> {t.oferta.priceLabel}
                  </p>
                  <span className="text-4xl sm:text-5xl font-playfair font-bold text-rosa-700">{currencySymbol} {t.price.toFixed(2)}</span>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4 mt-1">{t.oferta.installments}</p>
                  <button
                    onClick={() => handleComprar("digital")}
                    className="w-full mt-2 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 rounded-full text-sm sm:text-lg shadow-2xl uppercase tracking-wider"
                  >
                    {t.oferta.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // PT: dois produtos — físico + digital
  return (
    <>
      {showLangModal && <LangModal />}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.oferta.badge}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">
              {t.oferta.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.oferta.titleHighlight}</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">Escolha o formato ideal para você</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">

            {/* CARD 1 — Livro Físico */}
            <div className="bg-white/70 backdrop-blur-md border-2 border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-600">📦 Livro Físico</span>
              </div>
              <div className="flex justify-center mb-6">
                <img src="/images/livro-produto.png" alt="Livro Físico" className="w-36 sm:w-44 rounded-xl shadow-lg" />
              </div>
              <div className="space-y-2 mb-6 flex-1">
                {t.oferta.items.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-dashed border-rosa-100 my-4" />
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">
                  De <span className="line-through">R$ {t.oldPrice.toFixed(2)}</span> por
                </p>
                <span className="text-3xl sm:text-4xl font-playfair font-bold text-gray-800">R$ {t.price.toFixed(2)}</span>
                <p className="text-gray-400 text-xs mb-4 mt-1">{t.oferta.installments}</p>
                <ShippingCalculator />
                <button
                  onClick={() => handleComprar("physical")}
                  className="w-full mt-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold py-3 rounded-full text-sm shadow-xl uppercase tracking-wider"
                >
                  Comprar Livro Físico
                </button>
              </div>
            </div>

            {/* CARD 2 — eBook + Audiobook */}
            <div className="relative bg-white/70 backdrop-blur-md border-2 border-rosa-300 rounded-2xl shadow-2xl p-5 sm:p-8 flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-rosa-600 to-rosa-700 text-white text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-md">⭐ Mais Popular</span>
              </div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-rosa-100 text-rosa-700">🎧 eBook + Audiobook</span>
              </div>
              <div className="flex justify-center mb-6">
                <img src="/images/capa-livro.png" alt="eBook + Audiobook" className="w-36 sm:w-44 rounded-xl shadow-lg" />
              </div>
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span className="text-gray-700 font-medium">eBook em PDF (acesso imediato)</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span className="text-gray-700 font-medium">Audiobook completo (10 faixas)</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span className="text-gray-700">Acesso vitalício na biblioteca digital</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span className="text-gray-700">Sem frete — entrega instantânea</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span className="text-gray-700">Disponível em Português e Inglês</span></div>
              </div>
              <div className="border-t-2 border-dashed border-rosa-200 my-4" />
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">
                  De <span className="line-through">R$ {((t as any).digitalOldPrice ?? 147).toFixed(2)}</span> por
                </p>
                <span className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700">R$ {((t as any).digitalPrice ?? 97).toFixed(2)}</span>
                <p className="text-gray-400 text-xs mb-4 mt-1">à vista no cartão ou PIX</p>
                <button
                  onClick={() => handleComprar("digital")}
                  className="w-full mt-2 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 rounded-full text-sm shadow-2xl uppercase tracking-wider"
                >
                  🎧 Quero o eBook + Audiobook
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
