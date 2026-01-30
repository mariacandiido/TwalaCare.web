import { type ApiResponse, type Pedido, type OrderStatus } from "../types";

const mockPedidos: Pedido[] = [
  {
    id: "#TC12345",
    clienteId: "1",
    farmaciasIds: ["2"],
    items: [
      {
        id: "1",
        name: "Paracetamol 500mg",
        price: 1500,
        quantity: 2,
        farmacia: "Farmácia Central",
        image: "",
        requiresPrescription: false,
      },
      {
        id: "4",
        name: "Vitamina C 1000mg",
        price: 2500,
        quantity: 1,
        farmacia: "Farmácia Central",
        image: "",
        requiresPrescription: false,
      },
    ],
    subtotal: 5500,
    taxaEntrega: 500,
    total: 6000,
    status: "em-transito",
    metodo_pagamento: "Multicaixa Express",
    endereco_entrega: "Luanda, Talatona, Rua Principal 123",
    data_pedido: "2026-01-23",
    data_entrega_estimada: "2026-01-23",
    entregadorId: "3",
  },
  {
    id: "#TC12344",
    clienteId: "1",
    farmaciasIds: ["2"],
    items: [
      {
        id: "2",
        name: "Ibuprofeno 400mg",
        price: 2000,
        quantity: 1,
        farmacia: "Farmácia Saúde",
        image: "",
        requiresPrescription: false,
      },
      {
        id: "5",
        name: "Loratadina 10mg",
        price: 1800,
        quantity: 1,
        farmacia: "Farmácia Central",
        image: "",
        requiresPrescription: false,
      },
    ],
    subtotal: 3800,
    taxaEntrega: 400,
    total: 4200,
    status: "entregue",
    metodo_pagamento: "Unitel Money",
    endereco_entrega: "Luanda, Talatona, Rua Principal 123",
    data_pedido: "2026-01-20",
    data_entrega: "2026-01-20",
  },
];

export const pedidoService = {
  // Obter todos os pedidos
  async getAll(): Promise<ApiResponse<Pedido[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockPedidos,
        });
      }, 300);
    });
  },

  // Obter pedido por ID
  async getById(id: string): Promise<ApiResponse<Pedido>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedido = mockPedidos.find((p) => p.id === id);
        if (pedido) {
          resolve({
            success: true,
            data: pedido,
          });
        } else {
          resolve({
            success: false,
            error: "Pedido não encontrado",
          });
        }
      }, 300);
    });
  },

  // Obter pedidos do cliente
  async getByCliente(clienteId: string): Promise<ApiResponse<Pedido[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedidos = mockPedidos.filter((p) => p.clienteId === clienteId);
        resolve({
          success: true,
          data: pedidos,
        });
      }, 300);
    });
  },

  // Obter pedidos da farmácia
  async getByFarmacia(farmaciId: string): Promise<ApiResponse<Pedido[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedidos = mockPedidos.filter((p) =>
          p.farmaciasIds.includes(farmaciId),
        );
        resolve({
          success: true,
          data: pedidos,
        });
      }, 300);
    });
  },

  // Criar novo pedido
  async create(
    pedido: Omit<Pedido, "id" | "data_pedido">,
  ): Promise<ApiResponse<Pedido>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPedido: Pedido = {
          ...pedido,
          id: `#TC${Date.now()}`,
          data_pedido: new Date().toISOString().split("T")[0],
        };

        mockPedidos.push(newPedido);

        resolve({
          success: true,
          data: newPedido,
        });
      }, 500);
    });
  },

  // Atualizar status do pedido
  async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<ApiResponse<Pedido>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedido = mockPedidos.find((p) => p.id === id);
        if (pedido) {
          pedido.status = status;
          if (status === "entregue") {
            pedido.data_entrega = new Date().toISOString().split("T")[0];
          }
          resolve({
            success: true,
            data: pedido,
          });
        } else {
          resolve({
            success: false,
            error: "Pedido não encontrado",
          });
        }
      }, 300);
    });
  },

  // Cancelar pedido
  async cancel(id: string): Promise<ApiResponse<Pedido>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedido = mockPedidos.find((p) => p.id === id);
        if (
          pedido &&
          (pedido.status === "pendente" || pedido.status === "confirmado")
        ) {
          pedido.status = "cancelado";
          resolve({
            success: true,
            data: pedido,
          });
        } else {
          resolve({
            success: false,
            error: "Não é possível cancelar este pedido",
          });
        }
      }, 300);
    });
  },

  // Atribuir entregador
  async assignDelivery(
    pedidoId: string,
    entregadorId: string,
  ): Promise<ApiResponse<Pedido>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pedido = mockPedidos.find((p) => p.id === pedidoId);
        if (pedido) {
          pedido.entregadorId = entregadorId;
          resolve({
            success: true,
            data: pedido,
          });
        } else {
          resolve({
            success: false,
            error: "Pedido não encontrado",
          });
        }
      }, 300);
    });
  },
};
