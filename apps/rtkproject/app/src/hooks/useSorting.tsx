import { useCallback, useState } from 'react';

interface SortingState {
  id: string;
  desc: boolean;
}

interface UseSortingReturn<TData> {
  sorting: TData;
  setSorting: React.Dispatch<React.SetStateAction<TData>>;
  clearSorting: () => void;
}

export function useSorting<TData extends SortingState[]>(initialState?: TData): UseSortingReturn<TData> {
  const [sorting, setSorting] = useState<TData>(initialState ?? ([] as unknown as TData));

  const clearSorting = useCallback(() => {
    setSorting([] as unknown as TData);
  }, []);

  return {
    sorting,
    setSorting,
    clearSorting,
  };
}
