import ThemeSwitcher from './ThemeSwitcher';

function Settings() {
  return (
    <div className='flex flex-col'>
      <div className='' />
      <div className='grid grid-cols-2 gap-4 px-6 py-2'>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Settings;
