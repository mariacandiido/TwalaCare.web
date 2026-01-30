import { useState } from "react";
import { Search, Filter, Star, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCartStore } from "../store/cartStore";

// Mock data
const categorias = ["Todos", "Analgésicos", "Antibióticos", "Vitaminas", "Antialérgicos", "Digestivos"];
const provincias = ["Todas", "Luanda", "Benguela", "Huíla", "Huambo"];
const farmacias = ["Todas", "Farmácia Central", "Farmácia Saúde", "Farmácia Vida", "Farmácia Bem-Estar"];

const medicamentos = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    categoria: "Analgésicos",
    price: 1500,
    farmacia: "Farmácia Central",
    provincia: "Luanda",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.8,
    stock: 150,
    requiresPrescription: false,
    horario: "08:00 - 20:00",
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    categoria: "Analgésicos",
    price: 2000,
    farmacia: "Farmácia Saúde",
    provincia: "Luanda",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.6,
    stock: 200,
    requiresPrescription: false,
    horario: "07:00 - 22:00",
  },
  {
    id: "3",
    name: "Amoxicilina 500mg",
    categoria: "Antibióticos",
    price: 3500,
    farmacia: "Farmácia Vida",
    provincia: "Benguela",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.9,
    stock: 80,
    requiresPrescription: true,
    horario: "08:00 - 18:00",
  },
  {
    id: "4",
    name: "Vitamina C 1000mg",
    categoria: "Vitaminas",
    price: 2500,
    farmacia: "Farmácia Bem-Estar",
    provincia: "Luanda",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.7,
    stock: 300,
    requiresPrescription: false,
    horario: "08:00 - 20:00",
  },
  {
    id: "5",
    name: "Loratadina 10mg",
    categoria: "Antialérgicos",
    price: 1800,
    farmacia: "Farmácia Central",
    provincia: "Luanda",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.5,
    stock: 120,
    requiresPrescription: false,
    horario: "08:00 - 20:00",
  },
  {
    id: "6",
    name: "Omeprazol 20mg",
    categoria: "Digestivos",
    price: 2200,
    farmacia: "Farmácia Saúde",
    provincia: "Huíla",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?w=400",
    rating: 4.8,
    stock: 150,
    requiresPrescription: true,
    horario: "07:00 - 22:00",
  },
];

export function Farmacos() {
  const { addItem } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todos");
  const [selectedProvincia, setSelectedProvincia] = useState("Todas");
  const [selectedFarmacia, setSelectedFarmacia] = useState("Todas");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar medicamentos
  const filteredMedicamentos = medicamentos.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === "Todos" || med.categoria === selectedCategoria;
    const matchesProvincia = selectedProvincia === "Todas" || med.provincia === selectedProvincia;
    const matchesFarmacia = selectedFarmacia === "Todas" || med.farmacia === selectedFarmacia;
    
    return matchesSearch && matchesCategoria && matchesProvincia && matchesFarmacia;
  });

  const handleAddToCart = (med: typeof medicamentos[0]) => {
    addItem({
      id: med.id,
      name: med.name,
      price: med.price,
      quantity: 1,
      farmacia: med.farmacia,
      image: med.image,
      requiresPrescription: med.requiresPrescription,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fármacos</h1>
          <p className="text-xl text-gray-600">
            Encontre os medicamentos que você precisa
          </p>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Pesquisa */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Pesquisar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Botão de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filtros expandidos */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Categoria */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={selectedCategoria}
                  onChange={(e) => setSelectedCategoria(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Província */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Província
                </label>
                <select
                  value={selectedProvincia}
                  onChange={(e) => setSelectedProvincia(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {provincias.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Farmácia */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Farmácia
                </label>
                <select
                  value={selectedFarmacia}
                  onChange={(e) => setSelectedFarmacia(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {farmacias.map((farm) => (
                    <option key={farm} value={farm}>
                      {farm}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredMedicamentos.length} medicamento(s) encontrado(s)
          </p>
        </div>

        {/* Grid de medicamentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicamentos.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative">
                <ImageWithFallback
                  src={med.image}
                  alt={med.name}
                  className="w-full h-48 object-cover"
                />
                {med.requiresPrescription && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Receita Obrigatória
                  </span>
                )}
              </div>

              <div className="p-4">
                <span className="text-xs text-green-600 font-semibold">
                  {med.categoria}
                </span>
                <h3 className="font-semibold text-gray-900 mt-1 mb-2">
                  {med.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{med.farmacia}</p>
                  <p className="text-xs text-gray-500">{med.provincia}</p>
                  <p className="text-xs text-gray-500">Horário: {med.horario}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {med.price.toLocaleString()} Kz
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{med.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {med.stock > 0 ? `Em stock: ${med.stock}` : "Esgotado"}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(med)}
                  disabled={med.stock === 0}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicamentos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum medicamento encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
