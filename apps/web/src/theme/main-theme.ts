import { createTheme } from '@mantine/core';

import * as components from './components';

const mainTheme = createTheme({
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  lineHeights: {
    md: '1.45',
  },
  colors: {
    grey: [
      '#FCFCFC',
      '#ECECEE',
      '#CFCFCF',
      '#A3A3A3',
      '#767676',
      '#201F22',
      '#767c91',
      '#656a7e',
      '#585e72',
      '#4a5167',
    ],
    'custom-blue': [
      '#EAF1FD',
      '#cde2ff',
      '#9bc2ff',
      '#64a0ff',
      '#5692EF',
      '#2B77EB',
      '#235FBC',
      '#0058e4',
      '#004ecc',
      '#0043b5',
    ],
  },
  primaryColor: 'blue',
  primaryShade: 6,
  defaultRadius: 8,
  components,
});

export default mainTheme;
