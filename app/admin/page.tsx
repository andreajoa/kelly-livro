"use client"

import { useEffect, useState } from "react"
import { getDashboard } from "@/lib/api"

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard().then(setData).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  if (!data) return <div className="min-h-screen flex items-center justify-center text-red-500">Erro. Backend rodando?</div>

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">📊 Dashboard</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { val: data.total_views, label: "Views Total", color: "text-blue-600" },
            { val: data.today_views, label: "Views Hoje", color: "text-green-600" },
            { val: data.total_add_to_cart, label: "Add Cart", color: "text-rosa-600" },
            { val: data.total_checkout_clicks, label: "Checkouts", color: "text-orange-600" },
            { val: data.total_orders, label: "Pedidos", color: "text-indigo-600" },
            { val: data.total_paid, label: "Pagos", color: "text-green-700" },
            { val: `R$ ${data.revenue.toFixed(2)}`, label: "Receita", color: "text-green-800" },
            { val: data.unique_visitors_today, label: "Unicos Hoje", color: "text-purple-600" },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-3 sm:p-6 text-center">
              <p className={`text-xl sm:text-3xl font-bold ${m.color}`}>{m.val}</p>
              <p className="text-gray-500 text-[10px] sm:text-sm mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Pedidos Recentes</h2>
          <table className="w-full text-xs sm:text-sm min-w-[600px]">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2">Nome</th><th className="pb-2">Email</th><th className="pb-2">WhatsApp</th><th className="pb-2">Total</th><th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_orders?.map((o: any) => (
                <tr key={o.id} className="border-b">
                  <td className="py-2">{o.full_name}</td>
                  <td className="py-2">{o.email}</td>
                  <td className="py-2">{o.whatsapp}</td>
                  <td className="py-2 font-bold">R$ {o.total?.toFixed(2)}</td>
                  <td className="py-2"><span className={`px-2 py-1 rounded-full text-xs font-bold ${o.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
