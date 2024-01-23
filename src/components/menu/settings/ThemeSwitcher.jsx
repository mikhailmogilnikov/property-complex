'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Skeleton } from '@nextui-org/skeleton';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { PiDevicesBold, PiMoonBold, PiSunBold } from 'react-icons/pi';
import Text from '@/components/primitives/Text';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [selectedKey, setSelectedKey] = useState(new Set([theme]));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className='w-10 h-10 rounded-2xl' />;

  const previewIconSize = 100;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className='w-full h-[8.2rem] relative flex justify-start items-start bg-white/30 dark:bg-default/30 rounded-[32px] p-5 shadow-base'>
          <Text tag='h4' content='Оформление' />
          <div className='absolute -bottom-4 -right-1 opacity-10'>
            {resolvedTheme === 'light' ? (
              <PiSunBold size={previewIconSize} />
            ) : (
              <PiMoonBold size={previewIconSize} />
            )}
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Выбор темы оформления'
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKey}
        onSelectionChange={(newSelectedKey) => setSelectedKey(newSelectedKey)}
        variant='flat'
      >
        <DropdownItem
          key='light'
          onPress={() => setTheme('light')}
          startContent={<PiSunBold />}
        >
          Светлое
        </DropdownItem>
        <DropdownItem
          key='dark'
          onPress={() => setTheme('dark')}
          startContent={<PiMoonBold />}
        >
          Тёмное
        </DropdownItem>
        <DropdownItem
          key='system'
          onPress={() => setTheme('system')}
          startContent={<PiDevicesBold />}
        >
          Системное
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ThemeSwitcher;
