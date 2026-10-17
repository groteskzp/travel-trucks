import Image from 'next/image';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <Image src="/icons/loader.svg" width={72} height={72} alt="" className={css.spinner} />
        <div className={css.text}>
          <p className={css.title}>Loading trucks...</p>
          <p>Please wait while we fetch the best travel trucks for you</p>
        </div>
      </div>
    </div>
  );
}
