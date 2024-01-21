import React, { FC, ReactElement } from 'react';
import { LinkData } from 'components/Navbar/types/link-data.interface';
import { RoutePath } from 'routes';
import { Title } from '@mantine/core';
import Navbar from 'components/Navbar';

interface CartLayoutProps {
  children: ReactElement;
}

const links: LinkData[] = [
  { link: RoutePath.Cart, label: 'My cart', regex: new RegExp(`^${RoutePath.Cart}$`) },
  {
    link: RoutePath.CartHistory,
    label: 'History',
    regex: new RegExp(`^${RoutePath.CartHistory}$`),
  },
];

const CartLayout: FC<CartLayoutProps> = ({ children }) => (
  <>
    <Title hidden>Cart</Title>
    <Navbar links={links} fz={20} type="text" />
    {children}
  </>
);

export default CartLayout;
