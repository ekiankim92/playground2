import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Body3, Caption2 } from '@/components/common/Typography';
import { TypePropertyPrefixInjector } from '@/util';
import { CoreTextArea, type CustomTextareaProps } from './CoreTextArea';

/**
 * 텍스트 영역 컴포넌트의 속성을 정의합니다.
 * CoreTextArea의 속성을 확장합니다.
 *
 * label - 텍스트 영역의 레이블
 * direction - 레이블과 텍스트 영역의 배치 방향
 * letterCount - 글자 수 카운터 표시 여부
 * wrapperWidth - 전체 래퍼의 너비
 * errorMessage - 오류 메시지
 */

export interface TextareaProps extends CustomTextareaProps {
  label?: string;
  direction?: 'row' | 'column';
  letterCount?: boolean;
  wrapperWidth?: string | number;
  errorMessage?: string;
}

/**
 * 텍스트 영역 컴포넌트의 전체 래퍼 스타일 컴포넌트
 *
 * $direction - 레이블과 텍스트 영역의 배치 방향
 * $wrapperWidth - 전체 래퍼의 너비
 */
const TextAreaWrapper = styled.div<TypePropertyPrefixInjector<TextareaProps>>`
  display: inline-flex;
  flex-direction: ${({ $direction }) => ($direction === 'row' ? 'row' : 'column')};
  gap: ${({ $direction }) => ($direction === 'row' ? '16px' : '8px')};
  ${({ $wrapperWidth }) => $wrapperWidth && `width: ${$wrapperWidth};`}
`;

/**
 * 레이블 컨테이너 스타일 컴포넌트
 *
 * disabled - 비활성화 상태 여부
 */
const LabelContainer = styled.div<TextareaProps>`
  display: inline-flex;
  flex-direction: column;

  ${({ disabled }) =>
    disabled &&
    css`
      color: #73727e;
    `}
`;

/**
 * 레이블 스타일 컴포넌트
 *
 * $direction - 레이블과 텍스트 영역의 배치 방향
 */
// prettier-ignore
const StyledLabel = styled(Caption2)<TypePropertyPrefixInjector<TextareaProps, '$', 'disabled'>>`
  padding: ${({ $direction }) => ($direction === 'row' ? '0px' : '0 4px')};
  font-weight: bold;
  ${({ disabled }) =>
    disabled &&
    css`
      color: #73727e !important;
    `}
`;

/**
 * 스타일이 적용된 텍스트 영역 컴포넌트
 *
 * $isError - 오류 상태 여부
 */

export const StyledTextarea = styled(CoreTextArea)<{ $isError?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid ${({ $isError }) => ($isError ? 'var(--System-Red-Text)' : 'var(--Gray-G25)')};
  &:focus {
    outline: none;
  }
`;

/**
 * 텍스트 영역의 두 번째 래퍼 스타일 컴포넌트
 * 텍스트 영역과 하단 요소들을 포함합니다.
 */
const TextAreaSecondWrapper = styled.div<TextareaProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

/**
 * 글자 수 카운터 래퍼 스타일 컴포넌트
 *
 * $isError - 오류 상태 여부
 */
const CounterWrapper = styled.div<{ $isError?: boolean }>`
  color: ${(props) => (props.$isError ? 'var(--System-Red-Text)' : 'var(--Gray-G55)')};
`;

/**
 * 하단 래퍼 스타일 컴포넌트
 * 오류 메시지와 글자 수 카운터를 포함합니다.
 *
 * $errorMessage - 오류 메시지 존재 여부에 따라 정렬 방식이 달라집니다.
 */
const BottomWrapper = styled.div<{ $errorMessage?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$errorMessage ? 'space-between' : 'flex-end')};
`;

/**
 * 오류 메시지 스타일 컴포넌트
 */
const ErrorMessage = styled.div`
  font-size: 12px;
  color: var(--System-Red-Text);
`;

/**
 * 텍스트 영역 컴포넌트
 *
 * 레이블, 텍스트 입력 영역, 글자 수 카운터, 오류 메시지 등을 포함하는 완성된 텍스트 영역 컴포넌트입니다.
 * ref를 통해 외부에서 접근할 수 있으며, 다양한 스타일 옵션을 지원합니다.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    // prettier-ignore
    { label, letterCount = false, direction, disabled, maxLength, wrapperWidth, id, placeholder, value, errorMessage, isError, style, ...props },
    ref,
  ) => {
    /**
     * 글자 수 카운터 컴포넌트
     *
     * 현재 입력된 글자 수와 최대 글자 수를 표시합니다.
     */
    const LetterCounter = () => {
      return (
        <CounterWrapper $isError={isError}>
          <Body3>{value?.toString().length}</Body3>
          <Body3>/{maxLength}</Body3>
        </CounterWrapper>
      );
    };

    return (
      <TextAreaWrapper $direction={direction} $wrapperWidth={wrapperWidth}>
        {label && (
          <LabelContainer disabled={disabled} as='label' htmlFor={id}>
            <StyledLabel fontWeight='bold' $direction={direction}>
              {label}
            </StyledLabel>
          </LabelContainer>
        )}
        <TextAreaSecondWrapper>
          <StyledTextarea
            ref={ref}
            id={id}
            style={style}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            $isError={isError}
            {...props}
          />
          <BottomWrapper $errorMessage={errorMessage}>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {letterCount && !disabled && <LetterCounter />}
          </BottomWrapper>
        </TextAreaSecondWrapper>
      </TextAreaWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
