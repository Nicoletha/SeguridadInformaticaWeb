import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Header } from "./components/Header";
import { useAuth } from "./auth/AuthContext";

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      {/* Header solo si hay usuario autenticado */}
      {token && <Header />}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative">
        
        {/* Glow si lo ocupas (puedes quitarlo si no lo usas) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* RUTA PROTEGIDA */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirige raíz a dashboard si estás logueado o a login si no */}
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
