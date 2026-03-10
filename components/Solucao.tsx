export default function Solucao() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="solucao">
      <div className="max-w-5xl mx-auto">
        <div className="text-center animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Mas nao precisa ser assim</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6 mt-3 sm:mt-4">
            E se existisse um livro que te fizesse sentir<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent"> que voce nao esta sozinha?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-6">
            <strong>&quot;Antes que eu entendesse&quot;</strong> e mais do que um livro. E um abraco em forma de palavras.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid md:grid-cols-2 gap-8 items-center">
          <img src="/images/descoberta.jpeg" alt="A descoberta" className="rounded-2xl shadow-xl w-full object-cover animate-fade-in" />

          <div className="grid grid-cols-1 gap-6 animate-fade-in-up">
            {[
              { icon: "💝", titulo: "Acolhimento Real", desc: "Palavras escritas por quem viveu na pele. Sem teorias frias." },
              { icon: "🧩", titulo: "Compreensao Profunda", desc: "Entenda o autismo pela perspectiva do amor materno." },
              { icon: "🌟", titulo: "Transformacao", desc: "Da culpa a aceitacao, do medo a forca. Uma jornada que liberta." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rosa-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 mb-1">{item.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
