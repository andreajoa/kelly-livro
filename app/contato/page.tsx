import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export default function ContatoPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Fale Conosco</span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-4">Entre em <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">contato</span></h1>
            <p className="text-gray-600">Tem uma pergunta, sugestao ou gostaria de compartilhar sua historia? Adorariamos ouvir voce.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 md:p-12">
            <form className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Seu nome</label>
                <input type="text" placeholder="Como voce se chama?" className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Seu e-mail</label>
                <input type="email" placeholder="seuemail@exemplo.com" className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Sua mensagem</label>
                <textarea rows={5} placeholder="Conte-nos o que voce gostaria de dizer..." className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent transition-all resize-none" />
              </div>
              <button type="submit" className="bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-rosa-500/30 hover:shadow-xl hover:shadow-rosa-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wide mt-2">Enviar mensagem →</button>
            </form>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6"><div className="text-3xl mb-3">📧</div><p className="font-semibold text-gray-900 text-sm">E-mail</p><p className="text-gray-500 text-sm mt-1">contato@kellymarques.com.br</p></div>
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6"><div className="text-3xl mb-3">📱</div><p className="font-semibold text-gray-900 text-sm">WhatsApp</p><p className="text-gray-500 text-sm mt-1">(XX) XXXXX-XXXX</p></div>
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6"><div className="text-3xl mb-3">📍</div><p className="font-semibold text-gray-900 text-sm">Localizacao</p><p className="text-gray-500 text-sm mt-1">Brasil</p></div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
