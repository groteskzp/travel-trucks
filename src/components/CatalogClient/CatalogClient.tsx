'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/campers';
import type { CamperFilters } from '@/types/camper';

export default function CatalogClient() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['campers', filters],
      queryFn: ({ pageParam }) => fetchCampers(pageParam, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      {campers.map((camper) => (
        <p key={camper.id}>{camper.name}</p>
      ))}

      {hasNextPage && (
        <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
