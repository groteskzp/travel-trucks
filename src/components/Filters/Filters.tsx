'use client';

import { useState } from 'react';
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
    <form onSubmit={handleSubmit}>
      <label>
        Location
        <input
          type="text"
          placeholder="City"
          value={draft.location ?? ''}
          onChange={(e) => setDraft({ ...draft, location: e.target.value })}
        />
      </label>
      <fieldset>
        <legend>Camper form</legend>
        {FORMS.map(({ value, label }) => (
          <label key={value}>
            <input
              type="radio"
              name="form"
              checked={draft.form === value}
              onChange={() => setDraft({ ...draft, form: value })}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Engine</legend>
        {ENGINES.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="engine"
              checked={draft.engine === value}
              onChange={() => setDraft({ ...draft, engine: value })}
            />
            {value}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Transmission</legend>
        {TRANSMISSION.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="transmission"
              checked={draft.transmission === value}
              onChange={() => setDraft({ ...draft, transmission: value })}
            />
            {value}
          </label>
        ))}
      </fieldset>

      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>
        Clear filters
      </button>
    </form>
  );
}
