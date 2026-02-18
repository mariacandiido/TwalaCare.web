import { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  Truck,
  Shield,
  UserPlus,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"cliente" | "farmacia" | "entregador">("cliente");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    // Campos específicos para Farmácia
    nomeFarmacia: "",
    nif: "",
    endereco: "",
    cidade: "Luanda",
    // Campos específicos para Entregador
    veiculo: "moto",
    numeroDocumento: "",
    pin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setError(null);
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (userType !== "entregador" && !formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (userType !== "entregador" && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";

    if (userType === "farmacia") {
      if (!formData.nomeFarmacia.trim()) newErrors.nomeFarmacia = "Nome da farmácia é obrigatório";
      if (!formData.nif.trim()) newErrors.nif = "NIF é obrigatório";
      if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório";
    }

    if (userType === "entregador") {
      if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = "Nº do documento é obrigatório";
      if (formData.pin.length !== 4) newErrors.pin = "PIN deve ter 4 dígitos";
    } else {
      if (formData.password.length < 8) newErrors.password = "Mínimo 8 caracteres";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleBackStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Preparar dados para o serviço de autenticação
      const registrationData = {
        ...formData,
        tipo: userType
      };

      const result = await register(registrationData);
      
      if (!result.success) {
        setError(result.message);
        return;
      }
      
      // Se for farmácia, redireciona diretamente para a página da farmácia
      if (userType === "farmacia") {
        navigate("/farmacia/dashboard");
      } else {
        // Para outros tipos de usuário, mostra a tela de sucesso
        setShowSuccess(true);
        window.scrollTo(0, 0);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSpecificFields = () => {
    switch (userType) {
      case "farmacia":
        return (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-green-600" />
              Dados da Farmácia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Farmácia</label>
                <input
                  type="text"
                  value={formData.nomeFarmacia}
                  onChange={(e) => handleInputChange("nomeFarmacia", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.nomeFarmacia ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nomeFarmacia && <p className="text-red-500 text-xs mt-1">{errors.nomeFarmacia}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
                <input
                  type="text"
                  value={formData.nif}
                  onChange={(e) => handleInputChange("nif", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.nif ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nif && <p className="text-red-500 text-xs mt-1">{errors.nif}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange("endereco", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.endereco ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.endereco && <p className="text-red-500 text-xs mt-1">{errors.endereco}</p>}
              </div>
            </div>
          </div>
        );

      case "entregador":
        return (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-600" />
              Dados do Veículo e Acesso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Veículo</label>
                <select
                  value={formData.veiculo}
                  onChange={(e) => handleInputChange("veiculo", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="moto">Motocicleta</option>
                  <option value="carro">Carro</option>
                  <option value="bicicleta">Bicicleta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nº do BI/Documento</label>
                <input
                  type="text"
                  value={formData.numeroDocumento}
                  onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.numeroDocumento ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.numeroDocumento && <p className="text-red-500 text-xs mt-1">{errors.numeroDocumento}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Criar PIN de Acesso (4 dígitos)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value.replace(/\D/g, ""))}
                  placeholder="0000"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-center tracking-widest text-lg font-bold ${errors.pin ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <UserPlus className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crie sua Conta</h2>
          <p className="text-gray-500">Escolha como deseja se juntar ao TwalaCare</p>
        </div>

        {/* Alertas de Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Tela de Sucesso - Mostra apenas para cliente e entregador */}
        {showSuccess && userType !== "farmacia" && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registro Realizado!</h3>
            <p className="text-gray-600 mb-8">
              Sua conta foi criada com sucesso. Agora você pode fazer login e começar a usar o TwalaCare.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full max-w-xs bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Ir para o Login
            </button> 
          </div>
        )}

        {/* Formulário de Registro - Não mostra se for farmácia e já tiver sucesso */}
        {(!showSuccess || (showSuccess && userType === "farmacia")) && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Indicador de Passo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}`}>
                  1
                </div>
                <div className={`h-1 w-12 mx-2 ${step === 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  2
                </div>
              </div>
              {step === 2 && (
                <button
                  onClick={handleBackStep}
                  className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
                </button>
              )}
            </div>

            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setUserType("cliente")}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${userType === "cliente"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                      }`}
                  >
                    <User className="w-10 h-10 text-green-600 mb-3" />
                    <span className="font-semibold text-gray-900">Cliente</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      Comprar remédios
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType("farmacia")}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${userType === "farmacia"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                      }`}
                  >
                    <Building2 className="w-10 h-10 text-green-600 mb-3" />
                    <span className="font-semibold text-gray-900">Farmácia</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      Vender produtos
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType("entregador")}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${userType === "entregador"
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                      }`}
                  >
                    <Truck className="w-10 h-10 text-green-600 mb-3" />
                    <span className="font-semibold text-gray-900">Entregador</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      Fazer entregas
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Próximo Passo
                </button>
              </>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    {userType === "farmacia" ? "Nome do Responsável" : "Nome Completo"}
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder={userType === "farmacia" ? "Responsável legal" : "Seu nome completo"}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
                  </div>
                </div>

                {renderSpecificFields()}

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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                        placeholder="Repita a senha"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    Concordo com os{" "}
                    <a href="#" className="text-green-600 hover:underline">Termos de Uso</a> e{" "}
                    <a href="#" className="text-green-600 hover:underline">Política de Privacidade</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    "Registrar"
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
