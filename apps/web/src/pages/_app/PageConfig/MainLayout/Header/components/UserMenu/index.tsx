import Link from 'next/link';
import { memo, FC } from 'react';
import { Group, Indicator, UnstyledButton } from '@mantine/core';

import { accountApi } from 'resources/account';

import { RoutePath } from 'routes';
import { CartIcon, LogoutIcon } from 'public/icons';

import classes from './index.module.css';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();

  // ToDo add cart count
  return (
    <Group>
      <Link
        type="router"
        href={RoutePath.Cart}
        style={{ textDecoration: 'none' }}
        className={classes.iconButton}
      >
        <Indicator inline disabled={false} label={2} size={20}>
          <UnstyledButton className={classes.iconButton}>
            <CartIcon />
          </UnstyledButton>
        </Indicator>
      </Link>
      <UnstyledButton onClick={() => signOut()} className={classes.iconButton}>
        <LogoutIcon />
      </UnstyledButton>
    </Group>
  );
};

export default memo(UserMenu);
