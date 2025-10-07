import styled, { css } from 'styled-components';
import { StyledUICommonProps } from '../types';

type StyledTagVariantKind = keyof typeof variantStyles;
type StyledTagSizeKind = keyof typeof sizeStyles;
type StyledTagColorPalletteKind = keyof typeof colorPaletteStyles;

export interface StyledTagProps extends StyledUICommonProps {
  $variant?: StyledTagVariantKind;
  $size?: StyledTagSizeKind;
  $colorPalette?: StyledTagColorPalletteKind;
}

const variantStyles = {
  solid: css`
    background: unset;
  `,
} as const;

const colorPaletteStyles = {
  default: css`
    color: var(--Gray-G55);
    background-color: var(--Gray-G10);
  `,
  green: css`
    color: var(--System-Green-Text);
    background-color: var(--System-Green-BG);
  `,
  red: css`
    color: var(--System-Red-Text);
    background-color: var(--System-Red-BG);
  `,
  none: css``,
} as const;

const sizeStyles = {
  sm: css`
    padding: 2px 6px;
    font-size: 12px;
    font-weight: 500;
  `,
  md: css`
    padding: 4px 8px;
    font-size: 16px;
    font-weight: 700;
  `,
} as const;

export const StyledTag = styled.span<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--Radius-Small);
  box-sizing: border-box;
  vertical-align: middle;

  ${({ $variant }) => ($variant && variantStyles[$variant]) || ''}
  ${({ $colorPalette }) => ($colorPalette && colorPaletteStyles[$colorPalette]) || ''}
  ${({ $size }) => ($size && sizeStyles[$size]) || ''} ${({ $style }) => $style && { ...$style }};
`;
