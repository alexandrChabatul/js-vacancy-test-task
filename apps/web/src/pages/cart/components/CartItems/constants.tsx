import { ColumnDef } from '@tanstack/react-table';
import { Product } from 'types';
import { Group, Image, Text } from '@mantine/core';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'cart-column-1',
    accessorKey: 'photoUrl',
    size: 520,
    header: 'Item',
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
    id: 'cart-column-3',
    accessorKey: 'price',
    header: 'Unit price',
    maxSize: 100,
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
    id: 'cart-column-4',
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <Text>{row.original.quantity || 1}</Text>,
  },
  {
    id: 'cart-column-5',
    accessorKey: '',
    header: '',
    cell: () => 'remove x',
  },
];
