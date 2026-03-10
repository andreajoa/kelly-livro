import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function TermosPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Legal</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-10">Termos de <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Uso</span></h1>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>Ao acessar e utilizar este site, voce concorda com os seguintes termos e condicoes.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">1. Uso do Site</h3>
            <p>Este site destina-se a venda do livro &quot;Antes que eu entendesse&quot; de Kelly Marques. Todo o conteudo e protegido por direitos autorais.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">2. Compras</h3>
            <p>Ao realizar uma compra, voce concorda em fornecer informacoes verdadeiras e completas.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">3. Politica de Devolucao</h3>
            <p>Oferecemos garantia de 7 dias. Se nao estiver satisfeito, entre em contato dentro deste prazo para solicitar reembolso integral.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">4. Propriedade Intelectual</h3>
            <p>Todo o conteudo deste site e propriedade de Kelly Marques e esta protegido por leis de direitos autorais.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">5. Limitacao de Responsabilidade</h3>
            <p>Nao nos responsabilizamos por danos indiretos decorrentes do uso deste site ou do produto adquirido.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">6. Contato</h3>
            <p>Para duvidas sobre estes termos, entre em contato: contato@kellymarques.com.br</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
