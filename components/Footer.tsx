import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Antes que eu entendesse</h3>
            <p className="text-xs sm:text-sm leading-relaxed">A jornada real de uma mae. Um livro que acolhe e transforma.</p>
            <div className="flex text-yellow-400 text-sm mt-3 sm:mt-4">⭐⭐⭐⭐⭐</div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Navegacao</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Link href="/" className="hover:text-rosa-400 transition-colors">Inicio</Link>
              <Link href="/livro" className="hover:text-rosa-400 transition-colors">O Livro</Link>
              <Link href="/kelly" className="hover:text-rosa-400 transition-colors">Kelly</Link>
              <Link href="/contato" className="hover:text-rosa-400 transition-colors">Contato</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Legal</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Link href="/privacidade" className="hover:text-rosa-400 transition-colors">Privacidade</Link>
              <Link href="/cookies" className="hover:text-rosa-400 transition-colors">Cookies</Link>
              <Link href="/termos" className="hover:text-rosa-400 transition-colors">Termos</Link>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Contato</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <p>📧 contato@kellymarques.com.br</p>
              <p>📱 WhatsApp: (XX) XXXXX-XXXX</p>
            </div>
            <p className="text-xs mt-3 sm:mt-4">🔒 SSL - Pagamento Seguro</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-[10px] sm:text-xs">
          <p>© 2025 Kelly Marques — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
