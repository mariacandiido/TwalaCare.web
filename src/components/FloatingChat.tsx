import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, input]);
    setInput("");

    // Simulação de resposta automática
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        "👩🏾‍⚕️ TwalaCare: Obrigado pela sua mensagem! Em breve responderemos.",
      ]);
    }, 1000);
  };

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-600 text-white shadow-xl flex items-center justify-center hover:bg-green-700 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={26} />

        {/* Indicador Online */}
        <span className="absolute top-2 right-2 h-3 w-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
      </button>

      {/* MODAL CHAT */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Suporte TwalaCare</h3>
              <p className="text-xs text-green-100">Online agora</p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-64">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm">
                👋 Olá! Como podemos ajudar?
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[75%] ${
                  msg.includes("TwalaCare")
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-600 text-white ml-auto"
                }`}
              >
                {msg}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
