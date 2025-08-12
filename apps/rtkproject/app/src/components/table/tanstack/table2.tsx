'use client';

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState, useRef } from 'react';
import './styles.css';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const FIXED_COLUMN_SIZE = {
  firstName: 80,
  lastName: 130,
};

export default function SaaSPage({ columnLen = 6 }) {
  const columnHelper = createColumnHelper<Person>();
  const [colWidth, setColWidth] = useState(0);
  const [columnSizing, setColumnSizing] = useState({});
  const [columnSizingInfo, setColumnSizingInfo] = useState({});
  const previousIsResizingRef = useRef(null);

  //   const FIXED_COLUMN_SIZE = {
  //     firstName: 80,
  //     lastName: 130,
  //   };

  //   const fixedValue = Object.values(FIXED_COLUMN_SIZE);

  //   const colWidth =
  //     fixedValue.reduce((acc, cur) => {
  //       return acc - cur;
  //     }, window.innerWidth) /
  //     (columnLen - fixedValue.length);

  const columns = [
    columnHelper.group({
      id: 'hello',
      header: () => <span>Hello</span>,
      columns: [
        columnHelper.accessor('firstName', {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
          size: FIXED_COLUMN_SIZE.firstName,
          meta: { filterVariant: 'text', customInput: 366 },
        }),
        columnHelper.accessor((row) => row.lastName, {
          id: 'lastName',
          cell: (info) => info.getValue(),
          header: () => <span>Last Name</span>,
          footer: (props) => props.column.id,
          size: FIXED_COLUMN_SIZE.lastName,
        }),
      ],
    }),
    columnHelper.group({
      header: 'Info',
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor('age', {
          header: () => 'Age',
          footer: (props) => props.column.id,
          size: colWidth,
        }),
        columnHelper.accessor('visits', {
          header: () => <span>Visits</span>,
          footer: (props) => props.column.id,
          size: colWidth,
        }),
        columnHelper.accessor('status', {
          header: 'Status',
          footer: (props) => props.column.id,
          size: colWidth,
        }),
        columnHelper.accessor('progress', {
          header: 'Profile Progress',
          footer: (props) => props.column.id,
          size: colWidth,
        }),
      ],
    }),
  ];

  const [data, _setData] = useState(() => [...defaultData]);

  const handleColumnSizingInfoChange = (info) => {
    const wasResizing = previousIsResizingRef.current;
    const isResizing = info.isResizingColumn;

    if (wasResizing && !isResizing) {
      saveColumnSizing(columnSizing);
    }

    previousIsResizingRef.current = isResizing;
    setColumnSizingInfo(info);
  };
  ``;

  const table = useReactTable({
    data,
    columns,
    state: {
      columnSizing,
      columnSizingInfo,
    },
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onEnd', // or 'onEnd' depending on preference
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: handleColumnSizingInfoChange,
  });

  useEffect(() => {
    const columnLength = table.getAllLeafColumns().length;
    const fixedValue = Object.values(FIXED_COLUMN_SIZE);

    const calcuateWidth = fixedValue.reduce((acc, cur) => {
      return acc - cur;
    }, window.innerWidth);

    setColWidth(calcuateWidth / (columnLength - fixedValue.length));
  }, [table]);

  return (
    <div className='p-2'>
      {colWidth && (
        <table style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {table.getAllLeafColumns().map((col) => (
              <col key={col.id} style={{ width: col.getSize() }} />
            ))}
          </colgroup>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        position: 'relative',
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                      {/* Resize Handle */}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className='resize-handle'
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '5px',
                            cursor: 'col-resize',
                            zIndex: 1,
                          }}
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='h-4' />
    </div>
  );
}
