const express = require("express")
const router = express.Router()
const db = require("../db/database")

// Registrar page view
router.post("/pageview", (req, res) => {
  try {
    const { page } = req.body
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const user_agent = req.headers["user-agent"]
    db.prepare("INSERT INTO page_views (page, ip, user_agent) VALUES (?, ?, ?)").run(page, ip, user_agent)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Registrar evento (add_to_cart, click_checkout, etc)
router.post("/event", (req, res) => {
  try {
    const { event_type, page, metadata } = req.body
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    db.prepare("INSERT INTO events (event_type, page, metadata, ip) VALUES (?, ?, ?, ?)").run(event_type, page, JSON.stringify(metadata || {}), ip)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Dashboard stats
router.get("/dashboard", (req, res) => {
  try {
    const total_views = db.prepare("SELECT COUNT(*) as count FROM page_views").get()
    const today_views = db.prepare("SELECT COUNT(*) as count FROM page_views WHERE DATE(created_at) = DATE('now')").get()
    const views_by_page = db.prepare("SELECT page, COUNT(*) as count FROM page_views GROUP BY page ORDER BY count DESC").all()
    const total_add_to_cart = db.prepare("SELECT COUNT(*) as count FROM events WHERE event_type = 'add_to_cart'").get()
    const total_checkout_clicks = db.prepare("SELECT COUNT(*) as count FROM events WHERE event_type = 'click_checkout'").get()
    const total_orders = db.prepare("SELECT COUNT(*) as count FROM orders").get()
    const total_paid = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'paid'").get()
    const revenue = db.prepare("SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status = 'paid'").get()
    const recent_orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 20").all()
    const recent_leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 20").all()
    const views_last_7_days = db.prepare(`
      SELECT DATE(created_at) as day, COUNT(*) as count
      FROM page_views
      WHERE created_at >= DATE('now', '-7 days')
      GROUP BY DATE(created_at)
      ORDER BY day ASC
    `).all()
    const events_last_7_days = db.prepare(`
      SELECT DATE(created_at) as day, event_type, COUNT(*) as count
      FROM events
      WHERE created_at >= DATE('now', '-7 days')
      GROUP BY DATE(created_at), event_type
      ORDER BY day ASC
    `).all()
    const unique_visitors_today = db.prepare("SELECT COUNT(DISTINCT ip) as count FROM page_views WHERE DATE(created_at) = DATE('now')").get()

    res.json({
      total_views: total_views.count,
      today_views: today_views.count,
      unique_visitors_today: unique_visitors_today.count,
      views_by_page,
      total_add_to_cart: total_add_to_cart.count,
      total_checkout_clicks: total_checkout_clicks.count,
      total_orders: total_orders.count,
      total_paid: total_paid.count,
      revenue: revenue.total,
      recent_orders,
      recent_leads,
      views_last_7_days,
      events_last_7_days,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
