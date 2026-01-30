import { DashboardLayout } from "../layout/DashboardLayout";
import { Package, ShoppingCart, TrendingUp, Users, Star, Clock } from "lucide-react";

const recentOrders = [
  { id: "#TC12345", customer: "João Silva", items: 3, total: 5500, status: "Pendente" },
  { id: "#TC12346", customer: "Maria Santos", items: 2, total: 3200, status: "Preparando" },
  { id: "#TC12347", customer: "Pedro Costa", items: 1, total: 2800, status: "Pronto" },
];

const topProducts = [
  { name: "Paracetamol 500mg", sold: 145, revenue: 217500 },
  { name: "Ibuprofeno 400mg", sold: 98, revenue: 196000 },
  { name: "Vitamina C 1000mg", sold: 87, revenue: 217500 },
];

export function FarmaciaDashboard() {
  return (
    <DashboardLayout userType="farmacia" userName="Farmácia Central">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600">Pedidos Hoje</p>
            <p className="text-xs text-green-600 mt-1">+12% vs ontem</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Pedidos Pendentes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">245.600 Kz</p>
            <p className="text-sm text-gray-600">Receita Hoje</p>
            <p className="text-xs text-green-600 mt-1">+8% vs ontem</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-10 h-10 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">Avaliação Média</p>
            <p className="text-xs text-gray-500 mt-1">234 avaliações</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pedidos recentes */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Pedidos Recentes</h2>
              <a href="/farmacia/pedidos" className="text-green-600 hover:text-green-700 font-semibold">
                Ver todos →
              </a>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-500 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items} itens</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {order.total.toLocaleString()} Kz
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.status === "Pronto"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Preparando"
                          ? "bg-blue-100 text-blue-700"
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

          {/* Produtos mais vendidos */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Mais Vendidos</h2>
              <a href="/farmacia/produtos" className="text-green-600 hover:text-green-700 font-semibold">
                Ver todos →
              </a>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sold} unidades</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {product.revenue.toLocaleString()} Kz
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico de vendas (placeholder) */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vendas dos Últimos 7 Dias</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 85, 45, 92, 78, 88, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-600 rounded-t-lg hover:bg-green-700 transition cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
