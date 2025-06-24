import { SVGProps } from 'react';

/**
 * 오른쪽 방향 화살표 컴포넌트
 * 오른쪽 방향 화살표 아이콘 > 을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 오른쪽 화살표 아이콘 SVG 요소
 */
export const HistoryTabRightBasicIcon = (props: SVGProps<SVGSVGElement>) => {
  const svgStyle: React.CSSProperties = {
    fill: 'none',
    stroke: '#000',
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
      {...props}
    >
      <polyline style={svgStyle} points='6.36 17.51 13.64 10.24 6.36 2.97' />
    </svg>
  );
};
