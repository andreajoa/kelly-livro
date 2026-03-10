import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CookiesPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Legal</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-10">Politica de <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Cookies</span></h1>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>Este site utiliza cookies para melhorar sua experiencia de navegacao e analisar o uso do site.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">O que sao Cookies?</h3>
            <p>Cookies sao pequenos arquivos de texto armazenados no seu dispositivo quando voce visita um site.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Cookies que Utilizamos</h3>
            <p><strong>Essenciais:</strong> Necessarios para o funcionamento basico do site.</p>
            <p><strong>Analiticos:</strong> Nos ajudam a entender como os visitantes interagem com o site.</p>
            <p><strong>Funcionais:</strong> Lembram suas preferencias para melhor experiencia.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Como Gerenciar Cookies</h3>
            <p>Voce pode configurar seu navegador para bloquear ou alertar sobre cookies.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Contato</h3>
            <p>Para duvidas sobre cookies, entre em contato: contato@kellymarques.com.br</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
