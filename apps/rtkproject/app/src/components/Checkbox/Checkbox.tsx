import { Caption2 } from '@/components/common/Typography';
import { TypePropertyPrefixInjector } from '@/util';
import { cva, VariantProps } from 'class-variance-authority';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { CheckIcon } from '../icon/CheckIcon';

const checkboxVariants = cva('checkbox', {
  variants: {
    mode: {
      grey: 'grey',
      primary: 'primary',
      transparent: 'transparent',
    },
  },
  defaultVariants: {
    mode: 'transparent',
  },
});

/**
 * @interface CustomCheckboxProps
 * @description 커스텀 체크박스 컴포넌트의 props를 정의합니다.
 */
interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkboxVariants> {
  label?: string;
  id?: string;
  iconWrapperTop?: string;
}

/**
 * CheckboxWrapper
 * @description 체크박스와 레이블을 감싸는 스타일링된 컨테이너입니다.
 */
const CheckboxWrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 2px;
  gap: 8px;
  cursor: pointer;
`;

/**
 * StyledCheckbox
 * @description 기본 HTML 체크박스를 숨기고 커스텀 스타일링된 체크박스로 대체합니다.
 */
const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  overflow: hidden;
  appearance: none;
  cursor: pointer;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`;

/**
 * IconWrapper
 * @description 체크박스 내부 아이콘의 위치를 조정하는 컨테이너입니다.
 */
const IconWrapper = styled.span<TypePropertyPrefixInjector<{ top: string }>>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * StyledLabel
 * @description 체크박스 옆에 표시되는 레이블 텍스트를 스타일링합니다.
 */
const StyledLabel = styled.label`
  cursor: pointer;
  color: #cdccd4;
  display: flex;
  align-items: center;
`;

/**
 * CheckboxComponent
 * @description 체크박스의 외곽 스타일을 정의합니다. 상태(활성화, 비활성화, 선택 여부)에 따라 스타일이 변경됩니다.
 */
const CheckboxComponent = styled.div<{ $disabled?: boolean; $checked?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin: 0;
  border: 1px solid #ddd;

  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: #24242d;
      border: 1px solid #36373c;
      cursor: not-allowed;
      + .customLabel {
        color: #73727e;
      }
    `}

  &.grey {
    ${({ $checked }) =>
      $checked &&
      css`
        background-color: #73727e;
        border: 1px solid #73727e;
        svg {
          color: #cdccd4;
        }
        &:active {
          background-color: #53525b;
          border: 1px solid #53525b;
          + .customLabel {
            color: #cdccd4;
          }
        }
      `}
  }

  &.primary {
    ${({ $checked }) =>
      $checked &&
      css`
        background-color: var(--yellow-light);
        border: 1px solid var(--yellow-main);
        &:active {
          border-color: var(--g55);
          + .customLabel {
            color: #cdccd4;
          }
        }
      `}
  }

  &.transparent {
    ${({ $checked }) =>
      $checked &&
      css`
        svg {
          color: #000;
        }
        &:active {
          background-color: #eaeef4;
          border: 1px solid #c7cbd3;
          + .customLabel {
            color: #cdccd4;
          }
        }
      `}
  }
`;

/**
 * Checkbox 컴포넌트
 *
 * @description 커스텀 스타일링된 체크박스를 렌더링하는 컴포넌트입니다.
 */
const Checkbox = forwardRef(function Checkbox(
  { mode = 'transparent', label, id, checked, onChange, disabled, iconWrapperTop = '0', ...props }: CustomCheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <CheckboxWrapper htmlFor={id}>
      <StyledCheckbox
        checked={checked}
        onChange={onChange}
        className={checkboxVariants({ mode })}
        id={id}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <CheckboxComponent className={checkboxVariants({ mode })} $disabled={disabled} $checked={checked}>
        <IconWrapper $top={iconWrapperTop}>
          {checked && <CheckIcon className={checkboxVariants({ mode })} width={18} height={18} />}
        </IconWrapper>
      </CheckboxComponent>
      {label && (
        <StyledLabel className='customLabel' htmlFor={id}>
          <Caption2>{label}</Caption2>
        </StyledLabel>
      )}
    </CheckboxWrapper>
  );
});

export { Checkbox, StyledCheckbox, type CustomCheckboxProps };
