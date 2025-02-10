import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

/** useClickOutside hook  */
export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  triggerRef?: RefObject<HTMLElement>,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (triggerRef && triggerRef.current?.contains(event.target as Node))
      )
        return;

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}
