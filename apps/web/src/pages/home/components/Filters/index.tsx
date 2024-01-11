import { z } from 'zod';
import { Dispatch, FC, SetStateAction, memo } from 'react';
import { CloseIcon, Group, NumberInput, Paper, Text, Title } from '@mantine/core';
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputData>({
    resolver: zodResolver(schema),
    defaultValues: { from: null, to: null },
    reValidateMode: 'onChange',
  });

  const handleResetAll = () => {};

  const onSubmit = (data: FormInputData) => {
    console.log(data);
  };

  const setToValue = () => {
    const fromNum = getValues('from');
    const toNum = getValues('to');
    if (!toNum || !fromNum) return setValue('to', toNum);
    setValue('to', +toNum > +fromNum ? +toNum : fromNum);
  };

  return (
    <Paper p="lg" maw="24%">
      <Group>
        <Title order={5}>Filters</Title>
        <Group onClick={handleResetAll}>
          <Text size="sm">Reset All</Text>
          <CloseIcon size="16" />
        </Group>
      </Group>
      <Group>
        <form onChange={handleSubmit(onSubmit)}>
          <NumberInput
            {...register('from')}
            leftSection="From:"
            rightSection="$"
            placeholder=""
            hideControls
            min={0}
            max={999999}
            decimalScale={2}
            error={errors.from?.message}
            onChange={(v) => {
              setValue('from', v);
            }}
          />
          <NumberInput
            {...register('to')}
            leftSection="To:"
            rightSection="$"
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
        </form>
      </Group>
    </Paper>
  );
};

export default memo(Filters);
