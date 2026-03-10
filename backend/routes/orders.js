const express = require("express")
const router = express.Router()
const db = require("../db/database")

router.post("/create", (req, res) => {
  try {
    const { full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total, locale } = req.body
    db.prepare("INSERT INTO leads (full_name, email, whatsapp, address, cep, city_state, reference_point, source, locale) VALUES (?, ?, ?, ?, ?, ?, ?, 'checkout', ?)").run(full_name, email, whatsapp, address, cep, city_state, reference_point, locale || "pt")
    const result = db.prepare("INSERT INTO orders (full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total, locale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total, locale || "pt")
    res.json({ ok: true, order_id: result.lastInsertRowid })
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
    db.prepare("INSERT INTO leads (email, whatsapp, source, full_name, locale) VALUES (?, ?, ?, ?, ?)").run(email, phone || "", source || "popup", locale || "", locale || "en")
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
