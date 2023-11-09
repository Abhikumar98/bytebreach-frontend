// TableComponent.js

import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';

// Define the types for the column configuration and table props
export interface Column<T> {
  title: string;
  dataIndex: keyof T;
  sorter?: (a: T, b: T) => number;
  render?: (value: any, record: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isSelectable?: boolean;
  onSelectionChange?: (selectedKeys: React.Key[]) => void;
  onSort?: (dataIndex: keyof T, order: 'asc' | 'desc') => void;
}

// Define the TableComponent with generic type T
const TableComponent = <T extends { key: React.Key }>({
  data,
  columns,
  isSelectable = false,
  onSelectionChange,
  onSort,
}: TableProps<T>) => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(null);

  const handleRequestSort = (dataIndex: keyof T) => {
    const isAsc = sortedColumn === dataIndex && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setSortedColumn(dataIndex);
    onSort?.(dataIndex, isAsc ? 'desc' : 'asc');
  };

  const handleSelect = (key: React.Key) => {
    const selectedIndex = selectedKeys.indexOf(key);
    let newSelectedKeys: React.Key[] = [];

    console.log({ key });

    if (selectedIndex === -1) {
      newSelectedKeys = newSelectedKeys.concat(selectedKeys, key);
    } else if (selectedIndex >= 0) {
      newSelectedKeys = newSelectedKeys.concat(
        selectedKeys.slice(0, selectedIndex),
        selectedKeys.slice(selectedIndex + 1)
      );
    }

    setSelectedKeys(newSelectedKeys);
    onSelectionChange?.(newSelectedKeys);
  };

  // Create a sorted copy of the data if a sorter function is provided for the sorted column
  const sortedData = React.useMemo(() => {
    return sortedColumn &&
      columns.find((col) => col.dataIndex === sortedColumn)?.sorter
      ? [...data].sort(
          (a, b) =>
            columns.find((col) => col.dataIndex === sortedColumn)!.sorter!(
              a,
              b
            ) * (orderDirection === 'asc' ? 1 : -1)
        )
      : data;
  }, [data, sortedColumn, orderDirection, columns]);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {isSelectable && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={
                      selectedKeys.length > 0 &&
                      selectedKeys.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedKeys.length === data.length
                    }
                    onChange={(event) => {
                      setSelectedKeys(
                        event.target.checked ? data.map((item) => item.key) : []
                      );
                      onSelectionChange?.(
                        event.target.checked ? data.map((item) => item.key) : []
                      );
                    }}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.title}
                  align={column.dataIndex === 'name' ? 'left' : 'right'}
                  sortDirection={
                    sortedColumn === column.dataIndex ? orderDirection : false
                  }
                >
                  {column.sorter ? (
                    <TableSortLabel
                      active={sortedColumn === column.dataIndex}
                      direction={
                        sortedColumn === column.dataIndex
                          ? orderDirection
                          : 'asc'
                      }
                      onClick={() => handleRequestSort(column.dataIndex)}
                    >
                      {column.title}
                    </TableSortLabel>
                  ) : (
                    column.title
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow
                hover
                onClick={() => isSelectable && handleSelect(row.key)}
                role='checkbox'
                aria-checked={selectedKeys.indexOf(row.key) !== -1}
                tabIndex={-1}
                key={row.key}
                selected={selectedKeys.indexOf(row.key) !== -1}
              >
                {isSelectable && (
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={selectedKeys.indexOf(row.key) !== -1}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSelect(row.key);
                      }}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
                  const value = row[column.dataIndex];
                  return (
                    <TableCell
                      key={`${row.key}-${column.dataIndex.toString()}`}
                      align={column.align || 'right'}
                    >
                      {column.render
                        ? (column.render(value, row) as ReactNode)
                        : (value as ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
