import { Users, CheckCircle2, Award, ShieldCheck, Wrench, ArrowRight, Phone, Calendar } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

interface QuienesSomosSectionProps {
  onOpenBooking: (servicePreset?: string) => void;
}

export function QuienesSomosSection({ onOpenBooking }: QuienesSomosSectionProps) {
  const occasionFeatures = [
    'Inspección exhaustiva de cada neumático',
    'Garantía de calidad certificada',
    'Ahorro sin comprometer la seguridad',
    'Amplio stock de todas las medidas',
  ];

  const newTyreFeatures = [
    'Marcas premium y económicas',
    'Neumáticos para todo tipo de vehículos',
    'Asesoramiento personalizado',
    'Garantía del fabricante',
  ];

  const quickMechanicsServices = [
    { title: 'Cambios de Aceite', desc: 'Servicio express en 30 minutos' },
    { title: 'Frenos', desc: 'Revisión y cambio de pastillas' },
    { title: 'Suspensión', desc: 'Diagnóstico y reparación' },
    { title: 'Pre-ITV', desc: 'Revisión completa garantizada' },
    { title: 'Alineación', desc: 'Equipos de última generación' },
    { title: 'Servicio de Motor', desc: 'Kit de Distribución - Correa Auxiliar' },
  ];

  const reasons = [
    {
      title: 'Experiencia',
      desc: 'Más de 10 años en el sector nos avalan',
      icon: Award,
    },
    {
      title: 'Calidad',
      desc: 'Productos y servicios de primera',
      icon: CheckCircle2,
    },
    {
      title: 'Confianza',
      desc: 'Miles de clientes satisfechos',
      icon: Users,
    },
  ];

  return (
    <section id="quienes-somos" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Subtle diffused apple green ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#70c018]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header: Nuestra Trayectoria (Exact Figma reference) */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#70c018]/15 border border-[#70c018]/30 flex items-center justify-center text-[#70c018]">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Nuestra Trayectoria
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-base sm:text-lg leading-relaxed text-balance">
            <p>
              En <strong className="text-white font-semibold">Neumáticos David - Caravaca</strong>, llevamos una década ofreciendo servicios especializados en neumáticos y mecánica rápida. Nuestra experiencia y compromiso con la calidad nos han convertido en el taller de referencia para miles de conductores en la región de Murcia.
            </p>
            <p className="text-sm sm:text-base text-slate-400">
              Desde nuestros inicios, hemos mantenido un enfoque claro: ofrecer productos de primera calidad, tanto en neumáticos nuevos como de ocasión, combinado con un servicio profesional, rápido y a precios competitivos.
            </p>
          </div>
        </div>

        {/* 2 Cards: Neumáticos de Ocasión & Neumáticos Nuevos (Exact Figma reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Neumáticos de Ocasión */}
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-[#70c018]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#70c018] text-white flex items-center justify-center shadow-lg shadow-[#70c018]/25 mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Neumáticos de Ocasión
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Especializados en la venta de neumáticos de ocasión de alta calidad. Todos nuestros neumáticos usados pasan rigurosos controles de seguridad y calidad antes de ser ofrecidos a nuestros clientes.
              </p>

              <div className="space-y-3 mb-6">
                {occasionFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-[#70c018]/20 flex items-center justify-center text-[#70c018] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Desde 30€ montado con garantía</span>
              <button
                onClick={() => onOpenBooking('Neumáticos de Ocasión')}
                className="text-xs font-bold text-[#70c018] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Consultar Medida</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Neumáticos Nuevos */}
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-[#70c018]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#70c018] text-white flex items-center justify-center shadow-lg shadow-[#70c018]/25 mb-6">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Neumáticos Nuevos
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Distribuimos las mejores marcas del mercado en neumáticos nuevos. Trabajamos con los principales fabricantes para ofrecer la mejor relación calidad-precio y adaptarnos a las necesidades de cada vehículo.
              </p>

              <div className="space-y-3 mb-6">
                {newTyreFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-[#70c018]/20 flex items-center justify-center text-[#70c018] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Michelin, Continental, Pirelli...</span>
              <button
                onClick={() => onOpenBooking('Neumáticos Nuevos')}
                className="text-xs font-bold text-[#70c018] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Pedir Presupuesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dark Container: Mecánica Rápida (Exact Figma reference) */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0b131e] border border-slate-800 shadow-2xl mb-20">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#70c018] text-white flex items-center justify-center shadow-lg shadow-[#70c018]/20 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Mecánica Rápida
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed mb-8">
            Además de nuestros servicios de neumáticos, contamos con un completo taller de mecánica rápida equipado con la última tecnología. Nuestro equipo de profesionales está preparado para realizar todo tipo de reparaciones y mantenimiento sin que tengas que esperar días.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {quickMechanicsServices.map((srv, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-[#70c018]/30 transition-colors flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#70c018]/15 text-[#70c018] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: ¿Por Qué Elegirnos? (Exact Figma reference) */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-12">
            ¿Por Qué Elegirnos?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, idx) => {
              const IconComp = r.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#70c018]/10 border border-[#70c018]/30 flex items-center justify-center text-[#70c018] shadow-lg shadow-[#70c018]/10">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {r.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#70c018] hover:bg-[#62ab13] text-white font-bold text-sm shadow-lg shadow-[#70c018]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Pedir Cita en Taller</span>
            </button>

            <a
              href={WORKSHOP_INFO.phoneCallUrl}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#70c018]" />
              <span>Llamar Ahora: {WORKSHOP_INFO.phoneLandline}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
