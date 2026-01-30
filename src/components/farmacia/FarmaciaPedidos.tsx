import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Package, Eye, CheckCircle } from "lucide-react";

const mockOrders = [
  {
    id: "#TC12345",
    customer: "João Silva",
    phone: "+244 900 000 001",
    date: "23 Jan 2026 14:30",
    status: "Pendente",
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 1500 },
      { name: "Vitamina C 1000mg", quantity: 1, price: 2500 },
    ],
    total: 6000,
    payment: "Multicaixa Express",
    address: "Luanda, Talatona, Rua Principal 123",
  },
  {
    id: "#TC12346",
    customer: "Maria Santos",
    phone: "+244 900 000 002",
    date: "23 Jan 2026 13:15",
    status: "Preparando",
    items: [
      { name: "Ibuprofeno 400mg", quantity: 1, price: 2000 },
      { name: "Loratadina 10mg", quantity: 1, price: 1800 },
    ],
    total: 4300,
    payment: "Pagamento na Entrega",
    address: "Luanda, Maianga, Av. 4 de Fevereiro",
  },
  {
    id: "#TC12347",
    customer: "Pedro Costa",
    phone: "+244 900 000 003",
    date: "23 Jan 2026 12:00",
    status: "Pronto",
    items: [
      { name: "Amoxicilina 500mg", quantity: 1, price: 3500 },
    ],
    total: 4000,
    payment: "Unitel Money",
    address: "Luanda, Viana, Bairro Zango",
  },
];

export function FarmaciaPedidos() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pronto":
        return "bg-green-100 text-green-700";
      case "Preparando":
        return "bg-blue-100 text-blue-700";
      case "Pendente":
        return "bg-orange-100 text-orange-700";
      case "Entregue":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <DashboardLayout userType="farmacia" userName="Farmácia Central">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Gestão de Pedidos</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lista de pedidos */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      • {item.name} x{item.quantity}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold text-green-600">
                    {order.total.toLocaleString()} Kz
                  </span>
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-semibold">Ver Detalhes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detalhes do pedido */}
          <div className="lg:sticky lg:top-8 h-fit">
            {selectedOrder ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Detalhes do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Número do Pedido</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block text-sm px-3 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Endereço de Entrega</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Método de Pagamento</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.payment}</p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Itens do Pedido</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString()} Kz
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{selectedOrder.total.toLocaleString()} Kz</span>
                  </div>
                </div>

                {/* Ações de status */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Atualizar Status</h3>
                  
                  {selectedOrder.status === "Pendente" && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, "Preparando")}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Iniciar Preparação
                    </button>
                  )}

                  {selectedOrder.status === "Preparando" && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, "Pronto")}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Marcar como Pronto</span>
                    </button>
                  )}

                  {selectedOrder.status === "Pronto" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 text-center">
                        ✓ Pedido pronto para entrega. Aguardando entregador.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecione um pedido para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
