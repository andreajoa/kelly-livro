const depoimentos = [
  { nome: "Ana Paula S.", local: "Sao Paulo, SP", texto: "Chorei do inicio ao fim. Me senti abracada por alguem que realmente entende o que passei. Este livro deveria ser leitura obrigatoria." },
  { nome: "Fernanda M.", local: "Belo Horizonte, MG", texto: "Eu nao acreditava que um livro pudesse mudar minha perspectiva assim. Passei da culpa para o orgulho de ser mae do meu filho." },
  { nome: "Juliana R.", local: "Curitiba, PR", texto: "Li em uma noite e dei de presente para 3 amigas. Todas maes atipicas. Todas choraram de gratidao. Obrigada, Kelly." },
  { nome: "Carla D.", local: "Recife, PE", texto: "Ja tentei ler outros livros sobre autismo. Eram frios, tecnicos. Este e o unico que fala com o coracao. Melhor investimento que fiz." },
  { nome: "Luciana P.", local: "Porto Alegre, RS", texto: "Dei para minha mae ler. Pela primeira vez ela entendeu o que eu vivo. Pela primeira vez ela me pediu desculpas." },
  { nome: "Mariana C.", local: "Rio de Janeiro, RJ", texto: "Funcionou como uma terapia. Me senti validada, vista e menos sozinha. Obrigada, Kelly. Voce salvou muitas maes." },
]

export default function Depoimentos() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-white" id="depoimentos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">O que estao dizendo</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">Maes que ja leram e<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">se transformaram</span></h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">Historias reais de mulheres que encontraram acolhimento nestas paginas</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((dep, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex text-yellow-400 text-sm mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 leading-relaxed italic mb-6">&quot;{dep.texto}&quot;</p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{dep.nome}</p>
                <p className="text-rosa-500 text-sm">{dep.local}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">⭐⭐⭐⭐⭐ Avaliacao media: <strong>4.9/5</strong> baseada em centenas de leitoras</p>
        </div>
      </div>
    </section>
  )
}
