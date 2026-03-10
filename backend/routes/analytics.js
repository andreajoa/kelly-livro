const express = require("express")
const router = express.Router()
const db = require("../db/database")

// Registrar page view
router.post("/pageview", (req, res) => {
  try {
    const { page } = req.body
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const user_agent = req.headers["user-agent"]
    const locale = page.split("/")[1] || "pt"
    db.prepare("INSERT INTO page_views (page, ip, user_agent, locale) VALUES (?, ?, ?, ?)").run(page, ip, user_agent, locale)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Registrar evento
router.post("/event", (req, res) => {
  try {
    const { event_type, page, metadata } = req.body
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const locale = page ? page.split("/")[1] || "pt" : "pt"
    db.prepare("INSERT INTO events (event_type, page, metadata, ip, locale) VALUES (?, ?, ?, ?, ?)").run(event_type, page, JSON.stringify(metadata || {}), ip, locale)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Dashboard completo
router.get("/dashboard", (req, res) => {
  try {
    const filterLocale = req.query.locale || null

    const where = filterLocale ? `WHERE locale = '${filterLocale}'` : ""
    const whereAnd = filterLocale ? `AND locale = '${filterLocale}'` : ""

    const total_views = db.prepare(`SELECT COUNT(*) as count FROM page_views ${where}`).get()
    const today_views = db.prepare(`SELECT COUNT(*) as count FROM page_views WHERE DATE(created_at) = DATE('now') ${whereAnd}`).get()
    const unique_visitors_today = db.prepare(`SELECT COUNT(DISTINCT ip) as count FROM page_views WHERE DATE(created_at) = DATE('now') ${whereAnd}`).get()
    const unique_visitors_total = db.prepare(`SELECT COUNT(DISTINCT ip) as count FROM page_views ${where}`).get()

    const views_by_page = db.prepare(`SELECT page, COUNT(*) as count FROM page_views ${where} GROUP BY page ORDER BY count DESC`).all()
    const views_by_locale = db.prepare("SELECT locale, COUNT(*) as count FROM page_views GROUP BY locale ORDER BY count DESC").all()

    const total_add_to_cart = db.prepare(`SELECT COUNT(*) as count FROM events WHERE event_type = 'add_to_cart' ${whereAnd}`).get()
    const total_checkout_clicks = db.prepare(`SELECT COUNT(*) as count FROM events WHERE event_type = 'click_checkout' ${whereAnd}`).get()
    const total_popup_submits = db.prepare(`SELECT COUNT(*) as count FROM events WHERE event_type = 'popup_submit' ${whereAnd}`).get()

    const add_to_cart_by_source = db.prepare(`SELECT metadata, COUNT(*) as count FROM events WHERE event_type = 'add_to_cart' ${whereAnd} GROUP BY metadata ORDER BY count DESC`).all()

    const total_orders = db.prepare("SELECT COUNT(*) as count FROM orders").get()
    const total_paid = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'paid'").get()
    const revenue = db.prepare("SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status = 'paid'").get()

    const recent_orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50").all()
    const recent_leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 50").all()

    const views_last_7_days = db.prepare(`
      SELECT DATE(created_at) as day, COUNT(*) as count
      FROM page_views
      WHERE created_at >= DATE('now', '-7 days') ${whereAnd}
      GROUP BY DATE(created_at) ORDER BY day ASC
    `).all()

    const events_by_type = db.prepare(`SELECT event_type, COUNT(*) as count FROM events ${where} GROUP BY event_type ORDER BY count DESC`).all()

    const contact_submissions = db.prepare("SELECT * FROM leads WHERE source = 'contact' ORDER BY created_at DESC LIMIT 50").all()
    const popup_submissions = db.prepare("SELECT * FROM leads WHERE source = 'popup' ORDER BY created_at DESC LIMIT 50").all()
    const checkout_submissions = db.prepare("SELECT * FROM leads WHERE source = 'checkout' ORDER BY created_at DESC LIMIT 50").all()

    const leads_by_locale = db.prepare("SELECT full_name as locale, COUNT(*) as count FROM leads WHERE source = 'popup' GROUP BY full_name ORDER BY count DESC").all()

    res.json({
      total_views: total_views.count,
      today_views: today_views.count,
      unique_visitors_today: unique_visitors_today.count,
      unique_visitors_total: unique_visitors_total.count,
      views_by_page,
      views_by_locale,
      total_add_to_cart: total_add_to_cart.count,
      total_checkout_clicks: total_checkout_clicks.count,
      total_popup_submits: total_popup_submits.count,
      add_to_cart_by_source,
      total_orders: total_orders.count,
      total_paid: total_paid.count,
      revenue: revenue.total,
      recent_orders,
      recent_leads,
      views_last_7_days,
      events_by_type,
      contact_submissions,
      popup_submissions,
      checkout_submissions,
      leads_by_locale,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
