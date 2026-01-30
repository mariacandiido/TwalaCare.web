import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trash2, Edit2, Plus, Search } from "lucide-react";
import { useUsuariosStore, type Usuario } from "../../store/usuariosStore";

export function AdminUsuarios() {
  const {
    usuarios,
    adicionarUsuario,
    editarUsuario,
    deletarUsuario,
    toggleStatus,
  } = useUsuariosStore();
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Partial<Usuario>>({
    nome: "",
    email: "",
    tipo: "cliente",
    telefone: "",
    status: "ativo",
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    const matchBusca =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = filtroTipo === "todos" || u.tipo === filtroTipo;
    return matchBusca && matchTipo;
  });

  const handleAdicionarUsuario = () => {
    setUsuarioEditar(null);
    setFormData({
      nome: "",
      email: "",
      tipo: "cliente",
      telefone: "",
      status: "ativo",
    });
    setDialogAberto(true);
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setFormData(usuario);
    setDialogAberto(true);
  };

  const handleSalvar = () => {
    if (!formData.nome || !formData.email || !formData.telefone) {
      alert("Preenche todos os campos obrigatórios!");
      return;
    }

    if (usuarioEditar) {
      // Editar
      editarUsuario(usuarioEditar.id, formData);
    } else {
      // Criar novo
      adicionarUsuario({
        nome: formData.nome!,
        email: formData.email!,
        tipo: formData.tipo as "cliente" | "farmacia" | "entregador" | "admin",
        telefone: formData.telefone!,
        status: "ativo",
      });
    }

    setDialogAberto(false);
  };

  const handleDeletar = (id: string) => {
    if (confirm("Tem certeza que quer deletar este utilizador?")) {
      deletarUsuario(id);
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    const cores: Record<string, string> = {
      cliente: "bg-blue-100 text-blue-800",
      farmacia: "bg-green-100 text-green-800",
      entregador: "bg-orange-100 text-orange-800",
      admin: "bg-purple-100 text-purple-800",
    };
    return cores[tipo] || "bg-gray-100 text-gray-800";
  };

  return (
    <DashboardLayout userType="admin" userName="Administrador">
      <div className="p-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gerenciar Utilizadores
          </h1>
          <p className="text-gray-600">
            Gerencie clientes, farmácias, entregadores e admins
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro por tipo */}
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="cliente">Clientes</SelectItem>
                <SelectItem value="farmacia">Farmácias</SelectItem>
                <SelectItem value="entregador">Entregadores</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>

            {/* Botão Adicionar */}
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleAdicionarUsuario}
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Utilizador
                </Button>
              </DialogTrigger>

              {/* Modal de Criar/Editar */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {usuarioEditar ? "Editar Utilizador" : "Novo Utilizador"}
                  </DialogTitle>
                  <DialogDescription>
                    {usuarioEditar
                      ? "Atualize os dados do utilizador"
                      : "Adicione um novo utilizador ao sistema"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Nome *
                    </label>
                    <Input
                      value={formData.nome || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      placeholder="Nome completo"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <Input
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@example.com"
                      type="email"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <Input
                      value={formData.telefone || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      placeholder="+244923456789"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Tipo de Utilizador *
                    </label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          tipo: value as
                            | "cliente"
                            | "farmacia"
                            | "entregador"
                            | "admin",
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="farmacia">Farmácia</SelectItem>
                        <SelectItem value="entregador">Entregador</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleSalvar}
                  >
                    {usuarioEditar ? "Atualizar" : "Criar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabela de Utilizadores */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Nome</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Tipo</TableHead>
                <TableHead className="font-semibold">Telefone</TableHead>
                <TableHead className="font-semibold">Data Registro</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">
                      Nenhum utilizador encontrado
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <TableRow key={usuario.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {usuario.nome}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoBadgeColor(usuario.tipo)}`}
                      >
                        {usuario.tipo.charAt(0).toUpperCase() +
                          usuario.tipo.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{usuario.telefone}</TableCell>
                    <TableCell>
                      {new Date(usuario.dataRegistro).toLocaleDateString(
                        "pt-PT",
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleStatus(usuario.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          usuario.status === "ativo"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditarUsuario(usuario)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletar(usuario.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Deletar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Resumo */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Clientes</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">
              {usuarios.filter((u) => u.tipo === "cliente").length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Farmácias</p>
            <p className="text-2xl font-bold text-green-900 mt-1">
              {usuarios.filter((u) => u.tipo === "farmacia").length}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-sm text-orange-600 font-medium">Entregadores</p>
            <p className="text-2xl font-bold text-orange-900 mt-1">
              {usuarios.filter((u) => u.tipo === "entregador").length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Admins</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">
              {usuarios.filter((u) => u.tipo === "admin").length}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
