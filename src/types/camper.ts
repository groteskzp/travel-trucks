export type CamperForm = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

export type Transmission = 'automatic' | 'manual';
export type Engine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmission;
  engine: Engine;
  amenities: string[];
  coverImage: string;
}

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends Omit<Camper, 'coverImage'> {
  gallery: CamperImage[];
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  transmission?: Transmission;
  engine?: Engine;
}
