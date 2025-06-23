import { SVGProps } from 'react';

/**
 * 왼쪽 방향 화살표 컴포넌트
 * 왼쪽 방향 화살표 아이콘 < 을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 왼쪽 화살표 아이콘 SVG 요소
 */
export const HistoryTabLeftBasicIcon = (props: SVGProps<SVGSVGElement>) => {
  const svgStyle: React.CSSProperties = {
    fill: 'none',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    strokeWidth: 3,
  };

  return (
    <svg
      id='_레이어_1'
      data-name='레이어_1'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 20 20'
      stroke='currentColor'
      {...props}
    >
      <polyline style={svgStyle} points='13.64 17.51 6.36 10.24 13.64 2.97' />
    </svg>
  );
};
