export default function Solucao() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-white" id="solucao">
      <div className="max-w-5xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Mas nao precisa ser assim</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">
            E se existisse um livro que te fizesse sentir<br />
            <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">que voce nao esta sozinha?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6">
            <strong>&quot;Antes que eu entendesse&quot;</strong> e mais do que um livro. E um abraco em forma de palavras. E a historia real de Kelly Marques — uma mae que viveu cada duvida, cada lagrima, cada descoberta — e decidiu transformar sua dor em acolhimento para outras maes.
          </p>
        </div>

        <div className="mt-16 relative animate-fade-in">
          <div className="absolute -inset-6 bg-gradient-to-r from-rosa-100 to-rosa-50 rounded-3xl blur-2xl opacity-70" />
          <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-10 md:p-16">
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: "💝", titulo: "Acolhimento Real", desc: "Palavras escritas por quem viveu na pele. Sem teorias frias — apenas amor e verdade." },
                { icon: "🧩", titulo: "Compreensao Profunda", desc: "Entenda o autismo pela perspectiva do amor materno, sem jargao medico." },
                { icon: "🌟", titulo: "Transformacao", desc: "Da culpa a aceitacao, do medo a forca. Uma jornada que inspira e liberta." },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 mx-auto bg-rosa-50 rounded-2xl flex items-center justify-center text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{item.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
