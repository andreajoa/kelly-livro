"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

function SuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const { locale } = useLang()
  const orderId = searchParams.get("order_id")

  useEffect(() => { clearCart() }, [clearCart])

  const content = {
    pt: { title: "Pagamento Confirmado!", subtitle: "Obrigado pela sua compra!", message: "Você receberá um e-mail com os detalhes. Seu livro será enviado em breve!", back: "Voltar ao início" },
    en: { title: "Payment Confirmed!", subtitle: "Thank you for your purchase!", message: "You will receive an email with your download links shortly!", back: "Back to Home" },
    es: { title: "¡Pago Confirmado!", subtitle: "¡Gracias por tu compra!", message: "¡Recibirás un correo con los enlaces de descarga pronto!", back: "Volver al inicio" },
  }
  const c = content[locale as keyof typeof content] || content.en

  return (
    <div className="text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 sm:p-14 max-w-lg">
      <div className="text-6xl sm:text-7xl mb-6">🎉</div>
      <h1 className="text-2xl sm:text-4xl font-playfair font-bold text-gray-900 mb-2">{c.title}</h1>
      <p className="text-lg text-rosa-600 font-semibold mb-4">{c.subtitle}</p>
      {orderId && <p className="text-sm text-gray-500 mb-4 bg-gray-100 inline-block px-4 py-2 rounded-full">Pedido #{orderId}</p>}
      <p className="text-gray-600 text-sm sm:text-base mb-8">{c.message}</p>
      <a href={`/${locale}`} className="bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3 px-8 rounded-full inline-block">{c.back}</a>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center bg-gradient-to-b from-rosa-50 to-white">
        <Suspense fallback={<div className="text-center"><div className="text-4xl mb-4">⏳</div><p>Carregando...</p></div>}>
          <SuccessContent />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}
