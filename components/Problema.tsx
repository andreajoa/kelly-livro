export default function Problema() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="problema">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Voce se identifica?</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6 mt-3 sm:mt-4">
            Quando uma mae comeca a perceber<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent"> que algo esta diferente...</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            {[
              "Noites sem dormir, se perguntando se fez algo errado",
              "Ouvindo de familiares que e frescura ou que vai passar",
              "Se sentindo sozinha e sem saber a quem recorrer",
              "A culpa que sufoca e o medo do julgamento",
              "Buscando respostas e encontrando mais medo do que acolhimento",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-sm border-l-4 border-red-400 hover:shadow-md transition-shadow">
                <span className="text-red-500 text-lg sm:text-xl mt-0.5 flex-shrink-0">❌</span>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{t}</p>
              </div>
            ))}
          </div>

          <div className="animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gray-200 to-rosa-100 rounded-2xl blur-xl opacity-60" />
              <img src="/images/problema.jpeg" alt="Mae em reflexao" className="relative rounded-2xl shadow-xl w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
