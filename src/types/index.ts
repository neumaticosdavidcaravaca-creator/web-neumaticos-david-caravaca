export type TyreCondition = 'todos' | 'nuevo' | 'ocasion';
export type TyreSeason = 'todos' | 'summer' | 'allseason' | 'winter';
export type VehicleType = 'todos' | 'turismo' | 'suv' | 'furgoneta';

export interface TyreItem {
  id: string;
  brand: string;
  model: string;
  width: number;       // e.g. 205
  profile: number;     // e.g. 55
  rim: number;         // e.g. 16
  loadSpeed: string;   // e.g. "91V"
  condition: 'nuevo' | 'ocasion';
  season: 'summer' | 'allseason' | 'winter';
  vehicleType: 'turismo' | 'suv' | 'furgoneta';
  price: number;       // Price per unit including VAT & eco-rate
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  treadDepthMm: number; // e.g. 8.0 for new, 6.5 - 7.0 for certified occasion
  fuelEfficiency: 'A' | 'B' | 'C' | 'D' | 'E';
  wetGrip: 'A' | 'B' | 'C' | 'D' | 'E';
  noiseDb: number;
  featured?: boolean;
  warrantyMonths: number;
  description: string;
}

export interface MechanicService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  startingPrice: string;
  category: 'mantenimiento' | 'seguridad' | 'diagnostico' | 'confort';
  features: string[];
  recommendedInterval: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  car: string;
  rating: number;
  date: string;
  service: string;
  text: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  licensePlate: string;
  serviceType: string;
  tyreDimension: string;
  tyreQuantity: number;
  preferredDate: string;
  preferredTime: string;
  comments: string;
}
