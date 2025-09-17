import { ReactNode } from 'react';

/**
 * 네비게이션 데이터의 구조를 정의하는 인터페이스
 */
export interface NavigationData {
  /**
   * 네비게이션 항목의 깊이 레벨
   * 1은 최상위 메뉴, 2 이상은 하위 메뉴를 나타냅니다.
   */
  level: number;

  /**
   * 네비게이션 항목의 제목
   * 사용자에게 표시되는 메뉴 이름입니다.
   */
  title: string;

  /**
   * 하위 네비게이션 항목들
   * 현재 항목의 하위 메뉴를 정의합니다. (선택적)
   */
  items?: NavigationData[];

  /**
   * 네비게이션 항목의 경로
   * 해당 메뉴 클릭 시 이동할 URL 경로입니다. (선택적)
   */
  path?: string;

  /**
   * 네비게이션 항목의 아이콘
   * 메뉴 옆에 표시될 아이콘 컴포넌트입니다. (선택적)
   */
  icon?: ReactNode;

  /**
   * 네비게이션 항목 숨김 여부
   * true로 설정 시 해당 항목이 네비게이션에서 숨겨집니다. (선택적)
   */
  hide?: boolean;

  /**
   * MLOps 메뉴 여부
   * true로 설정 시 해당 메뉴는 MLOps 메뉴입니다. (선택적)
   */
  isMLOps?: boolean;
}
