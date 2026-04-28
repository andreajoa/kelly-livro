require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, process.env.FRONTEND_URL.replace('https://', 'https://www.')] : "*",
  credentials: true
}))

// Rotas — require ANTES do app.use
const webhookRoutes = require('./routes/webhook')
const analyticsRoutes = require("./routes/analytics")
const ordersRoutes = require("./routes/orders")

app.use('/api/webhook', webhookRoutes)
app.use(express.json())
app.use("/api/analytics", analyticsRoutes)
app.use("/api/orders", ordersRoutes)

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Kelly Livro Backend", time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Backend rodando na porta ${PORT}`)
  console.log(`📊 Dashboard: GET /api/analytics/dashboard`)
  console.log(`📦 Orders: GET /api/orders/list`)
  console.log(`👥 Leads: GET /api/orders/leads\n`)
})
