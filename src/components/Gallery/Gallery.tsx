'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CamperImage } from '@/types/camper';
import css from './Gallery.module.css';

interface GalleryProps {
  images: CamperImage[];
  name: string;
}

export default function Gallery({ images, name }: GalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className={css.gallery}>
      <Image
        src={images[active].original}
        alt={name}
        width={638}
        height={505}
        priority
        className={css.main}
      />

      <ul className={css.thumbs}>
        {images.map((img, index) => (
          <li key={img.id}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className={index === active ? `${css.thumb} ${css.active}` : css.thumb}
            >
              <Image src={img.thumb} alt="" fill sizes="144px" className={css.thumbImg} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
