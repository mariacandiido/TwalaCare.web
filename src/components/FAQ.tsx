import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Como faço para comprar medicamentos?",
    answer: "É simples! Pesquise o medicamento desejado na página de Fármacos, adicione ao carrinho, faça upload da receita (se necessário) e finalize a compra escolhendo seu método de pagamento preferido."
  },
  {
    question: "Qual é o prazo de entrega?",
    answer: "A maioria das entregas é realizada em até 30 minutos, dependendo da sua localização e da farmácia escolhida. Você pode acompanhar o rastreamento em tempo real."
  },
  {
    question: "As farmácias são certificadas?",
    answer: "Sim! Todas as farmácias parceiras são devidamente certificadas e regulamentadas pelas autoridades angolanas de saúde."
  },
  {
    question: "Como faço upload da receita médica?",
    answer: "Durante o checkout, você será solicitado a fazer upload da sua receita (imagem ou PDF) caso algum medicamento no carrinho exija prescrição médica. A receita será validada pela farmácia antes do envio."
  },
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer: "Aceitamos Multicaixa Express, Unitel Money e pagamento na entrega (dinheiro). Você pode escolher o método mais conveniente no checkout."
  },
  {
    question: "Posso rastrear meu pedido?",
    answer: "Sim! Após a confirmação do pedido, você poderá rastrear a entrega em tempo real através do seu dashboard de cliente."
  },
  {
    question: "O que acontece se o medicamento não estiver disponível?",
    answer: "Se um medicamento não estiver em stock, você será notificado imediatamente. Você pode optar por esperar a reposição ou escolher outra farmácia que tenha o produto."
  },
  {
    question: "Como funciona o atendimento farmacêutico online?",
    answer: "Você pode tirar dúvidas com farmacêuticos qualificados através de chat ou videochamada diretamente na plataforma. O serviço está disponível durante o horário comercial."
  },
  {
    question: "Posso devolver um medicamento?",
    answer: "Por questões de segurança e legislação sanitária, medicamentos não podem ser devolvidos após a entrega. Certifique-se de revisar seu pedido antes de finalizar."
  },
  {
    question: "Como me torno um entregador TwalaCare?",
    answer: "Acesse a página de login, selecione 'Entregador' e complete o cadastro com seus dados pessoais, informações do veículo e documentos necessários. Após validação manual pela equipe, você poderá começar a receber entregas."
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe está pronta para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:suporte@twalacare.ao"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Enviar Email
            </a>
            <a
              href="tel:+244900000000"
              className="inline-block border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
