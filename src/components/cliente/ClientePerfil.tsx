import React, { useState, useEffect } from "react";

interface Cliente {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  dataNascimento: string;
  fotoUrl?: string;
  dataCadastro?: string;
  status: 'ativo' | 'inativo';
}

interface ClientePerfilProps {
  usuarioLogado?: Cliente | null;
  onSalvar?: (cliente: Cliente) => Promise<void> | void;
  onExcluir?: (id: string) => Promise<void> | void;
  onFechar?: () => void;
}

export function ClientePerfil({ 
  usuarioLogado = null, 
  onSalvar, 
  onExcluir,
  onFechar 
}: ClientePerfilProps) {
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    dataNascimento: '',
    status: 'ativo',
    fotoUrl: ''
  });
  
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  // Estados brasileiros
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
    'SP', 'SE', 'TO'
  ];

  useEffect(() => {
    if (usuarioLogado) {
      setCliente(usuarioLogado);
    }
  }, [usuarioLogado]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!onSalvar) return;
    setSalvando(true);
    await onSalvar(cliente);
    setEditando(false);
    setSalvando(false);
  };

  const handleExcluir = async () => {
    if (!cliente.id || !onExcluir) return;
    setExcluindo(true);
    await onExcluir(cliente.id);
    setExcluindo(false);
    if (onFechar) onFechar();
  };

  const handleCancelar = () => {
    if (usuarioLogado) {
      setCliente(usuarioLogado);
      setEditando(false);
    } else {
      resetFormulario();
    }
  };

  const resetFormulario = () => {
    setCliente({
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      dataNascimento: '',
      status: 'ativo',
      fotoUrl: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {!usuarioLogado ? 'Novo Cliente' : 'Perfil do Cliente'}
          </h2>
          {onFechar && (
            <button onClick={onFechar} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Foto */}
          <div className="flex items-center space-x-4">
            <img
              src={cliente.fotoUrl || "https://via.placeholder.com/150"}
              alt="Perfil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
              <input
                type="text"
                name="nome"
                value={cliente.nome}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={cliente.email}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={cliente.telefone}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={cliente.dataNascimento}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={cliente.status}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={cliente.endereco}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Rua, número, complemento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={cliente.cidade}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Cidade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="estado"
                value={cliente.estado}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Selecione</option>
                {estados.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={cliente.cep}
                onChange={handleInputChange}
                disabled={!editando && !!usuarioLogado}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="00000-000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="flex justify-end gap-3">
          {!usuarioLogado || editando ? (
            <>
              <button
                onClick={handleCancelar}
                disabled={salvando}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando || !onSalvar}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleExcluir}
                disabled={excluindo || !onExcluir}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {excluindo ? 'Excluindo...' : 'Excluir'}
              </button>
              <button
                onClick={() => setEditando(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Editar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
