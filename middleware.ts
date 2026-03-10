import { NextRequest, NextResponse } from "next/server"

const locales = ["pt", "en", "es"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Se já tem locale, deixa passar
  if (locales.some((l) => pathname.startsWith(`/${l}`))) return

  // Admin não tem locale
  if (pathname.startsWith("/admin")) return

  // API e assets não tem locale
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/images") || pathname.startsWith("/videos") || pathname.includes(".")) return

  // Redireciona / para /pt
  const url = request.nextUrl.clone()
  url.pathname = `/pt${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|images|videos|api|favicon).*)"],
}
