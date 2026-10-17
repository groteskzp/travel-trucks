'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './Filters.module.css';
import type { CamperFilters, CamperForm, Engine, Transmission } from '@/types/camper';

interface FiltersProps {
  onSearch: (filters: CamperFilters) => void;
}

const FORMS: { value: CamperForm; label: string }[] = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panel_van', label: 'Panel van' },
  { value: 'integrated', label: 'Integrated' },
  { value: 'semi_integrated', label: 'Semi integrated' },
];
const ENGINES: Engine[] = ['diesel', 'petrol', 'hybrid', 'electric'];
const TRANSMISSION: Transmission[] = ['automatic', 'manual'];

export default function Filters({ onSearch }: FiltersProps) {
  const [draft, setDraft] = useState<CamperFilters>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(draft);
  };

  const handleClear = () => {
    setDraft({});
    onSearch({});
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.location}>
        <label htmlFor="location" className={css.label}>
          Location
        </label>
        <div className={css.inputWrap}>
          <Image
            src={draft.location ? '/icons/map-dark.svg' : '/icons/map.svg'}
            width={24}
            height={24}
            alt=""
          />
          <input
            id="location"
            className={css.input}
            type="text"
            placeholder="City"
            value={draft.location ?? ''}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
          />
        </div>
      </div>
      <div className={css.filters}>
        <h2 className={css.title}>Filters</h2>
        <div className={css.groups}>
          <fieldset className={css.group}>
            <legend className={css.label}>Camper form</legend>
            {FORMS.map(({ value, label }) => (
              <label key={value} className={css.option}>
                <input
                  type="radio"
                  className={css.radio}
                  name="form"
                  checked={draft.form === value}
                  onChange={() => setDraft({ ...draft, form: value })}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <fieldset className={css.group}>
            <legend className={css.label}>Engine</legend>
            {ENGINES.map((value) => (
              <label key={value} className={css.option}>
                <input
                  type="radio"
                  className={css.radio}
                  name="engine"
                  checked={draft.engine === value}
                  onChange={() => setDraft({ ...draft, engine: value })}
                />
                {value}
              </label>
            ))}
          </fieldset>

          <fieldset className={css.group}>
            <legend className={css.label}>Transmission</legend>
            {TRANSMISSION.map((value) => (
              <label key={value} className={css.option}>
                <input
                  type="radio"
                  className={css.radio}
                  name="transmission"
                  checked={draft.transmission === value}
                  onChange={() => setDraft({ ...draft, transmission: value })}
                />
                {value}
              </label>
            ))}
          </fieldset>
        </div>
      </div>
      <div className={css.buttons}>
        <button className={css.search} type="submit">
          Search
        </button>
        <button className={css.clear} type="button" onClick={handleClear}>
          <Image src="/icons/close.svg" width={24} height={24} alt="" />
          Clear filters
        </button>
      </div>
    </form>
  );
}
