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
    </BrowserRouter>
  );
}
