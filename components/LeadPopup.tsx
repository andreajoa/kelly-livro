"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/lib/LangContext"
import { trackEvent } from "@/lib/api"

const POPUP_KEY = "kelly_popup"
const POPUP_HIDE_DAYS = 5

export default function LeadPopup() {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!t.showPopup) return

    const stored = localStorage.getItem(POPUP_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      if (data.count >= 2) {
        const hideUntil = new Date(data.hideUntil)
        if (new Date() < hideUntil) return
        localStorage.setItem(POPUP_KEY, JSON.stringify({ count: 0, hideUntil: null }))
      }
    }

    const timer = setTimeout(() => setShow(true), 8000)
    return () => clearTimeout(timer)
  }, [t.showPopup])

  const handleClose = () => {
    setShow(false)
    const stored = localStorage.getItem(POPUP_KEY)
    const data = stored ? JSON.parse(stored) : { count: 0, hideUntil: null }
    data.count += 1
    if (data.count >= 2) {
      const hideUntil = new Date()
      hideUntil.setDate(hideUntil.getDate() + POPUP_HIDE_DAYS)
      data.hideUntil = hideUntil.toISOString()
    }
    localStorage.setItem(POPUP_KEY, JSON.stringify(data))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
      await fetch(`${API}/api/orders/lead-popup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, source: "popup", locale: t.locale }),
      })
      trackEvent("popup_submit", "/", { email })
    } catch (e) { console.warn(e) }
    setSubmitted(true)
    setTimeout(() => { setShow(false); handleClose() }, 2000)
  }

  if (!show || !t.showPopup) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-xl font-bold text-gray-900">Thank you!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900">{t.popup.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{t.popup.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.popup.placeholder} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.popup.placeholderPhone} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm" />
              <button type="submit" className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 text-white font-bold py-3 rounded-lg text-sm uppercase">{t.popup.cta}</button>
            </form>
            <button onClick={handleClose} className="w-full text-center text-gray-400 text-xs mt-3 hover:text-gray-600">{t.popup.close}</button>
          </>
        )}
      </div>
    </div>
  )
}
