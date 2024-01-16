import { useCallback, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Select,
  TextInput,
  Group,
  Stack,
  Skeleton,
  Text,
  UnstyledButton,
  Flex,
  Pill,
  Container,
  Pagination,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX, IconChevronDown, IconArrowsDownUp } from '@tabler/icons-react';

import { PER_PAGE, selectOptions } from './constants';

import classes from './index.module.css';
import { productApi } from '../../resources/product';
import CardItem from '../../components/CardItem';
import { ProductsListParams } from './types/product-list-params.interface';
import Filters from './components/Filters';

const Home: NextPage = () => {
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState(selectOptions[0].value);

  const [params, setParams] = useState<ProductsListParams>({});

  const [debouncedSearch] = useDebouncedValue(search, 500);

  const pills = ['100$ - 200$'];

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

  const { data, isLoading: isListLoading } = productApi.useList(params);

  return (
    <>
      <Head>
        <title>Shopy</title>
      </Head>
      <Group gap="lg" align="start" wrap="nowrap">
        <div className={classes.filtersWrapper}>
          <Filters params={params} setParams={setParams} />
        </div>
        <Stack className={classes.searchAndProducts}>
          <Stack>
            <Skeleton
              className={classes.inputSkeleton}
              height={42}
              radius="sm"
              visible={isListLoading}
              width="100%"
            >
              <TextInput
                w="100%"
                size="md"
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
            </Skeleton>
            <Group w="100%" justify="space-between">
              <Text>12 results</Text>
              <Select
                w={200}
                variant="unstyled"
                size="md"
                data={selectOptions}
                value={sortBy}
                onChange={handleSort}
                rightSection={<IconChevronDown size={16} />}
                leftSection={<IconArrowsDownUp />}
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
            <Group>
              {pills.map((text) => (
                <Pill key={`pill-${text}`} withRemoveButton>
                  {text}
                </Pill>
              ))}
            </Group>
          </Stack>
          {isListLoading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
              ))}
            </>
          )}

          {data?.items.length ? (
            <Group wrap="wrap">
              {data.items.map((product) => (
                <CardItem
                  key={product._id}
                  product={product}
                  type="store"
                  maw={320}
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
      <Pagination total={data?.totalPages || 0} />
    </>
  );
};

export default Home;
