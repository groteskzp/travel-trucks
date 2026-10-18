import type { Metadata } from 'next';
import css from './page.module.css';
import { fetchCamperById, fetchReviews } from '@/lib/api/campers';
import Gallery from '@/components/Gallery/Gallery';
import Image from 'next/image';
import VehicleDetails from '@/components/VehicleDetails/VehicleDetails';
import Reviews from '@/components/Reviews/Reviews';
import BookingForm from '@/components/BookingForm/BookingForm';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import axios from 'axios';

interface DetailsPageProps {
  params: Promise<{ camperId: string }>;
}

const getCamper = cache(async (id: string) => {
  try {
    return await fetchCamperById(id);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
});

export async function generateMetadata({ params }: DetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamper(camperId);
  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description.slice(0, 160),
  };
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { camperId } = await params;

  const [camper, reviews] = await Promise.all([
    getCamper(camperId),
    fetchReviews(camperId).catch(() => []),
  ]);
  return (
    <main className={css.page}>
      <section className={css.top}>
        <div className={css.gallery}>
          <Gallery images={camper.gallery} name={camper.name} />
        </div>
        <div className={css.info}>
          <div className={css.summary}>
            <div className={css.header}>
              <h1 className={css.title}>{camper.name}</h1>

              <div className={css.meta}>
                <span className={css.metaItem}>
                  <Image src="/icons/star.svg" alt="" width={16} height={16} />
                  {camper.rating}({camper.totalReviews} Reviews)
                </span>
                <span className={css.metaItem}>
                  <Image src="/icons/map-dark.svg" alt="" width={16} height={16} />
                  {camper.location}
                </span>
              </div>

              <p className={`${css.title} ${css.price}`}>€{camper.price}</p>
            </div>

            <p className={css.description}>{camper.description}</p>
          </div>
          <VehicleDetails camper={camper} />
        </div>
      </section>

      <section className={css.bottom}>
        <div className={css.reviews}>
          <Reviews reviews={reviews} />
        </div>
        <div className={css.booking}>
          <BookingForm camperId={camperId} />
        </div>
      </section>
    </main>
  );
}
