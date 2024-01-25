import Auth from './Auth';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

function Settings() {
  return (
    <div className='flex flex-col py-2'>
      <Auth />
      <div className='grid grid-cols-2 gap-4 px-6 py-4'>
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </div>
  );
}

export default Settings;
