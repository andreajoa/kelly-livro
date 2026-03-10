"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 animate-count-pulse">
      {[
        { val: timeLeft.hours, label: "Horas" },
        { val: timeLeft.minutes, label: "Min" },
        { val: timeLeft.seconds, label: "Seg" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-4">
          {i > 0 && <span className="text-xl sm:text-3xl font-bold text-rosa-300">:</span>}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 sm:py-4 min-w-[55px] sm:min-w-[80px]">
            <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-playfair">{pad(item.val)}</span>
            <p className="text-rosa-200 text-[10px] sm:text-xs mt-0.5 sm:mt-1 uppercase tracking-wide">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
