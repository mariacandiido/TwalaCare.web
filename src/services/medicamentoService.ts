import { type Medicamento, type ApiResponse } from "../types";

// Mock data
const medicamentos: Medicamento[] = [
  {
    id: "1",
    nome: "Paracetamol 500mg",
    categoria: "Analgésicos",
    descricao: "Analgésico e antitérmico de ação rápida",
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
    nome: "Ibuprofeno 400mg",
    categoria: "Analgésicos",
    descricao: "Anti-inflamatório não esteroide",
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
    nome: "Amoxicilina 500mg",
    categoria: "Antibióticos",
    descricao: "Antibiótico de amplo espectro",
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
    nome: "Vitamina C 1000mg",
    categoria: "Vitaminas",
    descricao: "Suplemento vitamínico imunidade",
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
    nome: "Loratadina 10mg",
    categoria: "Antialérgicos",
    descricao: "Anti-histamínico para alergias",
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
    nome: "Omeprazol 20mg",
    categoria: "Digestivos",
    descricao: "Protetor gástrico para refluxo",
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

// Serviço de Medicamentos
export const medicamentoService = {
  // Obter todos os medicamentos
  async getAll(): Promise<ApiResponse<Medicamento[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: medicamentos,
        });
      }, 300);
    });
  },

  // Obter medicamento por ID
  async getById(id: string): Promise<ApiResponse<Medicamento>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const medicamento = medicamentos.find((m) => m.id === id);
        if (medicamento) {
          resolve({
            success: true,
            data: medicamento,
          });
        } else {
          resolve({
            success: false,
            error: "Medicamento não encontrado",
          });
        }
      }, 300);
    });
  },

  // Buscar medicamentos
  async search(
    query: string,
    filters?: {
      categoria?: string;
      provincia?: string;
      farmacia?: string;
    },
  ): Promise<ApiResponse<Medicamento[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = medicamentos.filter(
          (m) =>
            m.nome.toLowerCase().includes(query.toLowerCase()) ||
            m.descricao.toLowerCase().includes(query.toLowerCase()),
        );

        if (filters?.categoria && filters.categoria !== "Todos") {
          results = results.filter((m) => m.categoria === filters.categoria);
        }

        if (filters?.provincia && filters.provincia !== "Todas") {
          results = results.filter((m) => m.provincia === filters.provincia);
        }

        if (filters?.farmacia && filters.farmacia !== "Todas") {
          results = results.filter((m) => m.farmacia === filters.farmacia);
        }

        resolve({
          success: true,
          data: results,
        });
      }, 300);
    });
  },

  // Obter medicamentos por categoria
  async getByCategory(categoria: string): Promise<ApiResponse<Medicamento[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = medicamentos.filter((m) => m.categoria === categoria);
        resolve({
          success: true,
          data: results,
        });
      }, 300);
    });
  },

  // Obter medicamentos por farmácia
  async getByFarmacia(farmacia: string): Promise<ApiResponse<Medicamento[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = medicamentos.filter((m) => m.farmacia === farmacia);
        resolve({
          success: true,
          data: results,
        });
      }, 300);
    });
  },

  // Atualizar estoque
  async updateStock(
    id: string,
    quantity: number,
  ): Promise<ApiResponse<Medicamento>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const medicamento = medicamentos.find((m) => m.id === id);
        if (medicamento) {
          medicamento.stock -= quantity;
          resolve({
            success: true,
            data: medicamento,
          });
        } else {
          resolve({
            success: false,
            error: "Medicamento não encontrado",
          });
        }
      }, 300);
    });
  },
};
