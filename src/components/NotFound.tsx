import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center">
              <span className="text-white font-bold text-5xl">T</span>
            </div>
          </div>
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          <Home className="w-5 h-5" />
          <span>Voltar à Página Inicial</span>
        </Link>
      </div>
    </div>
  );
}
