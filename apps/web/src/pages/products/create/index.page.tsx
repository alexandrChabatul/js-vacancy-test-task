import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import queryClient from 'query-client';
import { handleError } from 'utils';
import { useRouter } from 'next/router';
import { productApi } from 'resources/product';
import { RoutePath } from 'routes';
import { Product } from 'types';
import PhotoInput from './components/PhotoInput';

import classes from './index.module.css';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  price: z
    .union([z.number(), z.string()])
    .pipe(z.coerce.number().gte(0.01, 'Price is required and should be positive number')),
  file: z.instanceof(File, { message: 'Photo is required.' }),
});

export type CreateProductParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateProductParams>({
    resolver: zodResolver(schema),
    reValidateMode: 'onBlur',
  });

  const router = useRouter();

  const { mutate: createProduct, isLoading: productLoading } =
    productApi.useCreate<Partial<Product>>();
  const { mutate: uploadProductPhoto, isLoading: photoLoading } =
    productApi.useUploadPhoto<FormData>();
  const { mutate: removeProductPhoto } = productApi.useRemovePhoto<{ url: string }>();

  const create = (data: Partial<Product>) =>
    createProduct(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my-products'] });
        showNotification({
          title: 'Success',
          message: 'The product was successfully created',
          color: 'green',
        });
        router.push(RoutePath.Products);
      },
      onError: (e) => {
        handleError(e, setError);
        if (data.photoUrl) removeProductPhoto({ url: data.photoUrl });
      },
    });

  const onSubmit: SubmitHandler<CreateProductParams> = (data) => {
    const body = new FormData();
    body.append('file', data.file, data.file.name);

    uploadProductPhoto(body, {
      onSuccess: (res) => {
        create({ title: data.title, price: data.price, photoUrl: res.url });
      },
      onError: (err) => handleError(err),
    });
  };

  return (
    <>
      <Head>
        <title>Create Product</title>
      </Head>
      <Stack maw={694}>
        <Title order={1} fz="xl">
          Create new product
        </Title>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <PhotoInput
            setPhoto={(file: File) => setValue('file', file)}
            error={getValues().file ? undefined : errors.file?.message}
          />
          <TextInput
            {...register('title')}
            label="Title of the product"
            placeholder="Enter title of the product..."
            error={errors.title?.message}
          />
          <NumberInput
            {...register('price')}
            label="Price"
            placeholder="Enter price of the product"
            min={0}
            max={999999}
            onChange={() => {}}
            error={errors.price?.message}
            decimalScale={2}
            hideControls
          />
          <Button
            type="submit"
            loading={photoLoading || productLoading}
            className={classes.submitButton}
          >
            Upload Product
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default CreateProduct;
