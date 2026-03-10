"use client"

import { createContext, useContext } from "react"
import { getDictionary } from "./dictionaries"

type Dict = ReturnType<typeof getDictionary>

const LangContext = createContext<{ t: Dict; locale: string }>({
  t: getDictionary("pt"),
  locale: "pt",
})

export function LangProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const t = getDictionary(locale)
  return <LangContext.Provider value={{ t, locale }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
