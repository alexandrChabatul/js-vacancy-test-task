import React from 'react';
import { Button, Image, Stack, Text } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';

import classes from './index.module.css';

const PaymentFailed: NextPage = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(RoutePath.Cart);
  };
  return (
    <Stack align="center" gap="lg" mt={85}>
      <Image src="/images/Cross-Mark.png" h={56} w={56} />
      <Text fw="bold" fz="24">
        Payment Failed
      </Text>
      <Text className={classes.succeedMessage} size="md" c="var(--mantine-color-custom-grey-5)">
        Sorry, your payment failed. <br />
        Would you like to try again?
      </Text>
      <Button onClick={handleButtonClick} fz={14} px={50}>
        Back to Cart
      </Button>
    </Stack>
  );
};

export default PaymentFailed;
