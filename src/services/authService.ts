import { type ApiResponse, type BaseUser, type UserType } from "../types";

interface LoginRequest {
  email: string;
  password: string;
  userType: UserType;
}

interface LoginResponse {
  token: string;
  user: BaseUser;
}

// Mock users
const mockUsers = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@example.com",
    telefone: "+244923456789",
    dataRegistro: "2025-01-15",
    status: "ativo" as const,
    tipo: "cliente" as const,
  },
  {
    id: "2",
    nome: "Farmácia Central",
    email: "central@pharmacy.com",
    telefone: "+244912345678",
    dataRegistro: "2025-01-10",
    status: "ativo" as const,
    tipo: "farmacia" as const,
  },
  {
    id: "3",
    nome: "Carlos Mendes",
    email: "carlos@delivery.com",
    telefone: "+244987654321",
    dataRegistro: "2025-01-05",
    status: "ativo" as const,
    tipo: "entregador" as const,
  },
  {
    id: "admin-001",
    nome: "Administrador",
    email: "admin@twalcare.com",
    telefone: "+244912345678",
    dataRegistro: "2025-01-01",
    status: "ativo" as const,
    tipo: "admin" as const,
  },
];

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: qualquer email/password válido com userType correto funciona
        const user = mockUsers.find((u) => u.tipo === credentials.userType);

        if (user && credentials.email && credentials.password) {
          resolve({
            success: true,
            data: {
              token: `mock-token-${user.id}`,
              user,
            },
          });
        } else {
          resolve({
            success: false,
            error: "Credenciais inválidas",
          });
        }
      }, 500);
    });
  },

  // Register
  async register(data: {
    nome: string;
    email: string;
    password: string;
    telefone: string;
    userType: UserType;
  }): Promise<ApiResponse<LoginResponse>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: BaseUser = {
          id: `user-${Date.now()}`,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          dataRegistro: new Date().toISOString().split("T")[0],
          status: "pendente-aprovacao",
          tipo: data.userType,
        };

        resolve({
          success: true,
          data: {
            token: `mock-token-${newUser.id}`,
            user: newUser,
          },
        });
      }, 500);
    });
  },

  // Logout
  async logout(): Promise<ApiResponse<null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: null,
        });
      }, 200);
    });
  },

  // Verificar token
  async verifyToken(token: string): Promise<ApiResponse<BaseUser>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token.startsWith("mock-token-")) {
          const userId = token.replace("mock-token-", "");
          const user = mockUsers.find((u) => u.id === userId);

          if (user) {
            resolve({
              success: true,
              data: user,
            });
          } else {
            resolve({
              success: false,
              error: "Token inválido",
            });
          }
        } else {
          resolve({
            success: false,
            error: "Token inválido",
          });
        }
      }, 200);
    });
  },

  // Recuperar password
  async resetPassword(email: string): Promise<ApiResponse<null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.email === email);

        if (user) {
          resolve({
            success: true,
            data: null,
            message: "Email de recuperação enviado",
          });
        } else {
          resolve({
            success: false,
            error: "Usuário não encontrado",
          });
        }
      }, 500);
    });
  },
};
