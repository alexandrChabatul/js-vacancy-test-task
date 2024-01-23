import { FC } from 'react';
import { Product } from 'types';
import { Table } from 'components';
import { Container } from '@mantine/core';
import { columns } from './constants';

interface CartItemInterface {
  items: Product[];
}

const CartItems: FC<CartItemInterface> = ({ items }) => (
  <Container maw={950} p={0} m={0}>
    <Table columns={columns} data={items} perPage={5} horizontalSpacing={0} verticalSpacing={0} />
  </Container>
);

export default CartItems;
