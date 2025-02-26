import { useConfirm } from './useConfirm';
import { useRouterBlocker } from './useRouterBlocker';

interface UseNavigationGuardOptions {
  shouldBlock: boolean;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useNavigationGuard = ({
  shouldBlock,
  message = '페이지를 나가시겠습니까? 작성된 내용은 사라집니다.',
  onConfirm,
  onCancel,
}: UseNavigationGuardOptions) => {
  const { confirm } = useConfirm();

  const blocker = useRouterBlocker({
    shouldBlock,
    message,
  });

  return {
    confirm: (customOptions?: Partial<UseNavigationGuardOptions>) => {
      if (!shouldBlock) {
        customOptions?.onConfirm?.() || onConfirm?.();
        return true;
      }

      return confirm({
        message: customOptions?.message || message,
        onConfirm: customOptions?.onConfirm || onConfirm,
        onCancel: customOptions?.onCancel || onCancel,
      });
    },
    blocker,
  };
};
