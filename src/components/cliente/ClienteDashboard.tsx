import { DashboardLayout } from "../layout/DashboardLayout";
import { Package, Clock, CheckCircle, TrendingUp, MapPin } from "lucide-react";

const recentOrders = [
  { id: "#TC12345", date: "23 Jan 2026", status: "Em trânsito", total: 5500, items: 3 },
  { id: "#TC12344", date: "20 Jan 2026", status: "Entregue", total: 3200, items: 2 },
  { id: "#TC12343", date: "18 Jan 2026", status: "Entregue", total: 2800, items: 1 },
];

export function ClienteDashboard() {
  return (
    <DashboardLayout userType="cliente" userName="João Silva">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Total de Pedidos</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-600">Pedidos Pendentes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">10</p>
            <p className="text-sm text-gray-600">Pedidos Entregues</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">45.600 Kz</p>
            <p className="text-sm text-gray-600">Total Gasto</p>
          </div>
        </div>

        {/* Pedido em trânsito */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Pedido em Trânsito</h2>
              <p className="text-green-50">#TC12345 - 3 itens</p>
            </div>
            <MapPin className="w-12 h-12 text-white/80" />
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Entregador a caminho</span>
              <span className="text-sm font-semibold">15 min</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: "60%" }}></div>
            </div>
          </div>

          <button className="w-full bg-white text-green-600 py-3 rounded-lg hover:bg-green-50 transition font-semibold">
            Rastrear em Tempo Real
          </button>
        </div>

        {/* Pedidos recentes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Pedidos Recentes</h2>
            <a href="/cliente/pedidos" className="text-green-600 hover:text-green-700 font-semibold">
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
                    <p className="text-sm text-gray-600">{order.date} • {order.items} itens</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.total.toLocaleString()} Kz</p>
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
