import { DashboardLayout } from "../layout/DashboardLayout";
import { Package, MapPin, Truck } from "lucide-react";

const recentOrders = [
  {
    id: "#TC12345",
    date: "23 Jan 2026",
    status: "Em trânsito",
    total: 5500,
    items: 3,
  },
  {
    id: "#TC12344",
    date: "20 Jan 2026",
    status: "Entregue",
    total: 3200,
    items: 2,
  },
  {
    id: "#TC12343",
    date: "18 Jan 2026",
    status: "Entregue",
    total: 2800,
    items: 1,
  },
];

export function ClienteDashboard() {
  return (
    <DashboardLayout userType="cliente" userName="João Silva">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Histórico</h1>

        {/* Simulador de Mapa */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Rastreamento em Tempo Real
            </h2>
          </div>
          
          <div className="relative bg-gray-100 rounded-lg h-80 overflow-hidden">
            {/* Simulação de mapa com grid */}
            <div className="absolute inset-0">
              {/* Grid do mapa */}
              <div className="w-full h-full grid grid-cols-8 grid-rows-6 gap-px bg-gray-300">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 hover:bg-gray-200 transition-colors"></div>
                ))}
              </div>
              
              {/* Elementos visuais do mapa */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Rotas principais */}
                <div className="absolute top-1/3 left-0 w-full h-1 bg-blue-300 opacity-50"></div>
                <div className="absolute top-2/3 left-0 w-full h-1 bg-blue-300 opacity-50"></div>
                <div className="absolute left-1/3 top-0 w-1 h-full bg-blue-300 opacity-50"></div>
                <div className="absolute left-2/3 top-0 w-1 h-full bg-blue-300 opacity-50"></div>
                
                {/* Marcadores de localização */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-green-600 fill-current" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white px-2 py-1 rounded shadow">
                      Origem
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="w-8 h-8 text-red-600 fill-current" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white px-2 py-1 rounded shadow">
                      Destino
                    </span>
                  </div>
                </div>
                
                {/* Veículo em movimento */}
                <div className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                  <div className="relative">
                    <Truck className="w-10 h-10 text-blue-600" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white px-2 py-1 rounded shadow">
                      Pedido #TC12345
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informações da rota */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Distância</p>
              <p className="text-lg font-semibold text-gray-900">12.5 km</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Tempo estimado</p>
              <p className="text-lg font-semibold text-gray-900">25 min</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-green-600">Em andamento</p>
            </div>
          </div>
        </div>

        {/* Pedido em trânsito */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Pedido em Trânsito
              </h2>
              <p className="text-green-50">#TC12345 - 3 itens</p>
            </div>
            <Truck className="w-12 h-12 text-white/80" />
          </div>

          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Entregador a caminho</span>
              <span className="text-sm font-semibold">15 min</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pedidos recentes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Pedidos Recentes
            </h2>
            <a
              href="/cliente/pedidos"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Ver todos →
            </a>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-500 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.date} • {order.items} itens
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {order.total.toLocaleString()} Kz
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === "Entregue"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}