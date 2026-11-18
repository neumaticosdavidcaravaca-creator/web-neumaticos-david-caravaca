import { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, Car, Wrench, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO, POPULAR_TYRE_SIZES } from '../data/tallerData';
import { BookingFormData, TyreItem } from '../types';

interface BookingContactSectionProps {
  preselectedService?: string;
  preselectedTyre?: TyreItem | null;
  onClearPreselectedTyre?: () => void;
}

export function BookingContactSection({
  preselectedService,
  preselectedTyre,
  onClearPreselectedTyre,
}: BookingContactSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    licensePlate: '',
    serviceType: preselectedService || 'Neumáticos Nuevos',
    tyreDimension: preselectedTyre ? `${preselectedTyre.width}/${preselectedTyre.profile} R${preselectedTyre.rim} (${preselectedTyre.brand} ${preselectedTyre.condition === 'ocasion' ? 'Ocasión' : 'Nuevo'})` : '',
    tyreQuantity: 2,
    preferredDate: '',
    preferredTime: 'Mañana (09:00 - 11:30)',
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Sync when prop updates
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedTyre) {
      setFormData((prev) => ({
        ...prev,
        serviceType: preselectedTyre.condition === 'ocasion' ? 'Neumáticos de Ocasión' : 'Neumáticos Nuevos',
        tyreDimension: `${preselectedTyre.width}/${preselectedTyre.profile} R${preselectedTyre.rim} - ${preselectedTyre.brand} ${preselectedTyre.model} (${preselectedTyre.price}€/ud)`,
      }));
    }
  }, [preselectedTyre]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validation
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setSubmitError('Por favor introduce tu nombre y un teléfono de contacto.');
      setIsSubmitting(false);
      return;
    }

    try {
      const code = 'CAR-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);

      const trimmedEmail = formData.email.trim();

      // Web3Forms submission (configurado para neumaticosdavidcaravaca@gmail.com)
      const payload: Record<string, string | boolean> = {
        access_key: WORKSHOP_INFO.web3FormsKey,
        subject: `Nueva Cita Taller [${code}] - ${formData.fullName.trim()} (${formData.serviceType})`,
        from_name: 'Web Neumáticos David Caravaca',
        botcheck: false,
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        ...(trimmedEmail ? { email: trimmedEmail, replyto: trimmedEmail } : { correo_cliente: 'No proporcionado' }),
        vehicle: formData.licensePlate.trim() || 'No especificado',
        service: formData.serviceType,
        tyre_details: formData.tyreDimension.trim()
          ? `${formData.tyreDimension.trim()} (Cantidad: ${formData.tyreQuantity})`
          : 'No especificado',
        preferred_date: formData.preferredDate || 'Lo antes posible',
        preferred_time: formData.preferredTime,
        message: formData.comments.trim() || 'Sin comentarios adicionales.',
        confirmation_code: code,
        destinatario: WORKSHOP_INFO.email,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmitSuccess(true);
      } else {
        console.warn('Web3Forms error:', json);
        setSubmitError(
          json?.message ||
            `No se pudo enviar automáticamente. Por favor, envíanos tu solicitud directamente a ${WORKSHOP_INFO.email} o por WhatsApp.`
        );
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(
        `Error de conexión al enviar el formulario. Puedes enviarnos tu cita directamente a ${WORKSHOP_INFO.email} o por WhatsApp.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      licensePlate: '',
      serviceType: 'Neumáticos Nuevos',
      tyreDimension: '',
      tyreQuantity: 2,
      preferredDate: '',
      preferredTime: 'Mañana (09:00 - 11:30)',
      comments: '',
    });
    if (onClearPreselectedTyre) {
      onClearPreselectedTyre();
    }
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      {/* Diffused apple green ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <span>Atención Directa y Cita Previa</span>
            <span aria-hidden="true">·</span>
            <span>Respuesta en menos de 2 horas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Reserva tu Cita o Solicita Presupuesto
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Envíanos tus datos o la medida de neumático que necesitas. Nos pondremos en contacto contigo para confirmar día y hora o asesorarte sobre la mejor opción.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
              {submitSuccess ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-lime-400 mb-1">
                      Código de Referencia: {confirmationCode}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      ¡Solicitud Recibida Correctamente!
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Hemos recibido tu petición en <strong className="text-white">Neumáticos David Caravaca</strong>. Te llamaremos al <strong className="text-emerald-400">{formData.phone}</strong> para confirmar tu cita y tener las piezas preparadas.
                    </p>
                  </div>

                  {/* Summary ticket */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Cliente:</span>
                      <span className="font-semibold text-white">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Servicio solicitado:</span>
                      <span className="font-semibold text-emerald-400">{formData.serviceType}</span>
                    </div>
                    {formData.tyreDimension && (
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Neumático:</span>
                        <span className="font-semibold text-white">{formData.tyreDimension} (x{formData.tyreQuantity})</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Preferencia:</span>
                      <span className="font-semibold text-white">{formData.preferredDate || 'Lo antes posible'} ({formData.preferredTime})</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Destino:</span>
                      <span className="font-mono text-slate-300">neumaticosdavidcaravaca@gmail.com</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/${WORKSHOP_INFO.whatsappNumber}?text=Hola%20Neum%C3%A1ticos%20David,%20acabo%20de%20enviar%20la%20solicitud%20${confirmationCode}%20a%20nombre%20de%20${encodeURIComponent(formData.fullName)}.%20Quisiera%20confirmar%20cita.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirmar por WhatsApp Inmediato</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-sm font-medium transition-colors cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {preselectedTyre && (
                    <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                      <div>
                        Has seleccionado:{' '}
                        <strong className="text-white">
                          {preselectedTyre.brand} {preselectedTyre.width}/{preselectedTyre.profile} R{preselectedTyre.rim} ({preselectedTyre.price}€/ud)
                        </strong>
                      </div>
                      {onClearPreselectedTyre && (
                        <button
                          type="button"
                          onClick={onClearPreselectedTyre}
                          className="text-lime-400 hover:text-white underline cursor-pointer ml-2"
                        >
                          Cambiar
                        </button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="booking-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Nombre y Apellidos *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ej. Juan García Martínez"
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="booking-phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Teléfono de Contacto *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 656 89 04 63"
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="booking-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Correo Electrónico (Opcional)
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tunombre@ejemplo.com"
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    {/* License Plate / Vehicle */}
                    <div>
                      <label htmlFor="booking-vehicle" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Matrícula o Modelo de Vehículo
                      </label>
                      <input
                        id="booking-vehicle"
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        placeholder="Ej. 1234 KST o Seat León 2.0"
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Type */}
                    <div>
                      <label htmlFor="booking-service" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Servicio Solicitado
                      </label>
                      <select
                        id="booking-service"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value="Neumáticos Nuevos">Neumáticos Nuevos</option>
                        <option value="Neumáticos de Ocasión">Neumáticos de Ocasión Garantizados</option>
                        <option value="Alineación 3D y Paralelo">Alineación 3D y Paralelo</option>
                        <option value="Cambio de Aceite y Filtros">Cambio de Aceite y Filtros</option>
                        <option value="Pastillas y Discos de Freno">Pastillas y Discos de Freno</option>
                        <option value="Revisión Integral Pre-ITV">Revisión Integral Pre-ITV</option>
                        <option value="Batería y Diagnosis">Batería y Diagnosis Electrónica</option>
                        <option value="Reparación de Pinchazo">Reparación de Pinchazo / Urgencia</option>
                        <option value="Presupuesto General">Presupuesto General / Consulta</option>
                      </select>
                    </div>

                    {/* Quantity of tyres (if relevant) */}
                    <div>
                      <label htmlFor="booking-quantity" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Nº de Ruedas (si aplica)
                      </label>
                      <select
                        id="booking-quantity"
                        name="tyreQuantity"
                        value={formData.tyreQuantity}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value={2}>2 Ruedas (Eje delantero o trasero)</option>
                        <option value={4}>4 Ruedas (Juego completo)</option>
                        <option value={1}>1 Rueda (Rueda de repuesto / pinchazo)</option>
                        <option value={0}>Solo mecánica / No aplica neumáticos</option>
                      </select>
                    </div>
                  </div>

                  {/* Dimensions / Tyre specifics */}
                  <div>
                    <label htmlFor="booking-dimension" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Medida de Neumático (ej. 205/55 R16 91V)
                    </label>
                    <input
                      id="booking-dimension"
                      type="text"
                      name="tyreDimension"
                      value={formData.tyreDimension}
                      onChange={handleChange}
                      placeholder="Si la conoces, indícala aquí (figura en tu rueda o en la ficha técnica)"
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="booking-date" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Fecha Preferida
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="booking-time" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Franja Horaria Preferida
                      </label>
                      <select
                        id="booking-time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value="Mañana (09:00 - 11:30)">Mañana (09:00 - 11:30)</option>
                        <option value="Mediodía (11:30 - 14:00)">Mediodía (11:30 - 14:00)</option>
                        <option value="Tarde temprana (15:30 - 17:30)">Tarde temprana (15:30 - 17:30)</option>
                        <option value="Tarde (17:30 - 19:00)">Tarde (17:30 - 19:00)</option>
                        <option value="Sábado Mañana (09:00 - 13:00)">Sábado Mañana (09:00 - 13:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Comments / Details */}
                  <div>
                    <label htmlFor="booking-comments" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Observaciones o Síntomas del Coche
                    </label>
                    <textarea
                      id="booking-comments"
                      name="comments"
                      rows={3}
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Indícanos si tienes vibraciones en volante, ruido al frenar, o si necesitas que te revisemos algo específico..."
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                        <span>{submitError}</span>
                      </div>
                      <div className="pl-6">
                        <a
                          href={`mailto:${WORKSHOP_INFO.email}?subject=${encodeURIComponent(
                            `Solicitud de Cita - ${formData.fullName} (${formData.serviceType})`
                          )}&body=${encodeURIComponent(
                            `Nombre: ${formData.fullName}\nTeléfono: ${formData.phone}\nEmail: ${formData.email || 'No proporcionado'}\nVehículo: ${formData.licensePlate || 'No especificado'}\nServicio: ${formData.serviceType}\nMedida: ${formData.tyreDimension || 'N/A'} (Cantidad: ${formData.tyreQuantity})\nFecha/Franja: ${formData.preferredDate || 'Lo antes posible'} - ${formData.preferredTime}\nComentarios: ${formData.comments || '-'}`
                          )}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Enviar por correo a {WORKSHOP_INFO.email}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-lime-400 via-emerald-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Enviando al Taller...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Petición de Cita y Presupuesto</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-400 text-center">
                    Las solicitudes llegan directamente a{' '}
                    <span className="text-slate-200 font-medium">{WORKSHOP_INFO.email}</span>. Consulta nuestra{' '}
                    <a
                      href="?pagina=politica-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Workshop Direct Info, Hours & Location */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                Información del Taller
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Dirección en Caravaca</div>
                    <div className="text-slate-400 text-xs mt-0.5">{WORKSHOP_INFO.address}</div>
                    <div className="text-slate-400 text-xs">{WORKSHOP_INFO.postalCode} {WORKSHOP_INFO.city} ({WORKSHOP_INFO.region})</div>
                    <a
                      href={WORKSHOP_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mt-1"
                    >
                      <span>Abrir en Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Telephones */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Teléfono de Atención</div>
                    <div className="mt-1 text-xs">
                      <a href={WORKSHOP_INFO.phoneCallUrl} className="text-slate-300 hover:text-emerald-400 font-bold text-sm">
                        {WORKSHOP_INFO.phoneMobile}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Correo Electrónico</div>
                    <a href={`mailto:${WORKSHOP_INFO.email}`} className="text-xs text-slate-400 hover:text-white break-all">
                      {WORKSHOP_INFO.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">WhatsApp Directo</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Para consultas rápidas de medidas y disponibilidad
                    </div>
                    <a
                      href={WORKSHOP_INFO.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mt-1"
                    >
                      <span>Abrir chat de WhatsApp ({WORKSHOP_INFO.phoneMobile})</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400 mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  Horario de Apertura
                </div>
                <div className="space-y-2 text-xs">
                  {WORKSHOP_INFO.openingHours.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/40">
                      <span className="text-slate-400">{item.days}:</span>
                      <span className="font-semibold text-white tabular-nums">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick emergency notice */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-slate-300 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>¿Pinchazo en carretera o urgencia en Caravaca?</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                No necesitas cita previa para emergencias o reparaciones de pinchazos. Acércate directamente a nuestras instalaciones o llámanos al <a href={WORKSHOP_INFO.phoneMobileCallUrl} className="text-white font-bold underline">{WORKSHOP_INFO.phoneMobile}</a> para atenderte al instante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
