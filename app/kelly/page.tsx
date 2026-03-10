import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export default function KellyPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-rosa-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-rosa-200 to-rosa-300 rounded-full blur-2xl opacity-30" />
                <img src="/images/autora.png" alt="Kelly Marques" className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover" />
              </div>
            </div>
            <div className="animate-fade-in-up">
              <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">A Autora</span>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-6">Kelly <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">Marques</span></h1>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>Kelly Marques e mae, escritora e defensora da causa autista. Sua historia comecou com uma pergunta simples, mas profundamente transformadora:</p>
                <blockquote className="border-l-4 border-rosa-400 pl-6 py-2 italic text-rosa-700 text-lg font-playfair">&quot;Sera que eu fiz algo errado?&quot;</blockquote>
                <p>Essa pergunta a levou por uma jornada de autodescoberta, amor incondicional e coragem para enfrentar nao so o diagnostico do seu filho, mas tambem os julgamentos de uma sociedade que ainda nao compreende plenamente o espectro autista.</p>
                <p>&quot;Antes que eu entendesse&quot; nasceu da necessidade de compartilhar essa jornada e apoiar outras maes que vivem experiencias semelhantes. Kelly acredita que nenhuma mae deveria caminhar sozinha nessa estrada.</p>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-10 md:p-14">
            <p className="text-3xl font-playfair italic text-gray-700 leading-relaxed max-w-3xl mx-auto">&quot;Eu escrevi este livro para a mae que chora escondida no banheiro. Para que ela saiba que suas lagrimas sao de forca, nao de fraqueza.&quot;</p>
            <p className="text-rosa-600 font-semibold mt-6">— Kelly Marques</p>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
