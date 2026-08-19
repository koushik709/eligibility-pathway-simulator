import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#EEF2F1', // page background - cool pale grey, not cream
        paper: '#F8F9F6', // card surfaces
        ink: {
          DEFAULT: '#0E2A3D', // deep marine navy - primary text/headlines
          soft: '#3D5566',
        },
        stamp: {
          DEFAULT: '#B33F2E', // visa-stamp brick red - the one accent color
          soft: '#E8DAD2',
        },
        status: {
          excellent: '#2F6B4F',
          strong: '#3D7A9E',
          moderate: '#C48A2E',
          limited: '#A6472C',
        },
        line: '#C7D2CD', // hairline borders
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-plex-sans)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      borderRadius: {
        stamp: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
