const express = require("express")
const router = express.Router()
const db = require("../db/database")
const Stripe = require("stripe")
const { Resend } = require("resend")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("Webhook signature error:", err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    if (session.payment_status === "paid") {
      const order_id = session.metadata?.order_id
      const full_name = session.metadata?.full_name
      const whatsapp = session.metadata?.whatsapp
      const locale = session.metadata?.locale
      const customer_email = session.customer_email
      const amount = (session.amount_total / 100).toFixed(2)
      const currency = session.currency.toUpperCase()

      // Update order status
      if (order_id) {
        db.prepare("UPDATE orders SET status = 'paid' WHERE id = ?").run(order_id)
      }

      // Get full order details
      let order = null
      if (order_id) {
        order = db.prepare("SELECT * FROM orders WHERE id = ?").get(order_id)
      }

      const address = order ? `${order.address}, ${order.city_state}, CEP: ${order.cep}` : "N/A"
      const reference = order?.reference_point || "N/A"

      // Email para Kelly
      await resend.emails.send({
        from: "Pedidos <onboarding@resend.dev>",
        to: "kellymarquesstripe@proton.me",
        subject: `🎉 Nova venda! ${full_name} comprou o livro`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">✅ Nova venda confirmada!</h1>
            <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #15803d; margin-top: 0;">💰 Valor: ${currency} ${amount}</h2>
            </div>
            <h3>📦 Dados para envio:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Nome</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${full_name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${customer_email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">WhatsApp</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${whatsapp}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Endereço</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${address}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Complemento</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${reference}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Idioma</td><td style="padding: 8px;">${locale}</td></tr>
            </table>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Pedido #${order_id} — ${new Date().toLocaleString("pt-BR")}</p>
          </div>
        `
      })

      // Email para o cliente
      if (customer_email && locale === "pt") {
        await resend.emails.send({
          from: "Kelly Marques <onboarding@resend.dev>",
          to: customer_email,
          subject: "✅ Pedido confirmado! Seu livro está a caminho",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #be185d;">Obrigada pela sua compra! 💝</h1>
              <p>Olá, <strong>${full_name}</strong>!</p>
              <p>Seu pedido foi confirmado e em breve seu livro será enviado.</p>
              <div style="background: #fdf2f8; border: 1px solid #f9a8d4; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #be185d; margin-top: 0;">📦 Resumo do pedido</h3>
                <p><strong>Livro:</strong> Antes que eu entendesse — Kelly Marques</p>
                <p><strong>Valor pago:</strong> R$ ${amount}</p>
                <p><strong>Endereço de entrega:</strong> ${address}</p>
              </div>
              <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #92400e; margin-top: 0;">⏱️ Prazo de entrega</h3>
                <p>Seu livro será enviado em até <strong>3 dias úteis</strong>.</p>
                <p>O prazo de entrega após o envio é de <strong>5 a 15 dias úteis</strong> dependendo da sua região.</p>
              </div>
              <p>Qualquer dúvida, entre em contato pelo WhatsApp.</p>
              <p>Com carinho,<br><strong>Kelly Marques</strong></p>
            </div>
          `
        })
      } else if (customer_email && locale === "en") {
        await resend.emails.send({
          from: "Kelly Marques <onboarding@resend.dev>",
          to: customer_email,
          subject: "✅ Order confirmed! Thank you for your purchase",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #be185d;">Thank you for your purchase! 💝</h1>
              <p>Hi, <strong>${full_name}</strong>!</p>
              <p>Your order has been confirmed. You will receive your digital products shortly.</p>
              <div style="background: #fdf2f8; border: 1px solid #f9a8d4; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #be185d; margin-top: 0;">📦 Order summary</h3>
                <p><strong>Product:</strong> Before I Understood — Kelly Marques</p>
                <p><strong>Amount paid:</strong> USD ${amount}</p>
              </div>
              <p>With love,<br><strong>Kelly Marques</strong></p>
            </div>
          `
        })
      }

      console.log(`✅ Webhook processed: order #${order_id} paid`)
    }
  }

  res.json({ received: true })
})

module.exports = router
