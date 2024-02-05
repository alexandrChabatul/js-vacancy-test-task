import { NumberInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default NumberInput.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: (_, props) => ({
    input: cx(classes.input, {
      [classes.inputError]: props.error,
    }),
    label: classes.label,
    section: classes.section,
  }),
});
