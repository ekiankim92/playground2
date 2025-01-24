import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  title: string | number;
  style?: CSSProperties;
}

export default function CardHeader({ title, style }: Props) {
  const childRef = useRef<HTMLDivElement>(null);

  const [childFontSize, setChildFontSize] = useState(() => {
    if (style?.fontSize) {
      if (typeof style?.fontSize === 'number') {
        return style.fontSize;
      }

      if (typeof style?.fontSize === 'string') {
        return parseInt(style.fontSize) || 16;
      }
    }
    return 16;
  });

  useLayoutEffect(() => {
    if (childRef.current) {
      const computedStyle = window.getComputedStyle(childRef.current);
      const fontSize = parseInt(computedStyle.fontSize);
      setChildFontSize(fontSize);
    }
  }, [title]);

  console.log('childFontSize:', childFontSize);

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

  return (
    <div ref={childRef}>
      <div>{title}</div>
    </div>
  );
}
