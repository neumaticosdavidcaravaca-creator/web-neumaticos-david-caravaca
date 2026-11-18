import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Wrench,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  CalendarClock,
  Droplets,
  Disc3,
  Crosshair,
  BatteryCharging,
  ClipboardCheck,
  Snowflake,
  CircleDot,
  type LucideIcon,
} from 'lucide-react';
import { MECHANICS_SERVICES, WORKSHOP_INFO } from '../data/tallerData';
import { MechanicService } from '../types';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'serv-aceite-filtros': Droplets,
  'serv-frenos': Disc3,
  'serv-alineacion-3d': Crosshair,
  'serv-baterias-diagnosis': BatteryCharging,
  'serv-pre-itv': ClipboardCheck,
  'serv-climatizacion': Snowflake,
  'serv-vulcanizado': CircleDot,
};

interface MechanicsSectionProps {
  onOpenBooking: (serviceTitle: string) => void;
}

export function MechanicsSection({ onOpenBooking }: MechanicsSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<MechanicService | null>(null);

  const updateActiveIndex = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const step = firstCard.offsetWidth + 24; // card width + gap-6 (24px)
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(MECHANICS_SERVICES.length - 1, idx)));
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);
    return () => {
      el.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex]);

  const handleSlide = (direction: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === 'next') {
      if (el.scrollLeft >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft <= 8) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section id="mecanica" className="py-20 lg:py-28 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Diffused apple green glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <span>Mantenimiento Preventivo y Seguridad</span>
              <span aria-hidden="true">·</span>
              <span>10 Años de Experiencia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Mecánica Rápida Profesional en Caravaca
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Operaciones de mantenimiento ágiles y con recambios de primera calidad para que no te quedes sin vehículo. Cuidamos cada detalle técnico cumpliendo las especificaciones del fabricante.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-950/60 text-xs text-slate-400 max-w-sm">
              <span className="font-semibold text-white">Garantía Oficial Conservada:</span> Realiza el mantenimiento de tu coche nuevo en nuestro taller sin perder la garantía oficial según el Reglamento UE 461/2010.
            </div>
          </div>
        </div>

        {/* Highlight Banner with Real Mechanics Photo */}
        <div className="rounded-2xl overflow-hidden bg-slate-950 border border-emerald-950/60 mb-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                <Wrench className="w-3.5 h-3.5" /> Boxes con Elevadores Hidráulicos
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Frenos, Dirección, Aceite y Diagnosis Multimarca
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nuestros mecánicos cuentan con formación continua en sistemas de frenado, suspensión, inyección y tren de rodaje. Trabajamos con marcas líderes como Brembo, Bosch, Castrol, Motul y Mann-Filter.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Presupuesto previo sin compromiso
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Piezas viejas mostradas al cliente
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Reseteo electrónico incluido
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 h-72 lg:h-full min-h-[340px] overflow-hidden bg-slate-900 relative">
              <img
                src={WORKSHOP_INFO.images.mechanicWorking}
                alt="Mecánico trabajando en Neumáticos David Caravaca"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent lg:block hidden pointer-events-none" />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] text-emerald-300 border border-emerald-500/20">
                Foto real en nuestro box de mecánica
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Nuestros Servicios de Mecánica Rápida
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Desliza o utiliza las flechas para explorar los {MECHANICS_SERVICES.length} servicios disponibles
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleSlide('prev')}
              aria-label="Servicio anterior"
              className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-400 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleSlide('next')}
              aria-label="Siguiente servicio"
              className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-400 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Services Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {MECHANICS_SERVICES.map((service) => {
            const ServiceIcon = SERVICE_ICONS[service.id] ?? Wrench;
            return (
              <div
                key={service.id}
                className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 group-hover:bg-gradient-to-br group-hover:from-lime-400 group-hover:to-emerald-500 group-hover:text-slate-950 group-hover:border-transparent flex items-center justify-center shrink-0 transition-all shadow-sm">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        {service.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="tabular-nums">{service.duration}</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                    {service.shortDesc}
                  </p>

                {/* Features checklist */}
                <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-400">Precio estimado</div>
                    <div className="text-lg font-bold text-white font-display">
                      {service.startingPrice}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Ver ficha</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white hover:bg-gradient-to-r hover:from-lime-400 hover:to-emerald-500 hover:text-slate-950 hover:border-transparent transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <span>Pedir Cita</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Slider Pagination Dots & Quick Index */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {MECHANICS_SERVICES.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Ir a ${service.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 bg-gradient-to-r from-lime-400 to-emerald-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-400 tabular-nums">
            {activeIndex + 1} / {MECHANICS_SERVICES.length}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-2xl p-6 sm:p-8 space-y-5 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Cerrar ficha"
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pr-10">
              {(() => {
                const ModalIcon = SERVICE_ICONS[selectedService.id] ?? Wrench;
                return (
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ModalIcon className="w-6 h-6" />
                  </div>
                );
              })()}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                  {selectedService.category} · {selectedService.duration}
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <CalendarClock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">Intervalo recomendado:</span>{' '}
                {selectedService.recommendedInterval}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Qué incluye el servicio:
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">Tarifa orientativa</div>
                <div className="text-2xl font-extrabold text-white font-display">
                  {selectedService.startingPrice}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(title);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservar Cita Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
