import { FC } from 'react';
import { Container, Group, Skeleton } from '@mantine/core';

import classes from './index.module.css';

interface CartLoadingSkeletonProps {
  withSummary?: boolean;
}

const CartLoadingSkeleton: FC<CartLoadingSkeletonProps> = ({ withSummary = false }) => (
  <Group wrap="nowrap" justify="space-between" align="top">
    <Container maw={950} p={0} m={0} className={classes.cartWrapper}>
      {[1, 2, 3].map((item) => (
        <Skeleton key={`sklton-${String(item)}`} height={80} radius="sm" mb="sm" />
      ))}
    </Container>
    {withSummary && <Skeleton maw={315} height={200} radius="sm" mb="sm" />}
  </Group>
);

export default CartLoadingSkeleton;
