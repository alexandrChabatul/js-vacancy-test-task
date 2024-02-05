import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container } from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import { LinkData } from 'components/Navbar/types/link-data.interface';
import Navbar from 'components/Navbar';
import UserMenu from './components/UserMenu';

import classes from './index.module.css';

const links: LinkData[] = [
  { link: RoutePath.Home, label: 'Marketplace', regex: new RegExp(`^${RoutePath.Home}$`) },
  {
    link: RoutePath.Products,
    label: 'Your Products',
    regex: new RegExp(`^${RoutePath.Products}`),
  },
];

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutHeader className={classes.headerWrapper} w="100vw">
      <Container
        className={classes.header}
        mih={72}
        px={{ base: 10, sm: 15, md: 48 }}
        pt={33}
        display="flex"
        fluid
      >
        <Link href={RoutePath.Home}>
          <LogoImage />
        </Link>
        <Navbar links={links} visibleFrom="sm" />
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
