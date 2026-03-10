const beneficios = [
  { icon: "🤱", titulo: "Conexao Imediata", descricao: "Desde a primeira pagina voce vai sentir que alguem escreveu exatamente o que voce sente. Nao e teoria — e vivencia real." },
  { icon: "💡", titulo: "Clareza sobre o Diagnostico", descricao: "Entenda o autismo sem jargao medico complicado. Kelly traduz em amor e simplicidade o que os consultorios nao conseguem." },
  { icon: "🫂", titulo: "Fim da Solidao", descricao: "Voce vai parar de se sentir sozinha. Este livro e uma comunidade silenciosa de maes que entendem voce." },
  { icon: "💪", titulo: "Da Culpa a Forca", descricao: "Transforme a culpa paralisante em coragem inabalavel. Kelly mostra que a sua vulnerabilidade e sua maior potencia." },
  { icon: "🎁", titulo: "Presente que Transforma", descricao: "Ideal para presentear uma mae atipica, uma avo, uma professora. Quem le, entende. E quem entende, acolhe." },
  { icon: "📖", titulo: "Leitura Leve e Profunda", descricao: "Escrito para ser lido de uma vez. Capitulos curtos, linguagem acessivel e uma narrativa que nao te solta." },
]

export default function Beneficios() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-white" id="beneficios">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Por que este livro e diferente</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">Nao e so um livro. E um<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">abraco em cada pagina.</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((b, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{b.icon}</div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{b.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
