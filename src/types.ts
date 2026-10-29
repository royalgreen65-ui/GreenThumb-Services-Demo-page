export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceCategory: string;
  propertyType: string;
  lotSize: string;
  timing: string;
  notes: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  startingPrice: string;
  billingType: string;
  features: string[];
  bestFor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  neighborhood: string;
  serviceReceived: string;
  rating: number;
  date: string;
  quote: string;
  outcome: string;
}

export interface NeighborhoodItem {
  name: string;
  zip: string;
  routeDays: string;
  status: 'active' | 'limited';
}
