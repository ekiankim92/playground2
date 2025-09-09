import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationData } from '../types';
import { matchDynamicPath } from '../utils';

/**
 * 브레드크럼 항목의 인터페이스를 정의합니다.
 *
 * text - 표시할 텍스트
 * path - 이동할 경로
 * icon - 아이콘 (선택적)
 * isCurrentPage - 현재 페이지 여부
 */
interface BreadcrumbItem {
  text: string;
  path: string;
  icon?: string;
  isCurrentPage: boolean;
}

/**
 * 브레드크럼 데이터를 생성하는 커스텀 훅
 *
 * 현재 경로에 맞는 브레드크럼 항목들을 생성합니다.
 * 버킷 상세 페이지의 경우 버킷 이름을 포함하여 표시합니다.
 *
 * @param navigationData - 네비게이션 경로 데이터 배열
 * @returns 현재 경로에 맞는 브레드크럼 항목 배열
 */
export const useBreadcrumbs = (navigationData: NavigationData[]) => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const result: BreadcrumbItem[] = [];
    const currentPath = location.pathname;

    /**
     * 브레드크럼 항목을 결과 배열에 추가하는 함수
     *
     * @param item - 네비게이션 항목
     * @param isCurrentPage - 현재 페이지 여부
     */
    const addBreadcrumb = (item: NavigationData, isCurrentPage: boolean) => {
      if (item.title) {
        result.push({
          text: item.title,
          // 현재 페이지인 경우 실제 URL을, 아닌 경우 정의된 path 사용
          path: isCurrentPage ? currentPath : item.path || '',
          isCurrentPage,
        });
      }
    };

    /**
     * 현재 경로와 일치하는 네비게이션 항목을 찾는 함수
     *
     * @param items - 검색할 네비게이션 항목 배열
     * @returns 일치하는 항목을 찾았는지 여부
     */
    const findPath = (items: NavigationData[]) => {
      for (const item of items) {
        if (item.path === currentPath || (item.path && matchDynamicPath(item.path, currentPath))) {
          addBreadcrumb(item, true);
          return true;
        }

        if (item.items) {
          const found = item.items.some((subItem) => {
            if (subItem.path === currentPath || (subItem.path && matchDynamicPath(subItem.path, currentPath))) {
              if (!item.hide) {
                addBreadcrumb(item, false);
              }
              addBreadcrumb(subItem, true);
              return true;
            }
            return false;
          });

          if (found) return true;
        }
      }
      return false;
    };

    findPath(navigationData);
    return result;
  }, [location.pathname, navigationData]);

  return breadcrumbs;
};
