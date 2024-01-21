import { Text } from '@mantine/core';
import { NextPage } from 'next';
import { accountApi } from 'resources/account';
import CartLayout from './cart-layout';

const Cart: NextPage = () => {
  const { data: user } = accountApi.useGet();
  console.log(user);
  return (
    <CartLayout>
      <Text>My cart</Text>
    </CartLayout>
  );
};

export default Cart;
