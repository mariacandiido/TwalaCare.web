import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Star,
  MessageSquare,
  Shield,
  CreditCard,
  Home,
  Building,
  Navigation,
  Calendar,
  Download,
  Printer,
  Share2,
  Bell,
  XCircle
} from "lucide-react";
import { FloatingChat } from "../components/FloatingChat";


// Tipos
type DeliveryStatus = 'preparando' | 'coletado' | 'transito' | 'entregue' | 'atrasado' | 'cancelado';
type PaymentMethod = 'cartao' | 'mbway' | 'multicaixa' | 'dinheiro';

interface Delivery {
  id: string;
  orderNumber: string;
  status: DeliveryStatus;
  pharmacy: string;
  address: string;
  estimatedTime: string;
  deliveryTime: string;
  deliveryPerson: {
    name: string;
    phone: string;
    rating: number;
    photo: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  paymentMethod: PaymentMethod;
  trackingSteps: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    completed: boolean;
    current: boolean;
  }>;
  notes?: string;
}

export function DeliveriesPage() {
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(null);
  const [deliveries] = useState<Delivery[]>([
    {
      id: "1",
      orderNumber: "TW202400156",
      status: "transito",
      pharmacy: "Farmácia Central - Maianga",
      address: "Rua Comandante Gika, 123, Maianga, Luanda",
      estimatedTime: "15-25 minutos",
      deliveryTime: "Hoje, 14:30 - 14:50",
      deliveryPerson: {
        name: "João Silva",
        phone: "+244 923 456 789",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      items: [
        {
          id: "1",
          name: "Paracetamol 500mg",
          quantity: 2,
          price: 1500,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        },
        {
          id: "2",
          name: "Vitamina C 1000mg",
          quantity: 1,
          price: 2500,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        }
      ],
      total: 5500,
      paymentMethod: "cartao",
      trackingSteps: [
        {
          id: "1",
          title: "Pedido Confirmado",
          description: "Seu pedido foi recebido e confirmado",
          time: "14:00",
          completed: true,
          current: false
        },
        {
          id: "2",
          title: "Em Preparação",
          description: "Farmácia está preparando seus medicamentos",
          time: "14:05",
          completed: true,
          current: false
        },
        {
          id: "3",
          title: "Coletado pelo Entregador",
          description: "João Silva coletou seu pedido na farmácia",
          time: "14:15",
          completed: true,
          current: false
        },
        {
          id: "4",
          title: "Em Trânsito",
          description: "Seu pedido está a caminho",
          time: "14:20",
          completed: true,
          current: true
        },
        {
          id: "5",
          title: "Entrega",
          description: "Entregador chegando ao destino",
          time: "14:30-14:50",
          completed: false,
          current: false
        }
      ],
      notes: "Por favor, tocar a campainha ao chegar"
    },
    {
      id: "2",
      orderNumber: "TW202400155",
      status: "entregue",
      pharmacy: "Farmácia Saúde Plus - Talatona",
      address: "Avenida de Lisboa, 456, Talatona, Luanda",
      estimatedTime: "Entregue",
      deliveryTime: "Hoje, 11:45",
      deliveryPerson: {
        name: "Maria Santos",
        phone: "+244 912 345 678",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      items: [
        {
          id: "1",
          name: "Ibuprofeno 400mg",
          quantity: 1,
          price: 2000,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        }
      ],
      total: 2000,
      paymentMethod: "mbway",
      trackingSteps: [
        {
          id: "1",
          title: "Pedido Confirmado",
          description: "Seu pedido foi recebido e confirmado",
          time: "11:00",
          completed: true,
          current: false
        },
        {
          id: "2",
          title: "Em Preparação",
          description: "Farmácia está preparando seus medicamentos",
          time: "11:05",
          completed: true,
          current: false
        },
        {
          id: "3",
          title: "Coletado pelo Entregador",
          description: "Maria Santos coletou seu pedido",
          time: "11:15",
          completed: true,
          current: false
        },
        {
          id: "4",
          title: "Em Trânsito",
          description: "Seu pedido está a caminho",
          time: "11:20",
          completed: true,
          current: false
        },
        {
          id: "5",
          title: "Entregue",
          description: "Pedido entregue com sucesso",
          time: "11:45",
          completed: true,
          current: false
        }
      ]
    },
    {
      id: "3",
      orderNumber: "TW202400154",
      status: "preparando",
      pharmacy: "Farmácia Vida - Viana",
      address: "Rua do Comércio, 789, Viana, Luanda",
      estimatedTime: "20-30 minutos",
      deliveryTime: "Hoje, 16:00 - 16:20",
      deliveryPerson: {
        name: "Pedro Costa",
        phone: "+244 934 567 890",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
      },
      items: [
        {
          id: "1",
          name: "Amoxicilina 500mg",
          quantity: 1,
          price: 3500,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        },
        {
          id: "2",
          name: "Dipirona 500mg",
          quantity: 2,
          price: 1200,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        }
      ],
      total: 5900,
      paymentMethod: "multicaixa",
      trackingSteps: [
        {
          id: "1",
          title: "Pedido Confirmado",
          description: "Seu pedido foi recebido e confirmado",
          time: "15:30",
          completed: true,
          current: true
        },
        {
          id: "2",
          title: "Em Preparação",
          description: "Farmácia está preparando seus medicamentos",
          time: "15:35",
          completed: false,
          current: false
        },
        {
          id: "3",
          title: "Coletado pelo Entregador",
          description: "Aguardando coletor",
          time: "15:45",
          completed: false,
          current: false
        },
        {
          id: "4",
          title: "Em Trânsito",
          description: "A caminho do destino",
          time: "15:55",
          completed: false,
          current: false
        },
        {
          id: "5",
          title: "Entrega",
          description: "Entrega prevista",
          time: "16:00-16:20",
          completed: false,
          current: false
        }
      ]
    },
    {
      id: "4",
      orderNumber: "TW202400153",
      status: "atrasado",
      pharmacy: "Farmácia Bem-Estar - Kilamba",
      address: "Avenida Pedro de Castro, 321, Kilamba, Luanda",
      estimatedTime: "Atrasado 15 min",
      deliveryTime: "Ontem, 19:30",
      deliveryPerson: {
        name: "Ana Pereira",
        phone: "+244 945 678 901",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      items: [
        {
          id: "1",
          name: "Losartana 50mg",
          quantity: 1,
          price: 2800,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
        }
      ],
      total: 2800,
      paymentMethod: "dinheiro",
      trackingSteps: [
        {
          id: "1",
          title: "Pedido Confirmado",
          description: "Seu pedido foi recebido e confirmado",
          time: "18:45",
          completed: true,
          current: false
        },
        {
          id: "2",
          title: "Em Preparação",
          description: "Farmácia está preparando seus medicamentos",
          time: "18:50",
          completed: true,
          current: false
        },
        {
          id: "3",
          title: "Coletado pelo Entregador",
          description: "Ana Pereira coletou seu pedido",
          time: "19:00",
          completed: true,
          current: false
        },
        {
          id: "4",
          title: "Em Trânsito",
          description: "Seu pedido está a caminho",
          time: "19:10",
          completed: true,
          current: true
        },
        {
          id: "5",
          title: "Atrasado",
          description: "Entrega atrasada devido ao trânsito",
          time: "19:30",
          completed: false,
          current: false
        }
      ],
      notes: "Trânsito intenso na região"
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'delivered' | 'preparing'>('all');
  const [showMap, setShowMap] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrar entregas
  const filteredDeliveries = deliveries.filter(delivery => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['preparando', 'coletado', 'transito', 'atrasado'].includes(delivery.status);
    if (filter === 'delivered') return delivery.status === 'entregue';
    if (filter === 'preparing') return delivery.status === 'preparando';
    return true;
  });

  // Atualizar entrega ativa
  useEffect(() => {
    if (!activeDelivery && filteredDeliveries.length > 0) {
      setActiveDelivery(filteredDeliveries[0]);
    }
  }, [filteredDeliveries, activeDelivery]);

  // Simular atualização em tempo real
  const refreshDeliveries = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Aqui você faria uma chamada API para atualizar os status
      setIsRefreshing(false);
    }, 1500);
  };

  // Contadores
  const activeCount = deliveries.filter(d => ['preparando', 'coletado', 'transito', 'atrasado'].includes(d.status)).length;
  const deliveredCount = deliveries.filter(d => d.status === 'entregue').length;

  // Estatísticas
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'preparando': return 'bg-blue-100 text-blue-800';
      case 'coletado': return 'bg-purple-100 text-purple-800';
      case 'transito': return 'bg-yellow-100 text-yellow-800';
      case 'entregue': return 'bg-green-100 text-green-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      case 'cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: DeliveryStatus) => {
    switch (status) {
      case 'preparando': return 'Em Preparação';
      case 'coletado': return 'Coletado';
      case 'transito': return 'Em Trânsito';
      case 'entregue': return 'Entregue';
      case 'atrasado': return 'Atrasado';
      case 'cancelado': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Minhas Entregas</h1>
                <p className="text-sm text-gray-600">
                  {activeCount > 0 
                    ? `${activeCount} entrega${activeCount > 1 ? 's' : ''} em andamento`
                    : 'Nenhuma entrega ativa'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshDeliveries}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition flex items-center gap-2"
                title="Atualizar"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline text-sm">Atualizar</span>
              </button>
              
              <Link
                to="/"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                ← Voltar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Estatísticas */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                Todas ({deliveries.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <Truck className="w-4 h-4" />
                Ativas ({activeCount})
              </button>
              <button
                onClick={() => setFilter('delivered')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <CheckCircle className="w-4 h-4" />
                Entregues ({deliveredCount})
              </button>
              <button
                onClick={() => setFilter('preparing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'preparing' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <Package className="w-4 h-4" />
                Em Preparação
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {showMap ? 'Lista de Entregas' : 'Ver no Mapa'}
              </button>
              <Link
                to="/novo-pedido"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                Novo Pedido
              </Link>
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                  <p className="text-2xl font-bold text-gray-900">24 min</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avaliação Média</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Entregas Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Economia Total</p>
                  <p className="text-2xl font-bold text-gray-900">12.450 Kz</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Entregas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Entregas {filter !== 'all' && `(${filteredDeliveries.length})`}</h2>
              </div>

              {filteredDeliveries.length === 0 ? (
                <div className="text-center py-16">
                  <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Nenhuma entrega encontrada
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Não há entregas com os filtros aplicados.
                  </p>
                  <Link
                    to="/farmacos"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Fazer um Pedido
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-6 hover:bg-gray-50 transition cursor-pointer ${activeDelivery?.id === delivery.id ? 'bg-green-50' : ''}`}
                      onClick={() => setActiveDelivery(delivery)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                              {getStatusText(delivery.status)}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              #{delivery.orderNumber}
                            </span>
                            <span className="text-sm text-gray-500">
                              {delivery.pharmacy.split(' - ')[0]}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2">{delivery.pharmacy}</h3>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{delivery.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate max-w-[200px]">{delivery.address.split(',')[0]}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  <img
                                    src={delivery.deliveryPerson.photo}
                                    alt={delivery.deliveryPerson.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{delivery.deliveryPerson.name}</p>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs text-gray-600">{delivery.deliveryPerson.rating}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1 text-gray-600">
                                <Package className="w-4 h-4" />
                                <span className="text-sm">{delivery.items.length} item{delivery.items.length > 1 ? 's' : ''}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-green-600">
                                {delivery.total.toLocaleString()} Kz
                              </span>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detalhes da Entrega Ativa */}
          <div className="lg:col-span-1">
            {activeDelivery ? (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden sticky top-24">
                {/* Header do Detalhe */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">#{activeDelivery.orderNumber}</h2>
                      <p className="text-sm text-gray-600">{activeDelivery.pharmacy}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeDelivery.status)}`}>
                      {getStatusText(activeDelivery.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Previsão de Entrega</p>
                        <p className="font-medium text-gray-900">{activeDelivery.deliveryTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rastreamento */}
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">Rastreamento</h3>
                  <div className="space-y-4">
                    {activeDelivery.trackingSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-green-100 text-green-600' :
                            step.current ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : step.current ? (
                              <RefreshCw className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          {index < activeDelivery.trackingSteps.length - 1 && (
                            <div className={`flex-1 w-0.5 ${step.completed ? 'bg-green-200' : 'bg-gray-200'} mt-2`}></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${step.current ? 'text-gray-900' : 'text-gray-700'}`}>
                              {step.title}
                            </h4>
                            <span className="text-sm text-gray-500">{step.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entregador */}
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">Seu Entregador</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={activeDelivery.deliveryPerson.photo}
                        alt={activeDelivery.deliveryPerson.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{activeDelivery.deliveryPerson.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{activeDelivery.deliveryPerson.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">• 125+ entregas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${activeDelivery.deliveryPerson.phone}`}
                      className="flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg transition"
                    >
                      <Phone className="w-4 h-4" />
                      Ligar
                    </a>
                    <button className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition">
                      <MessageSquare className="w-4 h-4" />
                      Mensagem
                    </button>
                  </div>
                </div>

                {/* Itens e Pagamento */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
                  
                  <div className="space-y-3 mb-6">
                    {activeDelivery.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString()} Kz</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{(activeDelivery.total * 0.9).toLocaleString()} Kz</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Entrega</span>
                      <span className="font-medium text-green-600">Grátis</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Desconto</span>
                      <span className="font-medium text-green-600">-{(activeDelivery.total * 0.1).toLocaleString()} Kz</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-green-600">{activeDelivery.total.toLocaleString()} Kz</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-600">Pagamento:</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {activeDelivery.paymentMethod === 'cartao' && 'Cartão de Crédito'}
                        {activeDelivery.paymentMethod === 'mbway' && 'MB Way'}
                        {activeDelivery.paymentMethod === 'multicaixa' && 'Multicaixa Express'}
                        {activeDelivery.paymentMethod === 'dinheiro' && 'Dinheiro'}
                      </span>
                    </div>
                    {activeDelivery.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          <p className="text-sm text-yellow-800">{activeDelivery.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg transition border">
                      <Download className="w-4 h-4" />
                      Recibo
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-3 rounded-lg transition">
                      <Bell className="w-4 h-4" />
                      Notificar Chegada
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Selecione uma entrega
                </h3>
                <p className="text-gray-500">
                  Clique em uma entrega da lista para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mapa Simulado */}
        {showMap && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Rastreamento em Tempo Real</h3>
                <button
                  onClick={() => setShowMap(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center relative">
              {/* Mapa Simulado */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                
                {/* Farmácia */}
                <div className="absolute top-1/4 left-1/4">
                  <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">Farmácia</p>
                    <p className="text-xs text-gray-600">{activeDelivery?.pharmacy.split(' - ')[0]}</p>
                  </div>
                </div>
                
                {/* Entregador */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                  <div className="bg-green-600 text-white p-3 rounded-full shadow-lg">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">Em Movimento</p>
                    <p className="text-xs text-gray-600">~10 minutos</p>
                  </div>
                </div>
                
                {/* Destino */}
                <div className="absolute bottom-1/4 right-1/4">
                  <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">Destino</p>
                    <p className="text-xs text-gray-600">Sua Casa</p>
                  </div>
                </div>
                
                {/* Rota */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-b-2 border-r-2 border-dashed border-green-400"></div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Rota Ativa</p>
                    <p className="text-sm text-gray-600">Distância restante: ~2.5 km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dicas e Informações */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Segurança nas Entregas</h4>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Todos os entregadores são identificados com crachá TwalaCare</li>
                  <li>• Pedidos são entregues em embalagens lacradas e higienizadas</li>
                  <li>• Pagamento online para evitar contato com dinheiro</li>
                  <li>• Opção de entrega sem contato disponível</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Dicas para Entrega Rápida</h4>
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>• Mantenha o telefone próximo para contato do entregador</li>
                  <li>• Forneça instruções claras de localização</li>
                  <li>• Esteja disponível no horário estimado de entrega</li>
                  <li>• Use pagamento online para agilizar o processo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>TwalaCare Entregas • Sua saúde entregue em até 30 minutos</p>
            <p className="mt-1">Precisa de ajuda? <a href="tel:+244923456789" className="text-green-600 hover:text-green-700">+244 923 456 789</a></p>
          </div>
        </div>
      </footer>
       <FloatingChat />
    </div>
  );
}