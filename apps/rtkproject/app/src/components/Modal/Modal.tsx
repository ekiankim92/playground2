import { createPortal } from 'react-dom';
import styled, { CSSProperties } from 'styled-components';

import { constZIndex, TypePropertyPrefixInjector } from '@/util';
import { useEffect, useState } from 'react';
import { Head6, StyledTypo } from '../Typography';
import { Button } from '../button';
import DebouncedButton from '../button/DebouncedButton/DebouncedButton';
import { DebouncedButtonProps } from '../button/DebouncedButton/types';
import { XmarkIcon } from '../icon/XmarkIcon';

/* ==== Modal Frame ==== */
const ModalBlur = styled.div<TypePropertyPrefixInjector<{ disableBlur: boolean; zIndex: number }>>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ $zIndex }) => $zIndex};
  ${({ $disableBlur }) =>
    !$disableBlur &&
    `
     background-color: var(--BG-Dimmer);
      backdrop-filter:blur(0.1px);
    `};
`;

interface ModalFrameWrapperStyles {
  top?: string;
  /** blur 제거 여부 -> 백그라운드 터치 안됨 */
  disableBlur?: boolean;
  /** background 제거 여부 -> 백그라운드 터치 됨 */
  disableBackgroundTouch?: boolean;
  /** 모달의 너비 */
  frameWidth?: string;
  /** 모달의 최소 너비 */
  frameMinWidth?: string;
  /** 모달의 최대 너비 */
  frameMaxWidth?: string;
  /** 모달의 높이 */
  frameHeight?: string;
  /** 모달의 최소 높이 */
  frameMinHeight?: string;
  /** 모달의 최대 높이 */
  frameMaxHeight?: string;
  /** 모달프레임 패딩*/
  framePadding?: string;

  overflow?: 'hidden' | 'unset';
}

const ModalFrameWrapper = styled.div<TypePropertyPrefixInjector<ModalFrameWrapperStyles>>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ $top }) => $top || '50%'};
  left: 50%;
  transform: ${({ $top }) => ($top ? `translate(-50%, -${$top})` : 'translate(-50%, -50%)')};
  border-radius: var(--Radius-X-Large);
  overflow: ${({ $overflow }) => $overflow || 'hidden'};
  width: ${({ $frameWidth }) => $frameWidth || 'auto'};
  min-width: ${({ $frameMinWidth }) => $frameMinWidth};
  max-width: ${({ $frameMaxWidth }) => $frameMaxWidth || 'calc(100vw - 20px)'};
  height: ${({ $frameHeight }) => $frameHeight || 'auto'};
  min-height: ${({ $frameMinHeight }) => $frameMinHeight};
  max-height: ${({ $frameMaxHeight }) => $frameMaxHeight || 'calc(100vh - 20px)'};
  padding: ${({ $framePadding }) => $framePadding || '8px 16px'};
  background-color: var(--BG-Normal);
  border: 1px solid var(--Gray-G10);
  box-shadow: var(--Shadow-M);
`;

interface ModalFrameProps extends ModalFrameWrapperStyles {
  modalBlurZIndex?: number;
  children: React.ReactNode;
  onBlurClick?: (e: React.MouseEvent) => void;
}

/**
 * ModalFrame 컴포넌트는 주어진 스타일과 블러 효과가 적용된 배경을 가진 모달을 생성
 *
 * @param {ModalFrameProps} modalFrameProps - 모달의 크기와 스타일을 지정하는 속성들
 * * {optional boolean} [disableBlur] - blur 제거 여부 (기본값: false)
 * * {optional boolean} [disableBackgroundTouch] - background 제거 여부 (기본값: false)
 * * {optional string} [frameWidth] - 모달의 너비 (기본값: "476px")
 * * {optional string} [frameMinWidth] - 모달의 최소 너비
 * * {optional string} [frameMaxWidth] - 모달의 최대 너비
 * * {optional string} [frameHeight] - 모달의 높이 (기본값: "auto")
 * * {optional string} [frameMinHeight] - 모달의 최소 높이
 * * {optional string} [frameMaxHeight] - 모달의 최대 높이
 * @returns {React.ReactPortal} createPortal로 렌더링된 블러 배경과 모달 프레임 안에 자식을 포함하는 요소를 반환
 */
