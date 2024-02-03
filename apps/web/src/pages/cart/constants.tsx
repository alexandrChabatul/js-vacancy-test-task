import { ColumnDef } from '@tanstack/react-table';
import { PopulatedCartItem, PopulatedHistoryItem } from 'types';
import { ActionIcon, Container, Flex, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { userApi } from 'resources/user';

export const cartColumns: ColumnDef<PopulatedCartItem>[] = [
  {
    id: 'cart-column-1',
    accessorKey: 'photoUrl',
    header: 'Item',
    size: 450,
    cell: ({ row }) => (
      <Flex
        wrap="nowrap"
        direction={{ base: 'column', xs: 'row' }}
        align="center"
        gap={{ base: 10, xs: 25 }}
      >
        <Container w={80} h={80} p={0} m={0}>
          <Image src={row.original.product.photoUrl} w="100%" h="100%" radius={8} />
        </Container>
        <Text
          style={{ textAlign: 'left' }}
          fw="bold"
          lineClamp={2}
          maw={{ base: 120, xs: 100, md: 300 }}
        >
          {row.original.product.title}
        </Text>
      </Flex>
    ),
  },
  {
    id: 'cart-column-2',
    accessorKey: 'price',
    header: 'Unit price',
    size: 120,
    cell: ({ row }) => (
      <Text truncate="end">
        {row.original.product.price.toLocaleString?.('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}
      </Text>
    ),
  },
  {
    id: 'cart-column-3',
    accessorKey: 'quantity',
    header: 'Quantity',
    size: 120,
    cell: ({ row }) => {
      const { mutate: increaseCount } = userApi.useIncreaseItemCount<{ productId: string }>();
      const { mutate: decreaseCount } = userApi.useDecreaseItemCount<{ productId: string }>();
      const handleIncreaseClick = () => {
        increaseCount({ productId: row.original.product._id });
      };
      const handleDecreaseClick = () => {
        decreaseCount({ productId: row.original.product._id });
      };
      return (
        <Group w="100%" justify="end" wrap="nowrap">
          <ActionIcon
            variant="transparent"
            size="sm"
            color="var(--mantine-color-custom-grey-3)"
            onClick={handleDecreaseClick}
          >
            <IconMinus stroke={1.5} />
          </ActionIcon>
          <Text>{row.original.quantity || 1}</Text>
          <ActionIcon
            variant="transparent"
            size="sm"
            color="var(--mantine-color-custom-grey-3)"
            onClick={handleIncreaseClick}
          >
            <IconPlus stroke={1.5} />
          </ActionIcon>
        </Group>
      );
    },
  },
  {
    id: 'cart-column-4',
    accessorKey: '',
    header: '',
    cell: ({ row }) => {
      const { mutate: deleteFromCart } = userApi.useRemoveFromCart();
      const handleRemoveClick = () => {
        deleteFromCart(row.original.product._id);
      };
      return (
        <UnstyledButton
          w="100%"
          display="flex"
          style={{ alignItems: 'center', gap: '5px', justifyContent: 'end' }}
          onClick={handleRemoveClick}
        >
          <IconX color="var(--mantine-color-custom-grey-5)" size={20} />
          <Text c="var(--mantine-color-custom-grey-5)">Remove</Text>
        </UnstyledButton>
      );
    },
  },
];
export const historyColumns: ColumnDef<PopulatedHistoryItem>[] = [
  {
    id: 'cart-column-1',
    accessorKey: 'photoUrl',
    header: 'Item',
    size: 450,
    cell: ({ row }) => (
      <Flex
        wrap="nowrap"
        direction={{ base: 'column', xs: 'row' }}
        align="center"
        gap={{ base: 10, xs: 25 }}
      >
        <Container w={80} h={80} p={0} m={0}>
          <Image src={row.original.product.photoUrl} w="100%" h="100%" radius={8} />
        </Container>
        <Text
          style={{ textAlign: 'left' }}
          fw="bold"
          lineClamp={2}
          maw={{ base: 120, xs: 100, md: 300 }}
        >
          {row.original.product.title}
        </Text>
      </Flex>
    ),
  },
  {
    id: 'cart-column-2',
    accessorKey: 'price',
    header: 'Unit price',
    size: 120,
    cell: ({ row }) => (
      <Text>
        {row.original.product.price.toLocaleString?.('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}
      </Text>
    ),
  },
  {
    id: 'cart-column-3',
    accessorKey: 'date',
    header: 'Date',
    size: 120,
    cell: ({ row }) => (
      <Text>{row.original.paidAt ? new Date(row.original.paidAt).toLocaleDateString() : ''}</Text>
    ),
  },
];
