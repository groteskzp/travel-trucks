import Link from 'next/link';
import Image from 'next/image';
import css from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <Image src="/hero.jpg" alt="" fill priority sizes="100vw" className={css.bg} />
        <div className={css.content}>
          <div className={css.text}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.subtitle}>You can find everything you want in our catalog</p>
          </div>
          <Link href="/catalog" className={css.button}>
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}
