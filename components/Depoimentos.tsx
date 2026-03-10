const depoimentos = [
  { nome: "Ana Paula S.", local: "Sao Paulo, SP", texto: "Chorei do inicio ao fim. Me senti abracada por alguem que realmente entende o que passei." },
  { nome: "Fernanda M.", local: "Belo Horizonte, MG", texto: "Passei da culpa para o orgulho de ser mae do meu filho. Este livro mudou minha perspectiva." },
  { nome: "Juliana R.", local: "Curitiba, PR", texto: "Li em uma noite e dei de presente para 3 amigas. Todas choraram de gratidao." },
  { nome: "Carla D.", local: "Recife, PE", texto: "Este e o unico livro sobre autismo que fala com o coracao. Melhor investimento que fiz." },
  { nome: "Luciana P.", local: "Porto Alegre, RS", texto: "Dei para minha mae ler. Pela primeira vez ela entendeu o que eu vivo." },
  { nome: "Mariana C.", local: "Rio de Janeiro, RJ", texto: "Funcionou como uma terapia. Me senti validada, vista e menos sozinha." },
]

export default function Depoimentos() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="depoimentos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">O que estao dizendo</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">
            Maes que ja leram e <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">se transformaram</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {depoimentos.map((dep, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-7 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex text-yellow-400 text-sm mb-3 sm:mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 leading-relaxed italic mb-4 sm:mb-6 text-sm sm:text-base">&quot;{dep.texto}&quot;</p>
              <div className="border-t pt-3 sm:pt-4">
                <p className="font-bold text-gray-900 text-sm sm:text-base">{dep.nome}</p>
                <p className="text-rosa-500 text-xs sm:text-sm">{dep.local}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
