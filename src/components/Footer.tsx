import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-emerald-950/40 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-block group">
              <BrandLogo className="h-14 sm:h-16 w-auto group-hover:scale-[1.02] transition-transform duration-200" />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Especialistas en venta y montaje de neumáticos nuevos y de ocasión garantizados y mecánica rápida profesional. Cuidamos tu vehículo como si fuera el nuestro desde hace más de una década en Murcia.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía profesional y gestión SIGAUS / Signus</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navegación
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#neumaticos" className="hover:text-emerald-400 transition-colors">
                  Stock de Neumáticos
                </a>
              </li>
              <li>
                <a href="#ocasion" className="hover:text-emerald-400 transition-colors">
                  Ocasión Garantizada
                </a>
              </li>
              <li>
                <a href="#mecanica" className="hover:text-emerald-400 transition-colors">
                  Mecánica Rápida
                </a>
              </li>
              <li>
                <a href="#taller" className="hover:text-emerald-400 transition-colors">
                  El Taller & Equipo
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-emerald-400 transition-colors">
                  Galería de Fotos Reales
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-emerald-400 transition-colors">
                  Opiniones de Clientes
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-emerald-400 transition-colors">
                  Pedir Cita Online
                </a>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Servicios Destacados
            </div>
            <ul className="space-y-2 text-xs">
              <li>Neumáticos Nuevos (Michelin, Conti, Pirelli...)</li>
              <li>Neumáticos de Ocasión al &gt;80% vida</li>
              <li>Alineación y Paralelo 3D Computarizado</li>
              <li>Cambio de Aceite 100% Sintético y Filtros</li>
              <li>Pastillas y Discos de Freno</li>
              <li>Revisión Integral Pre-ITV</li>
              <li>Reparación de Pinchazos tipo Seta</li>
            </ul>
          </div>

          {/* Contact and schedule */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Contacto y Horario
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{WORKSHOP_INFO.address}, 30400 Caravaca de la Cruz (Murcia)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={WORKSHOP_INFO.phoneCallUrl} className="hover:text-white font-bold">
                  {WORKSHOP_INFO.phoneMobile}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${WORKSHOP_INFO.email}`} className="hover:text-white">
                  {WORKSHOP_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-slate-400">
                <div className="font-semibold text-white">Lunes a Viernes:</div>
                <div>09:00 – 14:00 / 15:30 – 19:00</div>
                <div className="font-semibold text-white mt-1">Sábados:</div>
                <div>09:00 – 13:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Neumáticos David - Caravaca. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href="?pagina=eliminacion-datos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors"
            >
              Eliminación de Datos
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="?pagina=aviso-legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors"
            >
              Aviso Legal
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="?pagina=politica-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors"
            >
              Política de Privacidad
            </a>
            <span aria-hidden="true">·</span>
            <span>Caravaca de la Cruz (Región de Murcia)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
