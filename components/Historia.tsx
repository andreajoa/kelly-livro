export default function Historia() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="historia">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">A Historia por tras do Livro</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 mt-4">&quot;Sera que eu fiz<br /><span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">algo errado?&quot;</span></h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 md:p-14 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8">
            <img src="/images/autora.png" alt="Kelly Marques" className="w-16 h-16 rounded-full object-cover border-2 border-rosa-300" />
            <div>
              <p className="font-playfair font-bold text-gray-900">Kelly Marques</p>
              <p className="text-rosa-600 text-sm">Autora</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light">
            <p><span className="text-5xl font-playfair text-rosa-300 float-left mr-3 mt-1">&quot;</span>Eu lembro do dia em que tudo mudou. Meu filho tinha dois anos, e enquanto as outras criancas brincavam juntas no parquinho, ele ficava no canto, girando a roda de um carrinho, sozinho. Fascinado. Alheio ao mundo.</p>
            <p>As pessoas diziam que era normal. Que cada crianca tem seu tempo. Mas eu sabia — la no fundo do meu peito — que algo era diferente. E a pergunta que me destruia por dentro era: <strong className="text-rosa-700">&quot;Sera que eu fiz algo errado?&quot;</strong></p>
            <p>Foram meses de consultas, de olhares de julgamento na sala de espera, de noites chorando no banheiro para que ninguem visse. Ate que veio o diagnostico: <strong>Transtorno do Espectro Autista.</strong></p>
            <p>Naquele momento, meu mundo desmoronou. Mas em seguida... comecou a se reconstruir. Peca por peca. Com mais amor e mais forca do que eu jamais imaginei ter.</p>
            <p>Escrevi este livro para toda mae que ja se perguntou se era boa o suficiente. Para toda mae que chorou escondido. Para toda mae que precisa ouvir: <strong className="text-rosa-700">voce nao esta sozinha. E voce e incrivel.</strong></p>
            <p className="text-right text-rosa-400 font-playfair italic text-xl">— Kelly Marques&quot;</p>
          </div>
        </div>
      </div>
    </section>
  )
}
