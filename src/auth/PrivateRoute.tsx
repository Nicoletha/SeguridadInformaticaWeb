import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";


export default function PrivateRoute({ children }: any) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Previene que el navegador regrese a esta página desde cache
    window.history.replaceState(null, "", window.location.href);
  }, []);

  if (loading) {
    return <div className="text-white p-10">Validando sesión...</div>;
  }

  return isAuthenticated ?  children : <Navigate to="/login" />;;
}
