import { NextPage } from 'next';
import { Container, Flex } from '@mantine/core';
import CartLayout from './cart-layout';
import EmptyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';
import { Table } from '../../components';

import classes from './index.module.css';
import { cartColumns } from './constants';
import { userApi } from '../../resources/user';
import CartLoadingSkeleton from './components/CartLoadingSkeleton';

const Cart: NextPage = () => {
  const { data, isLoading } = userApi.useGetCart();

  return (
    <CartLayout>
      <>
        {isLoading && <CartLoadingSkeleton withSummary />}
        {data?.cart.length ? (
          <Flex
            wrap="nowrap"
            justify="space-between"
            direction={{ base: 'column', sm: 'row' }}
            gap="xs"
          >
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
          </Flex>
        ) : (
          !isLoading && <EmptyCart />
        )}
      </>
    </CartLayout>
  );
};

export default Cart;
