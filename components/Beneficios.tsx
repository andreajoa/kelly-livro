const beneficios = [
  { icon: "🤱", titulo: "Conexao Imediata", descricao: "Desde a primeira pagina voce vai sentir que alguem escreveu exatamente o que voce sente." },
  { icon: "💡", titulo: "Clareza sobre o Diagnostico", descricao: "Entenda o autismo sem jargao medico complicado. Kelly traduz em amor e simplicidade." },
  { icon: "🫂", titulo: "Fim da Solidao", descricao: "Voce vai parar de se sentir sozinha. Este livro e uma comunidade silenciosa de maes." },
  { icon: "💪", titulo: "Da Culpa a Forca", descricao: "Transforme a culpa paralisante em coragem inabalavel." },
  { icon: "🎁", titulo: "Presente que Transforma", descricao: "Ideal para presentear uma mae atipica, uma avo, uma professora." },
  { icon: "📖", titulo: "Leitura Leve e Profunda", descricao: "Capitulos curtos, linguagem acessivel e uma narrativa que nao te solta." },
]

export default function Beneficios() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="beneficios">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
          <div className="animate-fade-in-up">
            <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Por que este livro e diferente</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4 mt-3">
              Nao e so um livro. E um <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">abraco em cada pagina.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            <img src="/images/desafios.jpeg" alt="Desafios" className="rounded-xl shadow-lg object-cover w-full h-32 sm:h-40 md:h-48" />
            <img src="/images/amor.jpeg" alt="Amor que transforma" className="rounded-xl shadow-lg object-cover w-full h-32 sm:h-40 md:h-48" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {beneficios.map((b, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300">{b.icon}</div>
              <h3 className="font-playfair text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{b.titulo}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{b.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
