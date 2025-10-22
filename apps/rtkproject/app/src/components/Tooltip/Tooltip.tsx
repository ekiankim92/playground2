import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  MiddlewareData,
  offset,
  Placement,
  ReferenceType,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { CSSProperties, useCallback, useRef, useState } from 'react';

import { Caption3 } from '@/components/common/Typography';
import { constZIndex } from '@/util/GlobalZIndex';
import styled from 'styled-components';

/**
 * 툴팁의 스타일 모드를 정의합니다.
 */
type ToolTipStyleMode = 'default' | 'tail' | 'noStyle';

interface TooltipProps {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
  disableTooltip?: boolean;
  initialState?: boolean;
  position?: Placement;
  mode?: ToolTipStyleMode; // 말풍선 모양을 선택할 수 있는 모드 추가
  positionOffset?: number;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  zIndex?: number;
  tooltipTriggerStyle?: React.CSSProperties;
  showDelay?: number; // 나타날 때의 딜레이 추가
  hideDelay?: number; // 사라질 때의 딜레이 추가
  clickable?: boolean; // 툴팁 내용를 클릭/상호작용 가능하게 하는 속성 추가
}

/**
 * 툴팁 컴포넌트
 * @param {TooltipProps} props - 툴팁 컴포넌트 속성
 */
const Tooltip: React.FC<TooltipProps> = ({
  tooltipContent,
  children,
  disableTooltip = false,
  initialState = false,
  position = 'top',
  mode = 'tail',
  positionOffset = 6,
  color = 'var(--Grey-G-10)',
  borderColor = 'var(--Semantic-D-20_L-50)',
  backgroundColor = 'var(--Semantic-D-60_L-80)',
  zIndex = constZIndex['foreground-0'],
  tooltipTriggerStyle,
  showDelay = 150, // 기본값 설정
  hideDelay = 50, // 기본값 설정
  clickable = false, // 기본적으로 툴팁 내용 클릭 비활성화 설정
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const isHoveringTooltip = useRef<boolean>(false);

  // useFloating 훅을 사용하여 Tooltip의 위치와 관련된 설정을 관리
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen && !disableTooltip, // disableTooltip이 true이면 툴팁이 열리지 않도록 설정
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate, // Tooltip이 화면에 표시되는 동안 위치를 자동으로 업데이트
    middleware: [
      offset(positionOffset), // Tooltip을 참조 요소에서 일정 거리만큼 떨어뜨림
      flip({
        fallbackAxisSideDirection: 'start', // Tooltip이 화면 밖으로 나갈 경우 시작 방향으로 뒤집음
      }),
      shift(), // Tooltip을 화면 안에 유지하기 위해 위치를 이동
      arrow({ element: arrowRef }), // 화살표 위치 계산
    ],
  });

  // Tooltip이 참조 요소에 포커스될 때 열림 상태로 변경하는 이벤트 리스너
  const focus = useFocus(context);

  // Tooltip을 외부 클릭이나 ESC 키 누름으로 닫히게 하는 이벤트 리스너
  const dismiss = useDismiss(context);

  // 스크린 리더를 위한 role 속성 설정
  const role = useRole(context, { role: 'tooltip' });

  // 모든 인터랙션 훅을 통합하여 prop getter 생성
  const { getReferenceProps, getFloatingProps } = useInteractions([focus, dismiss, role]);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), showDelay);
  }, [showDelay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // clickable이 true인 경우 툴팁에 마우스 hover 상태이면 닫히지 않게 함
    if (clickable && isHoveringTooltip.current) {
      return;
    }

    timeoutRef.current = setTimeout(() => setIsOpen(false), hideDelay);
  }, [hideDelay, clickable]);

  // 툴팁에 마우스가 진입했을 때
  const handleTooltipMouseEnter = useCallback(() => {
    if (clickable) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      isHoveringTooltip.current = true;
    }
  }, [clickable]);

  // 툴팁에서 마우스가 나갔을 때
  const handleTooltipMouseLeave = useCallback(() => {
    if (clickable) {
      isHoveringTooltip.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsOpen(false), hideDelay);
    }
  }, [clickable, hideDelay]);

  return (
    <>
      <ToolTipTrigger
        ref={refs.setReference as React.RefCallback<ReferenceType>}
        {...getReferenceProps()}
        style={tooltipTriggerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </ToolTipTrigger>
      {/* tooltip 영역 */}
      {isOpen && !disableTooltip && (
        <FloatingPortal>
          <TooltipContainer
            className='Tooltip'
            $zIndex={zIndex}
            ref={refs.setFloating}
            mode={mode}
            style={floatingStyles}
            {...getFloatingProps()}
            $clickable={clickable}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            $borderColor={borderColor}
            $backgroundColor={backgroundColor}
          >
            {typeof tooltipContent === 'string' || typeof tooltipContent === 'number' ? (
              <Caption3 color={color}>{tooltipContent}</Caption3>
            ) : (
              tooltipContent
            )}
            {mode === 'tail' && (
              <Arrow
                borderColor={borderColor}
                backgroundColor={backgroundColor}
                placement={context.placement}
                arrowRef={arrowRef}
                refsFloating={refs.floating}
                middlewareData={middlewareData}
              />
            )}
          </TooltipContainer>
        </FloatingPortal>
      )}
    </>
  );
};

