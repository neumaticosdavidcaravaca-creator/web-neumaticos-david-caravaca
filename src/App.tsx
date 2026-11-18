import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TyreSearchSection } from './components/TyreSearchSection';
import { OccasionGuaranteeSection } from './components/OccasionGuaranteeSection';
import { MechanicsSection } from './components/MechanicsSection';
import { WorkshopAboutSection } from './components/WorkshopAboutSection';
import { WorkshopGallerySection } from './components/WorkshopGallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { WorkshopMapSection } from './components/WorkshopMapSection';
import { BookingContactSection } from './components/BookingContactSection';
import { Footer } from './components/Footer';
import { FloatingEmergencyBar } from './components/FloatingEmergencyBar';
import { LegalPage, LegalDocType } from './components/LegalPage';
import { TyreItem } from './types';

function getLegalPageFromUrl(): LegalDocType | null {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('pagina');
  if (page === 'eliminacion-datos' || page === 'aviso-legal' || page === 'politica-privacidad') {
    return page;
  }
  return null;
}

export default function App() {
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(() => getLegalPageFromUrl());
  const [preselectedService, setPreselectedService] = useState<string>('Neumáticos Nuevos');
  const [preselectedTyre, setPreselectedTyre] = useState<TyreItem | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setLegalDoc(getLegalPageFromUrl());
    };
    const handleQuotaExceeded = () => {
      setMapsQuotaExceeded(true);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const handleSwitchLegalDoc = (doc: LegalDocType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('pagina', doc);
    window.history.pushState({}, '', url.toString());
    setLegalDoc(doc);
  };

  const handleBackHome = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('pagina');
    window.history.pushState({}, '', url.pathname + url.hash);
    document.title = 'Neumáticos David Caravaca | Neumáticos y Mecánica Rápida en Murcia';
    setLegalDoc(null);
  };

  const quotaBanner = mapsQuotaExceeded ? (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
      <span>
        Google Maps Platform quota reached. If you are the app owner, visit{' '}
        <a
          href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-amber-950 hover:text-amber-800"
        >
          maps developer site
        </a>{' '}
        for instructions to update your account.
      </span>
    </div>
  ) : null;

  if (legalDoc) {
    return (
      <>
        {quotaBanner}
        <LegalPage
          docType={legalDoc}
          onSwitchDoc={handleSwitchLegalDoc}
          onBackHome={handleBackHome}
        />
      </>
    );
  }

  const handleOpenBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTyreForBooking = (tyre: TyreItem) => {
    setPreselectedTyre(tyre);
    setPreselectedService(tyre.condition === 'ocasion' ? 'Neumáticos de Ocasión' : 'Neumáticos Nuevos');
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSearch = () => {
    const searchElem = document.getElementById('neumaticos');
    if (searchElem) {
      searchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreselectedTyre = () => {
    setPreselectedTyre(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {quotaBanner}
      {/* Top Bar Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Real Workshop Visual Anchor */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToSearch={handleScrollToSearch}
        />

        {/* 2. Warehouse Stock & Availability Banner */}
        <TyreSearchSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Occasion Guarantee & 5-Point Quality Inspection */}
        <OccasionGuaranteeSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. Quick Mechanics Professional Services with Real Technician Photo */}
        <MechanicsSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. About Workshop, Equipment & Philosophy with Real Reception Photo */}
        <WorkshopAboutSection />

        {/* 6. Interactive Workshop Gallery with Real Photos */}
        <WorkshopGallerySection />

        {/* 7. Customer Reviews & Local Social Proof */}
        <ReviewsSection />

        {/* 8. Common FAQs */}
        <FAQSection />

        {/* 9. Interactive Google Maps Location Section */}
        <WorkshopMapSection />

        {/* 10. Web3Forms Appointment & Contact Form + Direct Info */}
        <BookingContactSection
          preselectedService={preselectedService}
          preselectedTyre={preselectedTyre}
          onClearPreselectedTyre={handleClearPreselectedTyre}
        />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Discreet Floating Emergency Contact Action */}
      <FloatingEmergencyBar />
    </div>
  );
}
