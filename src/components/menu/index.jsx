'use client';

import { ScrollShadow } from '@nextui-org/scroll-shadow';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import icons from '@/constants/icons';
import MgriLogo from '../../../public/icons/MgriLogo';
import Chip from '../primitives/Chip';
import { useStore } from '@/stores/stores';
import strings from '@/constants/strings';

export const checkActiveTab = (tab, currentActiveTab) =>
  tab === currentActiveTab;

function Header({ translate }) {
  return (
    <header className='h-20 flex flex-row gap-4 flex-shrink-0'>
      <div className='w-min h-full flex justify-center items-center pl-6'>
        <MgriLogo size={36} />
      </div>
      <div className='w-full flex items-center'>
        <h1 className='font-semibold text-md leading-[22px]'>
          {translate.title.name}
          <br />
          {translate.title.university}
        </h1>
      </div>
    </header>
  );
}

function Content() {
  return <ScrollShadow className='h-full' />;
}

function Navigation({ activeTab, setActiveTab }) {
  function NavButton({ name }) {
    const icon = icons.menu.nav[name];
    const isActive = checkActiveTab(name, activeTab);

    return (
      <button
        type='button'
        onClick={() => setActiveTab(name)}
        className='w-full h-full flex items-center justify-center'
      >
        <div
          className={clsx('w-8 h-8 flex justify-center items-center', {
            'opacity-100': isActive,
            'opacity-50': !isActive,
          })}
        >
          {icon}
        </div>
      </button>
    );
  }

  return (
    <div className='h-16 flex flex-row flex-shrink-0'>
      <NavButton name={strings.menu.states.list} />
      <NavButton name={strings.menu.states.locations} />
      <NavButton name={strings.menu.states.menu} />
    </div>
  );
}

function CurrentLocationChip({ setActiveTab }) {
  return (
    <div className='absolute left-96 flex flex-row flex-shrink-0 gap-2 pl-6'>
      <Chip
        push={() => setActiveTab(strings.menu.states.locations)}
        content='Этаж 4'
        title={icons.menu.header.location}
        isIcon
      />
    </div>
  );
}

const Menu = observer(({ translate }) => {
  const { menuStore } = useStore();

  const activeTab = menuStore.getActiveTab();
  const setActiveTab = (tab) => menuStore.setActiveTab(tab);

  return (
    <aside className='absolute top-8 left-8 w-96 h-[calc(100dvh-4rem)] shadow-base bg-white/50 dark:bg-white/50 backdrop-blur-xl rounded-4xl flex flex-col'>
      <Header translate={translate} />
      <Content />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <CurrentLocationChip setActiveTab={setActiveTab} />
    </aside>
  );
});

export default Menu;
