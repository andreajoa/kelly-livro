const express = require("express")
const router = express.Router()
const db = require("../db/database")
const Stripe = require("stripe")
const { Resend } = require("resend")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

function emailClientePT(full_name, amount, session_id, order_id) {
  const date = new Date().toLocaleDateString("pt-BR")
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#0f0a14;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0a14;padding:40px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td align="center" style="padding-bottom:28px;"><p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;color:rgba(244,114,182,0.6);text-transform:uppercase;">Antes que eu entendesse</p><p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.25);text-transform:uppercase;">Kélly Marques</p></td></tr><tr><td style="background:linear-gradient(160deg,rgba(120,20,60,0.5) 0%,rgba(25,15,35,0.98) 60%);border-radius:20px;border:1px solid rgba(244,114,182,0.12);overflow:hidden;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:40px 40px 28px;text-align:center;"><div style="font-size:48px;margin-bottom:16px;">🎉</div><h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">Parabéns pela sua compra!</h1><p style="margin:0;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.6;">Olá, <strong style="color:rgba(255,255,255,0.8);">${full_name}</strong>! Seu acesso ao eBook e Audiobook já está disponível.</p></td></tr><tr><td style="padding:0 40px 28px;"><table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.07);"><tr><td width="90" style="padding:20px 0 20px 20px;vertical-align:middle;"><img src="https://www.projetogk.com/images/capa-livro.png" width="70" height="105" alt="Capa do livro" style="border-radius:8px;display:block;" /></td><td style="padding:20px 20px 20px 16px;vertical-align:middle;"><p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(244,114,182,0.6);text-transform:uppercase;">Biblioteca Exclusiva</p><p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#ffffff;line-height:1.3;">Antes que eu entendesse<br>você já me transformava</p><p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.4);font-style:italic;">Kélly Marques</p><table cellpadding="0" cellspacing="0"><tr><td style="background:rgba(236,72,153,0.15);border:1px solid rgba(244,114,182,0.25);border-radius:20px;padding:4px 10px;"><span style="font-size:11px;color:#f472b6;">📖 eBook PDF</span></td><td width="6"></td><td style="background:rgba(236,72,153,0.15);border:1px solid rgba(244,114,182,0.25);border-radius:20px;padding:4px 10px;"><span style="font-size:11px;color:#f472b6;">🎧 Audiobook</span></td></tr></table></td></tr></table></td></tr><tr><td style="padding:0 40px 36px;text-align:center;"><a href="https://www.projetogk.com/pt/minha-biblioteca?session_id=${session_id}" style="display:inline-block;background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;padding:16px 40px;border-radius:50px;">🎧 Acessar Minha Biblioteca</a><p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.2);">Este link é exclusivo para você. Não compartilhe.</p></td></tr><tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(255,255,255,0.06);"></div></td></tr><tr><td style="padding:24px 40px;"><p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Detalhes do Pedido</p><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Pedido</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">#${order_id}</td></tr><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Data</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">${date}</td></tr><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Produto</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">eBook + Audiobook Digital</td></tr><tr><td style="font-size:15px;font-weight:700;color:#ffffff;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);">Total</td><td style="font-size:15px;font-weight:700;color:#f472b6;text-align:right;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);">R$ ${amount}</td></tr></table></td></tr></table></td></tr><tr><td style="padding:24px 0 8px;text-align:center;"><p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.3);">Dúvidas?</p><a href="mailto:contact@kelly-moraes.com" style="font-size:13px;color:rgba(244,114,182,0.6);text-decoration:none;">contact@kelly-moraes.com</a></td></tr><tr><td style="padding:16px 0 8px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">© 2025 Kélly Marques · Todos os direitos reservados</p></td></tr></table></td></tr></table></body></html>`
}

