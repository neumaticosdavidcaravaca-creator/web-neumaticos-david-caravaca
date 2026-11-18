import { Phone, MessageSquare } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

export function FloatingEmergencyBar() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5">
      {/* Call button */}
      <a
        href={WORKSHOP_INFO.phoneMobileCallUrl}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:border-emerald-500/50 shadow-xl backdrop-blur-md hover:bg-slate-800 text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
        title="Llamar al taller"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">Llamar: {WORKSHOP_INFO.phoneMobile}</span>
        <span className="sm:hidden">Llamar</span>
      </a>

      {/* WhatsApp button with apple green gradient glow */}
      <a
        href={WORKSHOP_INFO.whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-600/30 hover:from-emerald-400 hover:to-green-500 text-xs font-bold transition-transform hover:scale-105 active:scale-95"
        title="Chatear por WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
