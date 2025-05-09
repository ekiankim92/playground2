import React, { useCallback, useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { Head6 } from '@/components/common/Typography';
import styled from 'styled-components';
import { XmarkIcon } from '../icon/XmarkIcon';

/**
 * 드로어가 열릴 때 부모 요소를 밀어내는 효과를 처리하는 훅
 *
 * isOpen - 드로어의 열림 상태
 * displayMode - 드로어 표시 모드 ('push' 또는 'overlay')
 * parentRef - 밀어낼 부모 요소의 참조
 * width - 드로어의 너비
 * widthHorizontalOffset - 너비 계산 시 적용할 가로 오프셋
 */
const usePushDrawerEffect = (
  isOpen: boolean,
  displayMode: 'push' | 'overlay',
  parentRef: React.RefObject<HTMLElement> | undefined,
  width: string,
  widthHorizontalOffset: string,
) => {
  const isInitialRender = useRef(true);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    if (displayMode !== 'push' || !parentRef?.current) return;

    const parentElement = parentRef.current;

    const marginLeft = calculateMargin(width, widthHorizontalOffset);

    if (isInitialRender.current) {
      parentElement.style.transition = isOpen ? 'none' : `margin 0.3s ease-in-out`;
      parentElement.style.marginLeft = isOpen ? marginLeft : '0';
      isInitialRender.current = false;
    } else {
      parentElement.style.transition = `margin 0.3s ease-in-out`;
      parentElement.style.marginLeft = isOpen ? marginLeft : '0';
    }

    prevIsOpenRef.current = isOpen;

    return () => {
      if (parentElement) {
        parentElement.style.transition = 'none';
      }
    };
  }, [isOpen, displayMode, parentRef, width, widthHorizontalOffset]);
};

/**
 * 드로어 컴포넌트의 방향을 정의하는 타입
 */
type DrawerDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * 드로어 컴포넌트의 기본 속성
 *
 * isOpen - 드로어의 열림 상태
 * children - 드로어 내부에 표시될 자식 요소
 * headerTitle - 드로어 헤더 제목
 * subTitle - 드로어 부제목
 * onClose - 드로어가 닫힐 때 호출되는 콜백 함수
 * removeDimmer - 배경 딤 효과 제거 여부
 * containerRef - 드로어가 렌더링될 컨테이너 요소의 참조
 * backgroundOverflowAllow - 배경의 오버플로우 허용 여부
 * allowOverlayDismiss - 오버레이 클릭으로 드로어 닫기 허용 여부
 * usePortal - React Portal 사용 여부
 */
type BaseDrawerProps = {
  isOpen: boolean;
  children: React.ReactNode;
  headerTitle?: string;
  subTitle?: string;
  onClose?: () => void;
  removeDimmer?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
  backgroundOverflowAllow?: boolean;
  allowOverlayDismiss?: boolean;
  usePortal?: boolean;
};

/**
 * 드로어 컴포넌트의 스타일 관련 속성
 *
 * width - 드로어의 너비
 * widthHorizontalOffset - 너비 계산 시 적용할 가로 오프셋
 * height - 드로어의 높이
 * direction - 드로어가 나타나는 방향
 * margin - 드로어의 마진
 * contentPadding - 드로어 내용의 패딩
 * zIndex - 드로어의 z-index 값
 * removeDimmer - 배경 딤 효과 제거 여부
 * overlayColor - 오버레이 색상
 * boxShadow - 드로어의 그림자 효과
 * transition - 드로어 애니메이션 전환 효과
 * backgroundColor - 드로어의 배경색
 * headerStyle - 헤더 스타일
 * subHeaderStyle - 부제목 스타일
 * bodyStyle - 본문 스타일
 * style - 드로어 컨테이너 스타일
 */
type BaseDrawerStyleProps = {
  width?: string;
  widthHorizontalOffset?: string;
  height?: string;
  direction?: DrawerDirection;
  margin?: string;
  contentPadding?: string;
  zIndex?: number;
  removeDimmer?: boolean;
  overlayColor?: string;
  boxShadow?: string;
  transition?: string;
  backgroundColor?: string;
  headerStyle?: CSSProperties;
  subHeaderStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
};

