import { useState, useRef, useEffect, useCallback } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/tallerData';

export function ReviewsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateActiveIndex = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const step = firstCard.offsetWidth + 24;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(CUSTOMER_REVIEWS.length - 1, idx)));
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

  const handleSlide = useCallback((direction: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (maxScroll <= 0) return;

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
  }, []);

  // Auto-advance horizontal carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      handleSlide('next');
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isPaused, handleSlide]);

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(index * step, maxScroll), behavior: 'smooth' });
  };

  return (
    <section id="opiniones" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Diffused apple green ambient glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <span>Opiniones Reales</span>
              <span aria-hidden="true">·</span>
              <span>Conductores de Caravaca y Comarca</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              La confianza de miles de conductores en la Región de Murcia
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-950/60 flex items-center gap-4 shadow-lg">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-display tabular-nums">
                4.9
              </div>
              <div className="text-xs">
                <div className="flex items-center text-emerald-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <div className="text-slate-400">
                  Valoración media en Google Reseñas
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSlide('prev')}
                aria-label="Opinión anterior"
                className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide('next')}
                aria-label="Siguiente opinión"
                className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Auto-sliding Reviews Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-6 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars & date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-emerald-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author & Service info */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <span title="Cliente verificado" className="inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {review.location} <span aria-hidden="true">·</span> {review.car}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">
                    Servicio: {review.service}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots & Counter */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {CUSTOMER_REVIEWS.map((review, idx) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Ver opinión de ${review.author}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'w-7 bg-gradient-to-r from-lime-400 to-emerald-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-slate-400 tabular-nums">
              {activeIndex + 1} / {CUSTOMER_REVIEWS.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
