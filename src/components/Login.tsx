import { useState } from 'react';
import { Lock, AlertCircle, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { API_URL } from '../config';
import { useAuth } from '../auth/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export function Login() {
  const { token, setToken } = useAuth(); // <-- usamos setToken
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Si ya hay token, redirige fuera del login
  if (token) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true)

  if (!email || !password) {
    setError("Porfavor complete todos los campos");
    setIsLoading(false)
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/Access/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.message ?? "Credenciales incorrectas");
      return;
    }

    const data = await response.json();

    if (!data.isSucces) {
      setError("Credenciales incorrectas");
      setIsLoading(false)
      return;
    }

    setToken(data.token);

    navigate("/dashboard", { replace: true });

  } catch (err) {
    setError("Error de servidor. Intenta más tarde.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-slate-900">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Card */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header gradient */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
            
            <div className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src="https://i.ibb.co/p6LH6xPq/Whats-App-Image-2025-12-03-at-00-35-28-b8ba1571-removebg-preview.png"
                  alt="Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-white text-2xl mb-2">Bienvenido</h2>
                <p className="text-slate-400">Seguridad Informática UTS</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert className="bg-red-500/10 border-red-500/50 text-red-300">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}  
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Ingrese su email"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Ingrese su contraseña"
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </Button>
                
                <p className="text-center text-sm text-slate-400 pt-2">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    // onClick={onSwitchToRegister}
                    onClick={() => navigate("/register")}
                    className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
