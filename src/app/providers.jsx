'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import StoreProvider from '@/providers/store.provider';

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem='false'>
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
