import { Button } from '@nextui-org/button';
import Text from '@/components/primitives/Text';

function Auth() {
  return (
    <div className='h-min flex flex-col gap-6 rounded-4xl mx-6 shadow-small bg-white/30 dark:bg-default/30 justify-between z-10 p-5'>
      <div className='flex flex-col gap-3'>
        <Text tag='h1' className='text-md' content='Личный кабинет' />
        <Text
          tag='h5'
          className='opacity-60'
          content='Перенос предметов, формирование отчетов и другие возможности.'
        />
      </div>

      <Button
        fullWidth
        variant='flat'
        className='shadow-small text-black dark:text-white font-semibold'
      >
        Войти
      </Button>
    </div>
  );
}

export default Auth;
