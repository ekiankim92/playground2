'use client';

import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import './styles.css';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const StaticTable = ({ enableTopToolbar = true }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState(0);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );

  //   const topToolbar = {};

  const table = useMaterialReactTable({
    columns, // header 컬럼으로 들어가는 데이터
    data: Array.from({ length: 1 }, () => data).flat(), // 실제 들어가는 데이터
    enableColumnResizing: true, // 컬럼 사이 간격 조절
    enableTopToolbar: true, // 테이블 위 옵션들
    renderTopToolbar: () => {
      if (!enableTopToolbar) return <div />;
    },
    enableRowNumbers: true, //
    enableRowSelection: true,
    enableSorting: true, // 컬럼 안에서 sorting
    enablePagination: false,
    enableColumnActions: false,
    muiTableHeadCellProps: ({ column }) =>
      column.id === 'mrt-row-numbers'
        ? {
            title: 'Row Numbers',
            children: 'No',
            sx: { textAlign: 'center' },
          }
        : {},
    enableMultiSort: true,

    // 테이블 전체 스타일링
    // muiTablePaperProps: {
    //   sx: {
    //     background: 'blue',
    //     boxShadow: 'none',
    //     borderRadius: '10px',
    //     padding: '20px',
    //   },
    // },

    // muiTableProps: {
    //   sx: {
    //     '& .MuiTableHead-root': {
    //       opacity: 1,
    //       background: 'red',
    //     },
    //   },
    // },
  });

  return <MaterialReactTable table={table} />;
};

export default StaticTable;
