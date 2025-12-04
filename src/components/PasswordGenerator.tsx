import { SetStateAction, useState } from 'react';
import { Key, Copy, CheckCircle, RefreshCw, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Input } from './ui/input';

export function PasswordGenerator() {
  // Estado para almacenar la contraseña generada
  const [password, setPassword] = useState('');
  // Estado para la longitud deseada de la contraseña, por defecto 16
  const [length, setLength] = useState(16);
  // Estados booleanos para incluir distintos tipos de caracteres en la contraseña
  const [includeUppercase, setIncludeUppercase] = useState(true);  // Mayúsculas A-Z
  const [includeLowercase, setIncludeLowercase] = useState(true);  // Minúsculas a-z
  const [includeNumbers, setIncludeNumbers] = useState(true);      // Números 0-9
  const [includeSymbols, setIncludeSymbols] = useState(true);      // Símbolos especiales
  // Estado para controlar visualmente si el texto fue copiado al portapapeles
  const [copied, setCopied] = useState(false);
  // Estado que guarda la "fuerza" o fortaleza calculada de la contraseña generada
  const [strength, setStrength] = useState(0);

  // Función que evalúa la fortaleza de una contraseña basada en criterios simples
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 20;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
    return score;
  };

  // Función que genera la contraseña usando la API criptográfica del navegador
  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      chars = lowercase;
    }

    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars[array[i] % chars.length];
    }

    setPassword(generatedPassword);
    setStrength(calculateStrength(generatedPassword));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-orange-500';
    if (strength < 90) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Débil';
    if (strength < 70) return 'Media';
    if (strength < 90) return 'Fuerte';
    return 'Muy Fuerte';
  };

  const instrucciones = [
    '1. Ajusta la longitud deseada de tu contraseña usando el slider.',
    '2. Activa o desactiva las opciones: mayúsculas, minúsculas, números y símbolos según prefieras.',
    '3. Haz clic en "Generar Contraseña" para crear una contraseña segura.'
  ];

  return (
    <div className="space-y-6">
      {/* Sección con icono y título */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
          <Key className="size-6 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white text-xl">Generador de Contraseñas Seguras</h3>
          <p className="text-slate-400 text-sm">Genera contraseñas criptográficamente seguras</p>
        </div>
      </div>

      {/* Mensaje de seguridad antes de instrucciones */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <div className="flex gap-3">
          <Info className="size-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-emerald-200 text-sm">
            <strong>Tip de Seguridad:</strong> Usa contraseñas de al menos 16 caracteres con una combinación de mayúsculas, minúsculas, números y símbolos. Nunca reutilices contraseñas entre diferentes servicios. Relacionado con <strong>A07:2021 - Identification and Authentication Failures</strong>.
          </p>
        </div>
      </div>

      {/* Caja con instrucciones para el usuario */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <div className="flex gap-3">
          <Info className="size-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-emerald-200 text-sm space-y-1">
            <strong>Instrucciones:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1">
              {instrucciones.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Campo donde se muestra la contraseña generada, solo lectura */}
      <div className="space-y-3">
        <Label className="text-slate-300">Contraseña Generada</Label>
        <div className="relative">
          <Input
            value={password}
            readOnly
            placeholder="Haz clic en generar para crear una contraseña..."
            className="pr-24 bg-slate-800/50 border-slate-700 text-white font-mono text-lg"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              disabled={!password}
              className="hover:bg-white/10"
            >
              {copied ? (
                <CheckCircle className="size-4 text-emerald-400" />
              ) : (
                <Copy className="size-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>

        {password && (
          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fortaleza:</span>
              <span className={`${strength >= 70 ? 'text-emerald-400' : strength >= 40 ? 'text-orange-400' : 'text-red-400'}`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStrengthColor()} transition-all duration-500`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Slider para ajustar la longitud de la contraseña */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-slate-300">Longitud</Label>
          <span className="text-blue-400 px-3 py-1 bg-blue-500/10 rounded-lg border border-blue-500/30">
            {length}
          </span>
        </div>
        <Slider
          value={[length]}
          onValueChange={(values: SetStateAction<number>[]) => setLength(values[0])}
          min={8}
          max={64}
          step={1}
          className="py-4"
        />
      </div>

      {/* Switches para activar/desactivar inclusión de diferentes tipos de caracteres */}
      <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <Label className="text-slate-300">Para una contraseña más segura asegúrate de incluir:</Label>
        <div className="flex items-center justify-between">
          <label className="text-slate-400 cursor-pointer">Mayúsculas (A-Z)</label>
          <Switch checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-slate-400 cursor-pointer">Minúsculas (a-z)</label>
          <Switch checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-slate-400 cursor-pointer">Números (0-9)</label>
          <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-slate-400 cursor-pointer">Símbolos (!@#$%)</label>
          <Switch checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
        </div>
      </div>

      {/* Botón para generar la contraseña */}
      <Button
        onClick={generatePassword}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/50 transition-all"
      >
        <RefreshCw className="size-4 mr-2" />
        Generar Contraseña
      </Button>
    </div>
  );
}
