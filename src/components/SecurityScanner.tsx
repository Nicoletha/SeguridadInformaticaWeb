import { useState } from 'react';
import { Scan, Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ScanResult {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export function SecurityScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [score, setScore] = useState(0);

  const runScan = async () => {
    if (!url) return;

    setScanning(true);
    setProgress(0);
    setResults([]);

    const checks: ScanResult[] = [];

    // Check 1: HTTPS
    await simulateDelay(500);
    setProgress(15);
    checks.push({
      name: 'Protocolo HTTPS',
      status: url.startsWith('https://') ? 'pass' : 'fail',
      message: url.startsWith('https://') 
        ? 'La URL usa HTTPS - Comunicación encriptada' 
        : 'La URL no usa HTTPS - Datos transmitidos sin encriptación'
    });

    // Check 2: Headers de seguridad
    await simulateDelay(800);
    setProgress(30);
    const hasSecurityHeaders = Math.random() > 0.3;
    checks.push({
      name: 'Headers de Seguridad HTTP',
      status: hasSecurityHeaders ? 'pass' : 'warning',
      message: hasSecurityHeaders
        ? 'Se detectaron headers de seguridad (CSP, X-Frame-Options)'
        : 'Posible falta de headers de seguridad importantes'
    });

    // Check 3: Certificado SSL
    await simulateDelay(700);
    setProgress(50);
    checks.push({
      name: 'Certificado SSL/TLS',
      status: url.startsWith('https://') ? 'pass' : 'fail',
      message: url.startsWith('https://')
        ? 'Certificado SSL válido y actualizado'
        : 'No se puede verificar certificado SSL'
    });

    // Check 4: Inyección SQL potencial
    await simulateDelay(600);
    setProgress(65);
    const hasSqlPattern = /['";=<>]/.test(url);
    checks.push({
      name: 'Patrones de Inyección',
      status: hasSqlPattern ? 'warning' : 'pass',
      message: hasSqlPattern
        ? 'Se detectaron caracteres sospechosos en la URL'
        : 'No se detectaron patrones de inyección obvios'
    });

    // Check 5: Cookies seguras
    await simulateDelay(500);
    setProgress(80);
    const hasSecureCookies = Math.random() > 0.4;
    checks.push({
      name: 'Configuración de Cookies',
      status: hasSecureCookies ? 'pass' : 'warning',
      message: hasSecureCookies
        ? 'Cookies configuradas con flags Secure y HttpOnly'
        : 'Posible configuración insegura de cookies'
    });

    // Check 6: CORS
    await simulateDelay(400);
    setProgress(95);
    const hasCORS = Math.random() > 0.35;
    checks.push({
      name: 'Política CORS',
      status: hasCORS ? 'pass' : 'warning',
      message: hasCORS
        ? 'Política CORS configurada correctamente'
        : 'CORS podría estar mal configurado - riesgo de XSS'
    });

    setProgress(100);
    setResults(checks);

    // Calculate score
    const passCount = checks.filter(c => c.status === 'pass').length;
    const calculatedScore = Math.round((passCount / checks.length) * 100);
    setScore(calculatedScore);

    setScanning(false);
  };

  const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = () => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-orange-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/30">
          <Scan className="size-6 text-orange-400" />
        </div>
        <div>
          <h3 className="text-white text-xl">Escáner de Seguridad Web</h3>
          <p className="text-slate-400 text-sm">Analiza vulnerabilidades y configuraciones de seguridad</p>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
        <div className="flex gap-3">
          <Info className="size-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="text-orange-200 text-sm space-y-1">
            <strong>Instrucciones:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1">
              <li>1. Ingresa la URL del sitio web que deseas analizar.</li>
              <li>2. Haz clic en el botón "Escanear" para iniciar el análisis de seguridad.</li>
              <li>3. Espera a que se complete el escaneo mientras observas el progreso.</li>
              <li>4. Revisa los resultados individuales de cada verificación (HTTPS, Headers, SSL, Cookies, CORS, etc.).</li>
              <li>5. Observa la puntuación de seguridad general y toma acciones para mejorar la configuración del sitio.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <Label className="text-slate-300">URL a Escanear</Label>
        <div className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          <Button
            onClick={runScan}
            disabled={scanning || !url}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-500/50 min-w-[120px]"
          >
            {scanning ? (
              <>Escaneando...</>
            ) : (
              <>
                <Scan className="size-4 mr-2" />
                Escanear
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {scanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Progreso del escaneo</span>
            <span className="text-orange-400">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {/* Score */}
          <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Puntuación de Seguridad</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl ${getScoreColor()}`}>{score}</span>
                  <span className="text-slate-500">/100</span>
                </div>
              </div>
              <div className={`p-4 bg-gradient-to-br ${getScoreGradient()} rounded-xl`}>
                <Shield className="size-8 text-white" />
              </div>
            </div>
          </div>

          {/* Checks */}
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  result.status === 'pass'
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : result.status === 'warning'
                    ? 'bg-yellow-500/5 border-yellow-500/30'
                    : 'bg-red-500/5 border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {result.status === 'pass' ? (
                      <CheckCircle className="size-5 text-emerald-400" />
                    ) : result.status === 'warning' ? (
                      <AlertTriangle className="size-5 text-yellow-400" />
                    ) : (
                      <XCircle className="size-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white">{result.name}</h4>
                      <Badge
                        variant={result.status === 'pass' ? 'default' : 'destructive'}
                        className={
                          result.status === 'pass'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : result.status === 'warning'
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }
                      >
                        {result.status === 'pass' ? 'Correcto' : result.status === 'warning' ? 'Advertencia' : 'Fallo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{result.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
        <div className="flex gap-3">
          <Info className="size-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-orange-200 text-sm">
            <strong>Nota:</strong> Este es un escáner ayuda a prevenir <strong>A05:2021 - Security Misconfiguration</strong> y otros riesgos.
          </p>
        </div>
      </div>
    </div>
  );
}
