// medicamentoService.ts

export type Medicamento = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  descricao: string;
  imagem?: string;
};

let medicamentos: Medicamento[] = [];

export const medicamentoService = {
  listar: (): Medicamento[] => {
    return medicamentos;
  },

  criar: (data: Omit<Medicamento, "id">): Medicamento => {
    const novo = {
      id: Date.now().toString(),
      ...data,
    };

    medicamentos.push(novo);
    return novo;
  },

  atualizar: (id: string, data: Partial<Medicamento>): Medicamento | null => {
    const index = medicamentos.findIndex(m => m.id === id);
    if (index === -1) return null;

    medicamentos[index] = {
      ...medicamentos[index],
      ...data,
    };

    return medicamentos[index];
  },

  remover: (id: string): void => {
    medicamentos = medicamentos.filter(m => m.id !== id);
  },
};
