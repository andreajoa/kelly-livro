import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export default function ContatoPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-3 sm:mb-4">
              Entre em <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">contato</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Tem uma pergunta? Adorariamos ouvir voce.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 md:p-12">
            <form className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 block">Seu nome</label>
                <input type="text" placeholder="Como voce se chama?" className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 block">Seu e-mail</label>
                <input type="email" placeholder="seuemail@exemplo.com" className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 text-sm sm:text-base" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 block">Sua mensagem</label>
                <textarea rows={4} placeholder="Conte-nos..." className="w-full border border-gray-200 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-400 resize-none text-sm sm:text-base" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-rosa-600 to-rosa-700 hover:from-rosa-700 hover:to-rosa-800 text-white font-bold py-3 sm:py-4 rounded-full text-sm sm:text-lg uppercase tracking-wide mt-2">Enviar →</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
