import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
    px: 'lg',
    py: 4,
  },
  classNames: {
    label: classes.label,
  },
});
