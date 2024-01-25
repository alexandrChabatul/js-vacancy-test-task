import { ActionIcon, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { accountApi } from 'resources/account';
import { RoutePath } from '../../routes';

import classes from './index.module.css';
import CardItem from '../../components/CardItem';

const Products: NextPage = () => {
  const { data: user } = accountApi.useGet();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Stack>
        <Title order={1} fz="xl">
          Your Products
        </Title>
        <Group>
          <Paper
            w={271}
            h={266}
            radius="lg"
            withBorder
            className={classes.newProduct}
            component={Link}
            href={RoutePath.ProductsCreate}
          >
            <ActionIcon size="xl" color="blue" radius="xl" variant="filled">
              <IconPlus size={40} fill="--mantine-color-custom-blue-5" />
            </ActionIcon>
            <Text size="lg" className={classes.buttonText}>
              New Product
            </Text>
          </Paper>
          {user?.products.map((product) => (
            <CardItem
              product={product}
              type="account"
              maw={271}
              h={266}
              hImage={174}
              key={product._id}
            />
          ))}
        </Group>
      </Stack>
    </>
  );
};

export default Products;
