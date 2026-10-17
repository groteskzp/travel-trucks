import type { Metadata } from 'next';
import CatalogClient from '@/components/CatalogClient/CatalogClient';

export const metadata: Metadata = { title: 'Catalog | TravelTrucks' };

export default function CatalogPage() {
  return (
    <main>
      <CatalogClient />
    </main>
  );
}
