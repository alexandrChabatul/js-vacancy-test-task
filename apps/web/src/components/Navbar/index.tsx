import { FC, memo } from 'react';
import { Group, Text } from '@mantine/core';

import { accountApi } from 'resources/account';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { LinkData } from './types/link-data.interface';

import classes from './index.module.css';

interface NavbarProps {
  links: LinkData[];
  fz?: number;
  type?: 'fill' | 'text';
}

const Navbar: FC<NavbarProps> = ({ links, fz = 16, type = 'fill' }) => {
  const router = useRouter();

  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <Group gap="xl" visibleFrom="sm">
      {links.map((link) => (
        <Link type="router" key={link.label} href={link.link} style={{ textDecoration: 'none' }}>
          <Text
            className={classNames(classes.link, {
              [classes.linkActive]: link.regex.test(router.pathname) && type === 'fill',
              [classes.linkActiveText]: link.regex.test(router.pathname) && type === 'text',
            })}
            fz={fz}
          >
            {link.label}
          </Text>
        </Link>
      ))}
    </Group>
  );
};

export default memo(Navbar);
