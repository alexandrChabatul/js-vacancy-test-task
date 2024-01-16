import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

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
    <AppShell.Main>
      <div className={classes.mainWrapper}>{children}</div>
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
