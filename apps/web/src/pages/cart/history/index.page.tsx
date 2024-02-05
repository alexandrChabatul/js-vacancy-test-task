import { NextPage } from 'next';
import React from 'react';
import { Table } from 'components';
import { Container } from '@mantine/core';
import { paymentApi } from 'resources/payment';
import CartLayout from '../cart-layout';
import { historyColumns } from '../constants';
import EmptyCart from '../components/EmptyCart';

import classes from './index.module.css';
import CartLoadingSkeleton from '../components/CartLoadingSkeleton';

// Todo: change to history from cart
const History: NextPage = () => {
  const { data, isLoading } = paymentApi.useGetPaymentsHistory();
  return (
    <CartLayout>
      <>
        {isLoading && <CartLoadingSkeleton />}
        {data?.products.length ? (
          <Container maw={950} p={0} m={0} className={classes.cartTableWrapper}>
            <Table
              columns={historyColumns}
              data={data.products}
              perPage={5}
              horizontalSpacing={0}
              verticalSpacing={0}
            />
          </Container>
        ) : (
          !isLoading && <EmptyCart />
        )}
      </>
    </CartLayout>
  );
};

export default History;
