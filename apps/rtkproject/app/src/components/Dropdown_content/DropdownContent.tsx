import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * 드롭다운 콘텐츠 컴포넌트의 속성을 정의합니다.
 *
 * children - 드롭다운 내부에 표시될 자식 요소
 * style - 추가적인 스타일 속성
 */
interface DropdownContentProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

/**
 * 드롭다운 콘텐츠 컴포넌트
 *
 * 드롭다운의 내용을 표시하는 컴포넌트입니다.
 * 화면 경계를 벗어나지 않도록 자동으로 위치를 조정합니다.
 */
export const DropdownContent = ({ children, style }: DropdownContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const calculatePosition = () => {
        const parentRect = contentRef.current?.parentElement?.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();

        if (parentRect && contentRect) {
          const viewportHeight = window.innerHeight;
          const isOverflowingBottom = parentRect.bottom + contentRect.height > viewportHeight;

          setPosition({
            top: isOverflowingBottom ? -(contentRect.height + 8) : parentRect.height + 8,
            right: 0,
          });
          setIsPositioned(true);
        }
      };

      /**
       * 드롭다운 콘텐츠의 위치를 계산하는 함수
       *
       * 화면 하단을 벗어나는 경우 위쪽으로 표시되도록 조정합니다.
       */
      calculatePosition();
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, []);

  return (
    <Content
      ref={contentRef}
      style={{
        ...style,
        top: `${position.top}px`,
        right: `${position.right}px`,
        opacity: isPositioned ? 1 : 0,
        visibility: isPositioned ? 'visible' : 'hidden',
      }}
    >
      {children}
    </Content>
  );
};

/**
 * 드롭다운 컨테이너 컴포넌트의 속성을 정의합니다.
 *
 * button - 드롭다운을 열기 위한 버튼 요소
 * content - 드롭다운 내부에 표시될 콘텐츠
 * isOpen - 드롭다운의 열림 상태
 * onOpen - 드롭다운이 열릴 때 호출되는 콜백 함수
 * onClose - 드롭다운이 닫힐 때 호출되는 콜백 함수
 * style - 추가적인 스타일 속성
 */
interface DropdownContainerProps {
  button: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}

/**
 * 드롭다운 컨테이너 컴포넌트
 *
 * 드롭다운의 버튼과 콘텐츠를 관리하는 컨테이너 컴포넌트입니다.
 * 외부 클릭 시 드롭다운을 닫는 기능을 제공합니다.
 */
const DropdownContainer = ({ button, content, isOpen, onClose, style }: DropdownContainerProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * 드롭다운 외부 클릭을 처리하는 함수
     *
     * 모달 내부 클릭은 무시하고, 드롭다운 외부 클릭 시 닫힙니다.
     */
    const handleClickOutside = (event: MouseEvent) => {
      const isModalEvent =
        event.target instanceof Element &&
        (event.target.closest('[role="dialog"]') ||
          event.target.closest('.modal-content') ||
          event.target.closest('.modal-blur'));

      if (isModalEvent) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Container ref={dropdownRef} style={style} onMouseDown={(event) => event.stopPropagation()}>
      {button}
      {isOpen && content}
    </Container>
  );
};

/**
 * 드롭다운 컨테이너의 스타일을 정의합니다.
 */
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/**
 * 드롭다운 콘텐츠의 스타일을 정의합니다.
 */
const Content = styled.div`
  position: absolute;
  z-index: 1000;
  min-width: 300px;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s ease-in-out;
`;

export default DropdownContainer;
