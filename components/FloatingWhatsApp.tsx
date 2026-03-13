"use client"
import Link from "next/link"
import { useLang } from "@/lib/LangContext"

export default function FloatingWhatsApp() {
  const { t, locale } = useLang()

  // Número de WhatsApp: +1 (857) 244-3842
  const phoneNumber = "18572443842"
  const message = locale === "pt"
    ? "Olá Kelly! Estava no seu website e vi o seu livro. Podemos conversar rapidinho?"
    : locale === "es"
    ? "¡Hola Kelly! Estoy en tu sitio web y vi tu libro. ¿Podemos hablar un momento?"
    : "Hi Kelly! I was on your website and saw your book. Can we chat quickly?"

  // Link para WhatsApp Web
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  // Só mostra no PT (como você pediu)
  if (locale !== "pt") return null

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </Link>
  )
}
