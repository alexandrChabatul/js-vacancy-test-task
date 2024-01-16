import { TextInput, rem } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default TextInput.extend({
  defaultProps: {
    size: 'md',
  },
  vars: (theme, props) => {
    if (props.size === 'lg') {
      return {
        wrapper: {
          '--input-height': rem(48),
        },
      };
    }
    if (props.size === 'md') {
      return {
        wrapper: {
          '--input-height': rem(40),
        },
      };
    }
    return { root: {} };
  },
  classNames: (_, props) => ({
    input: cx(classes.input, {
      [classes.inputError]: props.error,
    }),
    label: classes.label,
    root: classes.root,
  }),
});
