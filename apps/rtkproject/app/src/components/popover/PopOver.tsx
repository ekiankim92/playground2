import {
  type Placement,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { useEffect } from 'react';

import styled from 'styled-components';

/**
 * 팝오버의 배치 위치 옵션 배열
 * 팝오버가 표시될 수 있는 모든 가능한 위치를 정의합니다.
 */
const PLACEMENT: Placement[] = [
  'top',
  'top-end',
  'top-start',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
];

/**
 * 팝오버 콘텐츠의 스타일 컴포넌트
 */
const PopOverRefContent = styled.div`
  outline: none;
`;

/**
 * 팝오버 컴포넌트의 속성을 정의합니다.
 *
 * isOpen - 팝오버의 열림 상태
 * changeIsOpen - 팝오버 상태를 변경하는 함수
 * placement - 팝오버가 표시될 위치
 * offsetValue - 팝오버의 오프셋 값 (주축 및 교차축)
 * fallbackPlacements - 기본 위치에 표시할 수 없을 때 대체할 위치 배열
 * refStyle - 팝오버 컨테이너의 추가 스타일
 * children - 팝오버 내부에 표시될 콘텐츠
 * triggerRef - 팝오버를 트리거하는 요소의 참조
 */
interface PopoverProps {
  isOpen: boolean;
  changeIsOpen: (isOpen: boolean) => void;
  placement?: Placement;
  offsetValue?: {
    mainAxis?: number;
    crossAxis?: number;
  };
  fallbackPlacements?: Placement[];
  refStyle?: React.CSSProperties;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
}

/**
 * 팝오버 컴포넌트
 *
 * 특정 요소에 연결되어 표시되는 팝오버 컴포넌트입니다.
 * Floating UI를 사용하여 위치 계산 및 상호작용을 처리합니다.
 */
const Popover = ({
  isOpen,
  placement = 'bottom',
  offsetValue,
  changeIsOpen,
  fallbackPlacements = PLACEMENT,
  refStyle,
  children,
  triggerRef,
}: PopoverProps) => {
  const mainAxis = offsetValue?.mainAxis ?? 0;
  const crossAxis = offsetValue?.crossAxis ?? 0;

  /**
   * Floating UI의 useFloating 훅을 사용하여 팝오버의 위치와 상태를 관리합니다.
   */
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: placement,
    onOpenChange: changeIsOpen,
    middleware: [
      offset(({ placement }) => {
        const sign = placement.startsWith('top') ? 1 : -1;
        return {
          mainAxis: sign * mainAxis,
          crossAxis: sign * crossAxis,
        };
      }),
      flip({
        fallbackAxisSideDirection: 'end',
        fallbackPlacements: fallbackPlacements,
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  /**
   * 팝오버 외부 클릭 시 닫히도록 하는 기능을 설정합니다.
   */
  const dismiss = useDismiss(context, {
    outsidePress: true,
    outsidePressEvent: 'mousedown',
  });

  /**
   * 팝오버의 ARIA 역할을 설정합니다.
   */
  const role = useRole(context);

  /**
   * 팝오버의 상호작용 속성을 설정합니다.
   */
  const { getFloatingProps } = useInteractions([dismiss, role]);

  /**
   * 트리거 요소의 참조가 변경될 때 Floating UI의 참조를 업데이트합니다.
   */
  useEffect(() => {
    if (triggerRef && triggerRef.current) {
      refs.setReference(triggerRef.current);
    }
  }, [triggerRef, refs]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <PopOverRefContent ref={refs.setFloating} style={{ ...floatingStyles, ...refStyle }} {...getFloatingProps()}>
          {children}
        </PopOverRefContent>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

export default Popover;
