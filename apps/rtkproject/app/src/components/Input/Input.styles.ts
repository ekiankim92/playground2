import styled, { css, CSSObject } from 'styled-components';
import { InputHeightVariants, InputWidthVariants } from './Input';

/**
 * 입력 필드의 컨테이너 스타일 컴포넌트
 *
 * $customStyles - 사용자 정의 스타일
 * $variants - 테두리 스타일 ('border' 또는 'underline')
 * $widthVariants - 너비 변형
 * $heightVariants - 높이 변형
 * $disabled - 비활성화 상태
 * $error - 오류 상태
 * width - 컨테이너 너비
 * height - 컨테이너 높이
 * value - 값 존재 여부
 * $unit - 단위 표시
 */
export const Container = styled.div<{
  $customStyles?: CSSObject;
  $variants?: 'border' | 'underline';
  $widthVariants?: InputWidthVariants;
  $heightVariants?: InputHeightVariants;
  $disabled?: boolean;
  $error?: boolean;
  width?: string | number;
  height?: string | number;
  value?: boolean;
  $unit?: string;
  $hasLeftIconBox?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  ${({ width, height, $widthVariants, $heightVariants, $variants: $variant, $error, $disabled }) => {
    let containerWidth, containerHeight;

    if (width) {
      containerWidth = typeof width === 'number' ? `${width}px` : width;
    } else {
      containerWidth = $widthVariants === 'md' ? '345px' : '418px';
    }

    if (height) {
      containerHeight = typeof height === 'number' ? `${height}px` : height;
    } else {
      switch ($heightVariants) {
        case 'md':
          containerHeight = '40px';
          break;
        case 'sm':
          containerHeight = '32px';
          break;
        case 'lg':
        default:
          containerHeight = '48px';
          break;
      }
    }

    return css`
      width: ${containerWidth};
      height: ${containerHeight};
      background: ${$disabled ? 'rgba(239,239,239, 0.3)' : 'transparent'};
      ${$variant === 'underline'
        ? css`
            border: none;
            border-bottom: 2px solid ${$error ? 'var(--System-Red-Text)' : 'var(--Gray-G10)'};
            border-radius: 0;

            &:focus-within {
              border-bottom: 2px solid ${$error ? 'var(--System-Red-Text)' : 'var(--Gray-G55)'};
            }
          `
        : css`
            border: 1px solid ${$error ? 'var(--System-Red-Text)' : 'var(--Gray-G25)'};
            border-radius: var(--Radius-Medium);

            &:focus-within {
              border: 1px solid ${$error ? 'var(--System-Red-Text)' : 'var(--Gray-G55)'};
            }
          `}
    `;
  }}
  ${({ $customStyles }) => $customStyles};

  &:hover {
    border: 1px solid var(--Gray-G55);
  }
`;

export const LeftIconBox = styled.div<{
  $heightVariants?: InputHeightVariants;
  $backgroundColor?: string;
  $width?: string;
  $customStyles?: CSSObject;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40px;
  border-right: 1px solid var(--Gray-G25);
  ${({ $customStyles }) => $customStyles};
`;

export const LeftIconWrapper = styled.div<{ $customStyles?: CSSObject }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 12px;
  z-index: 1;
  ${({ $customStyles }) => $customStyles}
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

/**
 * 입력 필드 스타일 컴포넌트
 *
 * $heightVariants - 높이 변형
 * $unit - 단위 표시 (있을 경우 패딩 조정)
 */
export const Inputs = styled.input<{
  $heightVariants?: InputHeightVariants;
  $unit: string;
  $hasLeftIconBox?: boolean;
}>`
  width: 100%;
  height: ${({ $heightVariants }) => ($heightVariants === 'sm' ? '26px' : '32px')};
  padding-left: ${(props) => {
    if (props.$unit) return '46px';
    return '12px';
  }};
  font-size: 16px;
  color: #000;
  outline: none;
  border: none;
  background: none;

  &::placeholder {
    font-size: 14px;
  }

  /* Hide password reveal icon for Edge */
  &::-ms-reveal {
    display: none;
  }

  /* Hide clear button for Edge (if applicable) */
  &::-ms-clear {
    display: none;
  }
`;

/**
 * 아이콘 래퍼 스타일 컴포넌트
 *
 * 입력 필드 내부의 아이콘을 감싸는 컨테이너
 */
export const IconWrapper = styled.div`
  min-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 4px;
  padding-right: 12px;
`;

/**
 * 전체 입력 필드 래퍼 스타일 컴포넌트
 *
 * $customStyles - 사용자 정의 스타일
 */
export const Wrapper = styled.div<{ $customStyles?: CSSObject }>`
  display: flex;
  flex-direction: column;
  ${({ $customStyles }) => $customStyles};
`;

/**
 * 기본 메시지 스타일 컴포넌트
 *
 * 입력 필드 아래에 표시되는 기본 메시지
 */
export const DefaultMessage = styled.span`
  margin-top: 6px;
  margin-left: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

/**
 * 오류 메시지 스타일 컴포넌트
 *
 * 입력 필드 아래에 표시되는 오류 메시지
 */
export const ErrorMessage = styled(DefaultMessage)`
  color: var(--System-Red-Text);
`;

/**
 * 검색 컨테이너 스타일 컴포넌트
 *
 * 검색 기능을 위한 상대적 위치 컨테이너
 */
export const SearchContainer = styled.div`
  position: relative;
`;

/**
 * 검색 래퍼 스타일 컴포넌트
 *
 * $searchWidth - 검색 영역 너비
 * $searchHeight - 검색 영역 높이
 * $searchPadding - 검색 영역 패딩
 * $customSearchStyles - 사용자 정의 검색 스타일
 */
export const SearchWrapper = styled.div<{
  $searchWidth?: string;
  $searchHeight?: string;
  $searchPadding?: string;
  $customSearchStyles?: CSSObject;
}>`
  width: ${(props) => (props.$searchWidth ? props.$searchWidth : 'calc(100% - 18px)')};
  height: ${(props) => (props.$searchHeight ? props.$searchHeight : '200px')};
  padding: ${(props) => (props?.$searchPadding ? props.$searchPadding : '0px')};
  overflow-y: auto;
  position: absolute;
  top: 2px;
  z-index: 2;
  ${({ $customSearchStyles }) => $customSearchStyles};
`;

/**
 * 검색 콘텐츠 스타일 컴포넌트
 *
 * $scrollMaxHeight - 스크롤 최대 높이
 * $offset - 상단 오프셋
 */
export const SearchContent = styled.div<{ $scrollMaxHeight?: string; $offset?: string }>`
  position: relative;
  height: 200px;
  overflow-y: auto;
  top: ${(props) => props.$offset};
  max-height: ${(props) => props.$scrollMaxHeight};
  border: 1px solid #ddd;
  background-color: var(--BG-Normal);
`;

/**
 * 콘텐츠 스타일 컴포넌트
 *
 * $isSelected - 선택 상태 여부
 */
export const Content = styled.div<{ $isSelected?: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  outline: none;
  padding: 0px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? '#eaeef4' : '#f3f4f4')};
  }

  &:active {
    background: #eaeef4;
  }
`;
