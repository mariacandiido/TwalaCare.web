import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const mockProducts = [
  { id: "1", name: "Paracetamol 500mg", category: "Analgésicos", price: 1500, stock: 150, requiresPrescription: false },
  { id: "2", name: "Ibuprofeno 400mg", category: "Analgésicos", price: 2000, stock: 200, requiresPrescription: false },
  { id: "3", name: "Amoxicilina 500mg", category: "Antibióticos", price: 3500, stock: 80, requiresPrescription: true },
  { id: "4", name: "Vitamina C 1000mg", category: "Vitaminas", price: 2500, stock: 300, requiresPrescription: false },
  { id: "5", name: "Loratadina 10mg", category: "Antialérgicos", price: 1800, stock: 120, requiresPrescription: false },
  { id: "6", name: "Omeprazol 20mg", category: "Digestivos", price: 2200, stock: 150, requiresPrescription: true },
];

export function FarmaciaProdutos() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="farmacia" userName="Farmácia Central">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Gestão de Produtos</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Produto</span>
          </button>
        </div>

        {/* Barra de pesquisa */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Tabela de produtos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Produto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preço</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Receita</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {product.price.toLocaleString()} Kz
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        product.stock > 100
                          ? "bg-green-100 text-green-700"
                          : product.stock > 50
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.requiresPrescription ? (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Sim</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Não</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de adicionar produto */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Adicionar Produto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Paracetamol 500mg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Analgésicos</option>
                      <option>Antibióticos</option>
                      <option>Vitaminas</option>
                      <option>Antialérgicos</option>
                      <option>Digestivos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preço (Kz)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-gray-700">Receita obrigatória</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagem do Produto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
