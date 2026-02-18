import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Pill, Truck, FileText, Info, LayoutDashboard, Globe } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const menuItems = [
  { path: "/", label: "Início", icon: Home },
  { path: "/farmacias", label: "Farmácias", icon: Building2 },
  { path: "/farmacos", label: "Medicamentos", icon: Pill },
  { path: "/deliveriesPage", label: "Entrega", icon: Truck, private: true },
  { path: "/receitasfarmacias", label: "Receitas", icon: FileText, private: true },
  { path: "/sobre-nos", label: "Sobre Nós", icon: Info },
];

export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [language, setLanguage] = useState("pt");

  const filteredItems = menuItems.filter(item => {
    if (item.private && !isAuthenticated) return false;
    if (item.roles && (!user || !item.roles.includes(user.tipo))) return false;
    return true;
  });

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt";
    setLanguage(newLang);
    // Aqui você pode integrar com sua solução de i18n
    // Exemplo: i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-green-600 shadow-md sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Menu items à esquerda */}
          <div className="flex items-center space-x-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-3 text-white hover:bg-green-700 transition ${
                    isActive ? "bg-green-700 border-b-2 border-white" : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <Link
                to={`/${user?.tipo}/dashboard`}
                className={`flex items-center space-x-2 px-4 py-3 text-white hover:bg-green-700 transition ${
                  location.pathname.includes("/dashboard") ? "bg-green-700 border-b-2 border-white" : ""
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
          </div>

          {/* Botão de alternar idioma à direita */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-green-700 transition rounded-md"
            aria-label={`Alternar idioma para ${language === "pt" ? "English" : "Português"}`}
          >
            <Globe className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">
              {language === "pt" ? "PT" : "EN"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}