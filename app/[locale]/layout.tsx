import { LangProvider } from "@/lib/LangContext"
import PageTracker from "@/components/PageTracker"
import LeadPopup from "@/components/LeadPopup"

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }]
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <LangProvider locale={locale}>
      <PageTracker />
      <LeadPopup />
      {children}
    </LangProvider>
  )
}
