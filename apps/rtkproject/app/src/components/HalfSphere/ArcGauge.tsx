import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

interface ArcGaugeProps {
  width: number;
  height: number;
  outerRadius: number;
  innerRadius: number;
  percent: number;
  backgroundArcColor: string;
  backgroundArcStrokeColor: string;
  progressColor: string;
  progressShadowColor: string;
  cornerRadius: number;
  children?: React.ReactNode;
}

const defaultOptions: ArcGaugeProps = {
  width: 200,
  height: 110,
  outerRadius: 100,
  innerRadius: 87,
  percent: 90.56,
  backgroundArcColor: 'var(--BG-Depth1)',
  backgroundArcStrokeColor: 'var(--Gray-G10)',
  progressColor: 'var(--KB-Yellow-Main)',
  progressShadowColor: 'var(--KB-Yellow-Main)',
  cornerRadius: 3,
};

export default function ArcGauge(props: Partial<ArcGaugeProps>) {
  const {
    width,
    height,
    outerRadius,
    innerRadius,
    percent,
    backgroundArcColor,
    backgroundArcStrokeColor,
    progressColor,
    progressShadowColor,
    cornerRadius,
    children,
  } = {
    ...defaultOptions,
    ...props,
  };

  // viewBox 패딩 값
  const padding = 5;
  const viewBoxWidth = width + padding;
  const viewBoxHeight = height + padding;

  const [animatedPercent, setAnimatedPercent] = useState(0);
  const requestRef = useRef<number>();

  const safePercent = Math.min(percent, 100);
  const startAngle = -Math.PI / 2; // 12시 방향
  const maxAngle = Math.PI / 2; // 6시 방향 (즉, 180도 반원)

  const backgroundArc = d3
    .arc()
    .cornerRadius(cornerRadius)
    .innerRadius(innerRadius + 1)
    .outerRadius(outerRadius - 1)
    .startAngle(startAngle)
    .endAngle(maxAngle);

  const progressArc = d3
    .arc()
    .cornerRadius(cornerRadius)
    .innerRadius(innerRadius - 0.1)
    .outerRadius(outerRadius + 0.1)
    .startAngle(startAngle)
    .endAngle(startAngle + (maxAngle - startAngle) * (animatedPercent / 100));

  // 애니메이션 효과
  useEffect(() => {
    let start: number | null = null;
    const duration = 500; // ms (애니메이션 시간)

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedPercent(safePercent * progress);
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedPercent(safePercent); // 정확하게 맞춰줌
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [safePercent]);

  return (
    <svg width={width} height={height} viewBox={`-${padding} ${padding / 2} ${viewBoxWidth} ${viewBoxHeight}`}>
      <defs>
        <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
          <feDropShadow dx='0' dy='0' stdDeviation='7' floodColor={progressShadowColor} floodOpacity='0.75' />
        </filter>
      </defs>

      <path
        d={backgroundArc({} as any) ?? ''}
        fill={backgroundArcColor}
        stroke={backgroundArcStrokeColor}
        strokeWidth={1}
        transform={`translate(${width / 2},${height})`}
      />

      <path
        filter='url(#shadow)'
        d={progressArc({} as any) ?? ''}
        fill={progressColor}
        transform={`translate(${width / 2},${height})`}
      />

      {children}
    </svg>
  );
}
