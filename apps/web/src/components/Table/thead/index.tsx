import { FC, ReactNode } from 'react';
import { Group, Table } from '@mantine/core';
import { ColumnDefTemplate, HeaderContext, HeaderGroup } from '@tanstack/react-table';

import classes from './thead.module.css';

type CellData = {
  [key: string]: string | Function | boolean | Record<string, any>;
};

interface TheadProps {
  headerGroups: HeaderGroup<CellData>[];
  flexRender: (
    template: ColumnDefTemplate<HeaderContext<CellData, any>> | undefined,
    context: HeaderContext<CellData, any>
  ) => ReactNode;
}

const Thead: FC<TheadProps> = ({ headerGroups, flexRender }) => (
  <Table.Thead>
    {headerGroups.map((headerGroup) => (
      <Table.Tr key={headerGroup.id} style={{ border: 'none' }} className={classes.tableHeader}>
        {headerGroup.headers.map((header) => (
          <Table.Th
            key={header.id}
            colSpan={header.colSpan}
            className={classes.tableHeaderRow}
            w={header.column.getSize()}
          >
            {!header.isPlaceholder && (
              <Group className={classes.headerButton}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Group>
            )}
          </Table.Th>
        ))}
      </Table.Tr>
    ))}
  </Table.Thead>
);

export default Thead;
