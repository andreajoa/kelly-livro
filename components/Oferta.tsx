"use client"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"
import ShippingCalculator from "./ShippingCalculator"

export default function Oferta() {
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { t, locale } = useLang()
  const currencySymbol = t.currency === "USD" ? "$" : "R$"

  const handleComprar = (type: "physical" | "digital") => {
    const isDigital = type === "digital"
    const price = isDigital ? ((t as any).digitalPrice ?? t.price) : t.price
    const name = isDigital ? ((t as any).digitalProductName ?? t.productName) : t.productName
    addItem({ id: uuidv4(), name, price, quantity: 1, productType: type })
    trackEvent("add_to_cart", `/${locale}`, { source: "oferta", type })
    router.push(`/${locale}/carrinho`)
  }

  // EN e ES: só produto digital
  if (locale !== "pt") {
    return (
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="oferta">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.oferta.badge}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">
              {t.oferta.title} <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">{t.oferta.titleHighlight}</span>
            </h2>
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
                <button onClick={() => handleComprar("digital")}
                  className="w-full mt-2 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 rounded-full text-sm sm:text-lg shadow-2xl uppercase tracking-wider">
                  {t.oferta.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // PT: dois produtos — físico + digital
  return (
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
              <button onClick={() => handleComprar("physical")}
                className="w-full mt-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold py-3 rounded-full text-sm shadow-xl uppercase tracking-wider">
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
            </div>
            <div className="border-t-2 border-dashed border-rosa-200 my-4" />
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">
                De <span className="line-through">R$ {(t as any).digitalOldPrice ?? 147.toFixed(2)}</span> por
              </p>
              <span className="text-3xl sm:text-4xl font-playfair font-bold text-rosa-700">R$ {(t.digitalPrice ?? 97).toFixed(2)}</span>
              <p className="text-gray-400 text-xs mb-4 mt-1">à vista no cartão ou PIX</p>
              <button onClick={() => handleComprar("digital")}
                className="w-full mt-2 bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 rounded-full text-sm shadow-2xl uppercase tracking-wider">
                🎧 Quero o eBook + Audiobook
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
