import { useState } from 'react';
import { Lock, Key, Scan, BookOpen, Wrench, Unlock } from 'lucide-react';
import { EncryptAES } from './CryptoTool';      // corregido: import named EncryptAES
import { PasswordGenerator } from './PasswordGenerator';
import { SecurityScanner } from './SecurityScanner';
import { OwaspReference } from './OwaspReference';
import { DecryptAES } from './DecryptTool';    // corregido: import named DecryptAES

// interface DashboardProps {
//   username: string;
// }

type Tool = 'crypto' | 'password' | 'hash' | 'scanner' | 'owasp' | 'decrypt';

export function Dashboard() {
  const [activeTool, setActiveTool] = useState<Tool>('crypto');

  const tools = [
    {
      id: 'crypto' as Tool,
      name: 'Encriptación con AES',
      description: 'Encripta datos con AES',
      icon: Lock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },   
    {
      id: 'decrypt' as Tool, 
      name: 'Desencriptación con AES',
      description: 'Desencripta datos cifrados con AES',
      icon: Unlock,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'password' as Tool,
      name: 'Generador de Contraseñas',
      description: 'Genera contraseñas seguras y únicas',
      icon: Key,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      id: 'scanner' as Tool,
      name: 'Escáner de URL',
      description: 'Analiza y detecta vulnerabilidades',
      icon: Scan,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'owasp' as Tool,
      name: 'Referencia OWASP',
      description: 'Consulta OWASP Top 10 2021',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Panel de Bienvenida con ícono de herramienta */}
      <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 blur-3xl rounded-2xl" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 md:p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <Wrench className="size-7 md:size-9 text-white" />
              </div>
              <div>
                <h2 className="text-white text-2xl md:text-3xl">Panel de Herramientas</h2>
                <p className="text-blue-300 text-base md:text-lg mt-2 max-w-xl">
                  A continuación podrás explorar algunas de las herramientas vistas durante la materia de Seguridad Informática.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`relative group text-left transition-all duration-300 ${
                      isActive ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${tool.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition`}
                      />
                    )}
                    <div
                      className={`relative bg-slate-900/90 backdrop-blur-xl rounded-xl border p-4 md:p-5 transition-all ${
                        isActive
                          ? `${tool.borderColor} border-2`
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-3 md:p-4 ${tool.bgColor} rounded-lg w-fit mb-3`}>
                        <Icon
                          className={`size-6 md:size-7 ${isActive ? 'text-white' : 'text-slate-400'}`}
                        />
                      </div>
                      <h3 className={`mb-2 text-base md:text-lg ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {tool.name}
                      </h3>
                      <p className="text-sm md:text-base text-slate-500">{tool.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de la herramienta activa */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20 rounded-2xl blur-xl" />
        <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8">
          {activeTool === 'crypto' && <EncryptAES />}
          {activeTool === 'password' && <PasswordGenerator />}
          {activeTool === 'scanner' && <SecurityScanner />}
          {activeTool === 'owasp' && <OwaspReference />}
          {activeTool === 'decrypt' && <DecryptAES />}
        </div>
      </div>
    </div>
  );
}
