import styled, { css } from 'styled-components';
import { ButtonSizes, ButtonVariants } from './Button';

export const BUTTON_SIZE = {
  lg: {
    width: '418px',
    height: '48px',
  },
  md: {
    width: '100px',
    height: '40px',
  },
  sm: {
    padding: '12px 16px',
  },
  xs: {
    padding: '9px 12px',
  },
  small: {
    padding: '0px 8px',
  },
  medium: {
    padding: '0px 16px',
  },
  large: {
    padding: '0px 24px',
  },
};

export const Button = styled.button<{
  $variants?: ButtonVariants;
  type?: 'submit' | 'button';
  size?: ButtonSizes;
  $isLoading?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  $rightIcon?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  ${({ $variants, size }) => {
    let backgroundColor,
      color,
      border,
      hoverBackgroundColor,
      hoverColor,
      disabledBackgroundColor,
      disabledColor,
      width,
      height,
      padding,
      outline,
      borderRadius = '8px';

    switch ($variants) {
      case 'primary':
        backgroundColor = 'var(--yellow-main)';
        color = 'var(--g90, #1f1f1f)';
        hoverBackgroundColor = 'var(-yellow-light)';
        disabledBackgroundColor = 'lightgray';
        disabledColor = '#fff';
        border = '1px solid #f1b200';
        break;

      case 'secondary':
        backgroundColor = '#FFCC00';
        color = '#94989e';
        // hoverBackgroundColor = "#FFCC00";
        disabledBackgroundColor = 'lightgray';
        disabledColor = '#fff';
        break;

      case 'white':
        backgroundColor = '#fff';
        color = '#7B7B7B';
        hoverBackgroundColor = '#F4F4F4';
        disabledBackgroundColor = 'lightgray';
        disabledColor = '#fff';
        border = '1px solid #7B7B7B';
        break;

      case 'grey':
        borderRadius = 'var(--radius-medium, 6px)';
        backgroundColor = ' var(--g75, #474747)';
        color = 'var(--g0)';
        break;

      case 'none':
        backgroundColor = 'transparent';
        color = 'var(--g90)';
        border = 'none';
        break;
    }

    if (size === 'lg' || size === 'md') {
      width = BUTTON_SIZE[size].width;
      height = BUTTON_SIZE[size].height;
    } else if (size === 'sm' || size === 'xs') {
      padding = BUTTON_SIZE[size].padding;
      width = 'fit-content';
    } else if (size === 'small' || size === 'medium' || size === 'large') {
      padding = BUTTON_SIZE[size].padding;
      width = 'fit-content';
    }

    return css`
      border-radius: 8px;
      background-color: ${backgroundColor};
      color: ${color};
      border: ${border};
      width: ${width};
      height: ${height};
      padding: ${padding};
      outline: ${outline};

      &:hover {
        background-color: ${hoverBackgroundColor};
        color: ${hoverColor};
      }

      &:disabled {
        background-color: ${disabledBackgroundColor};
        color: ${disabledColor};
        border-color: lightgray;

        cursor: not-allowed;
      }
    `;
  }}
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
