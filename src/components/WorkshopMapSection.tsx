import React from 'react';
import { MapPin, Navigation, Clock, Phone, Car } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

export function WorkshopMapSection() {
  return (
    <section
      id="ubicacion"
      className="py-20 lg:py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Diffused apple green ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-lime-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Ubicación en Caravaca de la Cruz</span>
            <span aria-hidden="true">·</span>
            <span>Polígono Industrial Santa Inés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Cómo Llegar a Nuestro Taller
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Fácil acceso por la Carretera de Granada con amplia zona de aparcamiento en la puerta para que puedas entrar directamente al box sin complicaciones.
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tarjeta Izquierda */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
                <MapPin className="w-3.5 h-3.5" />
                <span>MAPA INTERACTIVO · MURCIA</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                {WORKSHOP_INFO.fullName}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {WORKSHOP_INFO.address}
                <br />
                {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})
              </p>

              <div className="space-y-4 border-t border-slate-800/80 pt-6">
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Acceso directo desde la RM-730 / Ctra. de Granada</strong>, a pocos minutos de Cehegín, Moratalla y Bullas.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <p className="font-semibold text-white">Horario del Taller</p>
                    <p>Lunes a Viernes: 09:00 - 14:00 / 15:30 - 19:00</p>
                    <p>Sábados: 09:00 - 13:00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <a
                    href={`tel:${WORKSHOP_INFO.phoneMobile.replace(/\s+/g, '')}`}
                    className="text-white font-bold hover:text-emerald-400 transition-colors"
                  >
                    {WORKSHOP_INFO.phoneMobile}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-800/80">
              <a
                href={WORKSHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo Llegar (GPS)</span>
              </a>
              <a
                href={`tel:${WORKSHOP_INFO.phoneMobile.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar</span>
              </a>
            </div>
          </div>

          {/* Tarjeta Derecha: Mapa Real Interactivo */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden min-h-[380px] shadow-xl">
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.5522325251422!2d-1.9013733355460964!3d38.05119068740924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd65ac063cb6f04d%3A0x5e01d209fc1a72c7!2sNeum%C3%A1ticos%20David%20Caravaca!5e1!3m2!1ses!2ses!4v1795019458738!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin">
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Neumáticos David Caravaca"
          </div>
        </div>
      </div>
    </section>
  );
}
