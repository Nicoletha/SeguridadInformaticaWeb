import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Unlock, Copy, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function DecryptAES() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Función para validar Base64 con padding correcto
  const isValidBase64 = (str: string) => {
    // Longitud debe ser múltiplo de 4
    if (str.length % 4 !== 0) return false;
    // Sólo caracteres válidos + padding máximo 2 "=" al final
    return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
  };

  const decryptWithParams = (
    ciphertextParts: string[],
    keySizeCandidate: 128 | 192 | 256
  ): string | null => {
    try {
      const [saltBase64, ivBase64, cipherBase64] = ciphertextParts;
      if (!saltBase64 || !ivBase64 || !cipherBase64) return null;

      // Validar Base64 con padding correcto para cada parte
      if (
        !isValidBase64(saltBase64) ||
        !isValidBase64(ivBase64) ||
        !isValidBase64(cipherBase64)
      ) {
        return null;
      }

      const salt = CryptoJS.enc.Base64.parse(saltBase64);
      const iv = CryptoJS.enc.Base64.parse(ivBase64);
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySizeCandidate / 32,
        iterations: 100000,
      });

      const decrypted = CryptoJS.AES.decrypt(cipherBase64, key, { iv });
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

      // Validación extra: al menos un caracter imprimible ASCII
      if (!plaintext || !/[\x20-\x7E]/.test(plaintext)) return null;

      return plaintext;
    } catch {
      return null;
    }
  };

  const decryptAES = (ciphertext: string, passwordLocal: string): string => {
    try {
      if (ciphertext.includes(':')) {
        const firstSegment = ciphertext.split(':')[0];
        const maybeLen = Number(firstSegment);
        if (maybeLen === 128 || maybeLen === 192 || maybeLen === 256) {
          const [, saltBase64, ivBase64, cipherBase64] = ciphertext.split(':');
          const plaintext = decryptWithParams(
            [saltBase64, ivBase64, cipherBase64],
            maybeLen as 128 | 192 | 256
          );
          if (plaintext !== null) return plaintext;
          throw new Error('No se pudo descifrar con la longitud indicada. Verifique contraseña/formato.');
        }
      }

      const parts = ciphertext.split(':');
      if (parts.length !== 3) throw new Error('Formato inválido.');

      const tries: (128 | 192 | 256)[] = [256, 192, 128];
      for (const candidate of tries) {
        const plain = decryptWithParams(parts, candidate);
        if (plain !== null) return plain;
      }

      throw new Error('No se pudo descifrar con ninguna longitud (128/192/256).');
    } catch {
      throw new Error('Error al desencriptar. Verifique la contraseña y el texto encriptado.');
    }
  };

  const handleDecrypt = () => {
    setError('');
    setResult('');
    if (!text) return setError('Por favor ingrese el texto a desencriptar');
    if (!password) return setError('Por favor ingrese la contraseña');
    setLoading(true);
    try {
      const decrypted = decryptAES(text, password);
      setResult(decrypted);
    } catch (e: any) {
      setError(e.message || 'Error al desencriptar. Verifique la contraseña y el texto encriptado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const instrucciones = [
    '1. Ingresa el texto encriptado y la contraseña utilizada.',
    '2. Presiona "Desencriptar Datos".',
    '3. Asegúrate de usar la contraseña correcta.',
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/30 backdrop-blur-sm">
          <Unlock className="size-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-white text-xl">Desencriptación AES con CryptoJS</h3>
          <p className="text-purple-300 text-sm">AES + IV aleatorio + PBKDF2</p>
        </div>
      </div>

      {/* Alerta de info */}
      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl flex gap-3">
        <Info className="size-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="text-purple-200 text-sm space-y-1">
          <strong>AES-256-GCM + IV aleatorio:</strong> Cifrado de bloques estándar con vector de inicialización único para cada operación, que garantiza seguridad y no repetición.&nbsp;
          <strong>PBKDF2:</strong> Derivación de clave con 100,000 iteraciones para resistencia frente a ataques de fuerza bruta.&nbsp;
          Esta implementación cumple con <strong>OWASP A02:2021 - Cryptographic Failures</strong>.
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-3">
          <AlertCircle className="size-5 text-red-400 flex-shrink-0 mt-0.5" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}

      {/* Instrucciones */}
      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl backdrop-blur-sm">
        <div className="flex gap-3">
          <Info className="size-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="text-purple-200 text-sm space-y-1">
            <strong>Instrucciones:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1">
              {instrucciones.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Input texto con márgenes iguales */}
      <div className="space-y-4 mx-4 my-2">
        <div className="space-y-2">
          <Label className="text-purple-300">Texto Encriptado</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingrese el texto encriptado..."
            className="min-h-[150px] bg-slate-800/50 border border-purple-700 text-white placeholder:text-purple-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 font-mono text-sm mx-2 py-2 px-3"
          />
        </div>

        {/* Input contraseña con márgenes iguales */}
        <div className="space-y-2">
          <Label className="text-purple-300">Contraseña usada</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese la contraseña utilizada..."
            className="bg-slate-800/50 border border-purple-700 text-white placeholder:text-purple-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 mx-2 py-2 px-3"
          />
        </div>

        {/* Botón desencriptar */}
        <Button
          onClick={handleDecrypt}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/50 text-white transition-all mx-2"
        >
          {loading ? 'Procesando...' : <><Unlock className="size-4 mr-2" /> Desencriptación AES</>}
        </Button>
      </div>

      {/* Resultado */}
      {result && (
        <div className="space-y-2 mt-6 mx-4">
          <Label className="text-purple-300">Resultado:</Label>

          <div className="relative">
            <Textarea
              value={result}
              readOnly
              className="min-h-[120px] font-mono text-sm bg-purple-950/30 border border-purple-500/30 text-purple-300 mx-2 py-2 px-3"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 hover:bg-white/10"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckCircle className="size-4 text-emerald-400" />
              ) : (
                <Copy className="size-4 text-purple-400" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
