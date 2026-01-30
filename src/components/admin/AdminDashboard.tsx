import { DashboardLayout } from "../layout/DashboardLayout";
import { Users, Building2, Package, TrendingUp, Activity } from "lucide-react";

const stats = {
  totalUsers: 52340,
  totalFarmacias: 156,
  totalOrders: 128450,
  monthlyRevenue: 18500000,
};

const recentActivity = [
  { type: "Novo Cliente", description: "João Silva se cadastrou", time: "Há 5 min" },
  { type: "Nova Farmácia", description: "Farmácia Nova Esperança aprovada", time: "Há 12 min" },
  { type: "Pedido Cancelado", description: "Pedido #TC12350 cancelado", time: "Há 23 min" },
  { type: "Novo Entregador", description: "Carlos Mendes validado", time: "Há 1 hora" },
];

const pendingApprovals = [
  { type: "Farmácia", name: "Farmácia São José", status: "Aguardando documentos" },
  { type: "Entregador", name: "Miguel Santos", status: "Aguardando validação" },
];

export function AdminDashboard() {
  return (
    <DashboardLayout userType="admin" userName="Administrador">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total de Usuários</p>
            <p className="text-xs text-green-600 mt-1">+245 este mês</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalFarmacias}</p>
            <p className="text-sm text-gray-600">Farmácias Ativas</p>
            <p className="text-xs text-green-600 mt-1">+8 este mês</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total de Pedidos</p>
            <p className="text-xs text-green-600 mt-1">+1,234 este mês</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {(stats.monthlyRevenue / 1000000).toFixed(1)}M Kz
            </p>
            <p className="text-sm text-gray-600">Receita Mensal</p>
            <p className="text-xs text-green-600 mt-1">+15% vs mês anterior</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Atividade recente */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Atividade Recente</h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aprovações pendentes */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Aprovações Pendentes
            </h2>

            <div className="space-y-4">
              {pendingApprovals.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-orange-200 bg-orange-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <p className="font-semibold text-gray-900 mt-2">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.status}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm">
                      Aprovar
                    </button>
                    <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm">
                      Revisar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico de crescimento (placeholder) */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Crescimento da Plataforma (Últimos 6 Meses)
          </h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[45, 58, 62, 75, 82, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-600 rounded-t-lg hover:bg-green-700 transition cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {["Ago", "Set", "Out", "Nov", "Dez", "Jan"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