export { Tooltip, type ToolTipStyleMode as Mode, type TooltipProps };

/**
 * 툴팁 컨테이너의 속성을 정의합니다.
 */
interface TooltipContainerProps {
  mode: ToolTipStyleMode; // transient prop: $를 붙여서 transient prop으로 사용
  $borderColor?: string;
  $backgroundColor?: string;
  $zIndex: number;
  $clickable?: boolean; // 툴팁 내용 클릭 가능 여부
}

/**
 * 툴팁 트리거 스타일 컴포넌트
 */
const ToolTipTrigger = styled.div`
  width: fit-content;
  height: fit-content;
`;

/**
 * 툴팁 컨테이너 스타일 컴포넌트
 */
const TooltipContainer = styled.div<TooltipContainerProps>`
  z-index: ${({ $zIndex }) => $zIndex};
  position: relative;
  display: flex;
  flex-direction: column;
  /** clickable이 true인 경우 포인터 이벤트를 활성화하여 사용자 상호작용 가능하도록 설정 */
  pointer-events: ${({ $clickable }) => ($clickable ? 'auto' : 'none')};

  ${(props) =>
    props.mode !== 'noStyle' &&
    `
      // padding: 4px 8px;
      border-radius: var(--Radius-Small);
      border: 1px solid ${props.$borderColor};
      background: ${props.$backgroundColor};
    `}
`;

/**
 * 화살표 컴포넌트의 속성을 정의합니다.
 */
interface ArrowProps {
  borderColor: string;
  backgroundColor: string;
  placement: Placement;
  arrowRef: React.RefObject<HTMLDivElement>;
  refsFloating: React.RefObject<HTMLElement>;
  middlewareData: MiddlewareData;
}

/**
 * 말풍선 화살표 스타일 컴포넌트
 */
const SpeechBubbleArrow = styled.div<{
  $borderColor: string;
  $backgroundColor: string;
}>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${(props) => props.$backgroundColor};
  border: 1px solid ${(props) => props.$borderColor};
  transform: rotate(45deg);
`;

// Arrow 컴포넌트 정의
const Arrow: React.FC<ArrowProps> = ({
  borderColor,
  backgroundColor,
  placement,
  arrowRef,
  refsFloating,
  middlewareData,
}) => {
  // 화살표 외부 스타일 계산 함수
  const getArrowOuterStyles = (): CSSProperties => {
    const { arrow: arrowData } = middlewareData;
    if (!arrowData) return {};

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'];

    const arrowPadding = 6;

    let x = arrowData.x;
    let y = arrowData.y;

    const containerWidth = refsFloating.current?.offsetWidth ?? 0;
    const containerHeight = refsFloating.current?.offsetHeight ?? 0;
    const arrowWidth = arrowRef.current?.offsetWidth ?? 0;
    const arrowHeight = arrowRef.current?.offsetHeight ?? 0;

    if (x != null) {
      const minX = arrowPadding;
      const maxX = containerWidth - arrowWidth - arrowPadding;
      x = Math.max(minX, Math.min(x, maxX));
    }

    if (y != null) {
      const minY = arrowPadding;
      const maxY = containerHeight - arrowHeight - arrowPadding;
      y = Math.max(minY, Math.min(y, maxY));
    }

    const offsetStyles: Record<string, CSSProperties> = {
      top: { borderRight: 'none', borderBottom: 'none' },
      right: { borderBottom: 'none', borderLeft: 'none' },
      bottom: { borderLeft: 'none', borderTop: 'none' },
      left: { borderTop: 'none', borderRight: 'none' },
    };

    return {
      left: x != null ? `${x}px` : '',
      top: y != null ? `${y}px` : '',
      [staticSide]: '-4.5px',
      ...offsetStyles[staticSide],
    };
  };

  return (
    <SpeechBubbleArrow
      ref={arrowRef}
      style={getArrowOuterStyles()}
      className='arrow'
      $borderColor={borderColor}
      $backgroundColor={backgroundColor}
    />
  );
};
