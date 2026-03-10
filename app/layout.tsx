import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato", display: "swap" })

export const metadata: Metadata = {
  title: "Antes que eu entendesse — Kelly Marques",
  description: "A jornada real de uma mãe ao descobrir o autismo do seu filho.",
  icons: { icon: "/images/capa-livro.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-lato bg-white text-gray-800 overflow-x-hidden">{children}</body>
    </html>
  )
}
