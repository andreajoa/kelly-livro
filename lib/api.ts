const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export async function trackPageView(page: string) {
  try {
    await fetch(`${API}/api/analytics/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    })
  } catch (e) {
    console.warn("Analytics failed:", e)
  }
}

export async function trackEvent(event_type: string, page?: string, metadata?: Record<string, unknown>) {
  try {
    await fetch(`${API}/api/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type, page, metadata }),
    })
  } catch (e) {
    console.warn("Analytics failed:", e)
  }
}

export async function createOrder(data: {
  full_name: string
  email: string
  whatsapp: string
  address: string
  cep: string
  city_state: string
  reference_point: string
  subtotal: number
  shipping_cost: number
  total: number
}) {
  const res = await fetch(`${API}/api/orders/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getDashboard() {
  const res = await fetch(`${API}/api/analytics/dashboard`)
  return res.json()
}
