"use client"
import { useEffect, useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/store/cartStore"
import { useLang } from "@/lib/LangContext"

const BASE = "https://pub-66c21cbcbdf1471795c366e7560d3600.r2.dev"

const LOCALE_DATA = {
  pt: {
    congrats: "Parabéns pela sua compra!",
    areaLabel: "BIBLIOTECA EXCLUSIVA",
    downloadPdf: "↓ Baixar eBook (PDF)",
    backHome: "← Voltar ao início",
    orderLabel: "Pedido",
    title: "Antes que eu entendesse\nvocê já me transformava",
    author: "Kélly Marques",
    audioTitle: "AUDIOBOOK",
    cover: "/images/capa-livro.png",
    pdf: `${BASE}/ebook-pt/PT/ebook%20(PT)%20DIAG%20-%20Kelly%20Marques.pdf`,
    audios: [
      { title: "Introdução",       duration: "0:52", url: `${BASE}/audiobook-pt/PT/001%20Introdu%C3%A7%C3%A3o.mp3` },
      { title: "Capítulo 1",       duration: "9:32", url: `${BASE}/audiobook-pt/PT/Cap%201.mp3` },
      { title: "Capítulo 2",       duration: "8:41", url: `${BASE}/audiobook-pt/PT/Cap%202.mp3` },
      { title: "Capítulo 3",       duration: "7:58", url: `${BASE}/audiobook-pt/PT/Cap%203.mp3` },
      { title: "Capítulo 4",       duration: "2:10", url: `${BASE}/audiobook-pt/PT/Cap%204.mp3` },
      { title: "Capítulo 5",       duration: "5:20", url: `${BASE}/audiobook-pt/PT/Cap%205.mp3` },
      { title: "Capítulo 6",       duration: "11:44",url: `${BASE}/audiobook-pt/PT/Cap%206.mp3` },
      { title: "Epílogo",          duration: "1:40", url: `${BASE}/audiobook-pt/PT/Cap%209%20Epilogo.mp3` },
      { title: "Cartas para Deus", duration: "0:32", url: `${BASE}/audiobook-pt/PT/Cap%2010%20Cartas%20para%20Deus.mp3` },
      { title: "Faixa Bônus",      duration: "1:02", url: `${BASE}/audiobook-pt/PT/00.mp3` },
    ],
  },
  en: {
    congrats: "Congratulations on your purchase!",
    areaLabel: "EXCLUSIVE LIBRARY",
    downloadPdf: "↓ Download eBook (PDF)",
    backHome: "← Back to Home",
    orderLabel: "Order",
    title: "Before I Understood\nYou Were Already Transforming Me",
    author: "Kelly Marques",
    audioTitle: "AUDIOBOOK",
    cover: "/images/capaingles.png",
    pdf: `${BASE}/ebook-en/EN/ebook%20-%20(EN)%20DIAG.pdf`,
    audios: [
      { title: "Intro",      duration: "1:02", url: `${BASE}/audiobook-en/EN/00%20Intro.mp3` },
      { title: "Chapter 1",  duration: "9:32", url: `${BASE}/audiobook-en/EN/Cap%201.mp3` },
      { title: "Chapter 2",  duration: "8:41", url: `${BASE}/audiobook-en/EN/Cap%202.mp3` },
      { title: "Chapter 3",  duration: "7:58", url: `${BASE}/audiobook-en/EN/Cap%203.mp3` },
      { title: "Chapter 4",  duration: "2:10", url: `${BASE}/audiobook-en/EN/Cap%204.mp3` },
      { title: "Chapter 5",  duration: "5:20", url: `${BASE}/audiobook-en/EN/Cap%205.mp3` },
      { title: "Epilogue",   duration: "1:40", url: `${BASE}/audiobook-en/EN/Epilogo.mp3` },
    ],
  },
  es: {
    congrats: "¡Felicitaciones por tu compra!",
    areaLabel: "BIBLIOTECA EXCLUSIVA",
    downloadPdf: "↓ Descargar eBook (PDF)",
    backHome: "← Volver al inicio",
    orderLabel: "Pedido",
    title: "Antes que yo entendiera\nya me estabas transformando",
    author: "Kelly Marques",
    audioTitle: "AUDIOLIBRO",
    cover: "/images/capaingles.png",
    pdf: `${BASE}/ebook-en/EN/ebook%20-%20(EN)%20DIAG.pdf`,
    audios: [
      { title: "Introducción", duration: "1:02", url: `${BASE}/audiobook-en/EN/00%20Intro.mp3` },
      { title: "Capítulo 1",   duration: "9:32", url: `${BASE}/audiobook-en/EN/Cap%201.mp3` },
      { title: "Capítulo 2",   duration: "8:41", url: `${BASE}/audiobook-en/EN/Cap%202.mp3` },
      { title: "Capítulo 3",   duration: "7:58", url: `${BASE}/audiobook-en/EN/Cap%203.mp3` },
      { title: "Capítulo 4",   duration: "2:10", url: `${BASE}/audiobook-en/EN/Cap%204.mp3` },
      { title: "Capítulo 5",   duration: "5:20", url: `${BASE}/audiobook-en/EN/Cap%205.mp3` },
      { title: "Epílogo",      duration: "1:40", url: `${BASE}/audiobook-en/EN/Epilogo.mp3` },
    ],
  },
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60)
  return `${m}:${ss.toString().padStart(2, "0")}`
}

