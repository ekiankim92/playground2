import { type Placement } from '@floating-ui/react';

import { Caption2 } from '@/components/common/Typography';
import styled from 'styled-components';

import { Icon } from '@/components/common/Icon';
import { ellipsisText } from '@/util';

import { ChevronSingleIcon } from '../icon/ChevronSingleIcon';

/**
 * 드롭다운의 외부 컨테이너 스타일을 정의합니다.
 * @param {boolean} $isOpen - 드롭다운이 열려있는지 여부
 * @param {number} $offset - 드롭다운 메뉴의 오프셋
 * @param {boolean} $disabled - 드롭다운 비활성화 여부
 * @param {Placement} $placement - 드롭다운 메뉴의 위치
 */
export const DropdownWrapper = styled.div<{
  $isOpen: boolean;
  $offset: number;
  $disabled: boolean;
  $placement: Placement;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  width: 248px;
  height: 40px;
  gap: 4px;
  padding: 0px 12px;

  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  border: 1px solid #b4b4b4;
  border-radius: ${({ $isOpen, $offset, $placement }) =>
    $isOpen && $offset === 0
      ? $placement.startsWith('bottom')
        ? '8px 8px 0 0'
        : $placement.startsWith('top')
        ? '0 0 8px 8px'
        : '8px'
      : '8px'};

  &:focus {
    border: 1px solid #7b7b7b;
  }
`;

/**
 * 드롭다운의 확장 아이콘 스타일을 정의합니다.
 * @param {boolean} $isOpen - 드롭다운이 열려있는지 여부
 */
export const ExpandIcon = styled(Icon).attrs({
  component: ChevronSingleIcon,
})<{ $isOpen: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.3s ease;

  svg {
    color: #000;
    width: 16px;
    height: 16px;
  }
`;

/**
 * 드롭다운 메뉴의 외부 컨테이너 스타일을 정의합니다.
 * @param {number} $offset - 드롭다운 메뉴의 오프셋
 * @param {Placement} $placement - 드롭다운 메뉴의 위치
 */
export const DropdownMenuWrapper = styled.div<{ $offset: number; $placement: Placement }>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  outline: none;
  z-index: 10000;
  border: 1px solid #b4b4b4;
  border-radius: ${({ $offset, $placement }) =>
    $offset === 0
      ? $placement.startsWith('bottom')
        ? '0 0 8px 8px'
        : $placement.startsWith('top')
        ? '8px 8px 0 0'
        : '8px'
      : '8px'};
`;

/**
 * 검색 입력 필드의 외부 컨테이너 스타일을 정의합니다.
 */
export const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0px 8px 0px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-bottom: 1px solid #ddd;
  background: #fff;
`;

/**
 * 검색 입력 필드의 스타일을 정의합니다.
 */
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: #000;
  background-color: transparent;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.3px;
`;

/**
 * 드롭다운 메뉴의 스타일을 정의합니다.
 * @param {boolean} $scrollable - 스크롤 가능 여부
 * @param {string} $scrollMaxHeight - 최대 스크롤 높이
 */
export const DropdownMenu = styled.div<{
  $scrollable: boolean;
  $scrollMaxHeight: string;
}>`
  width: 100%;
  outline: none;
  background: #fff;
  ${({ $scrollable, $scrollMaxHeight }) =>
    $scrollable
      ? `
    max-height: ${$scrollMaxHeight};
    overflow-y: auto;
  `
      : `
    max-height: auto;
  `}
`;

/**
 * 드롭다운 옵션 아이템의 속성을 정의합니다.
 */
export interface OptionItemProps {
  $isActive: boolean;
  $isSelected: boolean;
  $hasIcon: boolean;
  $disabled?: boolean;
}

/**
 * 드롭다운 옵션 아이템의 스타일을 정의합니다.
 */
export const DropdownOptionItemWrapper = styled.div<OptionItemProps>`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  height: 40px;
  outline: none;
  padding: 0px 12px;
  align-items: center;
  gap: ${({ $hasIcon }) => ($hasIcon ? '4px' : 0)};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  border-bottom: 1px solid #e1e2e3;
  background: ${({ $disabled, $isSelected, $isActive }) =>
    $disabled ? 'var(--BG-Depth1)' : $isSelected ? '#eaeef4' : $isActive ? '#fff' : '#fff'};

  &:hover {
    background: ${({ $disabled, $isSelected }) =>
      $disabled ? 'var(--BG-Depth1)' : $isSelected ? '#eaeef4' : '#f3f4f4'};
  }

  &:active {
    background: ${({ $disabled }) => ($disabled ? 'var(--BG-Depth1)' : '#eaeef4')};
  }

  &:last-child {
    border-bottom: none;
  }
`;

/**
 * 텍스트 말줄임이 적용된 라벨 스타일을 정의합니다.
 */
export const TextEllipsisLabelBody6 = styled(Caption2).attrs({
  fontWeight: 400,
})`
  width: 100%;
  ${ellipsisText};
  color: #000;
`;

/**
 * 기본 메시지 스타일을 정의합니다.
 */
export const DefaultMessage = styled.span`
  font-size: 12px;
  margin-top: 6px;
  margin-left: 6px;
`;

/**
 * 에러 메시지 스타일을 정의합니다.
 */
export const ErrorMessage = styled(DefaultMessage)`
  color: #ea4310;
`;

/**
 * 무한 스크롤 관찰 대상의 스타일을 정의합니다.
 */
const ObserverTarget = styled.div`
  width: 100%;
  height: 40px;
`;

/**
 * 로딩 스피너 컨테이너의 스타일을 정의합니다.
 */
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

/**
 * 로딩 스피너의 스타일을 정의합니다.
 */
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * 무한 스크롤 타겟 컴포넌트의 속성을 정의합니다.
 */
interface InfiniteScrollTargetProps {
  hasMore: boolean;
  isLoading: boolean;
  lastItemRef: (node: HTMLElement | null) => void;
}

/**
 * 무한 스크롤 타겟 컴포넌트를 렌더링합니다.
 * @param {InfiniteScrollTargetProps} props - 컴포넌트 속성
 * @returns {JSX.Element | null} 렌더링된 컴포넌트 또는 null
 */
export const InfiniteScrollTarget = ({ hasMore, isLoading, lastItemRef }: InfiniteScrollTargetProps) => {
  if (!hasMore) return null;

  return (
    <ObserverTarget ref={lastItemRef}>
      {isLoading && (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      )}
    </ObserverTarget>
  );
};
