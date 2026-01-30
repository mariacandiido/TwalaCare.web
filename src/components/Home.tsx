import { Link } from "react-router-dom";
import { Pill, Truck, PhoneCall, Star, MapPin, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Mock data para fármacos mais vendidos

// Dados do carrossel
const carouselImages = [
  {
    id: "0",
    image: "src/images/b16.jpg", // Substitua pelo link da imagem gerada
    alt: "Equipe TwalaCare - Profissionais qualificados",
  },
  {
    id: "1",
    image: "src/images/b10.jpg",
    alt: "Medicamentos de qualidade na TwalaCare",
  },
  {
    id: "2",
    image: "src/images/b14.jpg",
    alt: "Entrega rápida em Angola",
  },
  {
    id: "3",
    image: "src/images/b8.jpg",
    alt: "Farmácias certificadas",
  },
  {
    id: "4",
    image: "src/images/b9.jpg",
    alt: "Atendimento farmacêutico online",
  },
  {
    id: "5",
    image: "src/images/b10.jpg",
    alt: "Promoções especiais",
  },
  {
    id: "6",
    image: "src/images/b11.jpg",
    alt: "Saúde e bem-estar",
  },
];

const topMedicamentos = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    price: 1500,
    farmacia: "Farmácia Central",
    image:
      "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljYXRpb24lMjBwaGFybWFjeXxlbnwxfHx8fDE3NjkxNjM5MDB8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.8,
    stock: 150,
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    price: 2000,
    farmacia: "Farmácia Saúde",
    image:
      "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljYXRpb24lMjBwaGFybWFjeXxlbnwxfHx8fDE3NjkxNjM5MDB8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.6,
    stock: 200,
  },
  {
    id: "3",
    name: "Amoxicilina 500mg",
    price: 3500,
    farmacia: "Farmácia Vida",
    image:
      "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljYXRpb24lMjBwaGFybWFjeXxlbnwxfHx8fDE3NjkxNjM5MDB8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.9,
    stock: 80,
  },
  {
    id: "4",
    name: "Vitamina C 1000mg",
    price: 2500,
    farmacia: "Farmácia Bem-Estar",
    image:
      "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljYXRpb24lMjBwaGFybWFjeXxlbnwxfHx8fDE3NjkxNjM5MDB8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.7,
    stock: 300,
  },
];

// Mock data para farmácias mais ativas
const topFarmacias = [
  {
    id: "1",
    name: "Farmácia Central",
    location: "Luanda, Maianga",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5MTI4NzIyfDA&ixlib=rb-4.1.0&q=80&w=400",
    products: 1250,
  },
  {
    id: "2",
    name: "Farmácia Saúde Plus",
    location: "Luanda, Talatona",
    rating: 4.9,
    deliveryTime: "15-25 min",
    image:
      "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5MTI4NzIyfDA&ixlib=rb-4.1.0&q=80&w=400",
    products: 980,
  },
  {
    id: "3",
    name: "Farmácia Vida",
    location: "Luanda, Viana",
    rating: 4.7,
    deliveryTime: "25-35 min",
    image:
      "https://images.unsplash.com/photo-1765031092161-a9ebe556117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5MTI4NzIyfDA&ixlib=rb-4.1.0&q=80&w=400",
    products: 1100,
  },
];

