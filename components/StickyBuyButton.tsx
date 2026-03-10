"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"

export default function StickyBuyButton() {
  const [visible, setVisible] = useState(false)
  const addItem = useCart((s) => s.addItem)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 800)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const handleComprar = () => {
    addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119, quantity: 1 })
    alert("Livro adicionado ao carrinho!")
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t shadow-2xl p-4 animate-fade-in-up">
      <button onClick={handleComprar} className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3 px-10 rounded-full text-base shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
        🛒 Comprar — R$ 119,00
      </button>
    </div>
  )
}
