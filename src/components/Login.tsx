import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Truck, Shield } from "lucide-react";

type UserType = "cliente" | "farmacia" | "entregador" | "admin";

export function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - redireciona conforme o perfil
    switch (userType) {
      case "cliente":
        navigate("/cliente/dashboard");
        break;
      case "farmacia":
        navigate("/farmacia/dashboard");
        break;
      case "entregador":
        navigate("/entregador/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">TwalaCare</h2>
          <p className="mt-2 text-gray-600">Inicie sessão na sua conta</p>
        </div>

        {/* Seleção de tipo de usuário */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setUserType("cliente")}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                userType === "cliente"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <User className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Cliente</span>
            </button>

            <button
              onClick={() => setUserType("farmacia")}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                userType === "farmacia"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <Building2 className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Farmácia</span>
            </button>

            <button
              onClick={() => setUserType("entregador")}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                userType === "entregador"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <Truck className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Entregador</span>
            </button>

            <button
              onClick={() => setUserType("admin")}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                userType === "admin"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Admin</span>
            </button>
          </div>

          {/* Formulário de login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email ou Telefone
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  userType === "entregador"
                    ? "+244 900 000 000"
                    : "seu@email.com"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {userType === "entregador" ? "PIN" : "Senha"}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  userType === "entregador"
                    ? "Digite seu PIN"
                    : "Digite sua senha"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Iniciar Sessão
            </button>
          </form>

          {/* Link de cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Criar conta
              </a>
            </p>
          </div>

          {/* 2FA Info */}
          {userType !== "entregador" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                🔒 Para sua segurança, pode ser solicitada autenticação de dois
                fatores (2FA)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
