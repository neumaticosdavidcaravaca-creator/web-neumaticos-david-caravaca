import { useEffect, useState, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Car,
} from 'lucide-react';
import { WORKSHOP_INFO } from '../data/tallerData';

const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '') as string;

interface ResolvedLocation {
  position: { lat: number; lng: number };
  displayName?: string;
  formattedAddress?: string;
  googleMapsURI?: string;
}

function WorkshopMapViewport() {
  const loadingStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');

  const [resolved, setResolved] = useState<ResolvedLocation | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(true);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleCloseInfo = useCallback(() => {
    setInfoWindowOpen(false);
  }, []);

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.AUTH_FAILURE ||
      loadingStatus === APILoadingStatus.FAILED
    ) {
      setIsSearching(false);
      setLookupError('No se pudo cargar el mapa interactivo de Google Maps en este momento.');
      return;
    }
  }, [loadingStatus]);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function findWorkshopLocation() {
      setIsSearching(true);
      setLookupError(null);

      const queries = [
        'Neumáticos David Caravaca de la Cruz, Murcia',
        'Polígono Industrial Santa Inés, Carretera de Granada, Caravaca de la Cruz, Murcia',
        'Caravaca de la Cruz, Murcia, España',
      ];

      try {
        for (const textQuery of queries) {
          const { places } = await placesLib!.Place.searchByText({
            textQuery,
            fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
            language: 'es',
            region: 'es',
            maxResultCount: 1,
          });

          const first = places?.[0];
          if (first?.location && !cancelled) {
            setResolved({
              position: {
                lat: first.location.lat(),
                lng: first.location.lng(),
              },
              displayName: first.displayName ?? undefined,
              formattedAddress: first.formattedAddress ?? undefined,
              googleMapsURI: first.googleMapsURI ?? undefined,
            });
            setIsSearching(false);
            return;
          }
        }

        if (!cancelled) {
          setLookupError('No se pudo resolver la ubicación exacta en el mapa.');
          setIsSearching(false);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('QuotaExceeded') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (!cancelled) {
          setLookupError('No fue posible conectar con Google Maps para mostrar el mapa.');
          setIsSearching(false);
        }
      }
    }

    void findWorkshopLocation();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  const mapsDestinationUrl = resolved?.googleMapsURI || WORKSHOP_INFO.googleMapsUrl;

  if (
    loadingStatus === APILoadingStatus.AUTH_FAILURE ||
    loadingStatus === APILoadingStatus.FAILED ||
    lookupError
  ) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950/90 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md">
          <div className="text-base font-bold text-white font-display">
            {WORKSHOP_INFO.fullName}
          </div>
          <p className="text-xs text-slate-400">
            {lookupError || 'Mapa temporalmente no disponible.'}
          </p>
          <p className="text-xs text-slate-300 pt-1">
            {WORKSHOP_INFO.address}, {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})
          </p>
        </div>
        <a
          href={mapsDestinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
        >
          <Navigation className="w-4 h-4" />
          <span>Abrir en Google Maps</span>
        </a>
      </div>
    );
  }

  if (isSearching || !resolved) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-950 text-slate-300">
        <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" />
        <span className="text-xs font-medium text-slate-400">
          Cargando mapa interactivo de Caravaca de la Cruz...
        </span>
      </div>
    );
  }

  return (
    <GoogleMap
      defaultCenter={resolved.position}
      defaultZoom={16}
      mapId="DEMO_MAP_ID"
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker
        ref={markerRef}
        position={resolved.position}
        title={resolved.displayName || WORKSHOP_INFO.fullName}
        onClick={() => setInfoWindowOpen((prev) => !prev)}
      >
        <Pin
          background="#22c55e"
          borderColor="#14532d"
          glyphColor="#020617"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoWindowOpen && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={handleCloseInfo}
          maxWidth={290}
        >
          <div className="p-1 text-slate-900 space-y-1.5 font-sans">
            <div className="font-bold text-sm text-slate-950">
              {WORKSHOP_INFO.fullName}
            </div>
            <div className="text-xs text-slate-700 leading-snug">
              {resolved.formattedAddress ||
                `${WORKSHOP_INFO.address}, ${WORKSHOP_INFO.postalCode} ${WORKSHOP_INFO.city}`}
            </div>
            <div className="text-xs font-semibold text-emerald-700">
              Tel: {WORKSHOP_INFO.phoneMobile}
            </div>
            <a
              href={mapsDestinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline pt-0.5"
            >
              <span>Cómo llegar en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

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
          <p className="mt-3 text-base text-slate-300">
            Fácil acceso por la Carretera de Granada con amplia zona de aparcamiento en la puerta para que puedas entrar directamente al box sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Location Details & Directions Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mapa Interactivo · Murcia</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {WORKSHOP_INFO.fullName}
                </h3>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {WORKSHOP_INFO.address}
                  <br />
                  {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Acceso directo desde la <strong className="text-white">RM-730 / Ctra. de Granada</strong>, a pocos minutos de Cehegín, Moratalla y Bullas.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">Horario del Taller</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      Lunes a Viernes: 09:00 – 14:00 / 15:30 – 19:00
                    </div>
                    <div className="text-slate-400 text-xs">
                      Sábados: 09:00 – 13:00
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={WORKSHOP_INFO.phoneCallUrl}
                    className="text-white hover:text-emerald-400 font-bold transition-colors"
                  >
                    {WORKSHOP_INFO.phoneMobile}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/80">
              <a
                href={WORKSHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo Llegar (GPS)</span>
              </a>
              <a
                href={WORKSHOP_INFO.phoneCallUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-white font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Llamar</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Google Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-emerald-950/60 shadow-2xl bg-slate-950 h-[400px] sm:h-[460px] w-full relative">
            {GOOGLE_MAPS_API_KEY ? (
              <APIProvider
                apiKey={GOOGLE_MAPS_API_KEY}
                language="es"
                region="ES"
                libraries={['marker', 'places']}
              >
                <WorkshopMapViewport />
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md">
                  <div className="text-base font-bold text-white font-display">
                    {WORKSHOP_INFO.fullName}
                  </div>
                  <p className="text-xs text-slate-400">
                    {WORKSHOP_INFO.address}, {WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})
                  </p>
                </div>
                <a
                  href={WORKSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ver Ubicación en Google Maps</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
