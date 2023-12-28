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
  primaryColor: 'blue',
  primaryShade: 6,
  defaultRadius: 8,
  components,
});

export default mainTheme;
