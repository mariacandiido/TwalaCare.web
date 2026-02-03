import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Package, 
  Truck, 
  Clock, 
  XCircle, 
  Settings,
  Filter,
  CheckCheck,
  Trash2,
  Mail,
  ShieldAlert,
  Calendar,
  Star, 
  MessageSquare
} from "lucide-react";

// Tipos de notificações
type NotificationType = 'sucesso' | 'alerta' | 'informacao' | 'entrega' | 'promocao' | 'pedido' | 'seguranca';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
  date: string;
  actionUrl?: string;
  icon: React.ReactNode;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Pedido Confirmado",
      message: "Seu pedido #TW202400123 foi confirmado e está sendo preparado.",
      type: "sucesso",
      time: "Há 5 minutos",
      read: false,
      date: "Hoje",
      actionUrl: "/pedidos/TW202400123",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      id: "2",
      title: "Entrega em Andamento",
      message: "Seu pedido saiu para entrega. Previsão de chegada: 20-30 minutos.",
      type: "entrega",
      time: "Há 30 minutos",
      read: false,
      date: "Hoje",
      actionUrl: "/rastreamento/TW202400123",
      icon: <Truck className="w-5 h-5 text-blue-500" />
    },
    {
      id: "3",
      title: "Medicamento em Promoção",
      message: "Paracetamol 500mg com 20% de desconto por tempo limitado!",
      type: "promocao",
      time: "Há 2 horas",
      read: true,
      date: "Hoje",
      actionUrl: "/promocoes",
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    {
      id: "4",
      title: "Receita Médica Pendente",
      message: "A receita do seu pedido #TW202400122 precisa ser validada.",
      type: "alerta",
      time: "Há 1 dia",
      read: false,
      date: "Ontem",
      actionUrl: "/receitas/pendentes",
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />
    },
    {
      id: "5",
      title: "Atualização do Sistema",
      message: "Novos recursos disponíveis na plataforma TwalaCare.",
      type: "informacao",
      time: "Há 2 dias",
      read: true,
      date: "15 Fev",
      actionUrl: "/novidades",
      icon: <Info className="w-5 h-5 text-blue-400" />
    },
    {
      id: "6",
      title: "Entrega Concluída",
      message: "Seu pedido #TW202400121 foi entregue com sucesso!",
      type: "sucesso",
      time: "Há 3 dias",
      read: true,
      date: "14 Fev",
      actionUrl: "/pedidos/TW202400121",
      icon: <Package className="w-5 h-5 text-green-600" />
    },
    {
      id: "7",
      title: "Lembrete de Reabastecimento",
      message: "Seu medicamento de uso contínuo está acabando. Gostaria de reabastecer?",
      type: "alerta",
      time: "Há 4 dias",
      read: true,
      date: "13 Fev",
      actionUrl: "/medicamentos/reabastecer",
      icon: <Clock className="w-5 h-5 text-purple-500" />
    },
    {
      id: "8",
      title: "Pedido Cancelado",
      message: "O pedido #TW202400120 foi cancelado conforme solicitado.",
      type: "sucesso",
      time: "Há 5 dias",
      read: true,
      date: "12 Fev",
      actionUrl: "/pedidos",
      icon: <XCircle className="w-5 h-5 text-gray-500" />
    },
    {
      id: "9",
      title: "Alerta de Segurança",
      message: "Detectamos um login novo no sua conta. Foi você?",
      type: "seguranca",
      time: "Há 1 semana",
      read: true,
      date: "10 Fev",
      actionUrl: "/seguranca",
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />
    },
    {
      id: "10",
      title: "Consulta Agendada",
      message: "Sua consulta com o farmacêutico está agendada para amanhã às 14h.",
      type: "informacao",
      time: "Há 1 semana",
      read: true,
      date: "9 Fev",
      actionUrl: "/consultas",
      icon: <Calendar className="w-5 h-5 text-indigo-500" />
    },
    {
      id: "11",
      title: "Avaliação Pendente",
      message: "Como foi sua experiência com a última compra? Conte para nós!",
      type: "pedido",
      time: "Há 2 semanas",
      read: true,
      date: "5 Fev",
      actionUrl: "/avaliar/TW202400119",
      icon: <MessageSquare className="w-5 h-5 text-pink-500" />
    },
    {
      id: "12",
      title: "Newsletter TwalaCare",
      message: "Confira as novidades de fevereiro sobre saúde e bem-estar.",
      type: "informacao",
      time: "Há 2 semanas",
      read: true,
      date: "1 Fev",
      actionUrl: "/newsletter",
      icon: <Mail className="w-5 h-5 text-cyan-500" />
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'alert' | 'delivery'>('all');
  const [showSettings, setShowSettings] = useState(false);

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'success') return notification.type === 'sucesso';
    if (filter === 'alert') return notification.type === 'alerta';
    if (filter === 'delivery') return notification.type === 'entrega';
    return true;
  });

  // Marcar como lida
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Excluir notificação
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Excluir todas as lidas
  const deleteAllRead = () => {
    setNotifications(notifications.filter(notif => !notif.read));
  };

  // Contadores
  const unreadCount = notifications.filter(n => !n.read).length;
  const todayCount = notifications.filter(n => n.date === 'Hoje').length;
  const yesterdayCount = notifications.filter(n => n.date === 'Ontem').length;

  // Agrupar por data
  const notificationsByDate = filteredNotifications.reduce((acc, notif) => {
    if (!acc[notif.date]) {
      acc[notif.date] = [];
    }
    acc[notif.date].push(notif);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-8 h-8 text-green-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 
                    ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}`
                    : 'Todas as notificações lidas'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Configurações"
              >
                <Settings className="w-5 h-5" />
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
        {/* Configurações Flutuantes */}
        {showSettings && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Configurações de Notificações</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Notificações por Email</h4>
                  <p className="text-sm text-gray-600">Receba cópias das notificações por email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Notificações de Promoções</h4>
                  <p className="text-sm text-gray-600">Alertas sobre descontos e ofertas</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Lembretes de Medicamentos</h4>
                  <p className="text-sm text-gray-600">Alertas para reabastecimento</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Filtros e Ações Rápidas */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                Todas ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'unread' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                Não Lidas ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('success')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'success' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <CheckCircle className="w-4 h-4" />
                Sucesso
              </button>
              <button
                onClick={() => setFilter('alert')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'alert' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <AlertCircle className="w-4 h-4" />
                Alertas
              </button>
              <button
                onClick={() => setFilter('delivery')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${filter === 'delivery' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
              >
                <Truck className="w-4 h-4" />
                Entregas
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition flex items-center gap-2"
                disabled={unreadCount === 0}
              >
                <CheckCheck className="w-4 h-4" />
                Marcar todas como lidas
              </button>
              <button
                onClick={deleteAllRead}
                className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Limpar lidas
              </button>
            </div>
          </div>

          {/* Resumo */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Não Lidas</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Últimos 7 dias</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => ['Hoje', 'Ontem', '15 Fev', '14 Fev', '13 Fev', '12 Fev', '11 Fev'].includes(n.date)).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {Object.keys(notificationsByDate).length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação encontrada'}
              </h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? 'Todas as notificações foram lidas. Volte mais tarde!' 
                  : 'Não há notificações com os filtros aplicados.'}
              </p>
            </div>
          ) : (
            Object.entries(notificationsByDate).map(([date, dateNotifications]) => (
              <div key={date}>
                {/* Cabeçalho da data */}
                <div className="sticky top-0 z-10 bg-gray-50 px-6 py-3 border-b">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    {date}
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      ({dateNotifications.length} notificação{dateNotifications.length > 1 ? 'es' : ''})
                    </span>
                  </h3>
                </div>

                {/* Notificações da data */}
                {dateNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 border-b hover:bg-gray-50 transition ${!notification.read ? 'bg-green-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Ícone */}
                      <div className="flex-shrink-0 mt-1">
                        {notification.icon}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">{notification.time}</span>
                              {notification.actionUrl && (
                                <Link
                                  to={notification.actionUrl}
                                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                                >
                                  Ver detalhes →
                                </Link>
                              )}
                            </div>
                          </div>

                          {/* Ações */}
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-green-600 transition"
                                title="Marcar como lida"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition"
                              title="Excluir notificação"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Badge do tipo */}
                        <div className="mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            notification.type === 'sucesso' ? 'bg-green-100 text-green-800' :
                            notification.type === 'alerta' ? 'bg-orange-100 text-orange-800' :
                            notification.type === 'informacao' ? 'bg-blue-100 text-blue-800' :
                            notification.type === 'entrega' ? 'bg-indigo-100 text-indigo-800' :
                            notification.type === 'promocao' ? 'bg-yellow-100 text-yellow-800' :
                            notification.type === 'seguranca' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {notification.type === 'sucesso' && 'Sucesso'}
                            {notification.type === 'alerta' && 'Alerta'}
                            {notification.type === 'informacao' && 'Informação'}
                            {notification.type === 'entrega' && 'Entrega'}
                            {notification.type === 'promocao' && 'Promoção'}
                            {notification.type === 'seguranca' && 'Segurança'}
                            {notification.type === 'pedido' && 'Pedido'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Dicas */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Dicas sobre notificações</h4>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li>• As notificações não lidas são destacadas com um ponto verde</li>
                <li>• Clique em "Ver detalhes" para acessar mais informações sobre a notificação</li>
                <li>• Configure suas preferências clicando no ícone de configurações</li>
                <li>• As notificações mais antigas são arquivadas automaticamente após 30 dias</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>TwalaCare Notifications • Mantenha-se informado sobre seus pedidos e promoções</p>
            <p className="mt-1">Para suporte, entre em contato: <a href="mailto:suporte@twalacare.com" className="text-green-600 hover:text-green-700">suporte@twalacare.com</a></p>
          </div>
        </div>
      </footer>

      {/* Estilos CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Estilo para scrollbar personalizada */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}