function emailClienteEN(full_name, amount, session_id, order_id) {
  const date = new Date().toLocaleDateString("en-US")
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#0f0a14;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0a14;padding:40px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td align="center" style="padding-bottom:28px;"><p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;color:rgba(244,114,182,0.6);text-transform:uppercase;">Before I Understood</p><p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.25);text-transform:uppercase;">Kelly Marques</p></td></tr><tr><td style="background:linear-gradient(160deg,rgba(120,20,60,0.5) 0%,rgba(25,15,35,0.98) 60%);border-radius:20px;border:1px solid rgba(244,114,182,0.12);overflow:hidden;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:40px 40px 28px;text-align:center;"><div style="font-size:48px;margin-bottom:16px;">🎉</div><h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">Thank you for your purchase!</h1><p style="margin:0;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.6;">Hi, <strong style="color:rgba(255,255,255,0.8);">${full_name}</strong>! Your eBook and Audiobook access is ready.</p></td></tr><tr><td style="padding:0 40px 28px;"><table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.07);"><tr><td width="90" style="padding:20px 0 20px 20px;vertical-align:middle;"><img src="https://www.projetogk.com/images/capaingles.png" width="70" height="105" alt="Book cover" style="border-radius:8px;display:block;" /></td><td style="padding:20px 20px 20px 16px;vertical-align:middle;"><p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(244,114,182,0.6);text-transform:uppercase;">Exclusive Library</p><p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#ffffff;line-height:1.3;">Before I Understood<br>You Were Already Transforming Me</p><p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.4);font-style:italic;">Kelly Marques</p><table cellpadding="0" cellspacing="0"><tr><td style="background:rgba(236,72,153,0.15);border:1px solid rgba(244,114,182,0.25);border-radius:20px;padding:4px 10px;"><span style="font-size:11px;color:#f472b6;">📖 eBook PDF</span></td><td width="6"></td><td style="background:rgba(236,72,153,0.15);border:1px solid rgba(244,114,182,0.25);border-radius:20px;padding:4px 10px;"><span style="font-size:11px;color:#f472b6;">🎧 Audiobook</span></td></tr></table></td></tr></table></td></tr><tr><td style="padding:0 40px 36px;text-align:center;"><a href="https://www.projetogk.com/en/minha-biblioteca?session_id=${session_id}" style="display:inline-block;background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;padding:16px 40px;border-radius:50px;">🎧 Access My Library</a><p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.2);">This link is exclusive to you. Do not share.</p></td></tr><tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(255,255,255,0.06);"></div></td></tr><tr><td style="padding:24px 40px;"><p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;">Order Details</p><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Order</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">#${order_id}</td></tr><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Date</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">${date}</td></tr><tr><td style="font-size:13px;color:rgba(255,255,255,0.4);padding-bottom:8px;">Product</td><td style="font-size:13px;color:rgba(255,255,255,0.7);text-align:right;padding-bottom:8px;">eBook + Audiobook Digital</td></tr><tr><td style="font-size:15px;font-weight:700;color:#ffffff;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);">Total</td><td style="font-size:15px;font-weight:700;color:#f472b6;text-align:right;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);">USD ${amount}</td></tr></table></td></tr></table></td></tr><tr><td style="padding:24px 0 8px;text-align:center;"><a href="mailto:contact@kelly-moraes.com" style="font-size:13px;color:rgba(244,114,182,0.6);text-decoration:none;">contact@kelly-moraes.com</a></td></tr><tr><td style="padding:16px 0 8px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">© 2025 Kelly Marques · All rights reserved</p></td></tr></table></td></tr></table></body></html>`
}

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
      const order_id = session.metadata?.order_id || session.id
      const full_name = session.metadata?.full_name || "Cliente"
      const whatsapp = session.metadata?.whatsapp || ""
      const locale = session.metadata?.locale || "pt"
      const customer_email = session.customer_email
      const amount = (session.amount_total / 100).toFixed(2)
      const currency = session.currency.toUpperCase()
      const session_id = session.id

      if (order_id) {
        try { db.prepare("UPDATE orders SET status = 'paid' WHERE id = ?").run(order_id) } catch(e) {}
      }

      let order = null
      try { if (order_id) order = db.prepare("SELECT * FROM orders WHERE id = ?").get(order_id) } catch(e) {}

      const address = order ? `${order.address}, ${order.city_state}, CEP: ${order.cep}` : "N/A"
      const reference = order?.reference_point || "N/A"

      await resend.emails.send({
        from: "Pedidos <noreply@projetogk.com>",
        to: "kellymarquesstripe@proton.me",
        subject: `🎉 Nova venda! ${full_name} — ${currency} ${amount}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;"><h1 style="color:#16a34a;">✅ Nova venda!</h1><p><b>Nome:</b> ${full_name}</p><p><b>Email:</b> ${customer_email}</p><p><b>WhatsApp:</b> ${whatsapp}</p><p><b>Valor:</b> ${currency} ${amount}</p><p><b>Endereço:</b> ${address}</p><p><b>Complemento:</b> ${reference}</p><p><b>Idioma:</b> ${locale}</p><p><b>Pedido:</b> #${order_id}</p></div>`
      })

      if (customer_email) {
        const isEN = locale === "en"
        await resend.emails.send({
          from: isEN ? "Kelly Marques <noreply@projetogk.com>" : "Kélly Marques <noreply@projetogk.com>",
          to: customer_email,
          subject: isEN ? "✅ Purchase confirmed! Access your library now" : "✅ Compra confirmada! Acesse sua biblioteca agora",
          html: isEN ? emailClienteEN(full_name, amount, session_id, order_id) : emailClientePT(full_name, amount, session_id, order_id)
        })
      }

      console.log(`✅ Webhook: order #${order_id} — email enviado para ${customer_email}`)
    }
  }

  res.json({ received: true })
})

module.exports = router
