// src/modules/cliente/clienteService.ts

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  foto?: string; // base64
}

const STORAGE_KEY = "cliente_perfil";

export const clienteService = {
  salvar(cliente: Cliente) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cliente));
  },

  obter(): Cliente | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  atualizar(cliente: Cliente) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cliente));
  },

  eliminar() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
