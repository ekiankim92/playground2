/**
 * 동적 경로와 현재 경로가 일치하는지 확인하는 함수
 *
 * 동적 경로 패턴(예: '/users/:id')과 실제 현재 경로(예: '/users/123')를 비교하여
 * 패턴이 일치하는지 확인합니다. 콜론(:)으로 시작하는 경로 세그먼트는
 * 와일드카드로 취급되어 어떤 값이든 매칭됩니다.
 *
 * @param itemPath - 비교할 동적 경로 패턴 (예: '/users/:id')
 * @param currentPath - 현재 실제 경로 (예: '/users/123')
 * @returns 두 경로가 패턴적으로 일치하면 true, 그렇지 않으면 false
 */
export const matchDynamicPath = (itemPath: string, currentPath: string) => {
  const itemParts = itemPath.split('/');
  const currentParts = currentPath.split('/');

  if (itemParts.length !== currentParts.length) return false;

  return itemParts.every((part, index) => {
    if (part.startsWith(':')) return true;
    return part === currentParts[index];
  });
};
