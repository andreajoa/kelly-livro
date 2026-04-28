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
  const productType = searchParams.get("product_type") ?? "physical"
  const isDigital = productType === "digital"

  useEffect(() => { clearCart() }, [clearCart])

  const content = {
    pt: {
      physical: {
        emoji: "📦",
        title: "Pedido Confirmado!",
        subtitle: "Obrigada pela sua compra!",
        message: "Você receberá um e-mail de confirmação em breve. Seu livro será enviado em até 3 dias úteis e você receberá o código de rastreio assim que o envio for realizado.",
        back: "Voltar ao início",
      },
      digital: {
        emoji: "🎉",
        title: "Pagamento Confirmado!",
        subtitle: "Obrigada pela sua compra!",
        message: "Acesse agora sua biblioteca exclusiva com o eBook e o Audiobook disponíveis para você!",
        cta: "Acessar minha biblioteca →",
        back: "Voltar ao início",
      },
    },
    en: {
      physical: {
        emoji: "📦",
        title: "Order Confirmed!",
        subtitle: "Thank you for your purchase!",
        message: "You will receive a confirmation email shortly. Your book will be shipped within 3 business days and you will receive the tracking code as soon as it is dispatched.",
        back: "Back to Home",
      },
      digital: {
        emoji: "🎉",
        title: "Payment Confirmed!",
        subtitle: "Thank you for your purchase!",
        message: "Access your exclusive library now with the eBook and Audiobook available for you!",
        cta: "Access my library →",
        back: "Back to Home",
      },
    },
    es: {
      physical: {
        emoji: "📦",
        title: "¡Pedido Confirmado!",
        subtitle: "¡Gracias por tu compra!",
        message: "Recibirás un correo de confirmación pronto. Tu libro será enviado en hasta 3 días hábiles y recibirás el código de seguimiento en cuanto sea despachado.",
        back: "Volver al inicio",
      },
      digital: {
        emoji: "🎉",
        title: "¡Pago Confirmado!",
        subtitle: "¡Gracias por tu compra!",
        message: "¡Accede ahora a tu biblioteca exclusiva con el eBook y el Audiolibro disponibles para ti!",
        cta: "Acceder a mi biblioteca →",
        back: "Volver al inicio",
      },
    },
  }

  const lang = content[locale as keyof typeof content] ?? content.en
  const c = lang[productType as "digital" | "physical"] ?? lang.physical

  return (
    <div
      className="text-center rounded-2xl shadow-xl p-8 sm:p-14 max-w-lg w-full mx-4"
      style={{
        background: isDigital ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.70)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isDigital ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(255,255,255,0.20)",
      }}
    >
      <div className="text-6xl sm:text-7xl mb-6">{c.emoji}</div>

      <h1
        className="text-2xl sm:text-4xl font-playfair font-bold mb-2"
        style={{ color: isDigital ? "#fff" : "#111827" }}
      >
        {c.title}
      </h1>

      <p className="text-lg font-semibold mb-4" style={{ color: isDigital ? "rgba(244,114,182,0.9)" : "#be185d" }}>
        {c.subtitle}
      </p>

      {orderId && (
        <p
          className="text-sm mb-4 inline-block px-4 py-2 rounded-full"
          style={{
            background: isDigital ? "rgba(255,255,255,0.06)" : "#f3f4f6",
            color: isDigital ? "rgba(255,255,255,0.45)" : "#6b7280",
          }}
        >
          Pedido #{orderId}
        </p>
      )}

      <p
        className="text-sm sm:text-base mb-8 leading-relaxed"
        style={{ color: isDigital ? "rgba(255,255,255,0.60)" : "#4b5563" }}
      >
        {c.message}
      </p>

      <div className="flex flex-col gap-3 items-center">
        {isDigital && "cta" in c && (
          <a
            href={`/${locale}/minha-biblioteca?order_id=${orderId}&product_type=digital`}
            className="w-full font-bold py-3 px-8 rounded-full inline-block text-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ec4899, #be185d)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(236,72,153,0.4)",
            }}
          >
            {c.cta}
          </a>
        )}
        <a
          href={`/${locale}`}
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: isDigital ? "rgba(244,114,182,0.7)" : "#be185d" }}
        >
          ← {c.back}
        </a>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main>
      <Navbar />
      <section
        className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #fdf2f8, #ffffff)" }}
      >
        <Suspense fallback={<div className="text-center"><div className="text-4xl mb-4">⏳</div><p>Carregando...</p></div>}>
          <SuccessContent />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}
