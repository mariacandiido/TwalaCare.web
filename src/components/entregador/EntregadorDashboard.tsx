import { DashboardLayout } from "../layout/DashboardLayout";
import { Package, TrendingUp, CheckCircle, Clock } from "lucide-react";

const todayStats = {
  delivered: 12,
  pending: 3,
  earnings: 18000,
  rating: 4.9,
};

const recentDeliveries = [
  { id: "#TC12345", farmacia: "Farmácia Central", customer: "João Silva", amount: 1500, status: "Entregue" },
  { id: "#TC12346", farmacia: "Farmácia Saúde", customer: "Maria Santos", amount: 1500, status: "Entregue" },
  { id: "#TC12347", farmacia: "Farmácia Vida", customer: "Pedro Costa", amount: 1500, status: "Entregue" },
];

export function EntregadorDashboard() {
  return (
    <DashboardLayout userType="entregador" userName="Carlos Mendes">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard do Entregador</h1>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{todayStats.delivered}</p>
            <p className="text-sm text-gray-600">Entregas Hoje</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{todayStats.pending}</p>
            <p className="text-sm text-gray-600">Entregas Pendentes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{todayStats.earnings.toLocaleString()} Kz</p>
            <p className="text-sm text-gray-600">Ganhos Hoje</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{todayStats.rating}★</p>
            <p className="text-sm text-gray-600">Avaliação</p>
          </div>
        </div>

        {/* Status de disponibilidade */}
        <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Status de Disponibilidade</h2>
              <p className="text-green-50">Você está online e pronto para receber entregas</p>
            </div>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition font-semibold">
              Ficar Offline
            </button>
          </div>
        </div>

        {/* Entregas recentes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Entregas Recentes</h2>
            <a href="/entregador/entregas" className="text-green-600 hover:text-green-700 font-semibold">
              Ver todas →
            </a>
          </div>

          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{delivery.id}</p>
                    <p className="text-sm text-gray-600">{delivery.farmacia}</p>
                    <p className="text-xs text-gray-500">{delivery.customer}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">+{delivery.amount.toLocaleString()} Kz</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {delivery.status}
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
