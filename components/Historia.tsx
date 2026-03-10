export default function Historia() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-rosa-50 to-white" id="historia">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">A Historia por tras do Livro</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6 mt-3 sm:mt-4">
            &quot;Sera que eu fiz<br />
            <span className="bg-gradient-to-r from-rosa-600 to-rosa-800 bg-clip-text text-transparent">algo errado?&quot;</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start animate-fade-in-up">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-rosa-200 to-rosa-300 rounded-2xl blur-xl opacity-30" />
              <img src="/images/autora.png" alt="Kelly Marques" className="relative w-48 sm:w-56 md:w-full rounded-2xl shadow-xl object-cover" />
            </div>
          </div>

          <div className="md:col-span-2 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <p className="font-playfair font-bold text-gray-900">Kelly Marques</p>
                <p className="text-rosa-600 text-sm">Autora</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-light">
              <p>Eu lembro do dia em que tudo mudou. Meu filho tinha dois anos, e enquanto as outras criancas brincavam juntas no parquinho, ele ficava no canto, girando a roda de um carrinho, sozinho.</p>
              <p>As pessoas diziam que era normal. Mas eu sabia que algo era diferente. E a pergunta que me destruia por dentro era: <strong className="text-rosa-700">&quot;Sera que eu fiz algo errado?&quot;</strong></p>
              <p>Ate que veio o diagnostico: <strong>Transtorno do Espectro Autista.</strong> Meu mundo desmoronou. Mas comecou a se reconstruir com mais amor do que eu jamais imaginei ter.</p>
              <p>Escrevi este livro para toda mae que precisa ouvir: <strong className="text-rosa-700">voce nao esta sozinha.</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
