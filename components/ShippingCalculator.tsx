"use client"
import { useState } from "react"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

const FRETE_POR_ESTADO: Record<string, number> = {
  SP: 25.90, RJ: 28.90, MG: 27.90, ES: 29.90,
  PR: 29.90, SC: 31.90, RS: 33.90,
  GO: 34.90, MT: 37.90, MS: 35.90, DF: 34.90,
  BA: 38.90, SE: 39.90, AL: 40.90, PE: 39.90,
  PB: 41.90, RN: 41.90, CE: 40.90, PI: 42.90, MA: 43.90,
  PA: 45.90, AM: 49.90, RO: 47.90, AC: 52.90,
  AP: 50.90, RR: 51.90, TO: 44.90,
}

export default function ShippingCalculator() {
  const { cep, setCep, shippingCost, setShippingCost, setAddress } = useCart()
  const { t } = useLang()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [addressFound, setAddressFound] = useState("")

  if (!t.showShipping) return null

  const handleCalculate = async () => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) {
      setError(t.shipping.error)
      setShippingCost(null)
      return
    }
    setLoading(true)
    setError("")
    setShippingCost(null)
    setAddressFound("")
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await res.json()
      if (data.erro) {
        setError("CEP nao encontrado. Verifique e tente novamente.")
        setLoading(false)
        return
      }
      const estado = data.uf
      const frete = FRETE_POR_ESTADO[estado] ?? 49.90
      const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
      setShippingCost(frete)
      setAddressFound(enderecoCompleto)
      setAddress({
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        cityState: `${data.localidade} - ${data.uf}`,
      })
    } catch {
      setError("Erro ao consultar CEP. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const formatCep = (value: string) => {
    const clean = value.replace(/\D/g, "")
    if (clean.length <= 5) return clean
    return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`
  }

  return (
    <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{t.shipping.title}</h3>
      <div className="flex items-stretch gap-2">
        <input type="text" value={cep} onChange={(e) => setCep(formatCep(e.target.value))} placeholder={t.shipping.placeholder} maxLength={9} className="flex-1 min-w-0 border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm" />
        <button onClick={handleCalculate} disabled={loading} className="bg-gray-800 text-white px-4 sm:px-6 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 text-sm flex-shrink-0">{loading ? "..." : t.shipping.button}</button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {shippingCost && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          {addressFound && <p className="text-gray-600 text-xs mb-1">📍 {addressFound}</p>}
          <p className="text-green-700 font-semibold text-sm">{t.shipping.cost}: R$ {shippingCost.toFixed(2)}</p>
          <p className="text-green-600 text-xs">{t.shipping.delivery}</p>
        </div>
      )}
    </div>
  )
}
