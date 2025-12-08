import { Navigate } from "react-router-dom";
// import { ReactNode } from "react";
import { useAuth } from "./AuthContext";


export default function PrivateRoute({ children }: any) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-white p-10">Validando sesión...</div>;
  }

  return isAuthenticated ?  children : <Navigate to="/login" />;;
}
