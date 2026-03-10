const objecoes = [
  { pergunta: "Eu nao sou mae de uma crianca autista. Esse livro e para mim?", resposta: "Sim! Este livro e para qualquer pessoa que ama ou convive com alguem no espectro. Avos, professoras, tias, amigas. Entender e o primeiro passo para acolher." },
  { pergunta: "Ja li outros livros sobre autismo e eram muito tecnicos...", resposta: "Este livro e completamente diferente. Nao e um manual medico — e uma historia real, escrita com o coracao. Sem jargao, sem frieza. Apenas verdade e amor." },
  { pergunta: "R$ 119 e caro para um livro...", resposta: "Quanto custa continuar se sentindo sozinha? Quanto voce ja gastou em consultas, livros que nao ajudaram, e noites sem dormir? Alem disso, voce leva 3 bonus que juntos valem mais de R$ 249. Este livro e um investimento na sua saude emocional." },
  { pergunta: "E se eu nao gostar?", resposta: "Voce tem 7 dias de garantia incondicional. Se nao sentir que valeu cada centavo, devolvemos seu dinheiro. Sem perguntas." },
  { pergunta: "O livro e fisico ou digital?", resposta: "O livro e enviado na versao fisica, diretamente para o endereco que voce cadastrar. Voce recebe em casa com todo carinho." },
  { pergunta: "Como calculo o frete?", resposta: "Na secao de oferta ou no carrinho, digite seu CEP e veja na hora quanto custa o envio para sua regiao. Aceitamos PAC e SEDEX." },
]

export default function Objecoes() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gray-50" id="objecoes">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Ainda tem duvidas?</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">Talvez voce esteja pensando...</h2>
        </div>

        <div className="space-y-6 animate-fade-in-up">
          {objecoes.map((obj, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-7 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <span className="text-rosa-500 text-xl mt-0.5">❓</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-3">&quot;{obj.pergunta}&quot;</p>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-0.5">✅</span>
                    <p className="text-gray-600 leading-relaxed">{obj.resposta}</p>
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
