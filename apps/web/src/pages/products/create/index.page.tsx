import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import PhotoInput from './components/PhotoInput';

import classes from './index.module.css';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  price: z
    .union([z.number(), z.string()])
    .pipe(z.coerce.number().gte(0.01, 'Price is required and should be positive number')),
  photoUrl: z.string({
    required_error: 'Photo is required',
  }),
});

export type CreateProductParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateProductParams>({
    resolver: zodResolver(schema),
    reValidateMode: 'onBlur',
  });

  const setPhotoUrl = (url: string) => {
    setValue('photoUrl', url);
  };

  const onSubmit: SubmitHandler<CreateProductParams> = (data) => console.log(data);

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
            setPhoto={setPhotoUrl}
            error={getValues().photoUrl ? undefined : errors.photoUrl?.message}
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
            hideControls
          />
          <Button type="submit" loading={false} className={classes.submitButton}>
            Upload Product
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default CreateProduct;
