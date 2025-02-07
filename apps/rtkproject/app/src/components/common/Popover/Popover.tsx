import {
  type Placement,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { useEffect } from 'react';

import styled from '@emotion/styled';

const PLACEMENT: Placement[] = [
  'top',
  'top-end',
  'top-start',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
];

const PopOverRefContent = styled.div`
  outline: none;
`;

interface PopoverProps {
  isOpen: boolean;
  changeIsOpen: (isOpen: boolean) => void;
  placement?: Placement;
  offsetValue?: {
    mainAxis?: number;
    crossAxis?: number;
  };
  fallbackPlacements?: Placement[];
  refStyle?: React.CSSProperties;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
}

const Popover = ({
  isOpen,
  placement = 'bottom',
  offsetValue,
  changeIsOpen,
  fallbackPlacements = PLACEMENT,
  refStyle,
  children,
  triggerRef,
}: PopoverProps) => {
  const mainAxis = offsetValue?.mainAxis ?? 0;
  const crossAxis = offsetValue?.crossAxis ?? 0;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: placement,
    onOpenChange: changeIsOpen,
    middleware: [
      offset(({ placement }) => {
        const sign = placement.startsWith('top') ? 1 : -1;
        return {
          mainAxis: sign * mainAxis,
          crossAxis: sign * crossAxis,
        };
      }),
      flip({
        fallbackAxisSideDirection: 'end',
        fallbackPlacements: fallbackPlacements,
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    outsidePressEvent: 'mousedown',
  });

  const role = useRole(context);

  const { getFloatingProps } = useInteractions([dismiss, role]);

  useEffect(() => {
    if (triggerRef && triggerRef.current) {
      refs.setReference(triggerRef.current);
    }
  }, [triggerRef, refs]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <PopOverRefContent ref={refs.setFloating} style={{ ...floatingStyles, ...refStyle }} {...getFloatingProps()}>
          {children}
        </PopOverRefContent>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

export default Popover;
