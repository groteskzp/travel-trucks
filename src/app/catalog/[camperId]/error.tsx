'use client';

import Link from 'next/link';
import css from './error.module.css';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className={css.page}>
      <div className={css.box}>
        <h1 className={css.title}>Something went wrong</h1>
        <p className={css.text}>{'Failed to load camper. Please try again later'}</p>

        <div className={css.actions}>
          <button type="button" className={css.retry} onClick={reset}>
            Try again
          </button>
          <Link href="/catalog" className={css.back}>
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
