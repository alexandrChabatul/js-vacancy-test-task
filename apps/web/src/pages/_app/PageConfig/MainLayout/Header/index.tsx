import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container } from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import UserMenu from './components/UserMenu';

import classes from './index.module.css';
import Navbar from './components/Navbar';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutHeader className={classes.headerWrapper}>
      <Container className={classes.header} mih={72} px={48} pt={33} display="flex" fluid>
        <Link type="router" href={RoutePath.Home}>
          <LogoImage />
        </Link>
        <Navbar />
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
