/* eslint-disable import/no-import-module-exports */
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        preloaderPulse: 'preloadPulse 2s linear infinite',
      },
      keyframes: {
        preloadPulse: {
          '0%': { opacity: '0.09' },
          '50%': { opacity: '0.14' },
          '100%': { opacity: '0.09' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#FF6100',
              foreground: '#000000',
            },
            secondary: {
              DEFAULT: 'black',
              foreground: '#000000',
            },
            danger: {
              DEFAULT: 'hsl(0, 74.69%, 52.58%)',
              foreground: '#ffffff',
            },
            focus: 'black',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#DB4600',
              foreground: '#000000',
            },
            secondary: {
              DEFAULT: 'white',
              foreground: '#000000',
            },
            danger: {
              DEFAULT: '#df2a2a',
              foreground: '#000000',
            },
            success: {
              DEFAULT: 'rgb(58, 171, 64)',
              foreground: '#000000',
            },
            focus: 'white',
          },
        },
      },
    }),
  ],
};
