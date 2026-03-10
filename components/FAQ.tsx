"use client"
import { useState } from "react"
import { useLang } from "@/lib/LangContext"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useLang()
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16"><span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">{t.faq.badge}</span><h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">{t.faq.title}</h2></div>
        <div className="space-y-2 sm:space-y-3">{t.faq.items.map((faq: {q:string;a:string}, i: number) => (<div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"><button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-rosa-50/50"><span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span><span className={`text-rosa-500 text-xl sm:text-2xl transform transition-transform flex-shrink-0 ${openIndex === i ? "rotate-45" : ""}`}>+</span></button>{openIndex === i && <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm sm:text-base">{faq.a}</div>}</div>))}</div>
      </div>
    </section>
  )
}
