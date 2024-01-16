import { z } from 'zod';
import { Dispatch, FC, SetStateAction, memo } from 'react';
import { CloseIcon, Group, NumberInput, Paper, Stack, Text, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProductsListParams } from '../../types/product-list-params.interface';

interface FiltersProps {
  params: ProductsListParams;
  setParams: Dispatch<SetStateAction<ProductsListParams>>;
}

const schema = z.object({
  from: z
    .union([z.number(), z.string()])
    .pipe(z.coerce.number().gte(0, 'Should be positive'))
    .nullable(),
  to: z
    .union([z.number(), z.string()])
    .pipe(z.coerce.number().gte(0, 'Should be positive'))
    .nullable(),
});

type FormInputData = z.input<typeof schema>;

const Filters: FC<FiltersProps> = ({ params, setParams }) => {
  // const [debouncedFromPrice] = useDebouncedValue(fromPrice, 500);
  // const [debouncedToPrice] = useDebouncedValue(toPrice, 500);

  console.log(params, setParams);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormInputData>({
    resolver: zodResolver(schema),
    defaultValues: { from: null, to: null },
    reValidateMode: 'onChange',
  });

  const handleResetAll = () => {};

  const setToValue = () => {
    const fromNum = getValues('from');
    const toNum = getValues('to');
    if (!toNum || !fromNum) return setValue('to', toNum);
    setValue('to', +toNum > +fromNum ? +toNum : fromNum);
  };

  return (
    <Paper p="lg" w="100%">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={5} fz="lg">
            Filters
          </Title>
          <Group onClick={handleResetAll} gap="xs" color="var(--mantine-color-custom-grey-4)">
            <Text size="sm" c="var(--mantine-color-custom-grey-4)">
              Reset All
            </Text>
            <CloseIcon color="var(--mantine-color-custom-grey-4)" size="14" />
          </Group>
        </Group>
        <Stack gap="sm">
          <Text fw="bold">Price</Text>
          <Group gap="sm" wrap="nowrap">
            <NumberInput
              {...register('from')}
              leftSection="From:"
              fz={14}
              fw="bold"
              leftSectionProps={{ style: { fontWeight: 'normal' } }}
              size="sm"
              suffix="$"
              placeholder=""
              hideControls
              min={0}
              max={999999}
              decimalScale={2}
              error={errors.from?.message}
              onChange={(v) => {
                setValue('from', v);
              }}
              maw={300}
            />
            <NumberInput
              {...register('to')}
              maw={300}
              fw="bold"
              fz={14}
              leftSectionProps={{ style: { fontWeight: 'normal' } }}
              size="sm"
              leftSection="To:"
              suffix="$"
              placeholder=""
              hideControls
              min={0}
              max={999999}
              decimalScale={2}
              error={errors.to?.message}
              onChange={(v) => {
                setValue('to', v);
              }}
              onBlur={setToValue}
            />
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default memo(Filters);
