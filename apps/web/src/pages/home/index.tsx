import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Select,
  TextInput,
  Group,
  Stack,
  Text,
  UnstyledButton,
  Flex,
  Pill,
  Container,
  Pagination,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX, IconChevronDown, IconArrowsDownUp } from '@tabler/icons-react';

import classNames from 'classnames';
import CardItem from '../../components/CardItem';
import { PillParams } from './types/pill-params.interface';
import { ProductsListParams } from './types/product-list-params.interface';
import Filters from './components/Filters';
import { productApi } from '../../resources/product';
import { PER_PAGE, selectOptions } from './constants';

import classes from './index.module.css';

const Home: NextPage = () => {
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [params, setParams] = useState<ProductsListParams>({});

  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data, isLoading: isListLoading } = productApi.useList(params);

  const pills = useMemo(() => {
    const result: PillParams[] = [];
    if (params.filter?.price?.from || params.filter?.price?.to) {
      const { from, to } = params.filter.price;
      result.push({
        text: `${from ? `${from}$` : ''}${from && to ? '-' : ''}${to ? `${to}$` : ''}`,
        key: 'pricePill',
        onRemove: () => setParams({ ...params, filter: { ...params.filter, price: undefined } }),
      });
    }
    if (search) {
      result.push({
        text: `${search}`,
        key: 'searchPill',
        onRemove: () => setSearch(''),
      });
    }
    return result;
  }, [params, search, setSearch]);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  return (
    <Stack align="stretch" className={classNames({ [classes.contentLoading]: isListLoading })}>
      <Head>
        <title>Shopy</title>
      </Head>
      <Group gap="lg" align="start" wrap="nowrap" pos="relative">
        <div className={classes.filtersWrapper}>
          <Filters params={params} setParams={setParams} />
        </div>
        <Stack className={classes.searchAndProducts} gap="lg">
          <TextInput
            w="100%"
            size="lg"
            value={search}
            onChange={setSearch}
            placeholder="Type to search"
            leftSection={<IconSearch size={16} />}
            rightSection={
              search ? (
                <UnstyledButton
                  component={Flex}
                  display="flex"
                  align="center"
                  onClick={() => setSearch('')}
                >
                  <IconX color="gray" />
                </UnstyledButton>
              ) : null
            }
          />
          <Stack gap="sm">
            <Group w="100%" justify="space-between">
              <Text fw="bold">{`${data?.count} results`}</Text>
              <Select
                w={175}
                variant="unstyled"
                size="sm"
                fw="500"
                data={selectOptions}
                value={sortBy}
                onChange={handleSort}
                rightSection={<IconChevronDown size={14} />}
                leftSection={<IconArrowsDownUp size={14} />}
                comboboxProps={{
                  withinPortal: false,
                  transitionProps: {
                    transition: 'pop-bottom-right',
                    duration: 210,
                    timingFunction: 'ease-out',
                  },
                }}
              />
            </Group>
            {!!pills.length && (
              <Pill.Group>
                {pills.map((props: PillParams) => (
                  <Pill key={props.key} withRemoveButton onRemove={props.onRemove}>
                    <Text fz={14} fw={500}>
                      {props.text}
                    </Text>
                  </Pill>
                ))}
              </Pill.Group>
            )}
          </Stack>
          {data?.items.length ? (
            <Group gap="1.5rem">
              {data.items.map((product) => (
                <CardItem
                  key={product._id}
                  product={product}
                  type="store"
                  maw={320}
                  miw={240}
                  h={374}
                  hImage={218}
                />
              ))}
            </Group>
          ) : (
            <Container p={75}>
              <Text size="xl" c="gray">
                No results found, try to adjust your search.
              </Text>
            </Container>
          )}
        </Stack>
      </Group>
      <Pagination
        className={classes.pagination}
        total={data?.totalPages || 0}
        onChange={(v) => {
          setParams({ ...params, page: v });
        }}
      />
    </Stack>
  );
};

export default Home;
