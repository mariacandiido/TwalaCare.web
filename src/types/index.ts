// Tipos de Usuário
export type UserType = "cliente" | "farmacia" | "entregador" | "admin";

// Status de Pedidos
export type OrderStatus =
  | "pendente"
  | "confirmado"
  | "em-preparacao"
  | "pronto"
  | "em-transito"
  | "entregue"
  | "cancelado";

// Status de Entrega
export type DeliveryStatus =
  | "disponivel"
  | "aceito"
  | "coletando"
  | "em-transito"
  | "entregue"
  | "cancelado";

// Status de Usuário
export type UserStatus =
  | "ativo"
  | "inativo"
  | "suspenso"
  | "pendente-aprovacao";

// Interface de Usuário Base
export interface BaseUser {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataRegistro: string;
  status: UserStatus;
  tipo: UserType;
}

// Cliente
export interface Cliente extends BaseUser {
  tipo: "cliente";
  dataNascimento: string;
  provincia: string;
  municipio: string;
  endereco: string;
}

// Farmácia
export interface Farmacia extends BaseUser {
  tipo: "farmacia";
  nif: string;
  provincia: string;
  municipio: string;
  endereco: string;
  horarioAbertuda: string;
  horarioFechamento: string;
  avaliacao: number;
}

// Entregador
export interface Entregador extends BaseUser {
  tipo: "entregador";
  dataNascimento: string;
  provincia: string;
  municipio: string;
  endereco: string;
  veiculo: string;
  placaVeiculo: string;
  avaliacao: number;
  ganhosMes: number;
}

// Admin
export interface Admin extends BaseUser {
  tipo: "admin";
  cargo: string;
  departamento: string;
  permissoes: string[];
}

// Medicamento
export interface Medicamento {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  price: number;
  farmacia: string;
  farmacias?: Farmacia[];
  provincia: string;
  image: string;
  rating: number;
  stock: number;
  requiresPrescription: boolean;
  horario: string;
}

// Pedido
export interface Pedido {
  id: string;
  clienteId: string;
  farmaciasIds: string[];
  items: CartItem[];
  subtotal: number;
  taxaEntrega: number;
  total: number;
  status: OrderStatus;
  metodo_pagamento: string;
  endereco_entrega: string;
  data_pedido: string;
  data_entrega_estimada?: string;
  data_entrega?: string;
  entregadorId?: string;
}

// Item do Carrinho
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  farmacia: string;
  image: string;
  requiresPrescription: boolean;
}

// Entrega
export interface Entrega {
  id: string;
  pedidoId: string;
  entregadorId: string;
  clienteName: string;
  clientePhone: string;
  clienteAddress: string;
  farmaciName: string;
  farmaciaAddress: string;
  status: DeliveryStatus;
  distance: string;
  estimatedTime: string;
  payment: number;
  timestamp: string;
}

// Resposta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
