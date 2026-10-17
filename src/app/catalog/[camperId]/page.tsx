import { fetchCamperById } from '@/lib/api/campers';


interface DetailsPageProps {
  params: Promise<{ camperId: string }>; 
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
