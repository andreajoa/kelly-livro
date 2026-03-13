"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const items = useCart((s) => s.items)
  const { t, locale } = useLang()

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h) }, [])

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/livro`, label: t.nav.book },
    { href: `/${locale}/kelly`, label: t.nav.author },
    { href: `/${locale}/contato`, label: t.nav.contact },
  ]

  // Nome do livro por idioma
  const bookTitle = {
    pt: { line1: "Antes que eu", line2: "entendesse" },
    en: { line1: "Before I", line2: "Understood" },
    es: { line1: "Antes de que yo", line2: "entendiera" },
  }
  const title = bookTitle[locale as keyof typeof bookTitle] || bookTitle.pt

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-3" : "bg-transparent py-4 sm:py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href={`/${locale}`}><span className={`font-playfair text-lg sm:text-2xl font-bold ${scrolled ? "text-rosa-700" : "text-white"}`}>{title.line1}<span className="block text-[10px] sm:text-sm font-lato font-light tracking-[0.2em] uppercase">{title.line2}</span></span></Link>
        <div className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-wide uppercase ${scrolled ? "text-gray-700" : "text-white/90"}`}>
          {links.map((l) => <Link key={l.href} href={l.href} className="hover:text-rosa-500 transition-colors">{l.label}</Link>)}
          <div className="flex gap-2 ml-4 text-xs">
            {["pt","en","es"].map(l => <Link key={l} href={`/${l}`} className={`px-2 py-1 rounded ${locale === l ? "bg-rosa-600 text-white" : "opacity-60 hover:opacity-100"}`}>{l.toUpperCase()}</Link>)}
          </div>
          <Link href={`/${locale}/carrinho`} className="relative"><span>🛒</span>{items.length > 0 && <span className="absolute -top-2 -right-3 bg-rosa-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.length}</span>}</Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-1 ${scrolled ? "text-gray-700" : "text-white"}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg></button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t animate-fade-in-down">
          <div className="flex flex-col p-4 gap-3 text-gray-700 font-medium text-sm">
            {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2 border-b border-gray-100">{l.label}</Link>)}
            <Link href={`/${locale}/carrinho`} onClick={() => setMenuOpen(false)} className="py-2">🛒 {t.nav.cart} ({items.length})</Link>
            <div className="flex gap-2 pt-2">{["pt","en","es"].map(l => <Link key={l} href={`/${l}`} className={`px-3 py-1 rounded text-xs ${locale === l ? "bg-rosa-600 text-white" : "bg-gray-100"}`}>{l.toUpperCase()}</Link>)}</div>
          </div>
        </div>
      )}
    </nav>
  )
}
