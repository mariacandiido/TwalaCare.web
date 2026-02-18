import { useState } from "react";
import { Search, Star, MapPin, Clock, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FloatingChat } from "../components/FloatingChat";


const provincias = ["Todas", "Luanda", "Benguela", "Huíla", "Huambo", "Cabinda"];

const farmacias = [
  {
    id: "1",
    name: "Farmácia Central",
    location: "Luanda, Maianga",
    provincia: "Luanda",
    rating: 4.8,
    deliveryTime: "20-30 min",
    phone: "+244 900 000 001",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 1250,
    horario: "08:00 - 20:00",
    isOpen: true,
  },
  {
    id: "2",
    name: "Farmácia Saúde Plus",
    location: "Luanda, Talatona",
    provincia: "Luanda",
    rating: 4.9,
    deliveryTime: "15-25 min",
    phone: "+244 900 000 002",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 980,
    horario: "07:00 - 22:00",
    isOpen: true,
  },
  {
    id: "3",
    name: "Farmácia Vida",
    location: "Benguela, Centro",
    provincia: "Benguela",
    rating: 4.7,
    deliveryTime: "25-35 min",
    phone: "+244 900 000 003",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 1100,
    horario: "08:00 - 18:00",
    isOpen: false,
  },
  {
    id: "4",
    name: "Farmácia Bem-Estar",
    location: "Luanda, Viana",
    provincia: "Luanda",
    rating: 4.6,
    deliveryTime: "30-40 min",
    phone: "+244 900 000 004",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 850,
    horario: "08:00 - 20:00",
    isOpen: true,
  },
  {
    id: "5",
    name: "Farmácia Nova Esperança",
    location: "Huíla, Lubango",
    provincia: "Huíla",
    rating: 4.8,
    deliveryTime: "20-30 min",
    phone: "+244 900 000 005",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 920,
    horario: "08:00 - 19:00",
    isOpen: true,
  },
  {
    id: "6",
    name: "Farmácia São Pedro",
    location: "Huambo, Centro",
    provincia: "Huambo",
    rating: 4.5,
    deliveryTime: "25-35 min",
    phone: "+244 900 000 006",
    image: "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=400",
    products: 780,
    horario: "08:00 - 18:00",
    isOpen: true,
  },
];

export function Farmacias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("Todas");
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  // Filtrar farmácias
  const filteredFarmacias = farmacias.filter((farm) => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvincia = selectedProvincia === "Todas" || farm.provincia === selectedProvincia;
    const matchesOpen = !showOnlyOpen || farm.isOpen;
    
    return matchesSearch && matchesProvincia && matchesOpen;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Farmácias</h1>
          <p className="text-xl text-gray-600">
            Encontre farmácias certificadas perto de você
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
                placeholder="Pesquisar farmácia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Província */}
            <select
              value={selectedProvincia}
              onChange={(e) => setSelectedProvincia(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {provincias.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de abertas */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyOpen}
              onChange={(e) => setShowOnlyOpen(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded"
            />
            <span className="text-sm text-gray-700">Mostrar apenas farmácias abertas</span>
          </label>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredFarmacias.length} farmácia(s) encontrada(s)
          </p>
        </div>

        {/* Grid de farmácias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmacias.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative">
                <ImageWithFallback
                  src={farm.image}
                  alt={farm.name}
                  className="w-full h-48 object-cover"
                />
                {farm.isOpen ? (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Aberta
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Fechada
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {farm.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" />
                    <span className="text-sm">{farm.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{farm.horario}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{farm.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{farm.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Entrega: {farm.deliveryTime}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {farm.products} produtos disponíveis
                </p>

                <button
                  disabled={!farm.isOpen}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Visitar Farmácia
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFarmacias.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhuma farmácia encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
       <FloatingChat />
    </div>

  );
}
