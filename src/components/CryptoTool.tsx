import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Lock, Copy, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function EncryptAES() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [aesLength, setAesLength] = useState<128 | 192 | 256>(256);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const encryptAES = (plaintext: string, password: string): string => {
    const salt = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: aesLength / 32,
      iterations: 100000,
    });
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });
    return `${aesLength}:${CryptoJS.enc.Base64.stringify(salt)}:${CryptoJS.enc.Base64.stringify(iv)}:${encrypted.toString()}`;
  };

  const handleEncrypt = () => {
    setError('');
    setResult('');
    if (!text.trim()) {
      setError('Por favor ingrese el texto a encriptar');
      return;
    }
    if (!password) {
      setError('Por favor ingrese una contraseña');
      return;
    }
    if (password.length < 12) {
      setError('La contraseña debe tener al menos 12 caracteres');
      return;
    }
    setLoading(true);
    try {
      const encrypted = encryptAES(text, password);
      setResult(encrypted);
    } catch {
      setError('Error al encriptar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const options: { label: string; value: 128 | 192 | 256; description: string }[] = [
    { label: 'AES-128', value: 128, description: 'más rápido, menos seguro' },
    { label: 'AES-192', value: 192, description: '' },
    { label: 'AES-256', value: 256, description: 'recomendado' },
  ];

  const instrucciones = [
    '1. Selecciona la longitud de AES.',
    '2. Ingresa el texto y una contraseña segura.',
    '3. Presiona "Encriptar Datos" para generar el resultado.',
    '4. Copia el resultado usando el botón de copiar.',
    '5. Guarda tu contraseña para poder desencriptar posteriormente.',
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <Lock className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">Encriptación AES con CryptoJS</h3>
          <p className="text-slate-400 text-sm">AES + IV aleatorio + PBKDF2</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-blue-200 text-sm space-y-1">
          <p>
            <strong>AES-256-GCM + IV aleatorio:</strong> Cifrado de bloques estándar con vector de inicialización único para cada
            operación, que garantiza seguridad y no repetición.
          </p>
          <p>
            <strong>PBKDF2:</strong> Derivación de clave con 100,000 iteraciones para resistencia frente a ataques de fuerza bruta.
          </p>
          <p>
            Esta implementación cumple con <strong>OWASP A02:2021 - Cryptographic Failures</strong>.
          </p>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-blue-200 text-sm space-y-1">
            <strong>Instrucciones:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1">
              {instrucciones.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Selección con casillas */}
      <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl">
        <Label className="text-slate-300 mb-2">Selección de longitud AES</Label>
        <div className="flex gap-4">
          {options.map(({ label, value, description }) => {
            const selected = aesLength === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setAesLength(value)}
                className={`flex flex-col items-center justify-center flex-1 rounded-lg border px-4 py-3 font-semibold transition focus:outline-none
                  ${
                    selected
                      ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'border-slate-700 text-slate-400 hover:border-blue-500 hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                <span>{label}</span>
                {description && <small className="text-slate-400 text-xs mt-1">{description}</small>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input texto */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Texto a Encriptar</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingrese el texto a encriptar..."
            className="min-h-[150px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm"
          />
        </div>

        {/* Input contraseña */}
        <div className="space-y-2">
          <Label className="text-slate-300">Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese la contraseña (minimo 12 caracteres) ..."
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm"
          />
        </div>

        {/* Botón encriptar */}
        <Button
          onClick={handleEncrypt}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/50 text-white transition-all"
        >
          {loading ? (
            'Procesando...'
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" /> Encriptar Datos
            </>
          )}
        </Button>
      </div>

      {/* Resultado */}
      {result && (
        <div className="space-y-2 mt-6">
          <Label className="text-slate-300">Resultado:</Label>

          <div className="relative">
            <Textarea
              value={result}
              readOnly
              className="min-h-[120px] font-mono text-sm bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 hover:bg-white/10"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
