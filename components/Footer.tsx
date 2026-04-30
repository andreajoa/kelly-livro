"use client"
import Link from "next/link"
import { useLang } from "@/lib/LangContext"

export default function Footer() {
  const { t, locale } = useLang()

  // Textos traduzidos para o contato
  const contactLabel = locale === "pt" ? "Contato" : locale === "es" ? "Contacto" : "Contact"
  
  // Nome do livro por idioma
  const bookTitle = {
    pt: "Antes que eu entendesse",
    en: "Before I Understood",
    es: "Antes de que yo entendiera",
  }
  const title = bookTitle[locale as keyof typeof bookTitle] || bookTitle.pt

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-playfair text-lg font-bold text-white mb-3">{title}</h3>
            <p className="text-xs sm:text-sm leading-relaxed">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">{t.footer.navigation}</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <Link href={`/${locale}`} className="hover:text-rosa-400">{t.nav.home}</Link>
              <Link href={`/${locale}/livro`} className="hover:text-rosa-400">{t.nav.book}</Link>
              <Link href={`/${locale}/kelly`} className="hover:text-rosa-400">{t.nav.author}</Link>
              <Link href={`/${locale}/contato`} className="hover:text-rosa-400">{t.nav.contact}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">{t.footer.legal}</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <Link href={`/${locale}/privacidade`} className="hover:text-rosa-400">{t.footer.privacy}</Link>
              <Link href={`/${locale}/cookies`} className="hover:text-rosa-400">{t.footer.cookiesLink}</Link>
              <Link href={`/${locale}/termos`} className="hover:text-rosa-400">{t.footer.terms}</Link>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">{t.footer.contactTitle}</h4>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <a href="mailto:kellymarquesstripe@proton.me" className="hover:text-rosa-400">📧 kellymarquesstripe@proton.me</a>
              <a href="https://wa.me/18572443842" target="_blank" rel="noopener noreferrer" className="hover:text-rosa-400">📱 {contactLabel}: +1 (857) 244-3842</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-[10px] sm:text-xs">
          <p>© 2025 Kelly Marques</p>
        </div>
      </div>
    </footer>
  )
}
