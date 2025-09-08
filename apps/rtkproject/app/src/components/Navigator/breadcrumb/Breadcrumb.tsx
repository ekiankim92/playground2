import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRightIcon } from '../../icon/ChevronRightIcon';
import { NavigationData } from '../types';
import { useBreadcrumbs } from './useBreadcrumbs';

/**
 * 브레드크럼 컴포넌트의 속성을 정의합니다.
 *
 * navigationData - 네비게이션 경로 데이터 배열
 * onNavigate - 경로 이동 시 호출되는 콜백 함수
 */
interface BreadcrumbsProps {
  navigationData: NavigationData[];
  onNavigate?: (path: string) => void;
}

/**
 * 브레드크럼 컴포넌트
 *
 * 현재 페이지의 계층 구조를 표시하는 네비게이션 컴포넌트입니다.
 * 사용자가 현재 위치를 파악하고 상위 페이지로 쉽게 이동할 수 있도록 도와줍니다.
 */
export const Breadcrumbs = memo(({ navigationData, onNavigate }: BreadcrumbsProps) => {
  const breadcrumbs = useBreadcrumbs(navigationData);

  /**
   * 브레드크럼 항목 클릭 시 처리하는 함수
   *
   * path - 이동할 경로
   */
  const handleClick = (path: string) => {
    onNavigate?.(path);
  };

  if (breadcrumbs.length === 0) return null;

  return (
    <BreadcrumbContainer aria-labelledby='breadcrumb-label'>
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path || index}>
          <BreadcrumbItem>
            <StyledLink
              to={item.path || '#'}
              onClick={() => handleClick(item.path || '#')}
              $isCurrentPage={item.isCurrentPage}
            >
              {item.text}
            </StyledLink>
          </BreadcrumbItem>
          {index < breadcrumbs.length - 1 && (
            <Separator>
              <ChevronRightIcon width={24} height={24} />
            </Separator>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

/**
 * 브레드크럼 컨테이너 스타일 컴포넌트
 */
const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
`;

/**
 * 브레드크럼 항목 스타일 컴포넌트
 */
const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 4px;

  &:hover {
    border-radius: var(--Radius-Small);
    background: var(--BG-Depth1);
  }
`;

/**
 * 브레드크럼 링크 스타일 컴포넌트
 *
 * $isCurrentPage - 현재 페이지 여부
 */
const StyledLink = styled(Link)<{ $isCurrentPage?: boolean }>`
  color: var(--Gray-G75);
  text-decoration: none;
  font-size: 14px;
`;

/**
 * 브레드크럼 항목 구분자 스타일 컴포넌트
 */
const Separator = styled.div`
  color: var(--Gray-G75);
  display: flex;
  align-items: center;
`;
