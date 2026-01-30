import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MapPin, Phone, CheckCircle, XCircle, Navigation } from "lucide-react";

const availableDeliveries = [
  {
    id: "#TC12348",
    farmacia: "Farmácia Central",
    farmaciaAddress: "Luanda, Maianga, Av. 4 de Fevereiro",
    customer: "Ana Silva",
    customerPhone: "+244 900 000 010",
    customerAddress: "Luanda, Talatona, Rua Principal 123",
    distance: "3.5 km",
    payment: 1500,
    estimatedTime: "15 min",
  },
  {
    id: "#TC12349",
    farmacia: "Farmácia Saúde",
    farmaciaAddress: "Luanda, Talatona, Centro Comercial",
    customer: "José Santos",
    customerPhone: "+244 900 000 011",
    customerAddress: "Luanda, Talatona, Bairro Azul",
    distance: "2.1 km",
    payment: 1500,
    estimatedTime: "10 min",
  },
];

const activeDeliveries = [
  {
    id: "#TC12345",
    farmacia: "Farmácia Vida",
    customer: "Pedro Costa",
    customerPhone: "+244 900 000 003",
    customerAddress: "Luanda, Viana, Bairro Zango",
    payment: 1500,
    status: "A caminho do cliente",
  },
];

export function EntregadorEntregas() {
  const [accepted, setAccepted] = useState<string[]>([]);

  const handleAccept = (deliveryId: string) => {
    setAccepted([...accepted, deliveryId]);
  };

  const handleReject = (deliveryId: string) => {
    // Remove delivery from list (mock)
    console.log("Rejeitado:", deliveryId);
  };

  return (
    <DashboardLayout userType="entregador" userName="Carlos Mendes">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Minhas Entregas</h1>

        {/* Entregas ativas */}
        {activeDeliveries.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Entregas Ativas</h2>
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-semibold mb-1">{delivery.id}</p>
                      <p className="text-blue-50">{delivery.status}</p>
                    </div>
                    <Navigation className="w-10 h-10" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Cliente: {delivery.customer}</p>
                        <p className="text-blue-50 text-sm">{delivery.customerAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <p>{delivery.customerPhone}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-white text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition font-semibold">
                      Abrir Navegação
                    </button>
                    <button className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirmar Entrega</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entregas disponíveis */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Entregas Disponíveis Próximas
          </h2>

          {availableDeliveries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">
                Nenhuma entrega disponível no momento
              </p>
              <p className="text-gray-400 text-sm">
                Novas entregas aparecerão aqui automaticamente
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-semibold text-gray-900">{delivery.id}</p>
                      <p className="text-sm text-gray-600">{delivery.farmacia}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        +{delivery.payment.toLocaleString()} Kz
                      </p>
                      <p className="text-sm text-gray-600">{delivery.distance}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-1 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Retirar em:</p>
                        <p className="font-semibold text-gray-900">{delivery.farmaciaAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Entregar para:</p>
                        <p className="font-semibold text-gray-900">{delivery.customer}</p>
                        <p className="text-sm text-gray-600">{delivery.customerAddress}</p>
                        <p className="text-sm text-gray-600">{delivery.customerPhone}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        ⏱️ Tempo estimado: {delivery.estimatedTime}
                      </p>
                    </div>
                  </div>

                  {accepted.includes(delivery.id) ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 font-semibold">
                        Entrega aceita! Dirija-se à farmácia.
                      </p>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleReject(delivery.id)}
                        className="flex-1 border-2 border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Recusar</span>
                      </button>
                      <button
                        onClick={() => handleAccept(delivery.id)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Aceitar Entrega</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
