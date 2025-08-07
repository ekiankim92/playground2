'use client';
import { getColWidth } from '@/components/organism/data-table/common/util/columnWidth';
import PaginatedDataTable from '@/components/organism/data-table/PaginatedDataTable';
import { useColumnFilters } from '@/hooks/useColumnFilters';
import usePagination from '@/hooks/usePagination';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useQuery } from '@tanstack/react-query';
import { CellContext, RowData } from '@tanstack/react-table';
import axios from 'axios';
import '../../../../components/organism/data-table/common/styles/tableStyles.css';

const FIXED_COLUMN_SIZE = {
  idx: 80,
  occurredAt: 130,
};

export default function SaaSPage() {
  const { pagination, setPagination } = usePagination();
  const { columnFilters, setColumnFilters } = useColumnFilters();
  const { screenWidth } = useWindowSize();

  const colWidth = getColWidth({ fixedColumnSizes: FIXED_COLUMN_SIZE, columnLen: 5, screenWidth });

  const { data } = useQuery({
    queryKey: ['EnforceAppLockerAlarm', pagination],
    queryFn: async () => {
      const { offset, limit } = pagination;

      const res = await axios.get(
        `http://192.168.6.3/api/v1/enforce/applocker/alarm?hostname=&limit=${limit}&occurred_at=2025-04-30%2C2025-07-29&offset=${offset}&search=&value=`,
      );

      return res?.data;
    },
  });

  const columns = [
    {
      id: 'blank',
      header: () => null,
      columns: [
        {
          accessorKey: 'idx',
          header: '아이디',
          meta: {
            filterVariant: 'text',
          },
          size: 80,
        },
        {
          accessorKey: 'occurredAt',
          header: '일시',
          cell: ({ cell }: CellContext<RowData, string>) => {
            const value = cell.getValue() as string;
            return <div>{value.split('T')[0]}</div>;
          },
          size: 130,
        },
      ],
    },
    {
      header: '계정',
      columns: [
        { accessorKey: 'ipAddress', header: 'IP Address', size: colWidth },
        { accessorKey: 'hostname', header: 'Hostname', size: colWidth },
      ],
    },
    {
      header: '행위',
      columns: [{ accessorKey: 'policyCode', header: '코드', size: colWidth }],
    },
  ];

  return (
    <div>
      <div>SaaSPage</div>
      <div>Table!</div>
      <PaginatedDataTable
        tableData={data?.data}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={data?.count}
        colWidth={colWidth}
      />
    </div>
  );
}
