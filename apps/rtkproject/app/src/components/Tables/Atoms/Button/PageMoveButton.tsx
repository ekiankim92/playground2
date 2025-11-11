import { HistoryTabLeftBasicIcon } from '@/components/common/icon/HistoryTabLeftBasicIcon';
import { useCallback } from 'react';
import styled from 'styled-components';

/**
 * 페이지 이동 버튼의 방향을 정의하는 타입
 * 'prev' - 이전 페이지로 이동
 * 'next' - 다음 페이지로 이동
 */
type Direction = 'prev' | 'next';

/**
 * 페이지 이동 버튼 래퍼의 스타일 속성을 정의합니다.
 *
 * $direction - 버튼의 방향(이전/다음)
 * $color - 버튼의 색상
 * $disabled - 버튼의 비활성화 상태
 */
interface PageMoveButtonWrapperProps {
  $direction: Direction;
  $bgColor: string;
  $disabled?: boolean;
}

/**
 * 페이지 이동 버튼 컴포넌트의 속성을 정의합니다.
 *
 * direction - 버튼의 방향(이전/다음)
 * disabled - 버튼의 비활성화 상태
 * onMove - 페이지 이동 시 호출될 콜백 함수
 */
interface PageMoveButtonProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  onMove: (count: number) => void;
}

/**
 * 페이지 이동 버튼 컴포넌트
 *
 * 이전 또는 다음 페이지로 이동하는 화살표 버튼을 렌더링합니다.
 * 비활성화 상태에서는 클릭이 불가능하고 색상이 변경됩니다.
 */
const PageMoveButton = ({ direction, onMove, disabled }: PageMoveButtonProps) => {
  /**
   * 버튼 클릭 시 페이지 이동을 처리하는 함수
   *
   * 비활성화 상태가 아닐 때만 onMove 콜백을 호출합니다.
   * 이전 방향은 -1, 다음 방향은 +1 값을 전달합니다.
   */
  const moveFn = useCallback(() => {
    if (disabled) return;

    onMove(direction === 'prev' ? -1 : +1);
  }, [direction, disabled, onMove]);
  return (
    <PageMoveButtonWrapper $direction={direction} $bgColor={'var(--Gray-G0)'} onClick={moveFn} $disabled={disabled}>
      <HistoryTabLeftBasicIcon
        width={'8'}
        height={'8'}
        style={{ rotate: direction === 'prev' ? '0deg' : '180deg', color: disabled ? '#d0d0d7' : '#8d93a0' }}
      />
    </PageMoveButtonWrapper>
  );
};

export default PageMoveButton;

/**
 * 페이지 이동 버튼의 스타일 컴포넌트
 *
 * 원형 버튼 형태로, 호버 시 배경색이 변경됩니다.
 * 비활성화 상태에서는 호버 효과가 없고 커서가 기본값으로 표시됩니다.
 */
const PageMoveButtonWrapper = styled.div<PageMoveButtonWrapperProps>`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--Radius-Small);
  background-color: ${({ $bgColor: $bgColor }) => `${$bgColor}`};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  &:hover {
    background: ${({ $disabled }) => ($disabled ? 'transparent' : 'var(--BG-Depth1)')};
  }
`;
