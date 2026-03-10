import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PrivacidadePage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Legal</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-10">Politica de <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Privacidade</span></h1>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>A sua privacidade e importante para nos. Esta Politica de Privacidade descreve como coletamos, usamos e protegemos suas informacoes pessoais quando voce utiliza nosso site.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">1. Informacoes Coletadas</h3>
            <p>Coletamos informacoes que voce nos fornece diretamente, como nome, e-mail e endereco de entrega ao realizar uma compra ou preencher formularios de contato.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">2. Uso das Informacoes</h3>
            <p>As informacoes coletadas sao utilizadas exclusivamente para processar pedidos, enviar atualizacoes sobre sua compra e melhorar a experiencia do usuario em nosso site.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">3. Compartilhamento de Dados</h3>
            <p>Nao vendemos, alugamos ou compartilhamos suas informacoes pessoais com terceiros, exceto quando necessario para processar pagamentos e entregas.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">4. Seguranca</h3>
            <p>Utilizamos criptografia SSL e medidas de seguranca adequadas para proteger suas informacoes contra acesso nao autorizado.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">5. Seus Direitos (LGPD)</h3>
            <p>Conforme a Lei Geral de Protecao de Dados (LGPD), voce tem o direito de acessar, corrigir, excluir ou solicitar a portabilidade de seus dados pessoais.</p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">6. Contato</h3>
            <p>Para duvidas sobre esta politica, entre em contato pelo e-mail: contato@kellymarques.com.br</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
