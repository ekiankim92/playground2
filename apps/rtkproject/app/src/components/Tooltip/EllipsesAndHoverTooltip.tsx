import { Placement } from '@floating-ui/react-dom';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from './Tooltip';

interface Props extends PropsWithChildren {
  className?: string;
  color?: string;
  width?: number;
  tooltipContent?: React.ReactNode;
  position?: Placement;
}

export const EllipsisAndHoverTooltip = ({
  className,
  color,
  width,
  tooltipContent,
  position = 'bottom',
  children,
}: Props) => {
  const descRef = useRef<HTMLDivElement | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (descRef.current) {
        setIsTooltipVisible(descRef.current.scrollWidth > descRef.current.clientWidth);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (descRef.current) {
      observer.observe(descRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [children, width]);

  return (
    <Tooltip zIndex={9999} tooltipContent={isTooltipVisible ? tooltipContent : undefined} position={position}>
      <DescColumn className={className} ref={descRef} color={color} $width={width}>
        {children}
      </DescColumn>
    </Tooltip>
  );
};

const DescColumn = styled.div<{ $color?: string; $width?: number }>`
  width: ${({ $width }) => ($width ? `${$width - 6}px` : '100%')}; // ... 으로 동일하게 표기하기 위해 -6px 연산
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $color }) => $color || 'inherit'};
`;
