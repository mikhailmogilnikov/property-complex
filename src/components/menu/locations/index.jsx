import { Button } from '@nextui-org/button';
import clsx from 'clsx';

const locs = [
  'Этаж 1',
  'Этаж 2',
  'Этаж 3',
  'Этаж 4',
  'Этаж 5',
  'Этаж 6',
  'Склад',
];

function Location({ name }) {
  const disabled = name !== 'Этаж 4';
  const active = name === 'Этаж 4';

  return (
    <Button
      variant='flat'
      isDisabled={disabled}
      className={clsx(
        'h-12 font-semibold bg-white/30 dark:bg-default/30 rounded-2xl shadow-small flex',
        { 'border-2 border-black dark:border-white': active },
      )}
    >
      <h5 className=''>{name}</h5>
    </Button>
  );
}

function Locations() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-4 px-6 py-2'>
        {locs.map((loc) => (
          <Location key={`id-${loc}`} name={loc} />
        ))}
      </div>
    </div>
  );
}

export default Locations;
