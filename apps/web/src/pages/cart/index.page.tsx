import { NextPage } from 'next';
import { Group } from '@mantine/core';
import { accountApi } from 'resources/account';
import CartLayout from './cart-layout';
import EmptyCart from './components/EmptyCart';
import CartItems from './components/CartItems';

const Cart: NextPage = () => {
  const { data: user } = accountApi.useGet();
  return (
    <CartLayout>
      {user?.cart.length ? (
        <Group wrap="nowrap" mt="md">
          <CartItems items={user.cart} />
          <div>1231231231231123123123</div>
        </Group>
      ) : (
        <EmptyCart />
      )}
    </CartLayout>
  );
};

export default Cart;