function PlayerBar({ audio, title }: { audio: HTMLAudioElement | null; title: string }) {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [vol, setVol] = useState(1)

  useEffect(() => {
    if (!audio) return
    const onTime = () => setCurrent(audio.currentTime)
    const onDur = () => setDuration(audio.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onDur)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onDur)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [audio])

  const toggle = () => audio && (playing ? audio.pause() : audio.play())
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setCurrent(Number(e.target.value))
  }
  const changeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setVol(v)
    if (audio) audio.volume = v
  }

  const pct = duration ? (current / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 sm:px-8"
      style={{
        background: "rgba(15,10,20,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(244,114,182,0.15)",
      }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        {/* Barra de progresso */}
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.4)", minWidth: "36px" }}>{formatTime(current)}</span>
          <div className="relative flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="absolute left-0 top-0 h-1 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#ec4899,#be185d)" }} />
            <input type="range" min={0} max={duration || 100} step={0.1} value={current} onChange={seek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1" />
          </div>
          <span className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.4)", minWidth: "36px", textAlign: "right" }}>{formatTime(duration)}</span>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs truncate flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>{title}</p>
          <button onClick={toggle}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 active:scale-95"
            style={{ background: "linear-gradient(135deg,#ec4899,#be185d)", boxShadow: "0 4px 16px rgba(236,72,153,0.4)" }}>
            {playing
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
            }
          </button>
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <input type="range" min={0} max={1} step={0.05} value={vol} onChange={changeVol}
              className="w-16 h-1 cursor-pointer accent-pink-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LibraryContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const { locale } = useLang()
  const orderId = searchParams.get("order_id")

  useEffect(() => { clearCart() }, [clearCart])

  const d = LOCALE_DATA[locale as keyof typeof LOCALE_DATA] ?? LOCALE_DATA.en

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [activeTitle, setActiveTitle] = useState("")

  const playTrack = (idx: number) => {
    const track = d.audios[idx]
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = track.url
      audioRef.current.play()
    } else {
      const a = new Audio(track.url)
      a.play()
      audioRef.current = a
    }
    setActiveIdx(idx)
    setActiveTitle(track.title)
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-32 pt-6 space-y-8">

      {/* Hero — capa + info estilo Spotify */}
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-end"
        style={{
          background: "linear-gradient(to bottom, rgba(120,20,60,0.6) 0%, rgba(15,10,20,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
        {/* Capa real */}
        <div className="flex-shrink-0 shadow-2xl rounded-xl overflow-hidden" style={{ width: "140px", height: "210px", position: "relative" }}>
          <Image src={d.cover} alt={d.title} fill style={{ objectFit: "cover" }} />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "rgba(244,114,182,0.7)" }}>{d.areaLabel}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug whitespace-pre-line mb-1">{d.title}</h1>
          <p className="text-sm italic mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{d.author}</p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a href={d.pdf} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-2 px-5 rounded-full transition-all hover:scale-105"
              style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)" }}>
              {d.downloadPdf}
            </a>
            {orderId && (
              <span className="text-xs px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                {d.orderLabel} #{orderId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tracklist estilo Spotify */}
      <div>
        <div className="flex items-center gap-4 px-4 pb-2 mb-1 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-xs w-6 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>#</span>
          <span className="text-xs flex-1" style={{ color: "rgba(255,255,255,0.3)" }}>{d.audioTitle}</span>
          <span className="text-xs w-10 text-right" style={{ color: "rgba(255,255,255,0.3)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </span>
          <span className="text-xs w-6" />
        </div>

        {d.audios.map((track, i) => {
          const isActive = activeIdx === i
          return (
            <div key={i}
              className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer group transition-all"
              style={{ background: isActive ? "rgba(236,72,153,0.10)" : "transparent" }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)" }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent" }}
              onClick={() => playTrack(i)}
            >
              {/* Número / play icon */}
              <div className="w-6 flex items-center justify-center flex-shrink-0">
                <span className="group-hover:hidden text-sm tabular-nums" style={{ color: isActive ? "#f472b6" : "rgba(255,255,255,0.4)" }}>
                  {isActive
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#f472b6"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    : i + 1
                  }
                </span>
                <span className="hidden group-hover:flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                </span>
              </div>

              {/* Título */}
              <span className="flex-1 text-sm truncate" style={{ color: isActive ? "#f472b6" : "white" }}>{track.title}</span>

              {/* Duração */}
              <span className="text-xs tabular-nums w-10 text-right flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{track.duration}</span>

              {/* Download */}
              <a href={track.url} download onClick={e => e.stopPropagation()}
                className="w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: "rgba(244,114,182,0.7)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>
          )
        })}
      </div>

      {/* Voltar */}
      <div className="text-center pt-2 pb-4">
        <a href={`/${locale}`} className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "rgba(244,114,182,0.6)" }}>
          {d.backHome}
        </a>
      </div>
    </div>
  )
}

export default function MinhabibliotecaPage() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [activeTitle, setActiveTitle] = useState("")

  return (
    <main>
      <Navbar />
      <section
        className="pt-20 sm:pt-24 min-h-screen flex items-start justify-center"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(120,20,60,0.55) 0%, transparent 55%), #0f0a14",
        }}
      >
        <Suspense fallback={
          <div className="text-center pt-32">
            <div className="text-3xl mb-3">⏳</div>
          </div>
        }>
          <LibraryContent />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}
