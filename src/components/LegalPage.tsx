import { useEffect } from 'react';
import { ArrowLeft, Scale, Lock, Mail, Phone, MapPin, CheckCircle2, Trash2, Clock, Send } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';
import { BrandLogo } from './BrandLogo';
import { Footer } from './Footer';

export type LegalDocType = 'eliminacion-datos' | 'aviso-legal' | 'politica-privacidad';

interface LegalPageProps {
  docType: LegalDocType;
  onSwitchDoc: (doc: LegalDocType) => void;
  onBackHome: () => void;
}

export function LegalPage({ docType, onSwitchDoc, onBackHome }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (docType === 'eliminacion-datos') {
      document.title = 'Eliminación de Datos | Neumáticos David Caravaca';
    } else if (docType === 'aviso-legal') {
      document.title = 'Aviso Legal | Neumáticos David Caravaca';
    } else {
      document.title = 'Política de Privacidad | Neumáticos David Caravaca';
    }
  }, [docType]);

  const isEliminacion = docType === 'eliminacion-datos';
  const isAviso = docType === 'aviso-legal';
  const isPrivacidad = docType === 'politica-privacidad';

  const deletionMailto = `mailto:${WORKSHOP_INFO.email}?subject=${encodeURIComponent(
    'Solicitud de Eliminación de Datos'
  )}&body=${encodeURIComponent(
    'Hola Neumáticos David Caravaca,\n\nSolicito la eliminación de mis datos personales asociados a las consultas o solicitudes realizadas.\n\n- Nombre completo: \n- Teléfono de contacto: \n- Correo electrónico utilizado: \n- Matrícula / Vehículo (opcional): \n\nGracias.'
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-emerald-950/40 shadow-lg shadow-black/40 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackHome();
            }}
            className="flex items-center group whitespace-nowrap shrink-0"
          >
            <BrandLogo className="h-10 sm:h-11 w-auto group-hover:scale-[1.03] transition-transform duration-200" />
          </a>

          {/* Switcher between Eliminación de Datos, Aviso Legal and Privacidad */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => onSwitchDoc('eliminacion-datos')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isEliminacion
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Eliminación de Datos
            </button>
            <button
              type="button"
              onClick={() => onSwitchDoc('aviso-legal')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isAviso
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aviso Legal
            </button>
            <button
              type="button"
              onClick={() => onSwitchDoc('politica-privacidad')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isPrivacidad
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Política de Privacidad
            </button>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackHome();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 rounded-lg hover:from-lime-300 hover:to-emerald-400 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Taller</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative overflow-hidden">
        {/* Diffused apple green background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-gradient-to-tr from-lime-500/12 via-emerald-500/12 to-transparent blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/8 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          {/* Mobile Switcher */}
          <div className="flex md:hidden items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 mb-8">
            <button
              type="button"
              onClick={() => onSwitchDoc('eliminacion-datos')}
              className={`flex-1 py-2 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                isEliminacion
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Eliminación Datos
            </button>
            <button
              type="button"
              onClick={() => onSwitchDoc('aviso-legal')}
              className={`flex-1 py-2 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                isAviso
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aviso Legal
            </button>
            <button
              type="button"
              onClick={() => onSwitchDoc('politica-privacidad')}
              className={`flex-1 py-2 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                isPrivacidad
                  ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Privacidad
            </button>
          </div>

          {/* Document Header */}
          <div className="mb-12 border-b border-slate-800/90 pb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              {isEliminacion ? (
                <Trash2 className="w-4 h-4" />
              ) : isAviso ? (
                <Scale className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>{WORKSHOP_INFO.fullName}</span>
              <span aria-hidden="true">·</span>
              <span>Caravaca de la Cruz (Murcia)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              {isEliminacion
                ? 'Instrucciones para la Eliminación de Datos'
                : isAviso
                  ? 'Aviso Legal y Condiciones de Uso'
                  : 'Política de Privacidad y Protección de Datos'}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEliminacion
                ? 'Procedimiento claro y directo para solicitar la supresión total de tus datos personales conforme al derecho de supresión (artículo 17 del RGPD y LOPDGDD).'
                : isAviso
                  ? 'Información general en cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).'
                  : 'Información detallada sobre cómo tratamos y protegemos tus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).'}
            </p>
            <div className="mt-4 text-xs text-slate-400">
              Última actualización: Noviembre de 2026 <span aria-hidden="true">·</span> Ámbito de aplicación: España / Región de Murcia
            </div>
          </div>

          {isEliminacion ? (
            /* ELIMINACIÓN DE DATOS CONTENT */
            <div className="space-y-6">
              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-white font-display">
                  01. ¿Qué datos puedes solicitar eliminar?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En {WORKSHOP_INFO.fullName} no creamos perfiles comerciales ni vendemos información a terceros. Si nos enviaste una consulta o solicitud de cita previa, puedes pedir en cualquier momento la eliminación de:
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Formularios de cita previa y presupuesto:</strong> nombre, teléfono, correo electrónico, medida de neumático y matrícula o modelo del vehículo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Comunicaciones directas:</strong> correos electrónicos enviados a {WORKSHOP_INFO.email} o mensajes de WhatsApp gestionados con nuestro taller.
                    </span>
                  </li>
                </ul>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
                <h2 className="text-xl font-bold text-white font-display">
                  02. Instrucciones Paso a Paso para Solicitar la Eliminación
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      1
                    </div>
                    <h3 className="text-sm font-bold text-white">Envía tu solicitud por Email</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Escribe a{' '}
                      <a
                        href={deletionMailto}
                        className="text-emerald-400 hover:text-emerald-300 underline font-medium break-all"
                      >
                        {WORKSHOP_INFO.email}
                      </a>{' '}
                      indicando en el asunto: <strong className="text-slate-200">«Solicitud de Eliminación de Datos»</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-white">Identifica tu registro</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Incluye tu <strong className="text-slate-200">nombre completo</strong>, el <strong className="text-slate-200">teléfono o correo</strong> con el que contactaste y, si lo deseas, la matrícula para localizar tus datos con precisión.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      3
                    </div>
                    <h3 className="text-sm font-bold text-white">Confirmación de borrado</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Eliminaremos tu información de nuestros buzones y registros de citas, enviándote confirmación escrita por el mismo canal.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-400" />
                      Enviar solicitud pre-rellenada en un clic
                    </div>
                    <p className="text-xs text-slate-300">
                      Se abrirá tu aplicación de correo con la dirección oficial y el texto listo para completar tus datos.
                    </p>
                  </div>
                  <a
                    href={deletionMailto}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-lime-300 hover:to-emerald-400 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Solicitar Eliminación</span>
                  </a>
                </div>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-white font-display">
                  03. Canales Alternativos de Atención
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Si prefieres realizar tu solicitud por otra vía o tienes dudas sobre tus datos personales, también puedes contactar directamente con el responsable del taller:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">
                      <Mail className="w-3.5 h-3.5" />
                      Correo Electrónico
                    </div>
                    <a
                      href={deletionMailto}
                      className="text-white font-medium hover:text-emerald-400 transition-colors break-all block"
                    >
                      {WORKSHOP_INFO.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">
                      <Phone className="w-3.5 h-3.5" />
                      Teléfono / WhatsApp
                    </div>
                    <a
                      href={WORKSHOP_INFO.phoneCallUrl}
                      className="text-white font-bold hover:text-emerald-400 transition-colors block"
                    >
                      {WORKSHOP_INFO.phoneMobile}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      Presencial en Taller
                    </div>
                    <div className="text-slate-300 text-xs leading-relaxed">
                      {WORKSHOP_INFO.address}, {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city}
                    </div>
                  </div>
                </div>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  04. Plazos de Ejecución y Excepciones Legales
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Atenderemos tu solicitud en el menor tiempo posible (habitualmente en menos de <strong className="text-white">72 horas laborables</strong>) y siempre dentro del plazo máximo legal de <strong className="text-white">30 días naturales</strong> establecido por el RGPD.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  En caso de haberse emitido una factura, orden de reparación o garantía oficial de taller, únicamente se conservarán bloqueados los datos mínimos exigidos por la normativa fiscal, mercantil y de defensa de los consumidores durante el periodo legal obligatorio, tras el cual serán eliminados definitivamente. Asimismo, puedes presentar cualquier reclamación ante la Agencia Española de Protección de Datos (<span className="text-slate-200">www.aepd.es</span>).
                </p>
              </section>
            </div>
          ) : isAviso ? (
            /* AVISO LEGAL CONTENT */
            <div className="space-y-6">
              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-white font-display">
                  01. Datos Identificativos del Titular
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002 (LSSI-CE), se facilitan los siguientes datos identificativos del taller titular de este sitio web:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">Denominación Comercial</div>
                    <div className="text-white font-bold">{WORKSHOP_INFO.fullName}</div>
                    <div className="text-slate-400 text-xs">Actividad: Venta y montaje de neumáticos nuevos y de ocasión, y taller de mecánica rápida.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">Domicilio del Establecimiento</div>
                    <div className="text-white font-medium">{WORKSHOP_INFO.address}</div>
                    <div className="text-slate-400 text-xs">{WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region}, España)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">Correo Electrónico</div>
                    <div className="text-white font-medium">{WORKSHOP_INFO.email}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">Teléfono de Atención</div>
                    <div className="text-white font-medium">{WORKSHOP_INFO.phoneMobile}</div>
                  </div>
                </div>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  02. Objeto del Sitio Web y Condiciones de Uso
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  El presente sitio web tiene por objeto informar al público sobre el catálogo orientativo de neumáticos nuevos y seminuevos (ocasión garantizada), los servicios de mecánica rápida (cambios de aceite y filtros, frenos, alineación 3D, baterías, revisiones Pre-ITV, climatización y reparación de pinchazos), así como facilitar la solicitud de presupuestos y cita previa en nuestras instalaciones de Caravaca de la Cruz.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  El acceso y navegación por esta web atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones. El usuario se compromete a hacer un uso lícito y diligente de los formularios de contacto y de la información publicada.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  03. Precios, Stock y Garantía de Neumáticos y Mecánica
                </h2>
                <div className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
                  <p>
                    Los precios mostrados en el buscador web incluyen IVA, montaje en llanta, válvula nueva, equilibrado dinámico y tasa de gestión medioambiental de neumáticos fuera de uso (SIGNUS / TNU), salvo indicación contraria expresa.
                  </p>
                  <p>
                    La disponibilidad de neumáticos de ocasión y medidas específicas está sujeta a rotación física real en almacén. La reserva online a través del formulario de cita previa supone una solicitud preferente que nuestro equipo confirmará telefónicamente o por WhatsApp tras verificar el stock exacto en taller.
                  </p>
                  <p>
                    Todos nuestros neumáticos de ocasión superan pruebas de estanqueidad a presión y comprobación de profundidad de dibujo, contando con garantía directa de sustitución ante defectos ocultos de fabricación o estructura conforme a la normativa vigente de defensa de los consumidores. Las intervenciones de mecánica rápida conservan la garantía oficial del fabricante del vehículo según el Reglamento (UE) 461/2010.
                  </p>
                </div>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  04. Gestión Ambiental y Residuos (SIGAUS / SIGNUS)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En {WORKSHOP_INFO.fullName} cumplimos estrictamente con la legislación española y europea sobre reciclaje y gestión de residuos de automoción. Tanto los aceites industriales usados (adheridos a SIGAUS) como los neumáticos fuera de uso (SIGNUS) son retirados y tratados por gestores autorizados.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  05. Propiedad Intelectual e Industrial
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  El logotipo oficial de Neumáticos David - Caravaca, las fotografías reales de nuestras instalaciones, textos descriptivos, estructura y diseño gráfico son propiedad de {WORKSHOP_INFO.fullName} o se utilizan con autorización. Las marcas de fabricantes mostradas (Michelin, Continental, Bridgestone, Pirelli, Goodyear, etc.) pertenecen a sus respectivos propietarios y se citan únicamente con carácter informativo y descriptivo de los productos comercializados.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  06. Legislación Aplicable y Jurisdicción
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Este Aviso Legal se rige íntegramente por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales competentes del domicilio del consumidor o de Caravaca de la Cruz (Murcia), según corresponda legalmente.
                </p>
              </section>
            </div>
          ) : (
            /* POLÍTICA DE PRIVACIDAD CONTENT */
            <div className="space-y-6">
              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-white font-display">
                  01. Responsable del Tratamiento de tus Datos
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  De conformidad con el Reglamento General de Protección de Datos (RGPD - Reglamento UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos sobre quién trata los datos personales que nos facilitas al solicitar cita o presupuesto:
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Responsable:</strong> {WORKSHOP_INFO.fullName}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Dirección del taller:</strong> {WORKSHOP_INFO.address}, {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Email de contacto y privacidad:</strong> {WORKSHOP_INFO.email}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Teléfono:</strong> {WORKSHOP_INFO.phoneMobile}</span>
                  </li>
                </ul>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  02. ¿Qué Datos Recogemos y Con Qué Finalidad?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A través del formulario de cita previa y presupuesto recogemos exclusivamente los datos necesarios para atender tu vehículo: nombre y apellidos, teléfono de contacto, correo electrónico (opcional), matrícula o modelo del vehículo, medida de neumático y franja horaria deseada.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="font-bold text-emerald-400 mb-1">Gestión de Citas y Presupuestos</div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Confirmar disponibilidad de neumáticos en stock, preparar recambios específicos para tu coche y asignarte hora en nuestro box de trabajo.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="font-bold text-emerald-400 mb-1">Facturación y Garantía de Taller</div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Cuando contratas un servicio en nuestras instalaciones, gestionar la factura legal, la orden de reparación y el seguimiento de la garantía.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 pt-1">
                  Nunca utilizamos tus datos para enviar publicidad comercial masiva ni los vendemos a terceros.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  03. Base Jurídica y Destinatarios (Web3Forms / WhatsApp)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  La base legal para el tratamiento de tus datos es tu <strong className="text-white">consentimiento expreso</strong> al enviar el formulario de solicitud y la aplicación de <strong className="text-white">medidas precontractuales o ejecución del servicio de taller</strong> solicitado (art. 6.1.a y 6.1.b del RGPD).
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Para transmitir de forma segura los formularios web hacia nuestro buzón oficial (<span className="text-slate-200">{WORKSHOP_INFO.email}</span>), utilizamos la infraestructura técnica de Web3Forms exclusivamente como pasarela de mensajería. Si decides contactarnos voluntariamente mediante el botón de WhatsApp, la comunicación se regirá adicionalmente por la política de privacidad de dicha plataforma de mensajería.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  04. Plazo de Conservación de los Datos
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Los datos enviados mediante el formulario de solicitud de presupuesto o cita se conservarán únicamente durante el tiempo necesario para gestionar tu petición y resolver cualquier consulta derivada, salvo que se formalice un servicio en el taller, en cuyo caso se mantendrán durante los plazos legalmente exigidos por la normativa fiscal, contable y de garantías de reparación de vehículos.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  05. Tus Derechos sobre tus Datos Personales
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Puedes ejercer en cualquier momento tus derechos de <strong className="text-white">acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición</strong>, así como retirar el consentimiento prestado, enviando un correo electrónico a{' '}
                  <a href={`mailto:${WORKSHOP_INFO.email}`} className="text-emerald-400 hover:text-emerald-300 underline font-medium">
                    {WORKSHOP_INFO.email}
                  </a>{' '}
                  o acudiendo presencialmente a nuestro taller en {WORKSHOP_INFO.address}, Caravaca de la Cruz. Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h2 className="text-xl font-bold text-white font-display">
                  06. Cookies y Almacenamiento Local
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Este sitio web no utiliza cookies publicitarias ni rastreadores de seguimiento entre sitios. Únicamente emplea recursos técnicos esenciales del navegador para mostrar correctamente el catálogo de neumáticos, el visor de fotos del taller y el logotipo corporativo.
                </p>
              </section>
            </div>
          )}

          {/* Bottom Back-to-Home CTA */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">
                ¿Necesitas neumáticos o cita para tu coche en Caravaca?
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Vuelve a la página principal para consultar medidas en stock o reservar hora en taller.
              </div>
            </div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onBackHome();
              }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-lime-300 hover:to-emerald-400 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap"
            >
              Ir a la Web de Neumáticos David
            </a>
          </div>
        </div>
      </main>

      <Footer onOpenBooking={onBackHome} />
    </div>
  );
}
