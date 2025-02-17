/**
 * SortingItem[] 은 type { MRT_SortingState } from "material-react-table"을 의미하는데
 * MRT_SortingState를 사용하면 MRT_SortingState 타입을 찾을 수 없어서 @tanstack/table-core의 타입 정의가 필요하다는 에러가 뜸 -> 그에 대한 동일한 피쳐의 interface를 선언하여 대체
 */
interface SortingItem {
  id: string;
  desc: boolean;
}

export const orderDecomposer = (sorting: SortingItem[]): string | undefined => {
  let orderingText: string | undefined = undefined;

  if (sorting.length > 0) {
    const id = sorting[0]?.id;
    // Single sort 이므로 sorting[0]만 조회
    const commonSortText = `${id}`;
    orderingText = `${sorting[0]?.desc ? '-' : ''}${commonSortText}`;
  }

  return orderingText;
};
