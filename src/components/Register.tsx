import { useState } from 'react';
import { Lock, User, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

interface RegisterProps {
  onRegister: (username: string) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<string[]>([]);

  const validatePasswordStrength = (pwd: string) => {
    const checks = [];
    if (pwd.length >= 8) checks.push('Al menos 8 caracteres');
    if (/[A-Z]/.test(pwd)) checks.push('Una mayúscula');
    if (/[a-z]/.test(pwd)) checks.push('Una minúscula');
    if (/[0-9]/.test(pwd)) checks.push('Un número');
    if (/[^A-Za-z0-9]/.test(pwd)) checks.push('Un carácter especial');
    return checks;
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    setPasswordStrength(validatePasswordStrength(pwd));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingrese un email válido');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('La contraseña debe contener mayúsculas, minúsculas y números');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.username === username)) {
      setError('El usuario ya existe');
      return;
    }

    if (users.some((u: any) => u.email === email)) {
      setError('El email ya está registrado');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    onRegister(username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-slate-900">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600 rounded-2xl blur-2xl opacity-20" />
          
          {/* Card */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header gradient */}
            <div className="h-2 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600" />
            
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
                <h2 className="text-white text-2xl mb-2">Crear Cuenta</h2>
                <p className="text-slate-400">Únete a Seguridad Informática UTS</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert className="bg-red-500/10 border-red-500/50 text-red-300">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">
                    Usuario
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Mínimo 3 caracteres"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="tu@email.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">
                    Contraseña
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                    />
                  </div>
                  {password && (
                    <div className="space-y-1 mt-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      {passwordStrength.map((check) => (
                        <div key={check} className="flex items-center gap-2 text-xs text-emerald-400">
                          <CheckCircle className="size-3" />
                          <span>{check}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all"
                >
                  Crear Cuenta
                </Button>
                
                <p className="text-center text-sm text-slate-400 pt-2">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Inicia sesión aquí
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
