import { Caption2 } from '@/components/common/Typography';
import { ToastOptions, ToastType, useToast } from '@/providers/ToastProvider';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CancelCircleIcon } from '../icon/CancelCircleIcon';
import { CircleFailIcon } from '../icon/CircleFailIcon';
import { CircleSuccessIcon } from '../icon/CircleSuccessIcon';
import { TrashBinIcon } from '../icon/TrashBinIcon';

// Toast 컴포넌트 props 인터페이스
interface ToastProps {
  id: string; // 토스트 고유 식별자
  content?: React.ReactNode; // 토스트 내용
  options: ToastOptions; // 토스트 옵션 (위치, 자동 닫기 등)
  renderItem?: React.ReactNode; // 사용자 정의 렌더링 컴포넌트
  type: ToastType; // 토스트 타입 (success, fail, normal 등)
}

// Toast.tsx
/**
 * Toast 컴포넌트를 설명.
 *
 * @param {"success"|"fail"|"normal"|"renderItem"} type - 표시될 토스트의 타입 
 * @param {React.ReactNode} content - 토스트에 표시할 내용
 * @param {ToastOptions} options - 토스트 옵션 (아이콘, 배경색 등) 
 * ToastOptions {
      position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right";
      offset?: number;
      icon?: ReactNode;
      autoClose?: boolean;
      autoCloseDuration?: number;
      backgroundColor?: string;
    }
 * @param {React.ReactNode} [renderItem] - 사용자 정의 렌더링 컴포넌트
 * @returns {JSX.Element} 렌더링된 Toast 컴포넌트
 *
 * @example
 * const { addToast } = useToast();
 * 
 * 1. success, fail, normal
 * 
 * addToast({
 *   type: "success",
 *   content: "Operation was successful!",
 *   options: { 
 *      autoClose: true, - optional
 *      autoCloseDuration: 2500 - optional
 *      backgroundColor: "white" - optional
 *      offset: 20, - optional
 *      icon: ReactNode - - optional
 *      
 *       
 * },
 * });
 * 
 * 2. renderItem
 * addToast({
 *   type: "renderItem",
 *   options: { 
 *      backgroundColor: "white" - optional
 *      offset: 20, - optional
 *      autoClose: true, - optional
 *      autoCloseDuration: 2500 - optional
 *      icon: ReactNode - - optional
 *    }
 *  renderItem: (
 *    <div style={{}}>RenderItem</div>
 *   )
 * })
 */
export const Toast: React.FC<ToastProps> = ({ id, content, options, renderItem, type }) => {
  const { removeToast } = useToast();
  // 토스트 진입 애니메이션을 위한 상태
  const [entering, setEntering] = useState(true);

  // 옵션에서 아이콘과 배경색 추출 (기본 배경색은 흰색)
  const { icon, backgroundColor = 'var(--Gray-G0)' } = options;

  // 컴포넌트 마운트 후 진입 상태를 false로 설정하여 애니메이션 시작
  useEffect(() => {
    setEntering(false);
  }, []);

  // 토스트 타입별 내용 렌더링 맵
  const contentMap: Record<ToastType, React.ReactNode> = {
    // 성공 토스트: 녹색 체크 아이콘과 내용
    success: (
      <>
        <CircleSuccessIcon color='#72e549' />
        <MultiLineCaption2>{content}</MultiLineCaption2>
      </>
    ),
    // 실패 토스트: 빨간색 X 아이콘과 내용
    fail: (
      <>
        <CircleFailIcon color='#fa2e2e' />
        <MultiLineCaption2>{content}</MultiLineCaption2>
      </>
    ),
    // 삭제 토스트: 휴지통 아이콘과 내용
    delete: (
      <>
        <TrashBinIcon color='#fa2e2e' />
        <MultiLineCaption2>{content}</MultiLineCaption2>
      </>
    ),
    // 일반 토스트: 사용자 지정 아이콘(있는 경우)과 내용
    normal: (
      <>
        {icon && <span>{icon}</span>}
        <MultiLineCaption2>{content}</MultiLineCaption2>
      </>
    ),
    // 사용자 정의 렌더링 컴포넌트
    renderItem: <>{renderItem}</>,
  };

  return (
    <ToastContainer $entering={entering} $backgroundColor={backgroundColor}>
      <ToastTitleFlexBox>{contentMap[type]}</ToastTitleFlexBox>
      {/* 자동 닫기가 비활성화된 경우에만 닫기 버튼 표시 */}
      {options.autoClose === false && <CancelCircleIcon onClick={() => removeToast(id)} />}
    </ToastContainer>
  );
};

// 토스트 컨테이너 스타일 (배경색과 진입 애니메이션 상태에 따라 스타일 변경)
const ToastContainer = styled.div<{ $backgroundColor: string; $entering: boolean }>`
  background-color: ${({ $backgroundColor }) => ($backgroundColor ? $backgroundColor : 'var(--Semantic-D-90_L-80)')};
  padding: 16px 16px 16px 24px;
  border-radius: var(--Radius-Large);
  width: 360px;
  color: var(--Grey-G-0);
  display: flex;
  border: 1px solid #ddd;
  /* height: 56px; */
  align-items: center;
  justify-content: space-between;

  /* 진입 애니메이션 효과 */
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: ${({ $entering }) => ($entering ? 0 : 1)};
  transform: ${({ $entering }) => ($entering ? 'translateY(-20px)' : 'translateY(0)')};

  /* 텍스트 줄바꿈 처리 */
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
`;

// 토스트 내용 레이아웃 스타일
const ToastTitleFlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// 여러 줄 텍스트를 위한 스타일 확장 컴포넌트
const MultiLineCaption2 = styled(Caption2)`
  white-space: pre-wrap;
  color: #000;
  font-weight: 400;
`;
