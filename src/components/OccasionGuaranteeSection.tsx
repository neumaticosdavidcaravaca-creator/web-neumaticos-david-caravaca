import { ShieldCheck, CheckCircle2, XCircle, HelpCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO, QUALITY_PILLARS } from '../data/tallerData';

interface OccasionGuaranteeSectionProps {
  onOpenBooking: (servicePreset?: string) => void;
}

export function OccasionGuaranteeSection({ onOpenBooking }: OccasionGuaranteeSectionProps) {
  return (
    <section id="ocasion" className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      {/* Diffused apple green glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Seguridad y Ahorro Inteligente</span>
            <span aria-hidden="true">·</span>
            <span>Estricto Control de Calidad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            ¿Por qué nuestros neumáticos de ocasión son de total confianza?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            No todas las ruedas de segunda mano son iguales. En Neumáticos David seleccionamos únicamente cubiertas con más del 80% de vida útil procedente de flotas de renting y vehículos de gerencia. Las inspeccionamos individualmente a presión antes de su montaje.
          </p>
        </div>

        {/* 2-Column Split: Real Tyre Rack Photo & 4 Quality Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: Real Tyre Stock Photo */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-emerald-950/60 shadow-2xl bg-slate-900 group">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={WORKSHOP_INFO.images.tyreRacks}
                  alt="Stock de neumáticos de ocasión etiquetados en Neumáticos David Caravaca"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-slate-900 border-t border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Inspección y Etiquetado en Nave
                </div>
                <div className="text-sm font-semibold text-white">
                  Verificación de banda de rodadura y flexibilidad del compuesto
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Cada rueda se comprueba a 4 bares para descartar deformaciones o poros.
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Quality Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {QUALITY_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Comparison Table */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8 border-b border-slate-800">
            <h3 className="text-xl font-bold text-white font-display">
              Comparativa transparente: ¿Qué estás comprando realmente?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Conoce la diferencia entre comprar con garantía en nuestro taller físico o arriesgarte en mercados de segunda mano sin revisar.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="py-4 px-6 font-semibold">Criterio de Seguridad</th>
                  <th scope="col" className="py-4 px-6 font-bold text-emerald-400 bg-emerald-500/5">
                    Neumáticos David (Ocasión Certificada)
                  </th>
                  <th scope="col" className="py-4 px-6 font-semibold">Desguace o Particular</th>
                  <th scope="col" className="py-4 px-6 font-semibold">Neumático Nuevo Estándar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Ahorro sobre precio nuevo</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-emerald-500/5">
                    Entre 50% y 65% de ahorro
                  </td>
                  <td className="py-4 px-6 text-slate-400">Variable (sin factura)</td>
                  <td className="py-4 px-6 text-slate-400">Precio íntegro (0% ahorro)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Profundidad de dibujo</td>
                  <td className="py-4 px-6 font-semibold text-white bg-emerald-500/5">
                    5,5 mm – 7,2 mm (&gt;80% vida)
                  </td>
                  <td className="py-4 px-6 text-amber-400">Desconocido o al límite</td>
                  <td className="py-4 px-6 text-white">8,0 mm (100% nuevo)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Test de presión y estanqueidad</td>
                  <td className="py-4 px-6 text-emerald-400 font-semibold bg-emerald-500/5">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Probado a 4 bares en máquina
                    </span>
                  </td>
                  <td className="py-4 px-6 text-rose-400">
                    <span className="inline-flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      Sin pruebas previas
                    </span>
                  </td>
                  <td className="py-4 px-6 text-emerald-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Garantía de fábrica
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Montaje y equilibrado incluido</td>
                  <td className="py-4 px-6 font-semibold text-white bg-emerald-500/5">
                    Sí, en el acto en taller
                  </td>
                  <td className="py-4 px-6 text-slate-400">No (requiere buscar taller)</td>
                  <td className="py-4 px-6 text-white">Sí, en nuestro taller</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Garantía por escrito</td>
                  <td className="py-4 px-6 font-bold text-emerald-400 bg-emerald-500/5">
                    Garantía directa con sustitución
                  </td>
                  <td className="py-4 px-6 text-rose-400">Sin garantía</td>
                  <td className="py-4 px-6 text-white">2 años del fabricante</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
              ¿Dudas sobre qué conviene más para tu coche y kilómetros anuales? Te asesoramos sin compromiso.
            </div>
            <button
              onClick={() => onOpenBooking('Neumáticos de Ocasión')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-lime-300 hover:to-emerald-400 transition-colors cursor-pointer shrink-0 shadow-md shadow-emerald-500/20"
            >
              Consultar Stock de Ocasión para mi Coche
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
