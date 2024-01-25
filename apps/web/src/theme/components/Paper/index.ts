import { Paper } from '@mantine/core';

import classes from './index.module.css';

export default Paper.extend({
  defaultProps: {
    withBorder: true,
    p: 'lg',
  },
  classNames: {
    root: classes.root,
  },
});
