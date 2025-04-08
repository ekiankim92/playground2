import { Drawer, DrawerProps } from '@/components/common';
import { useLayoutEffect, useRef } from 'react';

type AppDrawerProps = Omit<DrawerProps, 'containerRef' | 'displayMode' | 'allowOverlayDismiss' | 'parentRef'>;

export const AppDrawer = ({ children, ...props }: AppDrawerProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = document.querySelector('#AppContentsContainer');
    if (element instanceof HTMLElement) {
      containerRef.current = element;
    }
  }, []);

  return (
    <Drawer
      {...props}
      containerRef={containerRef}
      displayMode='overlay'
      allowOverlayDismiss={true}
      overlayColor={'rgba(28, 18, 13, 0.40)'}
    >
      {props.isOpen && children}
    </Drawer>
  );
};
