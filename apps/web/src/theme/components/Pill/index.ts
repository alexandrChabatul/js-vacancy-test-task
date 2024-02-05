import { Pill } from '@mantine/core';

import classes from './index.module.css';

export default Pill.extend({
  defaultProps: {
    px: 'lg',
    pt: '7px',
    pb: '8px',
    h: '35px',
    bg: 'white',
    fz: 14,
  },
  classNames: {
    root: classes.root,
    remove: classes.remove,
  },
});
