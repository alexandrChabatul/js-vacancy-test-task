import { Dispatch, FC, SetStateAction, memo, useEffect } from 'react';
import { CloseIcon, Group, NumberInput, Paper, Stack, Text, Title, rem } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { ProductsListParams } from '../../types/product-list-params.interface';

import classes from './index.module.css';

interface FiltersProps {
  params: ProductsListParams;
  setParams: Dispatch<SetStateAction<ProductsListParams>>;
}

const Filters: FC<FiltersProps> = ({ params, setParams }) => {
  const [from, setFrom] = useInputState<number | string | undefined>(params.filter?.price?.from);
  const [to, setTo] = useInputState<number | string | undefined>(params.filter?.price?.to);
  const [debouncedFromPrice] = useDebouncedValue(from, 500);
  const [debouncedToPrice] = useDebouncedValue(to, 500);

  const handleResetAll = () => {
    setParams({ ...params, filter: { price: undefined } });
  };

  useEffect(() => {
    setParams({
      ...params,
      filter: {
        price: {
          from: debouncedFromPrice ? +debouncedFromPrice : undefined,
          to: debouncedToPrice ? +debouncedToPrice : undefined,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFromPrice, debouncedToPrice]);

  useEffect(() => {
    setFrom(params.filter?.price?.from || '');
    setTo(params.filter?.price?.to || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter?.price]);

  return (
    <Paper p="lg" w="100%">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={5} fz="lg">
            Filters
          </Title>
          <Group onClick={handleResetAll} gap="xs" color="var(--mantine-color-custom-grey-4)">
            <Text size="sm" c="var(--mantine-color-custom-grey-4)" className={classes.resetButton}>
              Reset All
            </Text>
            <CloseIcon color="var(--mantine-color-custom-grey-4)" size="14" />
          </Group>
        </Group>
        <Stack gap="sm">
          <Text fw="bold">Price</Text>
          <Group gap="sm" wrap="nowrap">
            <NumberInput
              leftSection="From:"
              fw="500"
              leftSectionProps={{ style: { fontWeight: 'normal' } }}
              fz={14}
              size="sm"
              suffix="$"
              placeholder=""
              hideControls
              defaultValue={undefined}
              min={0}
              max={to ? +to : 999999}
              maw={300}
              decimalScale={2}
              value={from}
              onChange={(v) => setFrom(+v === 0 ? undefined : +v)}
              styles={{ input: { paddingLeft: rem(45) } }}
            />
            <NumberInput
              maw={300}
              fw="500"
              leftSectionProps={{ style: { fontWeight: 'normal' } }}
              size="sm"
              fz={14}
              leftSection="To:"
              suffix="$"
              placeholder=""
              hideControls
              defaultValue={undefined}
              min={from ? +from : 0}
              max={999999}
              value={to}
              decimalScale={2}
              onChange={(v) => setTo(+v === 0 ? undefined : +v)}
            />
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default memo(Filters);
