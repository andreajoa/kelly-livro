import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Antes que eu entendesse — Kelly Marques",
  description: "A jornada real de uma mãe ao descobrir o autismo da sua filha.",
  icons: {
    icon: "/images/favicon-kelly.png",
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
      <head>
        <link rel="icon" href="/images/favicon-kelly.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon-kelly.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
