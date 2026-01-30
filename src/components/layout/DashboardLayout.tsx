import React from "react";
import { Link } from "react-router-dom";
import { Home, Package, User, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "cliente" | "farmacia" | "entregador" | "admin";
  userName: string;
}

export function DashboardLayout({
  children,
  userType,
  userName,
}: DashboardLayoutProps) {
  const menuItems = {
    cliente: [
      { path: "/cliente/dashboard", label: "Dashboard", icon: Home },
      { path: "/cliente/pedidos", label: "Meus Pedidos", icon: Package },
      { path: "/cliente/perfil", label: "Meu Perfil", icon: User },
      { path: "/", label: "Voltar à Loja", icon: Home },
    ],
    farmacia: [
      { path: "/farmacia/dashboard", label: "Dashboard", icon: Home },
      { path: "/farmacia/produtos", label: "Produtos", icon: Package },
      { path: "/farmacia/pedidos", label: "Pedidos", icon: Package },
      { path: "/farmacia/perfil", label: "Perfil", icon: User },
    ],
    entregador: [
      { path: "/entregador/dashboard", label: "Dashboard", icon: Home },
      { path: "/entregador/entregas", label: "Entregas", icon: Package },
      { path: "/entregador/perfil", label: "Meu Perfil", icon: User },
    ],
    admin: [
      { path: "/admin/dashboard", label: "Dashboard", icon: Home },
      { path: "/admin/usuarios", label: "Gerenciar Usuários", icon: User },
      { path: "/admin/perfil", label: "Meu Perfil", icon: User },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg relative flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TwalaCare</span>
          </Link>
        </div>

        <div className="p-6 border-b">
          <p className="text-sm text-gray-600">Bem-vindo,</p>
          <p className="font-semibold text-gray-900">{userName}</p>
          <p className="text-xs text-gray-500 mt-1 capitalize">{userType}</p>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {menuItems[userType].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="w-64 p-4 border-t">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
