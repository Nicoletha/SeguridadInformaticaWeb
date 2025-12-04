import { BookOpen, Shield, AlertTriangle, Database, Key, Code, Settings, Upload, Eye, Server, FileWarning, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const owaspTop10 = [
  {
    id: 'A01',
    title: 'Broken Access Control',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'Fallas que permiten acceso no autorizado a recursos.',
    impact: 'Crítico',
    example: 'Un atacante modifica la URL o el ID de un recurso para acceder a datos de otros usuarios.',
    mitigation: 'Implementar control de acceso basado en roles y validar permisos en cada endpoint.',
    link: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'
  },
  {
    id: 'A02',
    title: 'Cryptographic Failures',
    icon: Key,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Exposición de datos sensibles por cifrado débil o inexistente.',
    impact: 'Alto',
    example: 'Contraseñas almacenadas en texto plano o con algoritmos inseguros.',
    mitigation: 'Usar cifrado fuerte (AES-256-GCM) y derivación de claves segura (PBKDF2, bcrypt).',
    link: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/'
  },
  {
    id: 'A03',
    title: 'Injection',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Vulnerabilidades SQL, NoSQL, OS y LDAP injection.',
    impact: 'Crítico',
    example: 'Un atacante inyecta código SQL en un formulario de login para acceder a la base de datos.',
    mitigation: 'Usar consultas parametrizadas y sanitización de entradas de usuario.',
    link: 'https://owasp.org/Top10/A03_2021-Injection/'
  },
  {
    id: 'A04',
    title: 'Insecure Design',
    icon: Settings,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'Fallas de diseño y arquitectura sin modelado de amenazas.',
    impact: 'Alto',
    example: 'No se implementan validaciones de seguridad en diseño inicial de la app.',
    mitigation: 'Incluir modelado de amenazas y revisiones de arquitectura segura desde el diseño.',
    link: 'https://owasp.org/Top10/A04_2021-Insecure_Design/'
  },
  {
    id: 'A05',
    title: 'Security Misconfiguration',
    icon: AlertTriangle,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    description: 'Configuraciones incorrectas o inseguras en la aplicación.',
    impact: 'Alto',
    example: 'Servicios con permisos públicos o configuraciones por defecto no seguras.',
    mitigation: 'Realizar hardening, revisar configuraciones y deshabilitar recursos innecesarios.',
    link: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
  },
  {
    id: 'A06',
    title: 'Vulnerable Components',
    icon: Server,
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    description: 'Uso de componentes con vulnerabilidades conocidas.',
    impact: 'Medio',
    example: 'Bibliotecas desactualizadas con exploits conocidos.',
    mitigation: 'Mantener dependencias actualizadas y usar escáneres de vulnerabilidades.',
    link: 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/'
  },
  {
    id: 'A07',
    title: 'Authentication Failures',
    icon: Eye,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    description: 'Fallas en autenticación y gestión de sesiones.',
    impact: 'Crítico',
    example: 'Contraseñas débiles o tokens de sesión predecibles.',
    mitigation: 'Implementar MFA, contraseñas fuertes y manejo seguro de tokens.',
    link: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'
  },
  {
    id: 'A08',
    title: 'Data Integrity Failures',
    icon: Database,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    description: 'Código que no protege contra violaciones de integridad.',
    impact: 'Alto',
    example: 'Manipulación de datos financieros sin verificación de integridad.',
    mitigation: 'Usar hashing, checksums y firmas digitales para validar integridad.',
    link: 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/'
  },
  {
    id: 'A09',
    title: 'Logging & Monitoring Failures',
    icon: FileWarning,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'Falta de registro y monitoreo de eventos de seguridad.',
    impact: 'Medio',
    example: 'No detectar ataques de fuerza bruta o accesos no autorizados.',
    mitigation: 'Implementar logging centralizado, alertas y monitoreo continuo.',
    link: 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/'
  },
  {
    id: 'A10',
    title: 'Server-Side Request Forgery',
    icon: Upload,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    description: 'La aplicación obtiene recursos remotos sin validación.',
    impact: 'Alto',
    example: 'Un atacante hace que el servidor haga peticiones internas sin autorización.',
    mitigation: 'Validar todas las URLs externas y restringir accesos internos.',
    link: 'https://owasp.org/Top10/A10_2021-Server_Side_Request_Forgery/'
  }
];

export function OwaspReference() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
          <BookOpen className="size-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white text-xl">OWASP Top 10 - 2021</h3>
          <p className="text-slate-400 text-sm">Los 10 riesgos de seguridad más críticos para aplicaciones web</p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10 border-indigo-500/30">
        <CardContent className="pt-6">
          <p className="text-slate-300 text-sm">
            El <strong className="text-white">OWASP Top 10</strong> es un estándar de concientización para desarrolladores y seguridad web. Representa los riesgos más críticos y cómo mitigarlos.
          </p>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {owaspTop10.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-xl border ${item.borderColor} bg-slate-800/30 backdrop-blur-sm p-5 transition-all hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${item.bgColor} rounded-lg`}>
                    <Icon className="size-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs text-slate-500">{item.id}:2021</span>
                        <h4 className="text-white mt-1">{item.title}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.impact === 'Crítico' 
                          ? 'bg-red-500/20 text-red-300' 
                          : item.impact === 'Alto'
                          ? 'bg-orange-500/20 text-orange-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {item.impact}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    <p className="text-sm text-emerald-400 mt-1"><strong>Mitigación:</strong> {item.mitigation}</p>
                    <p className="text-sm text-slate-400 mt-1"><strong>Ejemplo:</strong> {item.example}</p>
                    <a href={item.link} target="_blank" className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 mt-1">
                      <ExternalLink className="size-3" /> Documentación OWASP
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info: mantenemos igual */}
      <div className="p-5 bg-slate-800/30 border border-slate-700 rounded-xl">
        <div className="flex gap-4">
          <Shield className="size-6 text-blue-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="text-white">Implementación en esta aplicación</h4>
            <p className="text-slate-400 text-sm">
              Esta App de seguridad está basada en el Top 10 de OWASP - 2021.
            </p>
          </div>
        </div>
      </div>

      {/* External Link */}
      <div className="text-center">
        <a
          href="https://owasp.org/Top10/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          <BookOpen className="size-4" />
          Más información en OWASP.org
        </a>
      </div>
    </div>
  );
}
