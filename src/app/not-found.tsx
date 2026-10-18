import Link from 'next/link';
import css from './catalog/[camperId]/error.module.css';

export default function NotFound() {
  return (
    <main className={css.page}>
      <div className={css.box}>
        <h1 className={css.title}>Page not found</h1>
        <p className={css.text}>The camper or page you are looking for doesn&apos;t exist.</p>
        <div className={css.actions}>
          <Link href="/catalog" className={css.retry}>
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
