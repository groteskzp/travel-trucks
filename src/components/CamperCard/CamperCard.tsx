import Image from 'next/image';
import type { Camper } from '@/types/camper';
import css from './CamperCard.module.css';
import Link from 'next/link';

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <li className={css.card}>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={219}
        height={240}
        className={css.image}
      />
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.titleRow}>
            <h2 className={css.title}>{camper.name}</h2>
            <p className={css.title}>€{camper.price}</p>
          </div>

          <div className={css.meta}>
            <span className={css.metaItem}>
              <Image src="/icons/star.svg" width={16} height={16} alt="" />
              {camper.rating}({camper.totalReviews} Reviews)
            </span>
            <span className={css.metaItem}>
              <Image src="/icons/map-dark.svg" width={16} height={16} alt="" />
              {camper.location}
            </span>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.badges}>
          <li className={css.badge}>
            <Image src="/icons/engine.svg" width={20} height={20} alt="" />
            {camper.engine}
          </li>
          <li className={css.badge}>
            <Image src="/icons/transmission.svg" width={20} height={20} alt="" />
            {camper.transmission}
          </li>
          <li className={css.badge}>
            <Image src="/icons/form.svg" width={20} height={20} alt="" />
            {camper.form.replace('_', ' ')}{' '}
          </li>
        </ul>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={css.button}
        >
          Show more
        </Link>
      </div>
    </li>
  );
}
