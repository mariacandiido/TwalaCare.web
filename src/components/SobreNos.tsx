import { CheckCircle, Users, Heart, Shield } from "lucide-react";

export function SobreNos() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre a TwalaCare</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolucionando o acesso a medicamentos e serviços farmacêuticos em Angola
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A TwalaCare nasceu da necessidade de facilitar o acesso a 
                medicamentos de qualidade em Angola. Percebemos que muitas 
                pessoas enfrentavam dificuldades para encontrar medicamentos 
                específicos, comparar preços e receber orientação farmacêutica adequada.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Em 2025, lançamos nossa plataforma com a missão de conectar 
                farmácias certificadas a clientes em todo o país, oferecendo 
                conveniência, transparência e rapidez na entrega.
              </p>
              <p className="text-lg text-gray-700">
                Hoje, somos a maior rede de farmácias online de Angola, servindo 
                milhares de clientes e trabalhando com centenas de farmácias parceiras.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1638366170204-d5b084f93872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHRlYW0lMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc2OTE2MzkwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Equipe TwalaCare"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              Princípios que guiam nosso trabalho diário
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Qualidade
              </h3>
              <p className="text-gray-600">
                Garantimos medicamentos autênticos de farmácias certificadas
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Acessibilidade
              </h3>
              <p className="text-gray-600">
                Tornamos os cuidados de saúde acessíveis a todos os angolanos
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cuidado
              </h3>
              <p className="text-gray-600">
                Tratamos cada cliente com atenção e profissionalismo
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Segurança
              </h3>
              <p className="text-gray-600">
                Protegemos seus dados e garantimos entregas seguras
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjaXN0JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2OTE0NjkxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Atendimento farmacêutico"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Facilitar o acesso a medicamentos de qualidade e serviços 
                farmacêuticos profissionais para todos os angolanos, através 
                de uma plataforma digital moderna, segura e conveniente.
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa Visão
              </h2>
              <p className="text-lg text-gray-700">
                Ser a plataforma de saúde digital mais confiável e abrangente 
                de Angola, expandindo nossos serviços para cobrir todas as 
                necessidades de saúde dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">150+</p>
              <p className="text-green-100">Farmácias Parceiras</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50k+</p>
              <p className="text-green-100">Clientes Ativos</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">200k+</p>
              <p className="text-green-100">Entregas Realizadas</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">4.8★</p>
              <p className="text-green-100">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Junte-se à TwalaCare
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Seja você cliente, farmácia ou entregador, temos um lugar para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Criar Conta
            </a>
            <a
              href="/farmacos"
              className="inline-block border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Explorar Medicamentos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
