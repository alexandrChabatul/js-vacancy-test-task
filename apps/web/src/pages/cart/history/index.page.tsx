import { NextPage } from 'next';
import React from 'react';
import { accountApi } from 'resources/account';
import { Text } from '@mantine/core';
import CartLayout from '../cart-layout';

const History: NextPage = () => {
  const { data: user } = accountApi.useGet();
  console.log(user);
  return (
    <CartLayout>
      <Text>History</Text>
    </CartLayout>
  );
};

export default History;