const ModalFrame = (modalFrameProps: ModalFrameProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  const {
    children,
    disableBlur = false,
    disableBackgroundTouch = false,
    onBlurClick,
    top = '50%',
    frameWidth = 'auto',
    frameMinWidth = '476px',
    frameMaxWidth,
    frameHeight = 'auto',
    framePadding,
    frameMinHeight,
    frameMaxHeight,
    modalBlurZIndex = constZIndex['Important-9'],
    overflow,
  } = modalFrameProps;

  const handleBlurClick = (e: React.MouseEvent) => {
    if (onBlurClick && e.target === e.currentTarget) {
      onBlurClick(e);
    }
  };

  const modalInstance = (
    <ModalFrameWrapper
      className='modal-content'
      $top={top}
      $frameWidth={frameWidth}
      $frameMinWidth={frameMinWidth}
      $frameMaxWidth={frameMaxWidth}
      $frameHeight={frameHeight}
      $frameMinHeight={frameMinHeight}
      $frameMaxHeight={frameMaxHeight}
      $framePadding={framePadding}
      $overflow={overflow}
    >
      {children}
    </ModalFrameWrapper>
  );

  const modal = disableBackgroundTouch ? (
    modalInstance
  ) : (
    <ModalBlur className='modal-blur' $zIndex={modalBlurZIndex} $disableBlur={disableBlur} onClick={handleBlurClick}>
      {modalInstance}
    </ModalBlur>
  );

  return createPortal(modal, document.body);
};

/* ==== Modal Header ==== */

const ModalHeaderWrapper = styled.div<{ $height: string; $padding: string }>`
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid var(--Gray-G10);
`;

const ModalHeadTitle = styled(Head6).attrs({ fontWeight: 700 })<StyledTypo>`
  letter-spacing: -0.3px;
  line-height: 120%;
  font-size: 18px;
  color: #000;
`;

interface ModalHeaderProps {
  /** 모달의 제목 */
  title: React.ReactNode;
  /** 모달을 닫는 함수 */
  onClose?: () => void;
  /** 사용자 정의 닫기 버튼 */
  closeButton?: React.ReactNode;
  padding?: string;
  height?: string;
}

const ModalHeader = ({ title, onClose, closeButton, padding = '', height = '56px' }: ModalHeaderProps) => {
  return (
    <ModalHeaderWrapper $padding={padding} $height={height}>
      <ModalHeadTitle style={{ marginLeft: '8px', width: '100%' }}>{title}</ModalHeadTitle>
      {closeButton
        ? closeButton
        : onClose && (
            <Button
              variants='white'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '32px',
                height: '32px',
                border: 'unset',
              }}
              onClick={onClose}
              icon={<XmarkIcon width={24} height={24} />}
            />
          )}
    </ModalHeaderWrapper>
  );
};

/* ==== Modal Body ==== */

const ModalBodyWrapper = styled.div<{ $padding: string; $borderRadius: string; $customStyle?: CSSProperties }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: ${({ $padding }) => $padding};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  gap: 24px;
  font-weight: 700;
  color: #000;
  opacity: var(--sds-size-stroke-border);
  background: var(--BG-Normal);
  overflow: auto;
  /* width: 476px; */
  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;

interface ModalBodyProps {
  style?: CSSProperties;
  borderRadius?: string;
  padding?: string;
  children: React.ReactNode;
}

const ModalBody = ({ padding = '24px 8px', borderRadius = 'unset', children, style = {} }: ModalBodyProps) => {
  return (
    <ModalBodyWrapper $padding={padding} $borderRadius={borderRadius} $customStyle={style}>
      {children}
    </ModalBodyWrapper>
  );
};

/* ==== Modal Footer ==== */

const ModalFooterButtonsWrapper = styled.div<{ $padding?: string; $gap?: string; $customStyle?: CSSProperties }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ $padding }) => $padding};
  gap: ${({ $gap }) => $gap};
  border-top: 1px solid var(--Gray-G10);
  ${(props) => props.$customStyle && { ...props.$customStyle }};
