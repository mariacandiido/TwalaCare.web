import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserType } from "../../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: UserType[];
}

export function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para login, mas salva a localização de onde o usuário estava tentando ir
    return <Navigate to="/login" state={{ from: location }} replace />;
    
  }

  if (allowedTypes && user && !allowedTypes.includes(user.tipo)) {
    // Se o tipo de usuário não for permitido, redireciona para a home ou página de erro
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
