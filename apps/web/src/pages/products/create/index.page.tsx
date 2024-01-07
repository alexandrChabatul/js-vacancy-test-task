import { Stack, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';

const CreateProduct: NextPage = () => {
  const products = [1];
  console.log(products);
  return (
    <>
      <Head>
        <title>Create Product</title>
      </Head>
      <Stack>
        <Title order={1} fz="xl">
          Create new product
        </Title>
      </Stack>
    </>
  );
};

export default CreateProduct;
