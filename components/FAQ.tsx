"use client"

import { useState } from "react"

const faqs = [
  { pergunta: "Como funciona a compra?", resposta: "Clique no botao, va ao carrinho, calcule o frete, preencha seus dados e pague pelo Stripe." },
  { pergunta: "Quanto tempo leva para receber?", resposta: "Envio em ate 2 dias uteis. Entrega de 5-10 dias uteis conforme sua regiao." },
  { pergunta: "Posso presentear alguem?", resposta: "Claro! Basta inserir o endereco do destinatario no checkout." },
  { pergunta: "E se eu nao gostar?", resposta: "7 dias de garantia incondicional. Devolvemos 100% do dinheiro." },
  { pergunta: "O livro aborda apenas autismo?", resposta: "E sobre a jornada materna — amor, culpa, aceitacao. O autismo e o contexto, as emocoes sao universais." },
  { pergunta: "Tem versao digital?", resposta: "No momento apenas versao fisica. Estamos avaliando versao digital." },
  { pergunta: "A compra e segura?", resposta: "Sim! Criptografia SSL e plataforma Stripe certificada." },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">Perguntas Frequentes</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 mt-3">Tudo que voce precisa saber</h2>
        </div>

        <div className="space-y-2 sm:space-y-3 animate-fade-in-up">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-rosa-50/50 transition-colors">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{faq.pergunta}</span>
                <span className={`text-rosa-500 text-xl sm:text-2xl transform transition-transform flex-shrink-0 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openIndex === i && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 leading-relaxed animate-fade-in text-sm sm:text-base">{faq.resposta}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
