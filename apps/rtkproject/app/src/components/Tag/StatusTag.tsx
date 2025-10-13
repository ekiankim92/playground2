import { StyledTag, StyledTagProps } from './Tag.styles';

export type StatusTagKind = 'success' | 'fail' | 'default';

export interface StatusTagProps extends StyledTagProps {
  status?: StatusTagKind;
}

const StatusTag: React.FC<StatusTagProps> = (props) => {
  const { status, $size = 'sm', $style, ...rest } = props;
  const conditionalStyle = $size === 'sm' && status === 'success' ? { fontWeight: 700 } : {};

  const mergedStyle = {
    ...conditionalStyle,
    ...($style || {}),
  };

  let colorPalette: StyledTagProps['$colorPalette'] = 'default';

  if (status === 'success') {
    colorPalette = 'green';
  } else if (status === 'fail') {
    colorPalette = 'red';
  }

  return <StyledTag $variant='solid' $colorPalette={colorPalette} $size={$size} {...rest} $style={mergedStyle} />;
};

export default StatusTag;
