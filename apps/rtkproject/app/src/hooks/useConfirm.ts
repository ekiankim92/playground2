import { useCallback } from 'react';

interface UseConfirmOptions {
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirm = () => {
  const confirm = useCallback(
    ({ message = '페이지를 나가시겠습니까? 작성된 내용은 사라집니다.', onConfirm, onCancel }: UseConfirmOptions) => {
      const confirmed = window.confirm(message);

      if (confirmed) {
        onConfirm?.();
        return true;
      } else {
        onCancel?.();
        return false;
      }
    },
    [],
  );

  return { confirm };
};
