import axios from 'axios';
import type {
  CampersResponse,
  CamperDetails,
  Review,
  CamperFilters,
  BookingRequest,
} from '@/types/camper';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const PER_PAGE = 4;

export async function fetchCampers(page: number, filters: CamperFilters): Promise<CampersResponse> {
  const { data } = await api.get<CampersResponse>('/campers', {
    params: { page, perPage: PER_PAGE, ...filters },
  });
  return data;
}

export async function fetchCamperById(id: string): Promise<CamperDetails> {
  const { data } = await api.get<CamperDetails>(`/campers/${id}`);
  return data;
}
export async function fetchReviews(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}
export async function createBooking(id: string, body: BookingRequest): Promise<void> {
  await api.post(`/campers/${id}/booking-requests`, body);
}
