import { FC, ReactElement } from 'react';
import { AppShell, Container } from '@mantine/core';

import Header from './Header';

import classes from './index.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    header={{ height: 72 }}
    classNames={{
      root: classes.root,
      main: classes.main,
    }}
  >
    <Header />
    <AppShell.Main w="100vw">
      <Container px={{ base: 10, sm: 15, md: 48 }} m={0} className={classes.mainWrapper}>
        {children}
      </Container>
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
