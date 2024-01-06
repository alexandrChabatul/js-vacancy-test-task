import { FC, memo } from 'react';
import { Group } from '@mantine/core';

import { accountApi } from 'resources/account';
import Link from 'next/link';
import { RoutePath } from 'routes';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import classes from './index.module.css';

const Navbar: FC = () => {
  const router = useRouter();
  const links = [
    { link: RoutePath.Home, label: 'Marketplace' },
    { link: RoutePath.Products, label: 'Your Products' },
  ];

  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <Group gap="xl" visibleFrom="sm">
      {links.map((link) => (
        <Link type="router" key={link.label} href={link.link} style={{ textDecoration: 'none' }}>
          <span
            className={classNames(classes.link, {
              [classes.linkActive]: router.pathname === link.link,
            })}
          >
            {link.label}
          </span>
        </Link>
      ))}
    </Group>
  );
};

export default memo(Navbar);
