import { Button } from '@/components/common';
import { EditIcon } from '@/components/common/icon/EditIcon';
import { CSSProperties, Dispatch, SetStateAction, useCallback, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  title: string | number;
  style?: CSSProperties;
  customColor?: string;
  useIsEdit?: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function CardHeader({ title, style, customColor, useIsEdit }: Props) {
  const childRef = useRef<HTMLDivElement>(null);

  const [isEdit, setIsEdit] = useIsEdit || [];

  const [childFontSize, setChildFontSize] = useState(() => {
    if (style?.fontSize) {
      if (typeof style.fontSize === 'number') {
        return style.fontSize;
      }
      if (typeof style.fontSize === 'string') {
        return parseInt(style.fontSize) || 20;
      }
    }
    return 20;
  });

  useLayoutEffect(() => {
    if (childRef.current) {
      const computedStyle = window.getComputedStyle(childRef.current);
      const fontSize = parseInt(computedStyle.fontSize);
      setChildFontSize(fontSize);
    }
  }, [title]);

  const calculateTransform = (size: number) => {
    if (size === 20) {
      return 'translate(-15%, -5%)';
    }
    if (size === 16) {
      return 'translate(-32%, -4%)';
    }

    // 다른 크기일 경우 기본 계산식 적용
    const baseTransformX = -15;
    const baseTransformY = -5;

    const transformX = baseTransformX * (size / 20);
    const transformY = baseTransformY * (size / 20);

    return `translate(${transformX}%, ${transformY}%)`;
  };

  const calculatePadding = (size: number) => {
    // 기준값 설정
    const BASE_FONT_SIZE = 20;
    const BASE_PADDING = 10;

    const RATIO = 0.5; // padding = fontSize * 0.5

    const padding = size * RATIO;
    return `${Math.round(padding)}px`;
  };

  const onClickEdit = useCallback(() => {
    if (setIsEdit) {
      setIsEdit(true);
    }
  }, [setIsEdit]);

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: customColor === '#fff' ? '0px' : calculatePadding(childFontSize),
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        ref={childRef}
        style={{
          color: '#1d1f22',
          letterSpacing: '-0.5px',
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: '3',
          ...style,
        }}
      >
        {title}
      </div>
      {!isEdit && (
        <Button size='small' variants='white' height={28} rightIcon={<EditIcon />} onClick={onClickEdit}>
          수정
        </Button>
      )}
      <span
        style={{
          width: childFontSize,
          height: childFontSize,
          background: customColor ? customColor : 'var(--color-yellow-positive)',
          borderRadius: '9999px',
          position: 'absolute',
          top: 0,
          left: 0,
          // transform: calculateTransform(childFontSize),
          zIndex: '0',
        }}
      />
    </div>
  );
}
