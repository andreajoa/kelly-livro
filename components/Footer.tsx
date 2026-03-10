import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <h3 className="font-playfair text-xl font-bold text-white mb-4">Antes que eu entendesse</h3>
            <p className="text-sm leading-relaxed">A jornada real de uma mae. Um livro que acolhe, transforma e inspira.</p>
            <div className="flex text-yellow-400 text-sm mt-4">⭐⭐⭐⭐⭐</div>
            <p className="text-xs mt-1">4.9/5 — Centenas de leitoras satisfeitas</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegacao</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-rosa-400 transition-colors">Inicio</Link>
              <Link href="/livro" className="hover:text-rosa-400 transition-colors">O Livro</Link>
              <Link href="/kelly" className="hover:text-rosa-400 transition-colors">Kelly Marques</Link>
              <Link href="/contato" className="hover:text-rosa-400 transition-colors">Contato</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacidade" className="hover:text-rosa-400 transition-colors">Politica de Privacidade</Link>
              <Link href="/cookies" className="hover:text-rosa-400 transition-colors">Politica de Cookies</Link>
              <Link href="/termos" className="hover:text-rosa-400 transition-colors">Termos de Uso</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contato</h4>
            <div className="flex flex-col gap-2 text-sm">
              <p>📧 contato@kellymarques.com.br</p>
              <p>📱 WhatsApp: (XX) XXXXX-XXXX</p>
            </div>
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Pagamento Seguro</h4>
              <div className="flex items-center gap-3 text-2xl">💳 🏦 📱</div>
              <p className="text-xs mt-2">🔒 SSL - Criptografia 256-bit</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>© 2025 Kelly Marques — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
