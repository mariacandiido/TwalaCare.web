import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  DollarSign,
  Star,
} from "lucide-react";

interface EntregadorData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  provincia: string;
  municipio: string;
  endereco: string;
  veiculo: string;
  placaVeiculo: string;
  dataNascimento: string;
  dataRegistro: string;
  avaliacao: number;
  ganhosMes: number;
  entregas: number;
}

export function EntregadorPerfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [entregador, setEntregador] = useState<EntregadorData>({
    id: "3",
    nome: "Carlos Mendes",
    email: "carlos@delivery.com",
    telefone: "+244987654321",
    provincia: "Luanda",
    municipio: "Talatona",
    endereco: "Rua do Comércio, nº 456",
    veiculo: "Motocicleta",
    placaVeiculo: "LAO-2021",
    dataNascimento: "1995-08-15",
    dataRegistro: "2025-01-05",
    avaliacao: 4.9,
    ganhosMes: 850000,
    entregas: 287,
  });

  const [formData, setFormData] = useState(entregador);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setEntregador(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(entregador);
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="entregador" userName={entregador.nome}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Meu Perfil</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                <Edit2 className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>
            )}
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold mb-1">
                {entregador.ganhosMes.toLocaleString()} Kz
              </p>
              <p className="text-green-50">Ganhos este Mês</p>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Mail className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold mb-1">{entregador.entregas}</p>
              <p className="text-blue-50">Entregas Realizadas</p>
            </div>

            <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold mb-1">{entregador.avaliacao}</p>
              <p className="text-yellow-50">Avaliação Média</p>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Informações Pessoais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4" />
                    <span>Nome Completo</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.nome}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.email}
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Telefone</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.telefone}
                  </p>
                )}
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Data de Nascimento</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {new Date(entregador.dataNascimento).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Informações de Entrega */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Informações de Entrega
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tipo de Veículo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Veículo
                </label>
                {isEditing ? (
                  <select
                    name="veiculo"
                    value={formData.veiculo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Motocicleta</option>
                    <option>Automóvel</option>
                    <option>Bicicleta</option>
                    <option>A pé</option>
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.veiculo}
                  </p>
                )}
              </div>

              {/* Placa do Veículo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Placa do Veículo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="placaVeiculo"
                    value={formData.placaVeiculo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.placaVeiculo}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>Endereço</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Província */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Província
                </label>
                {isEditing ? (
                  <select
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Luanda</option>
                    <option>Benguela</option>
                    <option>Huíla</option>
                    <option>Huambo</option>
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.provincia}
                  </p>
                )}
              </div>

              {/* Município */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Município
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.municipio}
                  </p>
                )}
              </div>

              {/* Endereço Completo */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Endereço Completo
                </label>
                {isEditing ? (
                  <textarea
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {entregador.endereco}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Data de Registro */}
          <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600">
              Membro desde{" "}
              <strong>
                {new Date(entregador.dataRegistro).toLocaleDateString("pt-BR")}
              </strong>
            </p>
          </div>

          {/* Botões de Ação */}
          {isEditing && (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Alterações</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                <X className="w-5 h-5" />
                <span>Cancelar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
