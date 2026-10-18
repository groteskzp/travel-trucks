import Image from 'next/image';
import type { Review } from '@/types/camper';
import css from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className={css.reviews}>
      <h2 className={css.title}>Reviews</h2>

      {reviews.length === 0 ? (
        <p className={css.text}>No reviews yet</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.card}>
              <div className={css.header}>
                <span className={css.avatar}>{review.reviewer_name[0]}</span>
                <div className={css.author}>
                  <p className={css.name}>{review.reviewer_name}</p>
                  <div className={css.stars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Image
                        key={i}
                        src={
                          i < review.reviewer_rating ? '/icons/star.svg' : '/icons/star-empty.svg'
                        }
                        alt=""
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className={css.text}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
