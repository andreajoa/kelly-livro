"use client"

import { useEffect, useState } from "react"
import { getDashboard } from "@/lib/api"

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [locale, setLocale] = useState<string>("")
  const [tab, setTab] = useState("overview")

  useEffect(() => {
    setLoading(true)
    getDashboard(locale || undefined).then(setData).catch(() => {}).finally(() => setLoading(false))
  }, [locale])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Carregando dashboard...</div>
  if (!data) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Erro. O backend esta rodando? (npm run dev na pasta backend)</div>

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "orders", label: "📦 Pedidos" },
    { id: "leads", label: "👥 Leads" },
    { id: "popup", label: "📩 Popup" },
    { id: "contact", label: "✉️ Contato" },
    { id: "pages", label: "📄 Páginas" },
  ]

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">📊 Dashboard — Livro Kelly</h1>
          <div className="flex gap-2">
            <select value={locale} onChange={(e) => setLocale(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="">Todos os idiomas</option>
              <option value="pt">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {[
                { val: data.total_views, label: "Views Total", color: "text-blue-600", bg: "bg-blue-50" },
                { val: data.today_views, label: "Views Hoje", color: "text-green-600", bg: "bg-green-50" },
                { val: data.unique_visitors_today, label: "Visitantes Únicos Hoje", color: "text-purple-600", bg: "bg-purple-50" },
                { val: data.unique_visitors_total, label: "Visitantes Únicos Total", color: "text-indigo-600", bg: "bg-indigo-50" },
                { val: data.total_add_to_cart, label: "Add to Cart", color: "text-pink-600", bg: "bg-pink-50" },
                { val: data.total_checkout_clicks, label: "Clicks Checkout", color: "text-orange-600", bg: "bg-orange-50" },
                { val: data.total_orders, label: "Pedidos", color: "text-teal-600", bg: "bg-teal-50" },
                { val: `R$ ${data.revenue?.toFixed(2) || "0.00"}`, label: "Receita", color: "text-green-700", bg: "bg-green-50" },
              ].map((m, i) => (
                <div key={i} className={`${m.bg} rounded-xl p-4 sm:p-6 text-center`}>
                  <p className={`text-xl sm:text-3xl font-bold ${m.color}`}>{m.val}</p>
                  <p className="text-gray-500 text-[10px] sm:text-sm mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Views por idioma */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-bold mb-4">🌐 Views por Idioma</h3>
                {data.views_by_locale?.map((v: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b py-2">
                    <span className="text-sm">{v.locale === "pt" ? "🇧🇷 Português" : v.locale === "en" ? "🇺🇸 English" : v.locale === "es" ? "🇪🇸 Español" : v.locale}</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{v.count}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                <h3 className="font-bold mb-4">📈 Últimos 7 Dias</h3>
                <div className="flex items-end gap-2 h-32">
                  {data.views_last_7_days?.map((d: any, i: number) => {
                    const max = Math.max(...data.views_last_7_days.map((x: any) => x.count), 1)
                    const height = (d.count / max) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-bold">{d.count}</span>
                        <div className="w-full bg-blue-500 rounded-t" style={{ height: `${height}%`, minHeight: "4px" }} />
                        <span className="text-[10px] text-gray-500">{d.day?.slice(5)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Eventos por tipo */}
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
              <h3 className="font-bold mb-4">⚡ Eventos por Tipo</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.events_by_type?.map((e: any, i: number) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-bold text-lg">{e.count}</p>
                    <p className="text-xs text-gray-500">{e.event_type}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
            <h3 className="font-bold mb-4">📦 Todos os Pedidos ({data.recent_orders?.length})</h3>
            <table className="w-full text-xs sm:text-sm min-w-[700px]">
              <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">ID</th><th className="pb-2">Nome</th><th className="pb-2">Email</th><th className="pb-2">WhatsApp</th><th className="pb-2">Endereço</th><th className="pb-2">CEP</th><th className="pb-2">Total</th><th className="pb-2">Status</th><th className="pb-2">Data</th></tr></thead>
              <tbody>
                {data.recent_orders?.map((o: any) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{o.id}</td>
                    <td className="py-2">{o.full_name}</td>
                    <td className="py-2">{o.email}</td>
                    <td className="py-2">{o.whatsapp}</td>
                    <td className="py-2 max-w-[150px] truncate">{o.address}, {o.city_state}</td>
                    <td className="py-2">{o.cep}</td>
                    <td className="py-2 font-bold">R$ {o.total?.toFixed(2)}</td>
                    <td className="py-2"><span className={`px-2 py-1 rounded-full text-xs font-bold ${o.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{o.status}</span></td>
                    <td className="py-2 text-gray-500 text-xs">{o.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LEADS TAB (Checkout) */}
        {tab === "leads" && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
            <h3 className="font-bold mb-4">👥 Leads do Checkout ({data.checkout_submissions?.length})</h3>
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Nome</th><th className="pb-2">Email</th><th className="pb-2">WhatsApp</th><th className="pb-2">Endereço</th><th className="pb-2">CEP</th><th className="pb-2">Idioma</th><th className="pb-2">Data</th></tr></thead>
              <tbody>
                {data.checkout_submissions?.map((l: any, i: number) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">{l.full_name}</td>
                    <td className="py-2">{l.email}</td>
                    <td className="py-2">{l.whatsapp}</td>
                    <td className="py-2 max-w-[150px] truncate">{l.address}, {l.city_state}</td>
                    <td className="py-2">{l.cep}</td>
                    <td className="py-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{l.locale}</span></td>
                    <td className="py-2 text-gray-500 text-xs">{l.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* POPUP TAB */}
        {tab === "popup" && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
            <h3 className="font-bold mb-4">📩 Leads do Popup ({data.popup_submissions?.length})</h3>
            <table className="w-full text-xs sm:text-sm min-w-[400px]">
              <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Email</th><th className="pb-2">Telefone</th><th className="pb-2">Idioma</th><th className="pb-2">Data</th></tr></thead>
              <tbody>
                {data.popup_submissions?.map((l: any, i: number) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">{l.email}</td>
                    <td className="py-2">{l.whatsapp}</td>
                    <td className="py-2"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{l.locale}</span></td>
                    <td className="py-2 text-gray-500 text-xs">{l.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CONTACT TAB */}
        {tab === "contact" && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
            <h3 className="font-bold mb-4">✉️ Mensagens do Formulário de Contato ({data.contact_submissions?.length})</h3>
            <table className="w-full text-xs sm:text-sm min-w-[500px]">
              <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Nome</th><th className="pb-2">Email</th><th className="pb-2">Mensagem</th><th className="pb-2">Idioma</th><th className="pb-2">Data</th></tr></thead>
              <tbody>
                {data.contact_submissions?.map((l: any, i: number) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">{l.full_name}</td>
                    <td className="py-2">{l.email}</td>
                    <td className="py-2 max-w-[200px] truncate">{l.reference_point}</td>
                    <td className="py-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{l.locale}</span></td>
                    <td className="py-2 text-gray-500 text-xs">{l.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGES TAB */}
        {tab === "pages" && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h3 className="font-bold mb-4">📄 Views por Página</h3>
            <div className="space-y-2">
              {data.views_by_page?.map((v: any, i: number) => (
                <div key={i} className="flex justify-between items-center border-b pb-2">
                  <span className="font-mono text-xs sm:text-sm truncate max-w-[70%]">{v.page}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">{v.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
