const objecoes = [
  { pergunta: "Nao sou mae de crianca autista. E pra mim?", resposta: "Sim! E para qualquer pessoa que ama ou convive com alguem no espectro." },
  { pergunta: "Ja li outros livros e eram muito tecnicos...", resposta: "Este e diferente. Nao e manual medico — e uma historia real escrita com o coracao." },
  { pergunta: "R$ 119 e caro para um livro...", resposta: "Quanto custa continuar se sentindo sozinha? Este livro e um investimento na sua saude emocional." },
  { pergunta: "E se eu nao gostar?", resposta: "7 dias de garantia incondicional. Devolvemos seu dinheiro sem perguntas." },
  { pergunta: "O livro e fisico ou digital?", resposta: "Fisico! Enviado diretamente para o endereco que voce cadastrar." },
]

export default function Objecoes() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-white" id="objecoes">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Ainda tem duvidas?</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">Talvez voce esteja pensando...</h2>
        </div>

        <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
          {objecoes.map((obj, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-5 md:p-7 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <span className="text-rosa-500 text-base sm:text-xl mt-0.5 flex-shrink-0">❓</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-2 sm:mb-3">&quot;{obj.pergunta}&quot;</p>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-500 text-base sm:text-xl mt-0.5 flex-shrink-0">✅</span>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">{obj.resposta}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
