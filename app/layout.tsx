import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s | Kelly Marques",
    default: "Antes que eu entendesse — Kelly Marques",
  },
  description: "A jornada real de uma mãe ao descobrir o autismo da sua filha. Amor, descoberta e transformação.",
  icons: {
    icon: ["/images/favicon-kelly.png"],
    shortcut: "/images/favicon-kelly.png",
    apple: "/images/favicon-kelly.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
