import DebouncedButton from '@/components/common/button/DebouncedButton/DebouncedButton';
import { DebouncedButtonProps } from '@/components/common/button/DebouncedButton/types';
import { ContentModal, ContentModalProps } from '@/components/common/modal/Modal';
import useDisclosure from '@/util/hooks/useDisclosure';
import React, { cloneElement, CSSProperties, memo } from 'react';
import { AppDrawer } from '../AppDrawer/AppDrawer';

export interface ModalControl {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

type ModalConfig = {
  type: 'modal';
  props: Omit<ContentModalProps, 'headerProps' | 'bodyProps' | 'footerProps'> & {
    headerProps: {
      title: React.ReactNode;
      onClose?: (modalControl: ModalControl) => void;
      padding?: string;
      height?: string;
      closeButton?: React.ReactNode;
    };
    bodyProps: {
      style?: CSSProperties;
      children: React.ReactNode | ((modalControl: ModalControl) => React.ReactNode);
      padding?: string;
    };
    footerProps?: {
      style?: CSSProperties;
      confirmButtonProps?: DebouncedButtonProps;
      cancelButtonProps?: DebouncedButtonProps;
      onClickConfirm?: (modalControl: ModalControl) => void;
      onClickCancel?: (modalControl: ModalControl) => void;
      padding?: string;
      cancelText?: string;
      confirmText?: string;
      action?: React.ReactNode;
    };
  };
};

type DrawerConfig = {
  type: 'drawer';
  props: {
    style?: React.CSSProperties;
    allowOverlayDismiss?: boolean;
    headerTitle: string;
    subTitle?: string;
    children: React.ReactNode;
    onSuccess?: (modalControl: ModalControl) => void;
    onCancel?: (modalControl: ModalControl) => void;
  };
};

interface ModalButtonProps {
  buttonProps: Omit<DebouncedButtonProps, 'onClick'> & {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, modalControl: ModalControl) => void;
  };
  modalConfig: ModalConfig | DrawerConfig;
  defaultOpen?: boolean;
}

const ModalContent = ({
  config,
  isOpen,
  onClose,
  modalControl,
}: {
  config: ModalConfig | DrawerConfig;
  isOpen: boolean;
  onClose: () => void;
  modalControl: ModalControl;
}) => {
  if (isOpen && config.type === 'modal') {
    const { headerProps, bodyProps, footerProps, ...restProps } = config.props;
    return (
      <ContentModal
        {...restProps}
        headerProps={{
          ...headerProps,
          onClose: () => {
            if (footerProps?.onClickCancel) {
              footerProps?.onClickCancel?.(modalControl);
            } else {
              onClose();
            }
          },
        }}
        bodyProps={{
          ...bodyProps,
          children: isOpen ? (
            typeof bodyProps.children === 'function' ? (
              bodyProps.children(modalControl)
            ) : (
              bodyProps.children
            )
          ) : (
            <></>
          ),
        }}
        footerProps={
          footerProps && {
            ...footerProps,
            onClickConfirm: () => {
              footerProps.onClickConfirm?.(modalControl);
            },
            onClickCancel: () => {
              footerProps.onClickCancel?.(modalControl);
              // onClose();
            },
          }
        }
      />
    );
  }

  if (config.type === 'drawer')
    return (
      <AppDrawer
        isOpen={isOpen}
        style={{
          position: 'fixed',
          background: 'white',
          boxShadow: isOpen ? '-4px 0px 24px 0px rgba(23, 23, 25, 0.12)' : 'unset',
          ...config.props.style,
        }}
        headerTitle={config.props.headerTitle}
        subTitle={config.props.subTitle}
        onClose={() => {
          config.props.onCancel?.(modalControl);
          onClose();
        }}
      >
        {isOpen &&
          cloneElement(config.props.children as React.ReactElement, {
            modalControl,
            onCancel: () => {
              config.props.onCancel?.(modalControl);
              onClose();
            },
            onSuccess: () => {
              config.props.onSuccess?.(modalControl);
            },
          })}
      </AppDrawer>
    );
};

const ModalWithButton: React.FC<ModalButtonProps> = memo(({ buttonProps, modalConfig, defaultOpen = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultOpen });

  const modalControl: ModalControl = {
    isOpen,
    open: onOpen,
    close: onClose,
  };

  return (
    <>
      <DebouncedButton
        {...buttonProps}
        onClick={(e) => {
          buttonProps.onClick?.(e, modalControl);
          onOpen();
        }}
      />
      <ModalContent config={modalConfig} isOpen={isOpen} onClose={onClose} modalControl={modalControl} />
    </>
  );
});

ModalWithButton.displayName = 'ModalWithButton';

export default ModalWithButton;
