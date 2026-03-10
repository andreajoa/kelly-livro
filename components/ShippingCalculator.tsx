"use client"
import { useState } from "react"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

export default function ShippingCalculator() {
  const { cep, setCep, shippingCost, setShippingCost } = useCart()
  const { t } = useLang()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!t.showShipping) return null

  const handleCalculate = async () => {
    if (cep.replace(/\D/g, "").length !== 8) { setError(t.shipping.error); setShippingCost(null); return }
    setLoading(true); setError(""); setShippingCost(null)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setShippingCost(Math.random() * 20 + 15); setLoading(false)
  }

  return (
    <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{t.shipping.title}</h3>
      <div className="flex items-stretch gap-2">
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder={t.shipping.placeholder} maxLength={9} className="flex-1 min-w-0 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm" />
        <button onClick={handleCalculate} disabled={loading} className="bg-gray-800 text-white px-4 sm:px-6 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 text-sm flex-shrink-0">{loading ? "..." : t.shipping.button}</button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {shippingCost && <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"><p className="text-green-700 font-semibold text-sm">{t.shipping.cost}: R$ {shippingCost.toFixed(2)}</p><p className="text-green-600 text-xs">{t.shipping.delivery}</p></div>}
    </div>
  )
}
