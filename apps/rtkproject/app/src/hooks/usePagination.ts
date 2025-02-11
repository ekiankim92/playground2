import { useCallback, useState } from 'react';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface UsePaginationReturn<TData> {
  pagination: TData;
  setPagination: React.Dispatch<React.SetStateAction<TData>>;
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const INITIAL_PAGE_INFO = {
  pageSize: 20,
  pageIndex: 0,
};

export default function usePagination<TData extends PaginationState>(
  initialState: TData = INITIAL_PAGE_INFO as TData,
): UsePaginationReturn<TData> {
  const [pagination, setPagination] = useState<TData>(initialState);

  const onPageChange = useCallback((newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex,
    }));
  }, []);

  const onPageSizeChange = useCallback((newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0,
    }));
  }, []);

  return {
    pagination,
    setPagination,
    onPageChange,
    onPageSizeChange,
  };
}
