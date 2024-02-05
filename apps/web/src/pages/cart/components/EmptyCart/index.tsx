import { Button, Image, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RoutePath } from 'routes';

import classes from './index.module.css';

const EmptyCart: FC = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(RoutePath.Home);
  };
  return (
    <Stack align="center" gap="lg">
      <Image src="/images/empty-cart.png" h={206} w={206} />
      <Text fw="bold" fz="xl">
        Oops, there&apos;s nothing here yet!
      </Text>
      <Text className={classes.emptyCartMessage} size="sm" c="var(--mantine-color-custom-grey-5)">
        You haven&apos;t made any purchases yet. <br />
        Go to the marketplace and make purchases.
      </Text>
      <Button onClick={handleButtonClick}>Go to Marketplace</Button>
    </Stack>
  );
};

export default EmptyCart;
