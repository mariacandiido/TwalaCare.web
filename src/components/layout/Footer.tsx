import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre TwalaCare */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TwalaCare</span>
            </div>
            <p className="text-gray-600 text-sm">
              Sua farmácia online de confiança em Angola. Medicamentos de
              qualidade, entrega rápida e atendimento profissional.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/farmacias"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Farmácias
                </Link>
              </li>
              <li>
                <Link
                  to="/farmacos"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Fármacos
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nos"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/termos"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/ajuda"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-gray-600 hover:text-green-600 transition text-sm"
                >
                  Contacte-nos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  suporte@twalacare.ao
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+244 900 000 000</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Luanda, Angola</span>
              </li>
            </ul>

            {/* Redes Sociais */}
            <div className="flex items-center space-x-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 TwalaCare. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
