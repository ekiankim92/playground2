import { useCallback, useEffect } from 'react';
import { Location, useBlocker } from 'react-router-dom';

interface UseRouterBlockerProps {
  shouldBlock: boolean;
  message?: string;
}

export const useRouterBlocker = ({
  shouldBlock,
  message = '페이지를 나가시겠습니까? 작성된 내용은 사라집니다.',
}: UseRouterBlockerProps) => {
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (shouldBlock) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    },
    [shouldBlock, message],
  );

  const blocker = useBlocker(
    useCallback(
      ({ currentLocation, nextLocation }: { currentLocation: Location; nextLocation: Location }) => {
        return shouldBlock && currentLocation.pathname !== nextLocation.pathname;
      },
      [shouldBlock],
    ),
  );

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const confirmed = window.confirm(message);
      if (confirmed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return blocker;
};
