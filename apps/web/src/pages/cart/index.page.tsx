import { NextPage } from 'next';
import { Group } from '@mantine/core';
import { accountApi } from 'resources/account';
import CartLayout from './cart-layout';
import EmptyCart from './components/EmptyCart';
import CartItems from './components/CartItems';
import CartSummary from './components/CartSummary';

const Cart: NextPage = () => {
  const { data: user } = accountApi.useGet();
  return (
    <CartLayout>
      {user?.cart.length ? (
        <Group wrap="nowrap" mt="md" justify="space-between">
          <CartItems items={user.cart} />
          <CartSummary items={user.cart} />
        </Group>
      ) : (
        <EmptyCart />
      )}
    </CartLayout>
  );
};

export default Cart;
