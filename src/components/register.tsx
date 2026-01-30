// src/components/auth/Register/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Truck, Shield, Mail, Lock, UserPlus, Phone, MapPin } from "lucide-react";
import "./Register.styles.css";

type UserType = "cliente" | "farmacia" | "entregador" | "admin";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  password: string;
  confirmPassword: string;
  endereco?: string;
  nif?: string; // Para farmácia
  tipoVeiculo?: string; // Para entregador
  pin?: string; // Para entregador
}

export function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("cliente");
  const [step, setStep] = useState<number>(1); // 1: Tipo, 2: Formulário
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    endereco: "",
    nif: "",
    tipoVeiculo: "",
    pin: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validação de email
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validação de telefone angolano
  const validatePhone = (phone: string): boolean => {
    const regex = /^(\+244|00244)?[9][1-9][0-9]{7}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  // Validação de senha
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("Mínimo 8 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("Pelo menos uma maiúscula");
    if (!/[a-z]/.test(password)) errors.push("Pelo menos uma minúscula");
    if (!/\d/.test(password)) errors.push("Pelo menos um número");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Pelo menos um caractere especial");
    return errors;
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    
    if (userType !== "entregador") {
      if (!validateEmail(formData.email)) newErrors.email = "Email inválido";
    }
    
    if (!validatePhone(formData.telefone)) newErrors.telefone = "Telefone inválido (ex: +244 900 000 000)";
    
    if (userType !== "entregador") {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(", ");
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }
    } else {
      if (!formData.pin || formData.pin.length !== 4) {
        newErrors.pin = "PIN deve ter 4 dígitos";
      }
    }
    
    if (userType === "farmacia" && !formData.nif) {
      newErrors.nif = "NIF é obrigatório para farmácias";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular mudança nos campos
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro ao digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Avançar para o formulário
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  // Voltar para seleção de tipo
  const handleBackStep = () => {
    setStep(1);
  };

  // Submeter cadastro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Aqui você faria a chamada à API
    try {
      // Mock de cadastro bem-sucedido
      console.log("Cadastrando:", { userType, ...formData });
      
      // Redirecionar conforme o tipo
      switch (userType) {
        case "cliente":
          navigate("/cliente/verificacao-email");
          break;
        case "farmacia":
          navigate("/farmacia/verificacao");
          break;
        case "entregador":
          navigate("/entregador/verificacao-telefone");
          break;
        case "admin":
          // Normalmente admin não se cadastra
          navigate("/admin/registro-pendente");
          break;
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  // Renderizar formulário específico por tipo
  const renderSpecificFields = () => {
    switch (userType) {
      case "cliente":
        return (
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Endereço de Entrega
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Rua, número, bairro, cidade"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "farmacia":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NIF da Farmácia
              </label>
              <input
                type="text"
                value={formData.nif}
                onChange={(e) => handleInputChange("nif", e.target.value)}
                placeholder="Número de Identificação Fiscal"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.nif && <p className="text-red-500 text-sm mt-1">{errors.nif}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Endereço Comercial
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Endereço completo da farmácia"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "entregador":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Veículo
              </label>
              <select
                value={formData.tipoVeiculo}
                onChange={(e) => handleInputChange("tipoVeiculo", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecione o veículo</option>
                <option value="moto">Moto</option>
                <option value="carro">Carro</option>
                <option value="bicicleta">Bicicleta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PIN de Acesso (4 dígitos)
              </label>
              <input
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, ''))}
                placeholder="Ex: 1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ O registro de administrador requer aprovação manual.
              Entre em contato com o administrador principal.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <UserPlus className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-gray-600">
            {step === 1 ? "Selecione o tipo de conta" : "Complete seus dados"}
          </p>
        </div>

        {/* Container Principal */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Indicador de Passo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}`}>
                1
              </div>
              <div className={`h-1 w-12 mx-2 ${step === 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                2
              </div>
            </div>
            {step === 2 && (
              <button
                onClick={handleBackStep}
                className="text-green-600 hover:text-green-700 text-sm font-semibold"
              >
                ← Voltar
              </button>
            )}
          </div>

          {/* Passo 1: Seleção de Tipo */}
          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setUserType("cliente")}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    userType === "cliente"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <User className="w-10 h-10 text-green-600 mb-3" />
                  <span className="font-semibold text-gray-900">Cliente</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">
                    Comprar medicamentos
                  </span>
                </button>

                <button
                  onClick={() => setUserType("farmacia")}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    userType === "farmacia"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <Building2 className="w-10 h-10 text-green-600 mb-3" />
                  <span className="font-semibold text-gray-900">Farmácia</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">
                    Vender medicamentos
                  </span>
                </button>

                <button
                  onClick={() => setUserType("entregador")}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    userType === "entregador"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <Truck className="w-10 h-10 text-green-600 mb-3" />
                  <span className="font-semibold text-gray-900">Entregador</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">
                    Entregar pedidos
                  </span>
                </button>

                <button
                  onClick={() => setUserType("admin")}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    userType === "admin"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <Shield className="w-10 h-10 text-green-600 mb-3" />
                  <span className="font-semibold text-gray-900">Admin</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">
                    Gerenciar sistema
                  </span>
                </button>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Continuar
              </button>
            </>
          ) : (
            /* Passo 2: Formulário de Cadastro */
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Campos comuns a todos */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userType !== "entregador" && (
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                )}

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="+244 900 000 000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
                </div>
              </div>

              {/* Campos específicos por tipo */}
              {renderSpecificFields()}

              {/* Campos de senha (exceto para entregador) */}
              {userType !== "entregador" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Lock className="w-4 h-4 mr-2" />
                      Senha
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Lock className="w-4 h-4 mr-2" />
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Digite novamente"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              )}

              {/* Termos e Condições */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-green-600 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Concordo com os{" "}
                  <a href="/termos" className="text-green-600 hover:text-green-700">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="/privacidade" className="text-green-600 hover:text-green-700">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              {/* Botão de Submissão */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Criar Conta
              </button>
            </form>
          )}

          {/* Link para Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Iniciar Sessão
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;