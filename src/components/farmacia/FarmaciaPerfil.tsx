import { DashboardLayout } from "../layout/DashboardLayout";
import { MapPin, Clock, Phone, Mail, Lock } from "lucide-react";

export function FarmaciaPerfil() {
  return (
    <DashboardLayout userType="farmacia" userName="Farmácia Central">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Perfil da Farmácia</h1>

        <div className="space-y-6">
          {/* Dados Gerais */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Dados Gerais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome da Farmácia
                </label>
                <input
                  type="text"
                  defaultValue="Farmácia Central"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  NIF
                </label>
                <input
                  type="text"
                  defaultValue="5000123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Telefone</span>
                  </div>
                </label>
                <input
                  type="tel"
                  defaultValue="+244 900 000 001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                </label>
                <input
                  type="email"
                  defaultValue="contato@farmaciacentral.ao"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-green-600" />
                <span>Localização</span>
              </div>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Província
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Luanda</option>
                  <option>Benguela</option>
                  <option>Huíla</option>
                  <option>Huambo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Município
                </label>
                <input
                  type="text"
                  defaultValue="Maianga"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Endereço Completo
                </label>
                <textarea
                  rows={3}
                  defaultValue="Av. 4 de Fevereiro, Edifício Maianga Plaza, Loja 12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-green-600" />
                <span>Horário de Funcionamento</span>
              </div>
            </h2>

            <div className="space-y-4">
              {[
                { day: "Segunda-feira", open: "08:00", close: "20:00" },
                { day: "Terça-feira", open: "08:00", close: "20:00" },
                { day: "Quarta-feira", open: "08:00", close: "20:00" },
                { day: "Quinta-feira", open: "08:00", close: "20:00" },
                { day: "Sexta-feira", open: "08:00", close: "20:00" },
                { day: "Sábado", open: "08:00", close: "18:00" },
                { day: "Domingo", open: "Fechado", close: "" },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900 w-32">{schedule.day}</span>
                  {schedule.open === "Fechado" ? (
                    <span className="text-red-600">Fechado</span>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <input
                        type="time"
                        defaultValue={schedule.open}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-gray-600">até</span>
                      <input
                        type="time"
                        defaultValue={schedule.close}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Configurações de Entrega */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Configurações de Entrega
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Taxa de Entrega (Kz)
                </label>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tempo Médio de Preparação (minutos)
                </label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">Aceitar entregas nos fins de semana</span>
                </label>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              <div className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-green-600" />
                <span>Segurança</span>
              </div>
            </h2>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Alterar Senha
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Configurar Autenticação de Dois Fatores (2FA)
              </button>
            </div>
          </div>

          {/* Botão de salvar */}
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
