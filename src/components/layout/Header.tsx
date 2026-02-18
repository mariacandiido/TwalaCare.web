import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Bell, User, LogOut } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getProfilePath = () => {
    if (!user) return "/login";
    return `/${user.tipo}/perfil`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logotipo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TwalaCare</span>
          </Link>

          {/* Botões da direita */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                {/* Notificações - LINK PRINCIPAL */}
                <Link
                  to="/notificationsPage"
                  className="relative p-2 text-gray-600 hover:text-green-600 transition"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>

                {/* Carrinho */}
                <Link
                  to="/carrinho"
                  className="relative p-2 text-gray-600 hover:text-green-600 transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Perfil / Login */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={getProfilePath()}
                  className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">{user?.nome}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <User className="w-5 h-5" />
                <span>Iniciar Sessão</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
