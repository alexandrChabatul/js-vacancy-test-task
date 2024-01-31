import { Divider, Group, Paper, Stack, Title, Text, Button } from '@mantine/core';
import { FC, useMemo } from 'react';
import { PopulatedCartItem } from 'types';
import { paymentApi } from 'resources/payment';

import classes from './index.module.css';

interface CartSummaryInterface {
  items: PopulatedCartItem[];
}

const CartSummary: FC<CartSummaryInterface> = ({ items }) => {
  const summary = useMemo(
    () => items.reduce((acc, item) => acc + item.product.price * (item.quantity || 0), 0),
    [items]
  );
  const { mutate: createCheckoutSession, isLoading } = paymentApi.useCreateStripeSession<{
    products: PopulatedCartItem[];
  }>();

  const handleCheckout = () => {
    createCheckoutSession({ products: items });
  };

  return (
    <Paper maw={315} className={classes.summaryWrapper}>
      <Stack gap="xl">
        <Title order={4} fz={20}>
          Summary
        </Title>
        <Divider />
        <Group justify="space-between" wrap="nowrap">
          <Text c="var(--mantine-color-custom-grey-5)">Total Price:</Text>
          <Text size="lg" fw="bold">
            {summary.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
            })}
          </Text>
        </Group>
        <Button onClick={handleCheckout} disabled={isLoading} loading={isLoading}>
          Proceed to Checkout
        </Button>
      </Stack>
    </Paper>
  );
};

export default CartSummary;
