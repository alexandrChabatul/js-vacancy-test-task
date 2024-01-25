import { Divider, Group, Paper, Stack, Title, Text, Button } from '@mantine/core';
import { FC, useMemo } from 'react';
import { Product } from 'types';

import classes from './index.module.css';

interface CartSummaryInterface {
  items: Product[];
}

const CartSummary: FC<CartSummaryInterface> = ({ items }) => {
  const summary = useMemo(
    () => items.reduce((acc, el) => acc + el.price * (el.quantity || 0), 0),
    [items]
  );

  const handleCheckout = () => {};

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
        <Button onClick={handleCheckout}>Proceed to Checkout</Button>
      </Stack>
    </Paper>
  );
};

export default CartSummary;
