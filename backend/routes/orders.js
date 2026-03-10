const express = require("express")
const router = express.Router()
const db = require("../db/database")

// Salvar lead + order e retornar ID
router.post("/create", (req, res) => {
  try {
    const { full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total } = req.body

    // Salvar lead
    db.prepare(`
      INSERT INTO leads (full_name, email, whatsapp, address, cep, city_state, reference_point)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(full_name, email, whatsapp, address, cep, city_state, reference_point)

    // Criar order
    const result = db.prepare(`
      INSERT INTO orders (full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(full_name, email, whatsapp, address, cep, city_state, reference_point, subtotal, shipping_cost, total)

    res.json({ ok: true, order_id: result.lastInsertRowid })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Atualizar status do pedido (ex: paid)
router.post("/update-status", (req, res) => {
  try {
    const { order_id, status, stripe_session_id } = req.body
    db.prepare("UPDATE orders SET status = ?, stripe_session_id = ? WHERE id = ?").run(status, stripe_session_id || null, order_id)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Listar todos os pedidos
router.get("/list", (req, res) => {
  try {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all()
    res.json(orders)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Listar todos os leads
router.get("/leads", (req, res) => {
  try {
    const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all()
    res.json(leads)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router

// Salvar lead do popup
router.post("/lead-popup", (req, res) => {
  try {
    const { email, phone, source, locale } = req.body
    db.prepare(
      "INSERT INTO leads (email, whatsapp, source, full_name) VALUES (?, ?, ?, ?)"
    ).run(email, phone || "", source || "popup", locale || "")
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
