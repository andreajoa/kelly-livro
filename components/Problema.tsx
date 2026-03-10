export default function Problema() {
  return (
    <section className="section-padding bg-gray-50" id="problema">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Voce se identifica?</span>
          <h2 className="section-title mt-4">
            Quando uma mae comeca a perceber<br />
            <span className="gradient-text">que algo esta diferente...</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            {[
              "Noites sem dormir, se perguntando se fez algo errado durante a gestacao",
              'Ouvindo de familiares "isso e frescura" ou "vai passar"',
              "Se sentindo sozinha, incompreendida, sem saber a quem recorrer",
              "A culpa que sufoca, o medo do julgamento, a incerteza do futuro",
              "Buscando respostas na internet e encontrando mais medo do que acolhimento",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border-l-4 border-red-400 hover:shadow-md transition-shadow">
                <span className="text-red-500 text-xl mt-1">❌</span>
                <p className="text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>

          <div className="animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gray-200 to-rosa-100 rounded-2xl blur-xl opacity-60" />
              <img src="/images/problema.jpeg" alt="Mae em reflexao" className="relative rounded-2xl shadow-xl w-full object-cover" />
            </div>
            <p className="text-center text-gray-500 text-sm mt-6 italic">&quot;Se voce nao fizer nada, daqui a um ano ainda estara carregando esse peso sozinha...&quot;</p>
          </div>
        </div>
      </div>
    </section>
  )
}
