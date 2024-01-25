import { Button } from '@nextui-org/button';
import Text from '@/components/primitives/Text';
import icons from '@/constants/icons';

function LocaleSwitcher() {
  return (
    <Button className='w-full h-[8.2rem] relative flex justify-start items-start bg-white/30 dark:bg-default/30 rounded-[32px] p-5 shadow-base'>
      <Text tag='h4' content='Язык' />
      <div className='absolute -bottom-4 -right-1 opacity-10'>
        {icons.menu.content.settings.localization}
      </div>
    </Button>
  );
}

export default LocaleSwitcher;
