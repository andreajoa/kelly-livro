import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id") || ""
  if (!session_id) return NextResponse.json({ ok: false })

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ ok: false })

  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return NextResponse.json({ ok: false })
    const session = await res.json()
    return NextResponse.json({ ok: session.payment_status === "paid" })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
