import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onLogout: () => void;
  username: string;
}

export function Header({ onLogout, username }: HeaderProps) {
  return (
    <header className="relative border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10" />

      <div className="relative container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo y Título */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/XfMcCJGD/Whats-App-Image-2025-12-03-at-00-35-28-b8ba1571-removebg-preview-resized.png"
            alt="Logo"
            className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
          />
          <div>
            <h1 className="text-xl text-white font-semibold">Seguridad Informática UTS</h1>
            <p className="text-sm text-blue-300">Herramientas de Seguridad Informática</p>
          </div>
        </div>

        {/* Perfil y Botón de Cerrar Sesión al lado */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <User className="size-4 text-blue-400" />
            <span className="text-white font-medium">{username}</span>
          </div>

          <Button
            onClick={onLogout}
            variant="outline"
            size="md"
            className="border-red-500/30 bg-red-500/20 text-white hover:bg-red-500/30 hover:text-white transition-colors px-4 py-2"
          >
            <LogOut className="size-5 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}
