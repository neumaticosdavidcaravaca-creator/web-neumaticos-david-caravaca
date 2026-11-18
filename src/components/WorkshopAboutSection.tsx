import { CheckCircle2, MapPin, Award, Users, Shield, Clock, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

export function WorkshopAboutSection() {
  const commitments = [
    {
      title: 'Transparencia de Presupuesto',
      desc: 'Antes de tocar un solo tornillo, te explicamos el trabajo a realizar y el precio final cerrado sin sorpresas.',
    },
    {
      title: 'Respeto a tus Llantas',
      desc: 'Maquinaria de desmontaje con protecciones de polímero que garantizan cero arañazos en llantas de aleación.',
    },
    {
      title: 'Rapidez sin Compromiso',
      desc: 'Optimizamos tiempos para que no pierdas tu día de trabajo. La mayoría de cambios de neumáticos listos en 30 minutos.',
    },
    {
      title: 'Atención Humana y Cercana',
      desc: 'Somos un taller independiente de Caravaca. Te atendemos con nombre y apellidos, aconsejando lo mejor para tu bolsillo.',
    },
  ];

  return (
    <section id="taller" className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      {/* Diffused apple green ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Real reception & customer area photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-950/60 shadow-2xl bg-slate-900 group">
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src={WORKSHOP_INFO.images.reception}
                  alt="Instalaciones y sala de espera clientes de Neumáticos David en Caravaca de la Cruz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Tag below image */}
              <div className="p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Instalaciones en Caravaca
                  </div>
                  <div className="text-sm font-bold text-white">
                    Recepción y sala de espera climatizada
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Noroeste Murciano</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story and Philosophy */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Nuestra Historia y Filosofía</span>
              <span aria-hidden="true">·</span>
              <span>10 Años de Confianza</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Cuidamos tu vehículo como si fuera el nuestro.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              En <strong className="text-white">Neumáticos David - Caravaca</strong>, llevamos una década ofreciendo servicios especializados en neumáticos y mecánica rápida. Nuestra experiencia y compromiso con la calidad nos han convertido en el taller de referencia para miles de conductores en la comarca del Noroeste y toda la región de Murcia.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Desde nuestros inicios, hemos mantenido un enfoque claro: ofrecer productos de primera calidad, tanto en neumáticos nuevos como de ocasión garantizados, combinado con un servicio profesional, rápido y a precios competitivos.
            </p>

            {/* Commitments 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {commitments.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
                  <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{c.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Location highlight badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Fácil acceso y aparcamiento en <strong className="text-slate-300">Caravaca de la Cruz</strong> (Murcia), muy cerca de Cehegín, Moratalla y Bullas.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
