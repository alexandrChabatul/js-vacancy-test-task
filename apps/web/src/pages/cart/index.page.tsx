import { NextPage } from 'next';
import { Container, Group } from '@mantine/core';
import { accountApi } from 'resources/account';
import CartLayout from './cart-layout';
import EmptyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';
import { Table } from '../../components';

import classes from './index.module.css';
import { cartColumns } from './constants';

const Cart: NextPage = () => {
  const { data: user } = accountApi.useGet();
  return (
    <CartLayout>
      {user?.cart.length ? (
        <Group wrap="nowrap" mt="md" justify="space-between">
          <Container maw={950} p={0} m={0} className={classes.cartTableWrapper}>
            <Table
              columns={cartColumns}
              data={user.cart}
              perPage={5}
              horizontalSpacing={0}
              verticalSpacing={0}
            />
          </Container>
          <CartSummary items={user.cart} />
        </Group>
      ) : (
        <EmptyCart />
      )}
    </CartLayout>
  );
};

export default Cart;
