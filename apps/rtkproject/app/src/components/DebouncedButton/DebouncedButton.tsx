import { debounce } from 'lodash';
import { forwardRef, useEffect, useMemo } from 'react';
import { Button } from '../Button';
import { DebouncedButtonProps } from './types';

const DebouncedButton = forwardRef<HTMLButtonElement, DebouncedButtonProps>(
  ({ timer = 500, onClick, ...buttonProps }, ref) => {
    const debouncedClick = useMemo(
      () =>
        onClick
          ? debounce((e: React.MouseEvent<HTMLButtonElement>) => onClick(e), timer, {
              leading: true,
              trailing: false,
            })
          : undefined,
      [onClick, timer],
    );

    useEffect(() => {
      return () => {
        if (debouncedClick) {
          debouncedClick.cancel();
        }
      };
    }, [debouncedClick]);

    return <Button ref={ref} onClick={debouncedClick as React.MouseEventHandler<HTMLButtonElement>} {...buttonProps} />;
  },
);

DebouncedButton.displayName = 'DebouncedButton';

export default DebouncedButton;
