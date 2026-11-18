import { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

export function WorkshopGallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const galleryItems = WORKSHOP_INFO.gallery || [];

  const handleNext = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % galleryItems.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Diffused apple green ambient glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-lime-500/10 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Galería de Instalaciones Reales</span>
            <span aria-hidden="true">·</span>
            <span>Caravaca de la Cruz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Conoce Nuestro Taller por Dentro
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Fotografías directas de nuestras instalaciones: zona de alineación 3D, boxes con elevadores hidráulicos, amplio almacén de neumáticos clasificados y sala de espera climatizada.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhotoIdx(idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-emerald-500 text-slate-950 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="p-4 bg-slate-950 border-t border-slate-800/80">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActivePhotoIdx(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-slate-900/80 text-white hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-slate-900/80 text-white hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 transition-colors"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={galleryItems[activePhotoIdx].src}
              alt={galleryItems[activePhotoIdx].title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl border border-emerald-950/60"
            />
            <div className="mt-4 text-center">
              <div className="text-base font-bold text-white">
                {galleryItems[activePhotoIdx].title}
              </div>
              <div className="text-xs text-emerald-400 mt-1">
                {galleryItems[activePhotoIdx].subtitle} · Neumáticos David Caravaca
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
