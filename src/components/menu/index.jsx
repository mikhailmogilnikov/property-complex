'use client';

import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import icons from '@/constants/icons';
import MgriLogo from '../../assets/MgriLogo';
import Chip from '../primitives/Chip';
import { useStore } from '@/stores/stores';
import strings from '@/constants/strings';
import Content from './content';
import transitions from '@/constants/transitions';

export const checkActiveTab = (tab, currentActiveTab) =>
  tab === currentActiveTab;

function Header({ translate }) {
  return (
    <header className='h-20 mb-2 flex flex-row gap-4 flex-shrink-0'>
      <div className='w-min h-full flex justify-center items-center pl-6'>
        <MgriLogo size={36} />
      </div>
      <div className='w-full flex items-center'>
        <h1 className='font-semibold text-md leading-[22px]'>
          {translate.menu.title.name}
          <br />
          {translate.menu.title.university}
        </h1>
      </div>
    </header>
  );
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

function CurrentLocationChip({ toggleVisibility, setActiveTab }) {
  const chipPush = () => {
    toggleVisibility(false);
    setActiveTab(strings.menu.states.locations);
  };

  return (
    <div className='absolute left-96 flex flex-row flex-shrink-0 gap-2 pl-6'>
      <Chip
        push={chipPush}
        content='Этаж 4'
        title={icons.menu.header.location}
        isIcon
      />
    </div>
  );
}

function Hider({ visibility, translate, toggleVisibility }) {
  const status = visibility ? 'visible' : 'hidden';

  return (
    <Tooltip
      placement='right'
      offset={0}
      classNames={{
        base: 'font-medium'
      }}
      content={translate.menu.tooltip.visibility[status]}
    >
      <button
        type='button'
        aria-label='hide menu'
        onClick={() => toggleVisibility()}
        className='absolute left-[24rem] top-[calc(50%-20px)] w-10 h-10 hidden lg:flex justify-center items-center opacity-30 hover:opacity-60 transition-opacity'
      >
        <div className='w-1 h-full rounded-full bg-black dark:bg-white ' />
      </button>
    </Tooltip>
  );
}

const Menu = observer(({ translate }) => {
  const { menuStore } = useStore();

  const activeTab = menuStore.getActiveTab();
  const setActiveTab = (tab) => menuStore.setActiveTab(tab);

  const visibility = menuStore.getVisibility();

  const animationVariants = {
    initial: { opacity: 0, x: '-110%', scale: 0.2 },
    open: { opacity: 1, x: 0, scale: 1 },
    closed: { opacity: 1, x: '-110%', scale: 1 },
  };

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#000000');
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#ffffff');
    }
  }, [resolvedTheme]);

  return (
    <motion.aside
      initial='initial'
      animate={visibility ? 'open' : 'closed'}
      variants={animationVariants}
      transition={transitions.menu.desktopVisibility}
      className='absolute top-8 left-8 w-96 h-[calc(100dvh-4rem)] shadow-base bg-white/60 dark:bg-white/[0.08] backdrop-blur-xl rounded-4xl flex flex-col'
    >
      <Header translate={translate} />
      <Content translate={translate} activeTab={activeTab} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <CurrentLocationChip
        toggleVisibility={menuStore.toggleVisibility}
        setActiveTab={setActiveTab}
      />
      <Hider
        visibility={visibility}
        translate={translate}
        toggleVisibility={menuStore.toggleVisibility}
      />
    </motion.aside>
  );
});

export default Menu;
