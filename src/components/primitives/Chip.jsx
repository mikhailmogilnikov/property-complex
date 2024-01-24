import { Button } from '@nextui-org/react';

function Chip({
  isIcon = false,
  content = '',
  title = '',
  bgColor = 'bg-white/30 dark:bg-white/5',
  push = () => {},
}) {
  return (
    <Button
      onPress={push}
      className={`${bgColor} w-fit backdrop-blur-xl h-min flex flex-row flex-shrink-0 gap-2 px-3 py-1 shadow-small rounded-full`}
    >
      {isIcon ? title : <p className='text-sm font-bold'>{title}</p>}
      <p className='text-sm font-medium'>{content}</p>
    </Button>
  );
}

export default Chip;