`;

const ModalFooterButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

interface ModalFooterProps {
  style?: CSSProperties;
  footerTopSlot?: React.ReactNode;
  footerBottomSlot?: React.ReactNode;
  padding?: string;
  gap?: string;
  cancelText?: string;
  confirmText?: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  confirmButtonProps?: DebouncedButtonProps;
  cancelButtonProps?: DebouncedButtonProps;
}

/**
 * ModalFooter 컴포넌트는 모달의 푸터를 생성합니다.
 *
 * @param {ModalFooterProps} props - 모달 푸터의 속성들
 * * {optional React.ReactNode} [action] - 왼쪽에 위치할 액션 요소
 * * {React.ReactNode} children - 오른쪽에 위치할 내용
 * @returns {JSX.Element} 모달의 푸터를 반환합니다.
 */
const ModalFooter = ({
  footerTopSlot,
  footerBottomSlot,
  onClickCancel,
  onClickConfirm: onClickSave,
  padding = '16px 0px 8px 0px',
  gap = '8px',
  cancelText = '취소',
  confirmText = '저장',
  cancelButtonProps,
  confirmButtonProps,
  style = {},
}: ModalFooterProps) => (
  <>
    {footerTopSlot && <>{footerTopSlot}</>}
    <ModalFooterButtonsWrapper $padding={padding} $gap={gap} $customStyle={style}>
      {footerBottomSlot && <>{footerBottomSlot}</>}
      <ModalFooterButtonsRow>
        <DebouncedButton
          variants='white'
          size='medium'
          onClick={onClickCancel}
          {...cancelButtonProps}
          style={{ border: '1px solid var(--Gray-G55)', height: 40, color: 'var(--Gray-G75)' }}
        >
          {cancelText}
        </DebouncedButton>
        <DebouncedButton size='large' onClick={onClickSave} height={40} {...confirmButtonProps}>
          {confirmText}
        </DebouncedButton>
      </ModalFooterButtonsRow>
    </ModalFooterButtonsWrapper>
  </>
);

/* ==== Content(Default) Modal ==== */

interface ContentModalProps {
  /**
   * * frameWidth?: string;
   * * frameMinWidth?: string;
   * * frameMaxWidth?: string;
   * * frameHeight?: string;
   * * frameMinHeight?: string;
   * * frameMaxHeight?: string;
   */
  frameProps?: ModalFrameWrapperStyles & {
    onBlurClick?: (e: React.MouseEvent) => void;
  };

  /**
   * * title: string;
   * * onClose?: () => void;
   * * closeButton?: React.ReactNode;
   */
  headerProps?: ModalHeaderProps;

  /**
   * * children: React.ReactNode;
   */
  bodyProps?: ModalBodyProps;

  /**
   * * children: React.ReactNode;
   */
  footerProps?: ModalFooterProps;

  /**
   * * {optional React.ReactNode} [modalHeader] - 사용자 정의 모달 헤더
   * * * **props 전달 시 기본 모달 헤더를 대체**
   */
  modalHeader?: React.ReactNode;

  /**
   * * {optional React.ReactNode} [modalBody] - 사용자 정의 모달 바디
   * * * **props 전달 시 기본 모달 바디를 대체**
   */
  modalBody?: React.ReactNode;

  /**
   * * {optional React.ReactNode} [modalFooter] - 사용자 정의 모달 푸터
   * * * **props 전달 시 기본 모달 푸터를 대체**
   */
  modalFooter?: React.ReactNode;

  /**
   * * {optional React.ReactNode} [children] - 모달 전체 내용을 사용자 정의
   * * * **props 전달 시 기본 컨텐츠 모달 자체를 대체**
   */
  children?: React.ReactNode;
}

/**
 * ContentModal 컴포넌트는 컨텐츠 모달의 전체 구조를 생성
 *
 * @param {ContentModalProps} param - 모달의 전체 구조를 지정하는 속성들
 * * {optional ModalFrameWrapperStyles} frameProps - 모달 프레임의 스타일을 지정하는 속성들
 * * {optional ModalHeaderProps} headerProps - 모달 헤더의 속성들
 * * * **props 미전달 시 반환하지 않음**
 * * {optional ModalBodyProps} bodyProps - 모달 본문의 속성들
 * * * **props 미전달 시 반환하지 않음**
 * * {optional ModalFooterProps} [footerProps] - 모달 푸터의 속성들
 * * * **props 미전달 시 반환하지 않음**
 * * {optional React.ReactNode} [modalHeader] - 사용자 정의 모달 헤더
 * * * **props 전달 시 기본 헤더를 대체**
 * * {optional React.ReactNode} [modalBody] - 사용자 정의 모달 본문
 * * * **props 전달 시 기본 바디를 대체**
 * * {optional React.ReactNode} [modalFooter] - 사용자 정의 모달 푸터
 * * * **props 전달 시 기본 푸터를 대체**
 * * {optional React.ReactNode} [children] - 모달 전체 내용을 사용자 정의
 * * * **props 전달 시 기본 컨텐츠 모달 자체를 대체**
 * @returns {JSX.Element} 컨텐츠 모달의 전체 구조를 반환
 */
const ContentModal = ({
  frameProps,
  headerProps,
  bodyProps,
  footerProps,
  modalHeader,
  modalBody,
  modalFooter,
  children,
}: ContentModalProps) => {
  return (
    <ModalFrame {...frameProps}>
      {children ? (
        children
      ) : (
        <>
          {modalHeader ? modalHeader : headerProps && <ModalHeader {...headerProps} />}
          {modalBody ? modalBody : bodyProps && <ModalBody {...bodyProps} />}
          {modalFooter ? modalFooter : footerProps && <ModalFooter {...footerProps} />}
        </>
      )}
    </ModalFrame>
  );
};

export {
  ContentModal,
  ModalBody,
  ModalFooter,
  ModalFrame,
  ModalHeader,
  type ContentModalProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalFrameProps,
  type ModalFrameWrapperStyles,
  type ModalHeaderProps,
};
