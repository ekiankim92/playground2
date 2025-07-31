import { SVGProps } from 'react';

/**
 * 대시보드 열기 아이콘 컴포넌트
 * 대시보드 열기 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 대시보드 열기 아이콘 SVG 요소
 */
export const SnbFullMenuOpenBasicIcon = (props: SVGProps<SVGSVGElement>) => {
  const svgStyle: React.CSSProperties = {
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 35 35'
      aria-label='대시보드 열기 아이콘'
      role='img'
      fill='currentColor'
      stroke='currentColor'
      {...props}
    >
      <g>
        <polyline style={svgStyle} points='24.35 8.54 29.63 13.81 24.35 19.08' />
        <line style={svgStyle} x1='16.97' y1='13.81' x2='29.63' y2='13.81' />
        <line style={svgStyle} x1='5.37' y1='18.03' x2='14.86' y2='18.03' />
        <line style={svgStyle} x1='5.37' y1='9.59' x2='12.75' y2='9.59' />
        <line style={svgStyle} x1='5.37' y1='26.46' x2='23.3' y2='26.46' />
      </g>
    </svg>
  );
};
