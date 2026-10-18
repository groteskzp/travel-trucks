'use client';

import { useState } from 'react';
import css from './CatalogClient.module.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/campers';
import type { CamperFilters } from '@/types/camper';
import Filters from '@/components/Filters/Filters';
import CamperCard from '../CamperCard/CamperCard';
import Loader from '../Loader/Loader';

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
    if (isLoading) return <Loader />;
    if (isError) return <p>Something went wrong</p>;
    if (campers.length === 0) return <p>No campers found</p>;

    return (
      <>
        <ul className={css.list}>
          {campers.map((camper, index) => (
            <CamperCard key={camper.id} camper={camper} priority={index === 0} />
          ))}
        </ul>
        {hasNextPage && (
          <button
            type="button"
            className={css.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
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
      {isFetchingNextPage && <Loader />}
    </div>
  );
}
