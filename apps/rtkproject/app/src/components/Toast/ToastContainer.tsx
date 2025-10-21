// ToastContainer.tsx
import React from 'react';

import { ToastOptions, ToastType } from '@/providers/ToastProvider';
import { Toast } from './Toast';

// ToastContainer 컴포넌트의 props 인터페이스
interface ToastContainerProps {
  toasts: {
    id: string; // 토스트 고유 식별자
    content?: React.ReactNode; // 토스트 내용
    options: ToastOptions; // 토스트 옵션
    renderItem?: React.ReactNode; // 사용자 정의 렌더링 컴포넌트
    type: ToastType; // 토스트 타입
  }[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  // 첫 번째 토스트의 옵션을 기본값으로 사용 (없으면 빈 객체)
  const firstToastOptions = toasts[0]?.options || {};
  // 위치와 오프셋 값 추출 (기본값: 우측 상단, 20px 오프셋)
  const { position = 'top-right', offset = 20 } = firstToastOptions;

  // 컨테이너 스타일 설정
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
    // 위치에 따른 스타일 설정
    ...(position === 'top-center'
      ? {
          // 중앙 상단 위치 설정
          top: offset,
          left: '50%',
          transform: 'translateX(-50%)',
        }
      : {
          // 상/하 위치 설정
          [position.includes('top') ? 'top' : 'bottom']: offset,
          // 좌/우 위치 설정
          [position.includes('right') ? 'right' : 'left']: offset,
        }),
  };

  return (
    <div style={containerStyle}>
      {/* 토스트 목록을 순회하며 각 토스트 렌더링 */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          content={toast.content}
          options={toast.options}
          renderItem={toast.renderItem} // 사용자 정의 렌더링 컴포넌트 전달
          type={toast.type}
        />
      ))}
    </div>
  );
};
