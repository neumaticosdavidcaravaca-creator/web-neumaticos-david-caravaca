import { Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

interface TyreSearchSectionProps {
  onOpenBooking?: (serviceTitle?: string) => void;
}

export function TyreSearchSection({ onOpenBooking }: TyreSearchSectionProps) {
  return (
    <section id="neumaticos" className="py-20 lg:py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Diffused apple green ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-lime-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Stock y Disponibilidad en Almacén</span>
            <span aria-hidden="true">·</span>
            <span>Montaje y Equilibrado Incluidos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Neumáticos Nuevos y de Ocasión en Caravaca
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Disponemos de primeras marcas nuevas y cubiertas seminuevas rigurosamente verificadas con hasta un 60% de ahorro, listas para montar en el acto.
          </p>
        </div>

        {/* Real Tyre Stock Banner */}
        <div className="rounded-2xl bg-slate-950 border border-emerald-950/60 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-56 lg:h-full min-h-[240px] overflow-hidden bg-slate-900 relative">
            <img
              src={WORKSHOP_INFO.images.tyreWarehouse}
              alt="Almacén de neumáticos en stock Neumáticos David Caravaca"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              <Sparkles className="w-3.5 h-3.5" />
              Stock Permanente en Nave
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Más de 500 cubiertas clasificadas por medidas en Caravaca de la Cruz
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Trabajamos con turismos, SUV, 4x4 y furgonetas. Consúltanos tu medida directamente y, si necesitas una referencia especial, la recibimos desde almacén central en 24 horas laborables.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> IVA incluido
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Montaje incluido
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Equilibrado y válvula incluidos
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => onOpenBooking('Neumáticos Nuevos')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <span>Consultar Medida y Precio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <a
                href={WORKSHOP_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Preguntar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
