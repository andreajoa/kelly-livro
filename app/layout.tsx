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
  openGraph: {
    title: "Antes que eu entendesse — Kelly Marques",
    description: "A jornada real de uma mãe ao descobrir o autismo da sua filha. Amor, descoberta e transformação.",
    url: "https://www.projetogk.com",
    siteName: "Kelly Marques",
    images: [
      {
        url: "https://www.projetogk.com/images/capa-livro.png",
        width: 1200,
        height: 630,
        alt: "Capa do livro Antes que eu entendesse - Kelly Marques",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antes que eu entendesse — Kelly Marques",
    description: "A jornada real de uma mãe ao descobrir o autismo da sua filha.",
    images: ["https://www.projetogk.com/images/capa-livro.png"],
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
