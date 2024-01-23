import { NextPage } from 'next';
import React from 'react';
import { accountApi } from 'resources/account';
import { Container } from '@mantine/core';
import CartLayout from '../cart-layout';
import { Table } from '../../../components';
import { historyColumns } from '../constants';
import EmptyCart from '../components/EmptyCart';

import classes from './index.module.css';

// Todo: change to history from cart
const History: NextPage = () => {
  const { data: user } = accountApi.useGet();
  return (
    <CartLayout>
      {user?.cart.length ? (
        <Container maw={950} p={0} m={0} className={classes.cartTableWrapper}>
          <Table
            columns={historyColumns}
            data={user.cart}
            perPage={5}
            horizontalSpacing={0}
            verticalSpacing={0}
          />
        </Container>
      ) : (
        <EmptyCart />
      )}
    </CartLayout>
  );
};

export default History;
