"use client"
import { useState, useEffect } from "react"
import { useCart } from "@/store/cartStore"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/api"
import { useLang } from "@/lib/LangContext"

export default function StickyBuyButton() {
  const [visible, setVisible] = useState(false)
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const { locale } = useLang()
  useEffect(() => { const h = () => setVisible(window.scrollY > 800); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h) }, [])
  const handleComprar = () => { addItem({ id: uuidv4(), name: "Antes que eu entendesse — Kelly Marques", price: 119.0, quantity: 1 }); trackEvent("add_to_cart", "/", { source: "sticky" }); router.push(`/${locale}/carrinho`) }
  if (!visible) return null
  return (<div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t shadow-2xl px-4 py-3 safe-bottom"><button onClick={handleComprar} className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3.5 rounded-full text-sm uppercase tracking-wide shadow-lg">🛒 R$ 119,00</button></div>)
}
