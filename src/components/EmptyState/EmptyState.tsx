import Image from 'next/image';
import css from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.empty}>
      <Image src="/images/empty.png" alt="" width={488} height={463} />

      <div className={css.text}>
        <h2 className={css.title}>No campers found</h2>
        <p className={css.message}>
          We couldn&apos;t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={css.buttons}>
        <button type="button" className={css.clear} onClick={onReset}>
          <Image src="/icons/close.svg" alt="" width={16} height={16} />
          Clear filters
        </button>
        <button type="button" className={css.all} onClick={onReset}>
          View all campers
        </button>
      </div>
    </div>
  );
}
