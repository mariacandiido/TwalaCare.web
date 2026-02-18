import { useState, useEffect } from "react";
import { medicamentoService, Medicamento } from "../farmacia/medicamentoService";
import { Plus, Trash2, Edit2 } from "lucide-react";

export default function MedicamentoPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
    descricao: "",
    imagem: "",
  });
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    setMedicamentos(medicamentoService.listar());
  }, []);

  const atualizarLista = () => {
    setMedicamentos([...medicamentoService.listar()]);
  };

  const handleSubmit = () => {
    if (!form.nome || !form.preco || !form.estoque) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    if (editandoId) {
      medicamentoService.atualizar(editandoId, {
        nome: form.nome,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        descricao: form.descricao,
        imagem: form.imagem,
      });
      setEditandoId(null);
    } else {
      medicamentoService.criar({
        nome: form.nome,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        descricao: form.descricao,
        imagem: form.imagem,
      });
    }

    setForm({
      nome: "",
      preco: "",
      estoque: "",
      descricao: "",
      imagem: "",
    });

    atualizarLista();
  };

  const handleEditar = (med: Medicamento) => {
    setForm({
      nome: med.nome,
      preco: med.preco.toString(),
      estoque: med.estoque.toString(),
      descricao: med.descricao,
      imagem: med.imagem || "",
    });
    setEditandoId(med.id);
  };

  const handleRemover = (id: string) => {
    medicamentoService.remover(id);
    atualizarLista();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Gestão de Medicamentos
        </h1>

        {/* FORMULÁRIO */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nome do medicamento"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Preço"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Estoque"
              value={form.estoque}
              onChange={(e) => setForm({ ...form, estoque: e.target.value })}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="URL da imagem"
              value={form.imagem}
              onChange={(e) => setForm({ ...form, imagem: e.target.value })}
              className="border p-3 rounded-lg"
            />

          </div>

          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="border p-3 rounded-lg mt-4 w-full"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            {editandoId ? "Atualizar" : "Adicionar"}
          </button>
        </div>

        {/* LISTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {medicamentos.map((med) => (
            <div key={med.id} className="bg-white rounded-xl shadow p-4">

              {med.imagem && (
                <img
                  src={med.imagem}
                  alt={med.nome}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="font-bold text-lg">{med.nome}</h3>
              <p className="text-sm text-gray-600">{med.descricao}</p>
              <p className="mt-2 font-semibold">Preço: {med.preco} Kz</p>
              <p className="text-sm">Estoque: {med.estoque}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEditar(med)}
                  className="text-blue-600"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => handleRemover(med.id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
