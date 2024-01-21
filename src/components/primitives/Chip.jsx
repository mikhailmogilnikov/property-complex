import { Button } from '@nextui-org/react';

function Chip({ isIcon = false, content = '', title = '', push = () => {} }) {
  return (
    <Button onPress={push} className='w-fit bg-white/50 dark:bg-black/50 backdrop-blur-xl h-min flex flex-row flex-shrink-0 gap-2 px-3 py-1 shadow-small rounded-full'>
      {isIcon ? title : <p className='text-sm'>{title}</p>}
      <p className='text-sm font-medium'>{content}</p>
    </Button>
  );
}

export default Chip;
