import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<
    "multicaixa" | "unitel" | "entrega"
  >("multicaixa");
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);

  const requiresPrescription = items.some((item) => item.requiresPrescription);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionUploaded(true);
    }
  };

  const handleFinalizePurchase = () => {
    clearCart();
    navigate("/cliente/pedidos");
  };

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Finalizar Compra
        </h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {num}
                </div>
                {num < 5 && (
                  <div
                    className={`w-16 h-1 ${
                      step > num ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Endereço</span>
            <span>Receita</span>
            <span>Pagamento</span>
            <span>Revisão</span>
            <span>Confirmação</span>
          </div>
        </div>

        {/* Step 1: Endereço de Entrega */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Endereço de Entrega
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="+244 900 000 000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Província
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Luanda</option>
                  <option>Benguela</option>
                  <option>Huíla</option>
                  <option>Huambo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Município
                </label>
                <input
                  type="text"
                  placeholder="Ex: Talatona"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Endereço Completo
                </label>
                <textarea
                  rows={3}
                  placeholder="Rua, número, bairro, pontos de referência..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: Upload de Receita */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload de Receita Médica
            </h2>

            {requiresPrescription ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Alguns produtos no seu carrinho requerem receita médica. Por
                  favor, faça o upload da sua receita (imagem ou PDF).
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                  {prescriptionUploaded ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <p className="text-green-600 font-semibold mb-2">
                        Receita enviada com sucesso!
                      </p>
                      <p className="text-sm text-gray-600">
                        A receita será validada pela farmácia
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-4">
                        Arraste seu arquivo ou clique para fazer upload
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="prescription-upload"
                      />
                      <label
                        htmlFor="prescription-upload"
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                      >
                        Escolher Arquivo
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!prescriptionUploaded}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  Nenhum produto no seu carrinho requer receita médica. Você
                  pode prosseguir diretamente para o pagamento.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Método de Pagamento */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Método de Pagamento
            </h2>

            <div className="space-y-4 mb-6">
              {/* Multicaixa Express */}
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === "multicaixa"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="multicaixa"
                  checked={paymentMethod === "multicaixa"}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-4 h-4 text-green-600"
                />
                <CreditCard className="w-6 h-6 text-green-600 mx-4" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Multicaixa Express
                  </p>
                  <p className="text-sm text-gray-600">
                    Pagamento através da rede Multicaixa
                  </p>
                </div>
              </label>

              {/* Unitel Money */}
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === "unitel"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="unitel"
                  checked={paymentMethod === "unitel"}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-4 h-4 text-green-600"
                />
                <Smartphone className="w-6 h-6 text-green-600 mx-4" />
                <div>
                  <p className="font-semibold text-gray-900">Unitel Money</p>
                  <p className="text-sm text-gray-600">
                    Pagamento através do Unitel Money
                  </p>
                </div>
              </label>

              {/* Pagamento na Entrega */}
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === "entrega"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="entrega"
                  checked={paymentMethod === "entrega"}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-4 h-4 text-green-600"
                />
                <Wallet className="w-6 h-6 text-green-600 mx-4" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Pagamento na Entrega
                  </p>
                  <p className="text-sm text-gray-600">
                    Pague em dinheiro quando receber
                  </p>
                </div>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Revisão do Pedido */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Revisão do Pedido
            </h2>

            <div className="space-y-6">
              {/* Produtos */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Produtos</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span className="text-gray-700">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} Kz
                    </span>
                  </div>
                ))}
              </div>

              {/* Resumo financeiro */}
              <div className="border-t pt-4">
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>{getTotal().toLocaleString()} Kz</span>
                </div>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Taxa de entrega</span>
                  <span>500 Kz</span>
                </div>
                <div className="flex justify-between py-2 text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{(getTotal() + 500).toLocaleString()} Kz</span>
                </div>
              </div>

              {/* Método de pagamento */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Método de Pagamento
                </h3>
                <p className="text-gray-700">
                  {paymentMethod === "multicaixa" && "Multicaixa Express"}
                  {paymentMethod === "unitel" && "Unitel Money"}
                  {paymentMethod === "entrega" && "Pagamento na Entrega"}
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setStep(3)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmação */}
        {step === 5 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pedido Confirmado!
            </h2>
            <p className="text-gray-600 mb-8">
              Seu pedido foi realizado com sucesso. Você receberá uma
              notificação quando o entregador estiver a caminho.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700 mb-2">Número do Pedido</p>
              <p className="text-2xl font-bold text-green-600">
                #TC{Math.floor(Math.random() * 100000)}
              </p>
            </div>

            <button
              onClick={handleFinalizePurchase}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Acompanhar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
