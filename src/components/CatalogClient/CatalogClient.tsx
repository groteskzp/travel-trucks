'use client';

import { useState } from 'react';
import css from './CatalogClient.module.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/campers';
import type { CamperFilters } from '@/types/camper';
import Filters from '@/components/Filters/Filters';

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

  const renderList = () => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong</p>;
    if (campers.length === 0) return <p>No campers found</p>;

    return (
      <>
        {campers.map((camper) => (
          <p key={camper.id}>{camper.name}</p>
        ))}
        {hasNextPage && (
          <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
      </>
    );
  };
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>
        <Filters onSearch={setFilters} />
      </aside>
      <section className={css.catalog}>{renderList()}</section>
    </div>
  );
}
