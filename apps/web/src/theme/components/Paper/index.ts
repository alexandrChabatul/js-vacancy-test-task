import { Paper } from '@mantine/core';

import classes from './index.module.css';

export default Paper.extend({
  defaultProps: {
    withBorder: true,
  },
  classNames: {
    root: classes.root,
  },
});
