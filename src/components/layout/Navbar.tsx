import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Pill, Truck, FileText, Info } from "lucide-react";

const menuItems = [
  { path: "/", label: "Início", icon: Home },
  { path: "/farmacias", label: "Farmácias", icon: Building2 },
  { path: "/farmacos", label: "Fármacos", icon: Pill },
  { path: "/entrega", label: "Entrega", icon: Truck },
  { path: "/receitas", label: "Receitas", icon: FileText },
  { path: "/sobre-nos", label: "Sobre Nós", icon: Info },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-600 shadow-md sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-1">
          {menuItems.map((item) => {
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
        </div>
      </div>
    </nav>
  );
}