/**
 * 'push' 모드 드로어의 속성
 */
type PushDrawerProps = BaseDrawerProps & {
  displayMode: 'push';
  parentRef: React.RefObject<HTMLElement>;
};

/**
 * 'overlay' 모드 드로어의 속성
 */
type OverlayDrawerProps = BaseDrawerProps & {
  displayMode?: 'overlay';
  parentRef?: never;
};

/**
 * 드로어 컴포넌트의 전체 속성
 */
type DrawerProps = (PushDrawerProps | OverlayDrawerProps) & BaseDrawerStyleProps;

/**
 * 드로어 컴포넌트
 *
 * 화면의 측면에서 슬라이딩되어 나타나는 패널 컴포넌트입니다.
 * 'push' 또는 'overlay' 모드로 동작하며, 다양한 방향과 스타일 옵션을 지원합니다.
 */
const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  direction = 'right',
  displayMode = 'overlay',
  headerTitle,
  subTitle,
  width = '536px',
  widthHorizontalOffset = '0px',
  height = '100%',
  backgroundColor,
  style,
  headerStyle = {
    padding: '16px 8px',
  },
  subHeaderStyle = {
    margin: '0 16px 13px',
  },
  bodyStyle = {
    paddingTop: '16px',
  },
  margin,
  removeDimmer = false,
  allowOverlayDismiss = false,
  containerRef,
  parentRef,
  usePortal = true,
  overlayColor = 'transparent',
  backgroundOverflowAllow = false,
  boxShadow = '-4px 0px 24px 0px rgba(23, 23, 25, 0.12)',
  transition = 'all 0.3s ease-in-out, opacity 0.3s ease-in-out',
  contentPadding = '',
  zIndex = 9999,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [prevDirection, setPrevDirection] = useState<DrawerDirection>(direction);

  useEffect(() => {
    setContainer(containerRef?.current || (typeof window !== 'undefined' ? document.body : null));
  }, [containerRef]);

  useEffect(() => {
    if (isOpen) {
      setPrevDirection(direction);
    }
  }, [isOpen, direction]);

  usePushDrawerEffect(isOpen, displayMode, parentRef, width, widthHorizontalOffset);

  useEffect(() => {
    if (backgroundOverflowAllow && container) {
      const targetContainer = container;
      const originalOverflow = targetContainer.style.overflow;
      if (isOpen) {
        targetContainer.style.overflow = 'hidden';
      }
      return () => {
        targetContainer.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, container, backgroundOverflowAllow]);

  const handleOverlayClick = () => allowOverlayDismiss && onClose && onClose();

  const renderDrawer = useCallback(
    (DrawerComponent: React.ComponentType<PropsWithChildren<DrawerContainerProps>>) => (
      <DrawerComponent
        $isOpen={isOpen}
        $isActive={direction === prevDirection}
        $margin={margin}
        $width={width}
        $height={height}
        $boxShadow={boxShadow}
        $transition={transition}
        $padding={contentPadding}
        $zIndex={zIndex}
        $displayMode={displayMode}
        $backgroundColor={backgroundColor}
        {...(style && { style })}
      >
        {onClose && (
          <CloseIconButtonWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: '#fff',
                border: '1px solid var(--g10)',
                borderRadius: '6px 0 0 6px',
                cursor: 'pointer',
              }}
              onClick={onClose}
            >
              <XmarkIcon width={32} height={32} />
            </div>
          </CloseIconButtonWrapper>
        )}
        {headerTitle && (
          <DrawerHeaderWrapper style={headerStyle}>
            {headerTitle && <DrawerHeaderText>{headerTitle}</DrawerHeaderText>}
          </DrawerHeaderWrapper>
        )}
        {subTitle && <SubTitle style={subHeaderStyle}>{subTitle && subTitle}</SubTitle>}
        <DrawerContent style={bodyStyle}>{children}</DrawerContent>
      </DrawerComponent>
    ),
    [
      isOpen,
      direction,
      prevDirection,
      margin,
      width,
      height,
      boxShadow,
      transition,
      contentPadding,
      zIndex,
      displayMode,
      backgroundColor,
      style,
      headerTitle,
      onClose,
      headerStyle,
      bodyStyle,
      children,
    ],
  );

  const drawerContent = (
    <>
      {!removeDimmer && displayMode === 'overlay' && (
        <DrawerDimmer
          $zIndex={zIndex - 1}
          $isOpen={isOpen}
          onClick={handleOverlayClick}
          $backgroundColor={overlayColor}
        />
      )}
      {direction === 'left' && renderDrawer(LeftDrawer)}
      {direction === 'right' && renderDrawer(RightDrawer)}
      {direction === 'top' && renderDrawer(TopDrawer)}
      {direction === 'bottom' && renderDrawer(BottomDrawer)}
    </>
  );

  if (displayMode === 'push') {
    return drawerContent;
  }

  if (usePortal && container) {
    return createPortal(drawerContent, container);
  }

  return drawerContent;
};

