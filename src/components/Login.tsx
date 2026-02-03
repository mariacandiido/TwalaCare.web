import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Truck, Shield, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

type UserType = "cliente" | "farmacia" | "entregador" | "admin";

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [userType, setUserType] = useState<UserType>("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Limpar erros de autenticação ao mudar de tipo de usuário
  useEffect(() => {
    clearError();
  }, [userType, clearError]);
 
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+244\s\d{3}\s\d{3}\s\d{3}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    if (userType === "entregador") {
      return /^\d{4}$/.test(password);
    } else {
      return password.length >= 6;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});
    clearError();

    let isValid = true;
    const newErrors: { email?: string; password?: string } = {};

    if (userType === "entregador") {
      if (!validatePhone(email)) {
        newErrors.email = "Formato de telefone inválido. Use: +244 XXX XXX XXX";
        isValid = false;
      }
    } else {
      if (!validateEmail(email)) {
        newErrors.email = "Por favor, insira um email válido";
        isValid = false;
      }
    }

    if (!validatePassword(password)) {
      if (userType === "entregador") {
        newErrors.password = "O PIN deve ter exatamente 4 dígitos";
      } else {
        newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      }
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const success = await login(email, password, userType);

    if (success) {
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
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Para entregador, podemos tentar formatar ou restringir, mas por agora apenas limpamos erros
    setEmail(value);
    
    if (userType === "entregador") {
      if (value && !validatePhone(value)) {
        setErrors(prev => ({ ...prev, email: "Formato: +244 XXX XXX XXX" }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    } else {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: "Email inválido" }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (userType === "entregador") {
      // Permitir apenas números e limitar a 4 dígitos
      const numericValue = value.replace(/\D/g, "").slice(0, 4);
      setPassword(numericValue);
      
      if (numericValue.length > 0 && numericValue.length < 4) {
        setErrors(prev => ({ ...prev, password: "O PIN deve ter 4 dígitos" }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    } else {
      setPassword(value);
      if (value && value.length < 6) {
        setErrors(prev => ({ ...prev, password: "Mínimo 6 caracteres" }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setErrors({});
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Design */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <div className="text-center text-white">
          <div className="mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20a8 8 0 0116 0"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Bem-vindo ao TwalaCare</h1>
          <p className="text-green-100 mt-2">
            Faça login para continuar
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Login
          </h2>

          {/* Seleção de tipo de usuário */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleUserTypeChange("cliente")}
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
              type="button"
              onClick={() => handleUserTypeChange("farmacia")}
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
              type="button"
              onClick={() => handleUserTypeChange("entregador")}
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
              type="button"
              onClick={() => handleUserTypeChange("admin")}
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

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {userType === "entregador" ? "Telefone" : "Email"}
              </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                placeholder={
                  userType === "entregador"
                    ? "+244 900 000 000"
                    : "Digite seu email"
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? "border-red-500 focus:ring-red-500" 
                    : "focus:ring-green-600"
                } ${isLoading ? "bg-gray-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {userType === "entregador" ? "PIN" : "Senha"}
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                placeholder={
                  userType === "entregador"
                    ? "Digite seu PIN (4 dígitos)"
                    : "Digite sua senha"
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "focus:ring-green-600"
                } ${isLoading ? "bg-gray-50 cursor-not-allowed" : ""}`}
                maxLength={userType === "entregador" ? 4 : undefined}
                inputMode={userType === "entregador" ? "numeric" : "text"}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 text-green-600 rounded cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Funcionalidade de recuperação em breve!")}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Link de cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <a
                href="/register"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Criar conta
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}