import { useCallback, useState } from 'react';

interface DisclosureState {
  isOpen: boolean;
}

interface DisclosureActions {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

interface DisclosureOptions {
  defaultOpen?: boolean;
}

export default function useDisclosure({ defaultOpen = false }: DisclosureOptions = {}): DisclosureState &
  DisclosureActions {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
  }, [isOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
