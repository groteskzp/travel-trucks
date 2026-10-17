'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} priority />
      </Link>
      <nav className={css.nav}>
        <ul className={css.list}>
          <li>
            <Link href="/" className={pathname === '/' ? css.active : css.link}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={pathname.startsWith('/catalog') ? css.active : css.link}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
