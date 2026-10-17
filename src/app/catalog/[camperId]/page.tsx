import { fetchCamperById } from '@/lib/api/campers';
import type { Metadata } from 'next';

interface DetailsPageProps {
  params: Promise<{ camperId: string }>;
}
export async function generateMetadata({ params }: DetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await fetchCamperById(camperId);
  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description.slice(0, 160),
  };
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { camperId } = await params;
  const camper = await fetchCamperById(camperId);

  return (
    <main>
      <h1>{camper.name}</h1>
      <p>Photos: {camper.gallery.length}</p>
    </main>
  );
}
