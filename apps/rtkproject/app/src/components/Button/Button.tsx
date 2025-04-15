import { LoadingIcon } from '@/components/common/icon/index';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import * as S from './Button.styles';

export type ButtonVariants = 'primary' | 'secondary' | 'white' | 'grey' | 'none';
export type ButtonSizes = 'lg' | 'md' | 'sm' | 'xs' | 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 종류를 선택합니다. */
  variants?: ButtonVariants;
  /** 버튼 타입을 지정합니다. */
  type?: 'submit' | 'button';
  /** 버튼 사이즈를 나타냅니다. */
  size?: ButtonSizes;
  /** 버튼 문구를 나타냅니다. */
  children?: React.ReactNode;
  /** 버튼의 로딩 상태를 지정할 수 있습니다. 로딩은 disabled 상태와 같습니다. */
  isLoading?: boolean;
  /** 버튼의 비활성화를 나타냅니다. */
  disabled?: boolean;
  /** icon */
  icon?: React.ReactNode;
  /** right icon */
  rightIcon?: React.ReactNode;
  /** icon에 color를 주입합니다. */
  iconColor?: string;

  /** variants, size에 없는 width를 직접 입력해 사용합니다. */
  width?: string | number;
  /** variants, size에 없는  height를 직접 입력해 사용합니다. */
  height?: string | number;
  /** css style을 커스텀 할 수 있습니다. */
  $customStyles?: React.CSSProperties;

  /** 버튼 클릭 이벤트 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variants = 'primary',
      type = 'button',
      size = 'lg',
      children,
      isLoading,
      disabled = false,
      icon,
      rightIcon,
      iconColor,
      width,
      height,
      $customStyles,
      onClick,
      ...props
    },
    ref,
  ) => {
    const containerStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...$customStyles,
    };

    return (
      <S.Button
        $variants={variants}
        type={type}
        size={size}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        style={containerStyle}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          try {
            if (disabled || isLoading) {
              return;
            }

            if (e.detail > 1) {
              return;
            }

            if (typeof onClick === 'function') {
              return onClick(e);
            }
          } catch (error) {
            console.error('Button click error:', error);
          }
        }}
        $rightIcon={!!rightIcon}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <S.LoadingWrapper>
            <LoadingIcon color={iconColor} />
          </S.LoadingWrapper>
        ) : null}
        {icon || null}
        {children}
        {rightIcon || null}
      </S.Button>
    );
  },
);
