import { NextPage } from 'next';
import { Container, Group } from '@mantine/core';
import CartLayout from './cart-layout';
import EmptyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';
import { Table } from '../../components';

import classes from './index.module.css';
import { cartColumns } from './constants';
import { userApi } from '../../resources/user';

const Cart: NextPage = () => {
  const { data } = userApi.useGetCart();
  return (
    <CartLayout>
      {data?.cart.length ? (
        <Group wrap="nowrap" justify="space-between">
          <Container maw={950} p={0} m={0} className={classes.cartTableWrapper}>
            <Table
              columns={cartColumns}
              data={data.cart}
              perPage={5}
              horizontalSpacing={0}
              verticalSpacing={0}
            />
          </Container>
          <CartSummary items={data.cart} />
        </Group>
      ) : (
        <EmptyCart />
      )}
    </CartLayout>
  );
};

export default Cart;
