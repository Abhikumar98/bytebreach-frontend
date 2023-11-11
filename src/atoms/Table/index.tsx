// TableComponent.tsx

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useState } from 'react';

export interface Column<T> {
  title: string;
  dataIndex: keyof T;
  sorter?: (a: T, b: T) => number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string; // optional width for each column
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isSelectable?: boolean;
  onSelectionChange?: (selectedIndices: T[]) => void;
  onSort?: (dataIndex: keyof T, order: 'asc' | 'desc') => void;
}

export default function TableComponent<T>({
  data,
  columns,
  isSelectable = false,
  onSelectionChange,
  onSort,
}: TableProps<T>) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(null);

  const handleRequestSort = (dataIndex: keyof T) => {
    const isAsc = sortedColumn === dataIndex && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setSortedColumn(dataIndex);
    onSort?.(dataIndex, isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedIndices = data.map((_, index) => index);
      setSelectedIndices(newSelectedIndices);
      onSelectionChange?.(data);
    } else {
      setSelectedIndices([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelect = (index: number) => {
    const selectedIndexPosition = selectedIndices.indexOf(index);
    let newSelectedIndices: number[] = [];

    if (selectedIndexPosition === -1) {
      newSelectedIndices = newSelectedIndices.concat(selectedIndices, index);
    } else if (selectedIndexPosition !== -1) {
      newSelectedIndices = selectedIndices.filter((i) => i !== index);
    }

    setSelectedIndices(newSelectedIndices);

    // return selected elements based on indices

    const selectedElementFromIndicies = newSelectedIndices.map(
      (i) => data[i]
    ) as T[];

    onSelectionChange?.(selectedElementFromIndicies);
  };

  const isSelected = (index: number) => selectedIndices.indexOf(index) !== -1;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} size='medium'>
        <TableHead>
          <TableRow>
            {isSelectable && (
              <TableCell padding='checkbox'>
                <Checkbox
                  indeterminate={
                    selectedIndices.length > 0 &&
                    selectedIndices.length < data.length
                  }
                  checked={
                    data.length > 0 && selectedIndices.length === data.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell
                key={column.dataIndex as string}
                align='left'
                sortDirection={
                  sortedColumn === column.dataIndex ? orderDirection : false
                }
              >
                {column.sorter ? (
                  <TableSortLabel
                    active={sortedColumn === column.dataIndex}
                    direction={
                      sortedColumn === column.dataIndex ? orderDirection : 'asc'
                    }
                    onClick={() => handleRequestSort(column.dataIndex)}
                    style={{
                      width: column.width || 'auto',
                      flex: column.width ? 'none' : 1,
                    }}
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
          {data.map((row, index) => {
            return (
              <TableRow
                hover
                role='checkbox'
                aria-checked={isSelected(index)}
                tabIndex={-1}
                key={index}
                selected={isSelected(index)}
              >
                {isSelectable && (
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isSelected(index)}
                      onChange={() => handleSelect(index)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
                  const value = row[column.dataIndex];
                  return (
                    <TableCell
                      key={`${index}-${column.dataIndex as string}`}
                      align={column.align || 'left'}
                    >
                      {column.render
                        ? (column.render(value, row, index) as React.ReactNode)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
