import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" })

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id") || ""
  if (!session_id) return NextResponse.json({ ok: false })
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    return NextResponse.json({ ok: session.payment_status === "paid" })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
