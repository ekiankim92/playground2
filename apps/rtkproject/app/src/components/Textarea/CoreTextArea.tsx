import { TypePropertyPrefixInjector } from '@/util';
import { forwardRef, TextareaHTMLAttributes, useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';

/**
 * 스타일드 텍스트 영역의 속성을 정의합니다.
 *
 * width - 텍스트 영역의 너비
 * height - 텍스트 영역의 높이
 * minWidth - 텍스트 영역의 최소 너비
 * maxHeight - 텍스트 영역의 최대 높이
 * showResize - 크기 조절 핸들 표시 여부
 * isError - 오류 상태 여부
 */
interface StyledTextareaProps {
  width?: string;
  height?: string;
  minWidth?: string;
  maxHeight?: string;
  showResize?: boolean;
  isError?: boolean;
}

/**
 * 커스텀 텍스트 영역 컴포넌트의 속성을 정의합니다.
 * HTML 텍스트 영역 속성과 스타일드 텍스트 영역 속성을 확장합니다.
 *
 * autoResize - 내용에 따라 자동으로 높이 조절 여부
 */
export interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, StyledTextareaProps {
  autoResize?: boolean;
}

/**
 * 스타일이 적용된 텍스트 영역 컴포넌트
 *
 * 커스텀 스타일이 적용된 기본 textarea 요소입니다.
 */
// prettier-ignore
const CustomTextarea = styled.textarea<TypePropertyPrefixInjector<StyledTextareaProps>>`
  width: ${(props) => props.$width || '360px'};
  min-height: ${(props) => props.$height || '83px'};
  min-width: ${(props) => props.$minWidth || '360px'};
  max-height: ${(props) => props.$maxHeight || 'none'};
  resize: ${(props) => (props.$showResize ? 'vertical' : 'none')};
  border-radius: var(--Radius-Medium);
  padding: 8px 12px 12px;
  overflow-y: auto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.3px;

  &::placeholder {
    color: #73727e;
  }
  &:placeholder-shown {
    &:disabled {
      border: 1px solid transparent;
      &::placeholder {
        color: #73727e;
      }
    }
  }
  &:not(:placeholder-shown) {
    &:disabled {
      border: 1px solid #ddd;
      color: #73727e;
    }
  }
  &:focus {
    outline: none;
  }
`;

/**
 * 핵심 텍스트 영역 컴포넌트
 *
 * 자동 크기 조절 및 다양한 스타일 옵션을 지원하는 텍스트 영역 컴포넌트입니다.
 * ref를 통해 외부에서 접근할 수 있으며, 내용에 따라 자동으로 높이를 조절할 수 있습니다.
 */
const CoreTextArea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ width, height, minWidth, maxHeight, autoResize = false, showResize = true, isError, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = ref || internalRef;

    /**
     * 텍스트 영역의 높이를 내용에 맞게 자동으로 조절하는 함수
     *
     * 내용이 변경될 때마다 호출되어 텍스트 영역의 높이를 조절합니다.
     * 최대 높이가 설정된 경우 해당 높이를 초과하지 않도록 합니다.
     */
    const autoResizeTextarea = useCallback(() => {
      if (textareaRef && 'current' in textareaRef && textareaRef.current && autoResize) {
        textareaRef.current.style.height = 'auto';
        const scrollHeight = textareaRef.current.scrollHeight;
        const maxHeightValue = maxHeight ? parseInt(maxHeight) : Infinity;

        textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightValue)}px`;
        textareaRef.current.style.overflowY = scrollHeight > maxHeightValue ? 'auto' : 'hidden';
      }
    }, [maxHeight, autoResize, textareaRef]);

    /**
     * 자동 크기 조절 기능을 위한 이벤트 리스너 설정
     *
     * 컴포넌트 마운트 시 이벤트 리스너를 추가하고, 언마운트 시 제거합니다.
     */
    useEffect(() => {
      if (autoResize) {
        autoResizeTextarea();
        window.addEventListener('resize', autoResizeTextarea);
        return () => window.removeEventListener('resize', autoResizeTextarea);
      }
    }, [autoResizeTextarea, autoResize]);

    /**
     * 텍스트 입력 시 자동 크기 조절 함수를 호출하는 핸들러
     */
    const handleInput = () => {
      if (autoResize) {
        autoResizeTextarea();
      }
    };

    return (
      <CustomTextarea
        ref={textareaRef as React.RefObject<HTMLTextAreaElement>} // Cast ref correctly
        $width={width}
        $height={height}
        $minWidth={minWidth}
        $maxHeight={maxHeight}
        $showResize={showResize}
        onInput={handleInput}
        style={{
          height: autoResize ? 'auto' : height,
          overflowY: autoResize ? 'hidden' : 'auto',
          border: isError ? '1px solid var(--System-Red-Text)' : '1px solid var(--Gray-G25)',
        }}
        {...props}
      />
    );
  },
);

CoreTextArea.displayName = 'CoreTextArea';

export { CoreTextArea };
