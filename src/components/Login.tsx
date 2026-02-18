import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Building2,
  Truck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

type UserType = "cliente" | "farmacia" | "entregador";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  const from = location.state?.from?.pathname;

  const [userType, setUserType] = useState<UserType>("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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
        newErrors.email = "Formato: +244 XXX XXX XXX";
        isValid = false;
      }
    } else {
      if (!validateEmail(email)) {
        newErrors.email = "Email inválido";
        isValid = false;
      }
    }

    if (!validatePassword(password)) {
      if (userType === "entregador") {
        newErrors.password = "O PIN deve ter 4 dígitos";
      } else {
        newErrors.password = "Mínimo 6 caracteres";
      }
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const success = await login(email, password, userType);

    if (success) {
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      switch (userType) {
        case "cliente":
          navigate("/cliente/dashboard");
          break;
        case "farmacia":
          navigate("/farmacia");
          break;
        case "entregador":
          navigate("/entregador/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (userType === "entregador") {
      if (value && !validatePhone(value)) {
        setErrors((prev) => ({ ...prev, email: "Formato: +244 XXX XXX XXX" }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    } else {
      if (value && !validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Email inválido" }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (userType === "entregador") {
      const numericValue = value.replace(/\D/g, "").slice(0, 4);
      setPassword(numericValue);

      if (numericValue.length > 0 && numericValue.length < 4) {
        setErrors((prev) => ({ ...prev, password: "O PIN deve ter 4 dígitos" }));
      } else {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    } else {
      setPassword(value);
      if (value && value.length < 6) {
        setErrors((prev) => ({ ...prev, password: "Mínimo 6 caracteres" }));
      } else {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setErrors({});
    setEmail("");
    setPassword("");
    clearError();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LADO ESQUERDO ORIGINAL MAS MAIS VIVO */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center p-12">
        <div className="text-center text-white">

          {/* Ícone ou ilustração */}
          <svg
            className="w-24 h-24 mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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

          <h1 className="text-3xl font-bold">Bem-vindo ao TwalaCare</h1>
          <p className="text-green-100 mt-2 text-lg">
            Faça login para continuar e gerenciar seus pedidos com facilidade
          </p>
        </div>
      </div>

      {/* LADO DIREITO FORMULÁRIO */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Entrar na sua conta
          </h2>

          {/* Seleção de tipo de usuário */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { type: "cliente", icon: User, label: "Cliente" },
              { type: "farmacia", icon: Building2, label: "Farmácia" },
              { type: "entregador", icon: Truck, label: "Entregador" },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleUserTypeChange(type as UserType)}
                className={`flex flex-col items-center p-4 rounded-2xl border transition ${
                  userType === type
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <Icon className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* FORMULÁRIO */}
          <form onSubmit={handleLogin} className="space-y-4">

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
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
                placeholder={userType === "entregador" ? "+244 900 000 000" : "Digite seu email"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                placeholder={userType === "entregador" ? "Digite seu PIN (4 dígitos)" : "Digite sua senha"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                maxLength={userType === "entregador" ? 4 : undefined}
                inputMode={userType === "entregador" ? "numeric" : "text"}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded"
                />
                <span className="ml-2 text-gray-600">Lembrar-me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Funcionalidade de recuperação em breve!")}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).some((k) => errors[k as keyof typeof errors])}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <a href="/register" className="text-green-600 hover:text-green-700 font-semibold">
                Criar conta
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
