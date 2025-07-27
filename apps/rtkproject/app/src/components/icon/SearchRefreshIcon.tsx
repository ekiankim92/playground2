import { SVGProps } from 'react';

/**
 * 검색 새로고침 아이콘 컴포넌트
 * 새로고침 기호를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 검색 새로고침 아이콘 SVG 요소
 */
export const SearchRefreshIcon = (props: SVGProps<SVGSVGElement>) => {
  const svgStyle: React.CSSProperties = {
    fill: 'none',
    stroke: '#747881',
    strokeLinejoin: 'round',
    strokeWidth: 2,
  };

  return (
    <svg
      id='_레이어_1'
      data-name='레이어_1'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 24 24'
      {...props}
    >
      <path style={svgStyle} d='M8.68,6.31l-4.5-.59.62-4.22' />
      <path
        style={svgStyle}
        d='M1.5,12.3c-.07,2.63.95,5.28,3.07,7.29,4.1,3.89,10.75,3.89,14.85,0,4.1-3.89,4.1-10.19,0-14.07s-10.75-3.89-14.85,0'
      />
    </svg>
  );
};
