import { ColumnDef } from '@tanstack/react-table';
import { Product } from 'types';
import { ActionIcon, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { userApi } from 'resources/user';

export const cartColumns: ColumnDef<Product>[] = [
  {
    id: 'cart-column-1',
    accessorKey: 'photoUrl',
    header: 'Item',
    size: 450,
    cell: ({ row }) => (
      <Group>
        <Image src={row.original.photoUrl} w={80} h={80} radius={8} />
        <Text style={{ textAlign: 'left' }} fw="bold">
          {row.original.title}
        </Text>
      </Group>
    ),
  },
  {
    id: 'cart-column-2',
    accessorKey: 'price',
    header: 'Unit price',
    size: 120,
    cell: (info) => (
      <Text>
        {info.getValue<number>().toLocaleString?.('en-US', {
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
        increaseCount({ productId: row.original._id });
      };
      const handleDecreaseClick = () => {
        decreaseCount({ productId: row.original._id });
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
        deleteFromCart(row.original._id);
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
export const historyColumns: ColumnDef<Product>[] = [
  {
    id: 'cart-column-1',
    accessorKey: 'photoUrl',
    header: 'Item',
    size: 450,
    cell: ({ row }) => (
      <Group>
        <Image src={row.original.photoUrl} w={80} h={80} radius={8} />
        <Text style={{ textAlign: 'left' }} fw="bold">
          {row.original.title}
        </Text>
      </Group>
    ),
  },
  {
    id: 'cart-column-2',
    accessorKey: 'price',
    header: 'Unit price',
    size: 120,
    cell: (info) => (
      <Text>
        {info.getValue<number>().toLocaleString?.('en-US', {
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
      <Text>
        {row.original.createdOn ? new Date(row.original.createdOn).toLocaleDateString() : ''}
      </Text>
    ),
  },
];
