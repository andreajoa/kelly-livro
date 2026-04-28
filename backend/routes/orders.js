const express = require("express")
const router = express.Router()
const db = require("../db/database")
const Stripe = require("stripe")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

router.post("/create", async (req, res) => {
  try {
    const { full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total, locale, currency } = req.body

    db.prepare("INSERT INTO leads (full_name, email, whatsapp, address, cep, city_state, reference_point, source, locale) VALUES (?, ?, ?, ?, ?, ?, ?, 'checkout', ?)").run(full_name, email, whatsapp, address || "", cep || "", city_state || "", reference_point || "", locale || "pt")

    const result = db.prepare("INSERT INTO orders (full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total, locale, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')").run(full_name, email, whatsapp, address || "", cep || "", city_state || "", reference_point || "", subtotal, shipping_cost || 0, total, locale || "pt")

    const order_id = result.lastInsertRowid

    const product_type = req.body.product_type || (locale === "pt" ? "physical" : "digital")

    const stripeCurrency = currency === "USD" ? "usd" : "brl"
    const productName = locale === "pt"
      ? "Antes que eu entendesse — Kelly Marques (Livro Físico)"
      : locale === "es"
      ? "Antes de que yo entendiera — Kelly Marques (eBook + Audiolibro)"
      : "Before I Understood — Kelly Marques (eBook + Audiobook)"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: productName,
              description: locale === "pt" ? "Livro físico com frete incluso" : "Digital delivery - eBook + Audiobook",
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/${locale}/checkout/success?order_id=${order_id}&product_type=${product_type}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/${locale}/checkout?canceled=true`,
      metadata: {
        order_id: order_id.toString(),
        locale: locale,
        product_type: product_type,
        full_name: full_name,
        whatsapp: whatsapp,
      },
    })

    db.prepare("UPDATE orders SET stripe_session_id = ? WHERE id = ?").run(session.id, order_id)

    res.json({ ok: true, order_id: order_id, checkout_url: session.url })
  } catch (e) {
    console.error("Stripe error:", e)
    res.status(500).json({ error: e.message })
  }
})

router.get("/verify/:session_id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id)
    res.json({
      paid: session.payment_status === "paid",
      customer_email: session.customer_email,
      amount_total: session.amount_total / 100,
      currency: session.currency,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/update-status", (req, res) => {
  try {
    const { order_id, status, stripe_session_id } = req.body
    db.prepare("UPDATE orders SET status = ?, stripe_session_id = ? WHERE id = ?").run(status, stripe_session_id || null, order_id)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get("/list", (req, res) => {
  try { res.json(db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all()) } catch (e) { res.status(500).json({ error: e.message }) }
})

router.get("/leads", (req, res) => {
  try { res.json(db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all()) } catch (e) { res.status(500).json({ error: e.message }) }
})

router.post("/lead-popup", (req, res) => {
  try {
    const { email, phone, source, locale } = req.body
    db.prepare("INSERT INTO leads (email, whatsapp, source, full_name, locale) VALUES (?, ?, ?, ?, ?)").run(email, phone || "", source || "popup", "", locale || "en")
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post("/lead-contact", (req, res) => {
  try {
    const { name, email, message, locale } = req.body
    db.prepare("INSERT INTO leads (full_name, email, reference_point, source, locale) VALUES (?, ?, ?, 'contact', ?)").run(name, email, message, locale || "pt")
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router

router.get("/verify-access/:session_id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id)
    const paid = session.payment_status === "paid"
    const product_type = session.metadata?.product_type || "digital"
    res.json({ ok: paid, product_type })
  } catch (e) {
    res.status(403).json({ ok: false, error: "Invalid session" })
  }
})
