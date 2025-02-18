export const DefinedColorStyles = {
  '--kb-primary': '#FFBC00',
  '--kb-secondary': '#FFCC00',
  '--kb-gray': '#60584C',
  '--kb-dark-gary': '#545045',
  '--kb-gold': '#8D744B',
  '--kb-silver': '#84888B',
  '--kb-red': '#EA4310',
} as const;

export type ColorKeys = keyof typeof DefinedColorStyles;

export const getColor = (color: ColorKeys): string => {
  return `var(${color})`;
};
