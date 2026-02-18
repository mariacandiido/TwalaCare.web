// hooks/useAuth.ts (VERSÃO MOCK - para desenvolvimento sem backend)
import { useState } from "react";
import { 
  type UserType, 
  type Cliente,
  type Farmacia,
  type Entregador,  
  type Admin
} from "../types";

// Interface para dados de registro
interface RegisterData {
  nome: string;
  email: string;
  telefone: string;
  tipo: UserType;
  password: string;
  confirmPassword?: string;
  // Campos específicos por tipo
  dataNascimento?: string;
  provincia?: string;
  municipio?: string;
  endereco?: string;
  nif?: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  veiculo?: string;
  placaVeiculo?: string;
  cargo?: string;
  departamento?: string;
}

// Interface para resultado do registro
interface RegisterResult {
  success: boolean;
  message: string;
  requiresVerification?: boolean;
  requiresApproval?: boolean;
  data?: AppUser;
}

// Interface unificada para qualquer tipo de usuário
export type AppUser = Cliente | Farmacia | Entregador | Admin;

interface UseAuthReturn {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    userType: UserType,
  ) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  checkEmailExists: (email: string) => Promise<{ exists: boolean; user?: AppUser }>;
  error: string | null;
  clearError: () => void;
  updateUser: (userData: Partial<AppUser> & Record<string, any>) => Promise<boolean>;
  mockLogin: (userData: AppUser) => void;
  mockLogout: () => void;
}

// Banco de dados mock em memória
const mockUsers: AppUser[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "cliente@exemplo.com",
    telefone: "+244 900 000 001",
    dataRegistro: "2024-01-01T00:00:00Z",
    status: "ativo",
    tipo: "cliente",
    dataNascimento: "1990-01-01",
    provincia: "Luanda",
    municipio: "Luanda",
    endereco: "Rua Direita",
  },
  {
    id: "2",
    nome: "Farmácia Saúde",
    email: "farmacia@exemplo.com",
    telefone: "+244 900 000 002",
    dataRegistro: "2024-01-01T00:00:00Z",
    status: "ativo",
    tipo: "farmacia",
    nif: "5400000000",
    provincia: "Luanda",
    municipio: "Belas",
    endereco: "Kilamba",
    horarioAbertura: "08:00",
    horarioFechamento: "22:00",
    avaliacao: 4.5,
  },
];

// Emails já cadastrados (para simular verificação)
const registeredEmails = new Set(mockUsers.map(user => user.email));

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false); // Iniciar como false já que não há backend
  const [error, setError] = useState<string | null>(null);

  // Função para limpar erros
  const clearError = () => setError(null);

  // Função de login MOCK
  const login = async (
    email: string,
    password: string,
    userType: UserType,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validações básicas
      if (!email.trim() || !password.trim()) {
        setError("Email e senha são obrigatórios");
        return false;
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Encontrar usuário no mock
      const foundUser = mockUsers.find(
        user => user.email === email && user.tipo === userType
      );

      if (!foundUser) {
        setError("Credenciais inválidas ou tipo de conta incorreto");
        return false;
      }

      // Verificar se a senha é "123456" (mock)
      if (password !== "123456") {
        setError("Senha incorreta (use 123456 para teste)");
        return false;
      }

      // Salvar no localStorage
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(foundUser));
      setUser(foundUser);

      console.log("✅ Login mock bem-sucedido:", foundUser);
      return true;

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro MOCK
  const register = async (userData: RegisterData): Promise<RegisterResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verificar se email já existe
      if (registeredEmails.has(userData.email)) {
        return {
          success: false,
          message: "Este email já está cadastrado. Tente fazer login.",
          requiresVerification: false,
          requiresApproval: false
        };
      }

      // Validar senha (mock)
      if (userData.password.length < 6) {
        return {
          success: false,
          message: "A senha deve ter pelo menos 6 caracteres",
          requiresVerification: false,
          requiresApproval: false
        };
      }

      // Criar novo usuário mock com todos os dados fornecidos
      const { password, confirmPassword, ...otherData } = userData;
      const newUser: AppUser = {
        ...otherData,
        id: "user_" + Date.now(),
        dataRegistro: new Date().toISOString(),
        status: userData.tipo === "cliente" ? "ativo" : "pendente-aprovacao",
      } as AppUser;

      // Adicionar ao mock
      mockUsers.push(newUser);
      registeredEmails.add(userData.email);

      // Determinar mensagem baseada no tipo
      let successMessage = "Conta criada com sucesso!";
      let requiresApproval = false;
      
      switch (userData.tipo) {
        case "farmacia":
          successMessage = "Conta criada! ✅ Aguarde aprovação administrativa.";
          requiresApproval = true;
          break;
        case "entregador":
          successMessage = "Conta criada! ✅ Aguarde verificação dos documentos.";
          requiresApproval = true;
          break;
        case "admin":
          successMessage = "Solicitação de acesso administrativo enviada.";
          requiresApproval = true;
          break;
        default:
          successMessage = "Conta criada com sucesso! ✅";
          
          // Auto-login para clientes
          localStorage.setItem("auth_token", "mock_token_" + Date.now());
          localStorage.setItem("user_data", JSON.stringify(newUser));
          setUser(newUser);
      }

      console.log("✅ Registro mock bem-sucedido:", newUser);

      return {
        success: true,
        message: successMessage,
        requiresVerification: false, // Mock não tem verificação
        requiresApproval,
        data: newUser
      };

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMsg);
      return {
        success: false,
        message: errorMsg,
        requiresVerification: false,
        requiresApproval: false
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se email existe MOCK
  const checkEmailExists = async (email: string) => {
    try {
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const exists = registeredEmails.has(email);
      const user = mockUsers.find(u => u.email === email);
      
      return { exists, user };
    } catch (err) {
      console.error("Erro ao verificar email:", err);
      return { exists: false, user: undefined };
    }
  };

  // Enviar email de verificação MOCK
  const sendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      setError(null);
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("📧 Email de verificação mock enviado para:", email);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMsg);
      return false;
    }
  };

  // Verificar email com token MOCK
  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("✅ Email verificado mock com token:", token);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar dados do usuário MOCK
  const updateUser = async (userData: Partial<AppUser> & Record<string, any>): Promise<boolean> => {
    try {
      if (!user) {
        setError("Nenhum usuário autenticado");
        return false;
      }

      setIsLoading(true);
      setError(null);

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Atualizar no mock
      const index = mockUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData } as AppUser;
      }

      // Atualizar estado
      const updatedUser = { ...user, ...userData } as AppUser;
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser));

      console.log("✅ Usuário atualizado mock:", updatedUser);
      return true;

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout MOCK
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Limpar dados locais
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setUser(null);
      setError(null);
      
      console.log("✅ Logout mock realizado");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao fazer logout";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Funções auxiliares para desenvolvimento
  const mockLogin = (userData: AppUser) => {
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    console.log("🔧 Login mock manual:", userData);
  };

  const mockLogout = () => {
    localStorage.removeItem("user_data");
    setUser(null);
    console.log("🔧 Logout mock manual");
  };

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    sendVerificationEmail,
    verifyEmail,
    checkEmailExists,
    error,
    clearError,
    updateUser,
    // Funções de desenvolvimento
    mockLogin,
    mockLogout,
  };
}
