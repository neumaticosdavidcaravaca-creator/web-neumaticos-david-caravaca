import { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MessageSquare, MapPin } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenBooking: (servicePreset?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Neumáticos', href: '#neumaticos' },
    { label: 'Ocasión Garantizada', href: '#ocasion' },
    { label: 'Mecánica Rápida', href: '#mecanica' },
    { label: 'El Taller', href: '#taller' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-emerald-950/40 shadow-lg shadow-black/40 py-3'
            : 'bg-gradient-to-b from-slate-950/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Official Brand Logo */}
            <a
              href="#"
              className="flex items-center group whitespace-nowrap shrink-0 text-decoration-none"
            >
              <BrandLogo className="h-10 sm:h-11 w-auto group-hover:scale-[1.03] transition-transform duration-200" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 relative py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action CTA & Quick Contact */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={WORKSHOP_INFO.phoneCallUrl}
                className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors"
                title="Llamar al taller"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{WORKSHOP_INFO.phoneLandline}</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 rounded-lg hover:from-lime-300 hover:to-emerald-400 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-98 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Pedir Cita Previa</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg"
              >
                Cita
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Navegación
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{WORKSHOP_INFO.address}, Caravaca</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={WORKSHOP_INFO.phoneCallUrl}
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-900 border border-slate-700 text-sm font-medium text-white"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Llamar
              </a>
              <a
                href={WORKSHOP_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-sm font-medium text-emerald-400"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 text-slate-950 font-bold text-center text-sm shadow-lg shadow-emerald-500/20"
            >
              Pedir Cita Online
            </button>
          </div>
        </div>
      )}
    </>
  );
}
