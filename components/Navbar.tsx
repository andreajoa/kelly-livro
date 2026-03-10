"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/store/cartStore"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const items = useCart((s) => s.items)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-3" : "bg-transparent py-4 sm:py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/">
          <span className={`font-playfair text-lg sm:text-2xl font-bold transition-colors duration-300 ${scrolled ? "text-rosa-700" : "text-white"}`}>
            Antes que eu
            <span className="block text-[10px] sm:text-sm font-lato font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase">entendesse</span>
          </span>
        </Link>

        <div className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-wide uppercase ${scrolled ? "text-gray-700" : "text-white/90"}`}>
          <Link href="/" className="hover:text-rosa-500 transition-colors">Inicio</Link>
          <Link href="/livro" className="hover:text-rosa-500 transition-colors">O Livro</Link>
          <Link href="/kelly" className="hover:text-rosa-500 transition-colors">Kelly</Link>
          <Link href="/contato" className="hover:text-rosa-500 transition-colors">Contato</Link>
          <Link href="/carrinho" className="relative">
            <span className="hover:text-rosa-500 transition-colors">🛒</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-rosa-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.length}</span>
            )}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-1 ${scrolled ? "text-gray-700" : "text-white"}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t animate-fade-in-down">
          <div className="flex flex-col p-4 gap-3 text-gray-700 font-medium text-sm">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2 border-b border-gray-100">Inicio</Link>
            <Link href="/livro" onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2 border-b border-gray-100">O Livro</Link>
            <Link href="/kelly" onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2 border-b border-gray-100">Kelly</Link>
            <Link href="/contato" onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2 border-b border-gray-100">Contato</Link>
            <Link href="/carrinho" onClick={() => setMenuOpen(false)} className="hover:text-rosa-600 py-2">🛒 Carrinho ({items.length})</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