/**
 * 드로어 컨테이너의 속성
 */
interface DrawerContainerProps {
  $isOpen: boolean;
  $isActive: boolean;
  $width: string;
  $height: string;
  $boxShadow: string;
  $transition: string;
  $padding: string;
  $margin?: string;
  $backgroundColor?: string;
  $zIndex?: number;
  $displayMode?: 'overlay' | 'push';
}

const BaseDrawerContainer = styled.div<DrawerContainerProps>`
  position: ${(props) => (props.$displayMode === 'push' ? 'absolute' : 'absolute')};
  top: 0;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#fff'};
  box-shadow: ${(props) => props.$boxShadow};
  z-index: ${({ $zIndex }) => $zIndex};
  transition: ${(props) => props.$transition};
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  pointer-events: ${(props) => (props.$isActive && props.$isOpen ? 'auto' : 'none')};
  padding: ${(props) => props.$padding};
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--g10);
`;

const LeftDrawer = styled(BaseDrawerContainer)`
  left: 0;
  transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
`;

const RightDrawer = styled(BaseDrawerContainer)`
  padding: 8px 24px 32px 24px;
  top: 0;
  right: 0;
  transform: translateX(${(props) => (props.$isOpen ? '0' : 'calc(100% + 40px)')});
`;

const TopDrawer = styled(BaseDrawerContainer)`
  top: 0;
  left: 0;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  transform: translateY(${(props) => (props.$isOpen ? '0' : '-100%')});
`;

const BottomDrawer = styled(BaseDrawerContainer)`
  bottom: 0;
  left: 0;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  transform: translateY(${(props) => (props.$isOpen ? '0' : '100%')});
`;

const DrawerDimmer = styled.div<{ $isOpen: boolean; $backgroundColor: string; $zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$backgroundColor};
  z-index: ${(props) => props.$zIndex};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
`;

const DrawerHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  border-bottom: 1px solid #e7e9ed;
  padding-bottom: 8px;
`;

const DrawerHeaderText = styled(Head6).attrs({ fontWeight: 700 })`
  font-size: 20px;
  color: #1d1f22;

  flex: 1;
`;

const SubTitle = styled.div`
  font-size: 17px;
  color: #72747a;
`;

const DrawerContent = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const CloseIconButtonWrapper = styled.div`
  position: absolute;
  left: -40px;
  top: 16px;
`;

export { Drawer, type DrawerContainerProps, type DrawerProps };

/**
 * 너비의 단위값을 기준으로 마진을 계산하는 함수
 *
 * width - 드로어의 너비
 * widthOffset - 너비 계산 시 적용할 오프셋
 */
function calculateMargin(width: string, widthOffset: string) {
  const widthValue = parseFloat(width); // width의 숫자 부분
  const offsetValue = parseFloat(widthOffset); // widthOffset의 숫자 부분

  // 정규식을 통해 단위 추출 (예: px, %, em, rem 등)
  const unit = width.match(/[a-zA-Z%]+$/)?.[0] || ''; // 단위 추출. 기본값은 빈 문자열.

  // 계산 수행
  const resultValue = widthValue - offsetValue;

  // 결과값과 단위 결합하여 반환
  
