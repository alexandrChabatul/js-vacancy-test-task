import { FC, ReactNode } from 'react';
import { CellContext, ColumnDefTemplate, Row } from '@tanstack/react-table';
import { Table } from '@mantine/core';
import classes from './index.module.css';

type RowData = {
  [key: string]: string | number | boolean | Record<string, any>;
};

interface TbodyProps {
  rows: Row<RowData>[];
  flexRender: (
    template: ColumnDefTemplate<CellContext<RowData, any>> | undefined,
    context: CellContext<RowData, any>
  ) => ReactNode;
}

const Tbody: FC<TbodyProps> = ({ rows, flexRender }) => (
  <Table.Tbody>
    {rows.map((row) => (
      <Table.Tr
        key={row.id}
        style={{
          fontWeight: 'normal',
          fontSize: '16px',
          textAlign: 'right',
        }}
        className={classes.tableBody}
      >
        {row.getVisibleCells().map((cell) => (
          <Table.Td
            key={cell.id}
            py="md"
            className={classes.tableBodyItem}
            w={cell.column.getSize()}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Td>
        ))}
      </Table.Tr>
    ))}
  </Table.Tbody>
);

export default Tbody;
