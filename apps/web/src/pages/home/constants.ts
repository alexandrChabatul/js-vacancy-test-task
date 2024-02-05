import { ColumnDef } from '@tanstack/react-table';
import { ComboboxItem } from '@mantine/core';

import { User } from 'types';

export const PER_PAGE = 6;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
];

export const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];
