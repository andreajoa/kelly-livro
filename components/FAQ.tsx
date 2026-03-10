"use client"

import { useState } from "react"

const faqs = [
  { pergunta: "Como funciona a compra?", resposta: "Apos clicar no botao de compra, voce sera direcionado para o checkout seguro. Basta inserir seus dados de entrega e pagamento. Aceitamos cartao de credito, PIX e boleto." },
  { pergunta: "Quanto tempo leva para receber?", resposta: "O envio e feito em ate 2 dias uteis apos a confirmacao do pagamento. O prazo de entrega varia conforme sua regiao (geralmente 5-10 dias uteis)." },
  { pergunta: "O frete e gratis?", resposta: "Para esta oferta de lancamento, o frete tem um valor reduzido especial. Em algumas promocoes, pode ser gratuito — fique atenta!" },
  { pergunta: "Posso presentear alguem com o livro?", resposta: "Claro! Muitas maes compram para presentear amigas, avos, professoras e terapeutas. Basta inserir o endereco do destinatario no checkout." },
  { pergunta: "E se eu nao gostar do livro?", resposta: "Voce tem 7 dias de garantia incondicional. Se nao se identificar com a leitura, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia." },
  { pergunta: "O livro aborda apenas autismo?", resposta: "O livro e sobre a jornada materna — sobre amor, culpa, aceitacao e transformacao. O autismo e o contexto, mas as emocoes sao universais." },
  { pergunta: "Tem versao digital/e-book?", resposta: "No momento, o livro esta disponivel apenas na versao fisica. Estamos avaliando uma versao digital para o futuro." },
  { pergunta: "A compra e segura?", resposta: "Sim! Utilizamos criptografia SSL e plataformas de pagamento certificadas. Seus dados estao 100% protegidos." },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rosa-600 text-sm font-semibold tracking-[0.2em] uppercase">Perguntas Frequentes</span>
          <h2 className="section-title mt-4">Tudo que voce precisa saber</h2>
        </div>

        <div className="space-y-3 animate-fade-in-up">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-rosa-50/50 transition-colors duration-300">
                <span className="font-semibold text-gray-900 pr-4">{faq.pergunta}</span>
                <span className={`text-rosa-500 text-2xl transform transition-transform duration-300 flex-shrink-0 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-fade-in">{faq.resposta}</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">Ainda tem duvidas? <a href="/contato" className="text-rosa-600 font-semibold hover:underline">Fale conosco →</a></p>
        </div>
      </div>
    </section>
  )
}
