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

  return (
    <div ref={childRef}>
      <div>{title}</div>
    </div>
  );
}
