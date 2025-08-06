'use client';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import './styles.css';

const myData = [
  { firstName: 'John', lastName: 'Smith', age: 20, visits: 4, status: 'single', progress: 20 },
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    age: 25,
    visits: 10,
    status: 'relationship',
    progress: 55,
  },
  {
    firstName: 'Michael',
    lastName: 'Williams',
    age: 32,
    visits: 7,
    status: 'complicated',
    progress: 80,
  },
  { firstName: 'Sarah', lastName: 'Brown', age: 28, visits: 5, status: 'single', progress: 40 },
  { firstName: 'David', lastName: 'Jones', age: 45, visits: 12, status: 'married', progress: 90 },
  { firstName: 'Jessica', lastName: 'Garcia', age: 22, visits: 3, status: 'single', progress: 30 },
  {
    firstName: 'Daniel',
    lastName: 'Miller',
    age: 36,
    visits: 8,
    status: 'relationship',
    progress: 70,
  },
  {
    firstName: 'Laura',
    lastName: 'Davis',
    age: 27,
    visits: 6,
    status: 'complicated',
    progress: 50,
  },
  { firstName: 'James', lastName: 'Martinez', age: 31, visits: 9, status: 'married', progress: 85 },
  { firstName: 'Anna', lastName: 'Lopez', age: 24, visits: 2, status: 'single', progress: 25 },
];

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: '이름',
    columns: [
      {
        accessorKey: 'firstName',
        header: '이름',
        size: 200,
        minSize: 50,
        maxSize: 200,
      },
      {
        accessorKey: 'lastName',
        header: '성',
        size: 150,
      },
    ],
  },
  {
    header: '개인정보',
    columns: [
      {
        accessorKey: 'age',
        header: '나이',
      },
      {
        accessorKey: 'visits',
        header: '방문 횟수',
      },
    ],
  },
  {
    header: '추가정보',
    columns: [
      {
        accessorKey: 'status',
        header: '상태',
        size: 130,
      },
      {
        accessorKey: 'progress',
        header: '프로그래스',
      },
    ],
  },
];

export default function DataFlowPage() {
  const [data, _setData] = useState([...myData]);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [columnSizing, setColumnSizing] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnSizing,
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,

    enableColumnResizing: true,

    onColumnSizingChange: setColumnSizing,
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table]);

  return (
    <div className='overflow-x-auto'>
      <table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  {...{
                    // key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  <div
                    {...{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      className: `resizer ${table.options.columnResizeDirection} ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`,
                    }}
                  />
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
                  {...{
                    // key: cell.id,
                    style: {
                      width: cell.column.getSize(),
                    },
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

//un-memoized normal table body component - see memoized version below
// function TableBody({ table }: { table: Table<Person> }) {
//   return (
//     <div className="tbody">
//       {table.getRowModel().rows.map((row) => (
//         <div key={row.id} className="tr">
//           {row.getVisibleCells().map((cell) => {
//             return (
//               <div
//                 key={cell.id}
//                 className="td"
//                 // style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)` }}
//                 style={{ width: `${cell.column.getSize()}px` }}
//               >
//                 {cell.renderValue<any>()}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

//special memoized wrapper for our table body that we will use during column resizing
// export const MemoizedTableBody = memo(
//   TableBody,
//   (prev, next) => prev.table.options.data === next.table.options.data,
// ) as typeof TableBody;
