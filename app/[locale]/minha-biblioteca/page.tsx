"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

const BASE = "https://pub-66c21cbcbdf1471795c366e7560d3600.r2.dev"

const content = {
  pt: {
    congrats: "Parabéns pela sua compra! 🎉",
    congratsSub: "Seu conteúdo exclusivo está disponível abaixo.",
    areaLabel: "ÁREA EXCLUSIVA",
    downloadPdf: "↓ Baixar eBook (PDF)",
    downloadAudio: "↓ Baixar esta faixa",
    backHome: "← Voltar ao início",
    orderLabel: "Pedido",
    title: "Antes que eu entendesse",
    author: "Kelly Marques",
    lang: "PT",
    faixas: "faixas",
    audioTitle: "AUDIOBOOK",
    ebookTitle: "EBOOK",
  },
  en: {
    congrats: "Congratulations on your purchase! 🎉",
    congratsSub: "Your exclusive content is available below.",
    areaLabel: "EXCLUSIVE AREA",
    downloadPdf: "↓ Download eBook (PDF)",
    downloadAudio: "↓ Download this track",
    backHome: "← Back to Home",
    orderLabel: "Order",
    title: "Before I Understood",
    author: "Kelly Marques",
    lang: "EN",
    faixas: "tracks",
    audioTitle: "AUDIOBOOK",
    ebookTitle: "EBOOK",
  },
  es: {
    congrats: "¡Felicitaciones por tu compra! 🎉",
    congratsSub: "Tu contenido exclusivo está disponible abajo.",
    areaLabel: "ÁREA EXCLUSIVA",
    downloadPdf: "↓ Descargar eBook (PDF)",
    downloadAudio: "↓ Descargar esta pista",
    backHome: "← Volver al inicio",
    orderLabel: "Pedido",
    title: "Antes que yo entendiera",
    author: "Kelly Marques",
    lang: "ES",
    faixas: "pistas",
    audioTitle: "AUDIOLIBRO",
    ebookTitle: "EBOOK",
  },
}

const FILES = {
  pt: {
    pdf: `${BASE}/ebook-pt/PT/ebook%20(PT)%20DIAG%20-%20Kelly%20Marques.pdf`,
    audios: [
      { title: "Introdução",        url: `${BASE}/audiobook-pt/PT/001%20Introdu%C3%A7%C3%A3o.mp3` },
      { title: "Capítulo 1",        url: `${BASE}/audiobook-pt/PT/Cap%201.mp3` },
      { title: "Capítulo 2",        url: `${BASE}/audiobook-pt/PT/Cap%202.mp3` },
      { title: "Capítulo 3",        url: `${BASE}/audiobook-pt/PT/Cap%203.mp3` },
      { title: "Capítulo 4",        url: `${BASE}/audiobook-pt/PT/Cap%204.mp3` },
      { title: "Capítulo 5",        url: `${BASE}/audiobook-pt/PT/Cap%205.mp3` },
      { title: "Capítulo 6",        url: `${BASE}/audiobook-pt/PT/Cap%206.mp3` },
      { title: "Epílogo",           url: `${BASE}/audiobook-pt/PT/Cap%209%20Epilogo.mp3` },
      { title: "Cartas para Deus",  url: `${BASE}/audiobook-pt/PT/Cap%2010%20Cartas%20para%20Deus.mp3` },
      { title: "Faixa Bônus",       url: `${BASE}/audiobook-pt/PT/00.mp3` },
    ],
  },
  en: {
    pdf: `${BASE}/ebook-en/EN/ebook%20-%20(EN)%20DIAG.pdf`,
    audios: [
      { title: "Intro",      url: `${BASE}/audiobook-en/EN/00%20Intro.mp3` },
      { title: "Chapter 1",  url: `${BASE}/audiobook-en/EN/Cap%201.mp3` },
      { title: "Chapter 2",  url: `${BASE}/audiobook-en/EN/Cap%202.mp3` },
      { title: "Chapter 3",  url: `${BASE}/audiobook-en/EN/Cap%203.mp3` },
      { title: "Chapter 4",  url: `${BASE}/audiobook-en/EN/Cap%204.mp3` },
      { title: "Chapter 5",  url: `${BASE}/audiobook-en/EN/Cap%205.mp3` },
      { title: "Epilogue",   url: `${BASE}/audiobook-en/EN/Epilogo.mp3` },
    ],
  },
}

function LibraryContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const { locale } = useLang()
  const orderId = searchParams.get("order_id")

  useEffect(() => { clearCart() }, [clearCart])

  const c = content[locale as keyof typeof content] ?? content.en
  const files = FILES[locale as keyof typeof FILES] ?? FILES.en

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* Banner parabéns */}
      <div className="text-center rounded-2xl p-6 sm:p-8 space-y-2"
        style={{ background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.20)" }}>
        <p className="text-3xl">🎉</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{c.congrats}</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{c.congratsSub}</p>
        {orderId && (
          <p className="inline-block text-xs px-3 py-1 rounded-full mt-1"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}>
            {c.orderLabel} #{orderId}
          </p>
        )}
      </div>

      {/* Card capa + ebook */}
      <div className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(236,72,153,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 90% 20%, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }} />
        <div className="relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
          {/* Capa */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="w-28 sm:w-32 rounded-xl flex flex-col items-center justify-center p-3 text-center shadow-2xl"
              style={{ background: "linear-gradient(135deg,#f472b6 0%,#ec4899 40%,#be185d 100%)", aspectRatio: "2/3", minHeight: "130px" }}>
              <span className="text-white font-semibold text-xs leading-tight mb-2 opacity-90">{c.title}</span>
              <span className="text-white/70 text-xs font-medium">{c.author}</span>
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: "rgba(244,114,182,0.8)" }}>{c.areaLabel}</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{c.title}</h2>
              <p className="text-sm mt-1 italic" style={{ color: "rgba(255,255,255,0.45)" }}>{c.author}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { value: files.audios.length.toString(), label: c.faixas },
                { value: c.lang, label: "idioma" },
                { value: "PDF", label: "incluído" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl px-4 py-2.5 text-center min-w-[80px]"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  <p className="text-lg font-bold" style={{ color: "#f472b6" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{s.label}</p>
                </div>
              ))}
            </div>
            {/* Botão PDF */}
            <a href={files.pdf} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-2.5 px-5 rounded-full transition-all hover:scale-105 active:scale-95 w-fit"
              style={{ background: "linear-gradient(135deg,#ec4899,#be185d)", color: "#fff", boxShadow: "0 4px 16px rgba(236,72,153,0.35)" }}>
              {c.downloadPdf}
            </a>
          </div>
        </div>
      </div>

      {/* Lista audiobook com player + botão download */}
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-widest px-1" style={{ color: "rgba(244,114,182,0.7)" }}>
          {c.audioTitle}
        </p>
        {files.audios.map((audio, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-sm font-bold w-6 text-center flex-shrink-0" style={{ color: "rgba(244,114,182,0.6)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-white truncate">{audio.title}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <audio controls preload="none" className="h-8" style={{ minWidth: "180px", maxWidth: "220px" }}>
                <source src={audio.url} type="audio/mpeg" />
              </audio>
              <a href={audio.url} download
                className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                style={{ background: "rgba(244,114,182,0.12)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.25)" }}>
                ↓
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <a href={`/${locale}`} className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "rgba(244,114,182,0.7)" }}>
          {c.backHome}
        </a>
      </div>
    </div>
  )
}

export default function MinhabibliotecaPage() {
  return (
    <main>
      <Navbar />
      <section
        className="pt-24 sm:pt-32 pb-20 min-h-screen flex items-start justify-center"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(120,20,60,0.5) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(80,20,100,0.3) 0%, transparent 60%), #0f0a14",
        }}
      >
        <Suspense fallback={
          <div className="text-center pt-32">
            <div className="text-3xl mb-3">⏳</div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Carregando...</p>
          </div>
        }>
          <LibraryContent />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}
