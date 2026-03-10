"use client"

import { useState } from "react"
import { useCart } from "@/store/cartStore"

export default function ShippingCalculator() {
  const { cep, setCep, shippingCost, setShippingCost } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCalculate = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      setError("CEP invalido. Insira 8 digitos.")
      setShippingCost(null)
      return
    }
    setLoading(true)
    setError("")
    setShippingCost(null)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const randomCost = Math.random() * (35 - 15) + 15
    setShippingCost(randomCost)
    setLoading(false)
  }

  return (
    <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6">
      <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">📦 Calcular frete</h3>
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Seu CEP"
          maxLength={9}
          className="flex-1 min-w-0 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base"
        />
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="bg-gray-800 text-white px-4 sm:px-6 rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400 text-sm sm:text-base flex-shrink-0"
        >
          {loading ? "..." : "Calcular"}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm mt-2">{error}</p>}
      {shippingCost && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-semibold text-sm sm:text-base">Frete: R$ {shippingCost.toFixed(2)}</p>
          <p className="text-green-600 text-xs sm:text-sm">Entrega estimada: 5-10 dias uteis</p>
        </div>
      )}
    </div>
  )
}
