import { ShieldCheck, Wrench, CheckCircle2, ChevronRight, Phone, ArrowDown, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToSearch: () => void;
}

export function Hero({ onOpenBooking, onScrollToSearch }: HeroProps) {
  return (
    <section className="relative pt-28 pb-20 lg:pt-34 lg:pb-28 overflow-hidden bg-slate-950">
      {/* Background radial apple green diffused gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-lime-500/15 via-emerald-500/15 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[500px] h-[400px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value proposition & actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Caravaca de la Cruz</span>
              <span aria-hidden="true">·</span>
              <span>10 Años de Experiencia</span>
              <span aria-hidden="true">·</span>
              <span>Seguimos Dejando Huellas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance">
              Neumáticos nuevos y de ocasión con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-green-300">
                garantía total
              </span>{' '}
              y mecánica rápida profesional.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Cuidamos tu vehículo como si fuera el nuestro. En nuestro taller en Caravaca de la Cruz disponemos de amplio stock físico de primeras marcas y ocasión certificada a presión, con alineación láser 3D y boxes de mecánica rápida en el acto.
            </p>

            {/* Value checklist with apple green icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Neumáticos de ocasión con &gt;80% de vida útil</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Montaje y equilibrado dinámico en el acto</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alineación 3D computarizada de dirección</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sin cita previa para pinchazos y urgencias</span>
              </div>
            </div>

            {/* Action buttons with apple green styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onScrollToSearch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 rounded-xl hover:from-lime-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/25 active:scale-98 cursor-pointer"
              >
                <span>Ver Stock en Almacén</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>Pedir Cita Mecánica</span>
              </button>

              <a
                href={WORKSHOP_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Preguntar por WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Workshop Photo as Focal Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-900/40 shadow-2xl shadow-black/80 bg-slate-900 group">
              {/* Real workshop photo showing the 3D aligner and green service board */}
              <div className="aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={WORKSHOP_INFO.images.workshopFloor}
                  alt="Instalaciones reales de Neumáticos David en Caravaca de la Cruz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/20 shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Foto Real del Taller
                    </div>
                    <div className="text-sm font-bold text-white">
                      Box de Alineación 3D y Mecánica Rápida
                    </div>
                    <div className="text-xs text-slate-400">
                      {WORKSHOP_INFO.address}, Caravaca
                    </div>
                  </div>
                  <a
                    href={WORKSHOP_INFO.phoneCallUrl}
                    className="p-2.5 rounded-lg bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors shrink-0"
                    title="Llamada rápida"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Strip */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WORKSHOP_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 font-display tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
