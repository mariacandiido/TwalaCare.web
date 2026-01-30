import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
} from "lucide-react";

interface AdminData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataRegistro: string;
  dataNascimento: string;
  permissoes: string[];
}

export function AdminPerfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState<AdminData>({
    id: "admin-001",
    nome: "Administrador",
    email: "admin@twalcare.com",
    telefone: "+244912345678",
    cargo: "Administrador de Sistema",
    departamento: "Gestão",
    dataRegistro: "2025-01-01",
    dataNascimento: "1985-03-10",
    permissoes: [
      "Gerenciar Usuários",
      "Aprovar Farmácias",
      "Gerenciar Pedidos",
      "Gerar Relatórios",
      "Configurar Sistema",
      "Gerenciar Entregadores",
    ],
  });

  const [formData, setFormData] = useState(admin);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setAdmin(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(admin);
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="admin" userName={admin.nome}>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Perfil do Administrador
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Edit2 className="w-5 h-5" />
                <span>Editar Perfil</span>
              </button>
            )}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {admin.nome}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {admin.email}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {admin.telefone}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {new Date(admin.dataNascimento).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Informações Profissionais */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Informações Profissionais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Cargo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cargo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {admin.cargo}
                  </p>
                )}
              </div>

              {/* Departamento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Departamento
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {admin.departamento}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Permissões */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Permissões</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {admin.permissoes.map((permissao, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-900 font-medium">{permissao}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data de Registro */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600">
              Administrador desde{" "}
              <strong>
                {new Date(admin.dataRegistro).toLocaleDateString("pt-BR")}
              </strong>
            </p>
          </div>

          {/* Botões de Ação */}
          {isEditing && (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
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
