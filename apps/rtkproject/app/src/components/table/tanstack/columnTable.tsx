import React from 'react';
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const defaultData: Person[] = [
  { firstName: 'Alice', lastName: 'Kim', age: 28 },
  { firstName: 'Bob', lastName: 'Lee', age: 35 },
  { firstName: 'Charlie', lastName: 'Choi', age: 22 },
];

// 1. 컬럼 정의 with meta.size
const columnHelper = createColumnHelper<Person>();

const rawColumns = [
  columnHelper.accessor('firstName', {
    header: () => 'First Name',
    cell: (info) => info.getValue(),
    meta: {
      size: 100,
    },
  }),
  columnHelper.accessor('lastName', {
    header: () => 'Last Name',
    cell: (info) => info.getValue(),
    meta: {
      size: 160,
    },
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.getValue(),
    meta: {
      size: 80,
    },
  }),
];

// 2. meta.size -> size 로 복사하는 함수 (재귀 지원)
function applyMetaSize<T>(columns: ColumnDef<T, any>[]): ColumnDef<T, any>[] {
  return columns.map((col) => ({
    ...col,
    size: col.meta?.size ?? col.size,
    columns: col.columns ? applyMetaSize(col.columns) : undefined,
  }));
}

export function TableWithResizableColumns() {
  const columns = applyMetaSize(rawColumns); // 초기 사이즈 반영

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: 50,
      maxSize: 500,
    },
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    position: 'relative',
                    border: '1px solid #ccc',
                    padding: '4px',
                    width: `${header.column.getSize()}px`,
                    background: header.column.getIsResizing() ? '#d0ebff' : '#f8f9fa',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '5px',
                        cursor: 'col-resize',
                        userSelect: 'none',
                        touchAction: 'none',
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '4px',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