export function Home() {
  return (
    <div>
      {/* Hero Section - Institucional */}
      <section className="bg-linear-to-r from-green-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto à esquerda */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Sua Saúde, Nossa Prioridade
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Bem-vindo à TwalaCare, a plataforma líder em farmácias online em
                Angola. Oferecemos medicamentos de qualidade, entrega rápida e
                atendimento farmacêutico profissional, tudo ao alcance de um
                clique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/farmacos"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Explorar Medicamentos
                </Link>
                <Link
                  to="/farmacias"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition"
                >
                  Ver Farmácias
                </Link>
              </div>
            </div>

            {/* Imagem da equipe à direita */}
            <div>
              <img
                src="src/images/equipaTwala.png"
                alt="Equipe TwalaCare"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Banner */}
      <section className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: false,
            dynamicBullets: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          className="w-full h-[500px] md:h-[600px]"
        >
          {carouselImages.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                {/* Overlay escuro para melhor contraste do texto */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Conteúdo do slide */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap gap-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Estilos personalizados para os controles do Swiper */}
        <style>{`
  /* Container e Slide */
  .swiper {
    width: 100%;
    height: 500px; /* Altura fixa para desktop, ajuste conforme necessário */
    border-radius: 16px;
    overflow: hidden;
  }

  .swiper-slide {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Imagem com Overlay */
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Camada escura para dar contraste ao texto */
  .slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right, 
      rgba(0, 0, 0, 0.7) 0%, 
      rgba(0, 0, 0, 0.3) 50%, 
      transparent 100%
    );
    z-index: 1;
  }

  /* Conteúdo do Texto */
  .slide-content {
    position: absolute;
    left: 8%;
    z-index: 2;
    max-width: 500px;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .slide-title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #ffffff;
    /* Animação suave ao trocar slide */
    transform: translateY(30px);
    opacity: 0;
    transition: all 0.6s ease 0.2s;
  }

  .slide-description {
    font-size: 1.1rem;
    color: #e5e7eb;
    margin-bottom: 1.5rem;
    transform: translateY(30px);
    opacity: 0;
    transition: all 0.6s ease 0.4s;
  }

  /* Ativa animações quando o slide estiver ativo */
  .swiper-slide-active .slide-title,
  .swiper-slide-active .slide-description {
    transform: translateY(0);
    opacity: 1;
  }

  /* Botões de Navegação (Design Clean) */
  .swiper-button-next,
  .swiper-button-prev {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white !important;
    transition: all 0.3s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: #16a34a; /* Cor Verde TwalaCare */
    border-color: #16a34a;
    transform: translateY(-50%) scale(1.05);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 18px !important;
  }

  /* Paginação Customizada */
  .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.4 !important;
  }

  .swiper-pagination-bullet-active {
    background: #16a34a !important;
    width: 32px !important;
    border-radius: 4px !important;
    opacity: 1 !important;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .swiper { height: 400px; }
    .slide-content { left: 5%; text-align: center; right: 5%; max-width: 100%; }
    .slide-title { font-size: 1.8rem; }
    .slide-overlay { background: rgba(0,0,0,0.5); }
  }
`}</style>
      </section>

      {/* Seção de Serviços */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600">
              Tudo o que você precisa para cuidar da sua saúde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link
              to="/farmacos"
              className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-500 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Pill className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Medicamentos com e sem receita
              </h3>
              <p className="text-gray-600">
                Ampla variedade de medicamentos disponíveis. Compare preços e
                escolha a melhor opção para você.
              </p>
            </Link>

            {/* Card 2 */}
            <Link
              to="/entrega"
              className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-500 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Entrega em até 30 minutos
              </h3>
              <p className="text-gray-600">
                Entregadores profissionais TwalaCare garantem rapidez e
                segurança na entrega dos seus medicamentos.
              </p>
            </Link>

            {/* Card 3 */}
            <Link
              to="/suporte"
              className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-500 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <PhoneCall className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Atendimento farmacêutico online
              </h3>
              <p className="text-gray-600">
                Tire suas dúvidas com farmacêuticos qualificados através de chat.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Fármacos Mais Vendidos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Fármacos Mais Vendidos
              </h2>
              <p className="text-xl text-gray-600">
                Os produtos preferidos dos nossos clientes
              </p>
            </div>
            <Link
              to="/farmacos"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMedicamentos.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <ImageWithFallback
                  src={med.image}
                  alt={med.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {med.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{med.farmacia}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      {med.price.toLocaleString()} Kz
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">
                        {med.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Em stock: {med.stock}
                  </p>
                  <Link
                    to="/farmacos"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center block"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmácias Mais Ativas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Farmácias Mais Ativas
              </h2>
              <p className="text-xl text-gray-600">
                Parceiros de confiança com melhor avaliação
              </p>
            </div>
            <Link
              to="/farmacias"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topFarmacias.map((farmacia) => (
              <div
                key={farmacia.id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-500 hover:shadow-xl transition"
              >
                <ImageWithFallback
                  src={farmacia.image}
                  alt={farmacia.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {farmacia.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{farmacia.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{farmacia.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{farmacia.deliveryTime}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {farmacia.products} produtos disponíveis
                  </p>
                  <Link
                    to="/farmacias"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center block"
                  >
                    Visitar Farmácia
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nós (Resumido) */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sobre a TwalaCare
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Somos uma plataforma angolana dedicada a facilitar o acesso a
                medicamentos e serviços farmacêuticos de qualidade. Conectamos
                farmácias certificadas a clientes em todo o país.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nossa missão é tornar os cuidados de saúde mais acessíveis,
                convenientes e seguros para todos os angolanos.
              </p>
              <Link
                to="/sobre-nos"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Saiba Mais
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjaXN0JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2OTE0NjkxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Atendimento farmacêutico"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Como faço para comprar medicamentos?
              </h3>
              <p className="text-gray-600">
                É simples! Pesquise o medicamento desejado, adicione ao
                carrinho, faça upload da receita (se necessário) e finalize a
                compra.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Qual é o prazo de entrega?
              </h3>
              <p className="text-gray-600">
                A maioria das entregas é realizada em até 30 minutos, dependendo
                da sua localização e da farmácia escolhida.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                As farmácias são certificadas?
              </h3>
              <p className="text-gray-600">
                Sim! Todas as farmácias parceiras são devidamente certificadas e
                regulamentadas pelas autoridades angolanas.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="text-green-600 hover:text-green-700 font-semibold text-lg"
            >
              Ver todas as perguntas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-linear-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Crie sua conta e tenha acesso a centenas de medicamentos
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
}
