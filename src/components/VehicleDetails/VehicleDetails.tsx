import type { CamperDetails } from '@/types/camper';
import css from './VehicleDetails.module.css';

interface VehicleDetailsProps {
  camper: CamperDetails;
}

const formatBadge = (value: string) => (value === 'ac' ? 'AC' : value.replace('_', ' '));

const formatValue = (value: string) => value.replace(/(\d)([a-z])/i, '$1 $2').replace('/', ' / ');

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  const badges = [camper.transmission, camper.engine, ...camper.amenities, camper.form];

  const specs = [
    ['Form', camper.form.replace('_', ' ')],
    ['Length', formatValue(camper.length)],
    ['Width', formatValue(camper.width)],
    ['Height', formatValue(camper.height)],
    ['Tank', formatValue(camper.tank)],
    ['Consumption', formatValue(camper.consumption)],
  ];

  return (
    <div className={css.card}>
      <div className={css.header}>
        <h2 className={css.title}>Vehicle details</h2>
        <ul className={css.badges}>
          {badges.map((badge) => (
            <li key={badge} className={css.badge}>
              {formatBadge(badge)}
            </li>
          ))}
        </ul>
      </div>

      <hr className={css.divider} />

      <ul className={css.specs}>
        {specs.map(([label, value]) => (
          <li key={label} className={css.spec}>
            <span>{label}</span>
            <span className={label === 'Form' ? css.capitalize : undefined}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
