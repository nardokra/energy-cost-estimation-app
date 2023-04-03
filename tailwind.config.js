const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-primary': '#fda929',
        'theme-secondary': '#60b760',
      },
    },
    fontSize: {
      sm: '0.75rem',
      base: '0.875rem',
      lg: '1rem', // 16px
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
    },
    screens: {
      xxs: '320px',
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1440px',
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
    },
    container: {
      center: true,
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: '600',
          wordBreak: 'break-all',
        },
        h2: {
          fontSize: theme('fontSize.xl'),
          fontWeight: '500',
          wordBreak: 'break-all',
        },
        h3: { fontSize: theme('fontSize.lg'), wordBreak: 'break-all' },
      });
    }),
  ],
};
