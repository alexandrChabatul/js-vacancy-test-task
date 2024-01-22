import { FC } from 'react';
import { Product } from 'types';
import { Table } from 'components';
import { columns } from './constants';

interface CartItemInterface {
  items: Product[];
}

const CartItems: FC<CartItemInterface> = ({ items }) => (
  <Table columns={columns} data={items} perPage={5} horizontalSpacing={0} verticalSpacing={0} />
);

export default CartItems;
