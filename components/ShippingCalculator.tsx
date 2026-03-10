"use client"

import { useState } from "react"
import { useCart } from "@/store/cartStore"

interface ShippingOption {
  method: string
  price: number
  estimatedDays: number
  label: string
  icon: string
}

function getShippingByState(uf: string): ShippingOption[] {
  const southeast = ["SP", "RJ", "MG", "ES"]
  const south = ["PR", "SC", "RS"]
  const centerWest = ["GO", "DF", "MT", "MS"]
  const northeast = ["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"]
  const north = ["AC", "AM", "AP", "PA", "RO", "RR", "TO"]

  if (southeast.includes(uf)) return [
    { method: "PAC", price: 15.90, estimatedDays: 7, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 24.90, estimatedDays: 3, label: "SEDEX - Rapido", icon: "🚀" },
  ]
  if (south.includes(uf)) return [
    { method: "PAC", price: 19.90, estimatedDays: 8, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 29.90, estimatedDays: 4, label: "SEDEX - Rapido", icon: "🚀" },
  ]
  if (centerWest.includes(uf)) return [
    { method: "PAC", price: 22.90, estimatedDays: 9, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 34.90, estimatedDays: 5, label: "SEDEX - Rapido", icon: "🚀" },
  ]
  if (northeast.includes(uf)) return [
    { method: "PAC", price: 25.90, estimatedDays: 11, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 38.90, estimatedDays: 6, label: "SEDEX - Rapido", icon: "🚀" },
  ]
  if (north.includes(uf)) return [
    { method: "PAC", price: 29.90, estimatedDays: 13, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 42.90, estimatedDays: 7, label: "SEDEX - Rapido", icon: "🚀" },
  ]
  return [
    { method: "PAC", price: 25.90, estimatedDays: 12, label: "PAC - Economico", icon: "📦" },
    { method: "SEDEX", price: 38.90, estimatedDays: 6, label: "SEDEX - Rapido", icon: "🚀" },
  ]
}

export default function ShippingCalculator() {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [options, setOptions] = useState<ShippingOption[]>([])
  const [addressInfo, setAddressInfo] = useState<{ city: string; state: string; logradouro: string; bairro: string } | null>(null)
  const { shipping, setShipping } = useCart()

  const formatCep = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 8)
    if (nums.length > 5) return nums.slice(0, 5) + "-" + nums.slice(5)
    return nums
  }

  const calcular = async () => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) {
      setError("CEP invalido. Digite 8 numeros.")
      return
    }

    setLoading(true)
    setError("")
    setOptions([])
    setAddressInfo(null)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await res.json()

      if (data.erro) {
        setError("CEP nao encontrado. Verifique e tente novamente.")
        setLoading(false)
        return
      }

      const info = {
        city: data.localidade,
        state: data.uf,
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
      }
      setAddressInfo(info)
      setOptions(getShippingByState(data.uf))
    } catch {
      setError("Erro ao consultar CEP. Tente novamente.")
    }

    setLoading(false)
  }

  const selectOption = (opt: ShippingOption) => {
    if (!addressInfo) return
    setShipping({
      cep: cep.replace(/\D/g, ""),
      method: opt.method,
      price: opt.price,
      estimatedDays: opt.estimatedDays,
      city: addressInfo.city,
      state: addressInfo.state,
      logradouro: addressInfo.logradouro,
      bairro: addressInfo.bairro,
    })
  }

  return (
    <div className="border-2 border-rosa-200 rounded-2xl p-6 bg-rosa-50/50">
      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
        📦 Calcular Frete
      </h3>

      <div className="flex gap-3">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          placeholder="00000-000"
          maxLength={9}
          className="flex-1 border-2 border-gray-200 p-3 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
          onKeyDown={(e) => e.key === "Enter" && calcular()}
        />
        <button
          onClick={calcular}
          disabled={loading}
          className="bg-rosa-600 hover:bg-rosa-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-sm uppercase tracking-wide"
        >
          {loading ? "..." : "Calcular"}
        </button>
      </div>

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        className="text-rosa-600 text-xs mt-2 inline-block hover:underline"
      >
        Nao sei meu CEP →
      </a>

      {error && (
        <p className="text-red-500 text-sm mt-3 flex items-center gap-1">❌ {error}</p>
      )}

      {addressInfo && (
        <div className="mt-4">
          <p className="text-gray-600 text-sm mb-3">
            📍 <strong>{addressInfo.city} - {addressInfo.state}</strong>
            {addressInfo.logradouro && <span className="text-gray-400"> | {addressInfo.logradouro}</span>}
          </p>

          <div className="space-y-3">
            {options.map((opt) => (
              <div
                key={opt.method}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  shipping?.method === opt.method
                    ? "border-rosa-500 bg-rosa-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-rosa-300"
                }`}
                onClick={() => selectOption(opt)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900">{opt.label}</p>
                    <p className="text-gray-500 text-sm">{opt.estimatedDays} dias uteis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rosa-700 text-lg">R$ {opt.price.toFixed(2)}</p>
                  {shipping?.method === opt.method && (
                    <span className="text-green-600 text-xs font-semibold">✓ Selecionado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shipping && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-700 text-sm font-semibold">
            ✅ Frete selecionado: {shipping.method} - R$ {shipping.price.toFixed(2)} ({shipping.estimatedDays} dias)
          </p>
        </div>
      )}
    </div>
  )
}
