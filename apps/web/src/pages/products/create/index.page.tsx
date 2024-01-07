import { Stack } from '@mantine/core';
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
        <p>Create Product</p>
      </Stack>
    </>
  );
};

export default CreateProduct;
