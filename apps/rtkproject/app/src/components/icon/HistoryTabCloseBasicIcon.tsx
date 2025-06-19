import { SVGProps } from 'react';

/**
 * 닫기 아이콘 컴포넌트
 * X 형태의 닫기 버튼 아이콘을 표시합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {SVGProps<SVGSVGElement>} props.svgProps - SVG 요소에 전달될 props (필수)
 * @param {React.CSSProperties} props.lineStyle - 라인 스타일을 위한 CSS 속성 객체 (필수)
 * @returns {JSX.Element} X 형태의 닫기 아이콘 SVG 요소
 *
 * @example
 * // 기본 사용법
 * <HistoryTabCloseBasicIcon
 *   svgProps={{ width: 24, height: 24 }}
 *   lineStyle={{ stroke: '#FF0000', strokeWidth: 3 }}
 * />
 */
export const HistoryTabCloseBasicIcon = (props: {
  svgProps: SVGProps<SVGSVGElement>;
  lineStyle: React.CSSProperties;
}) => {
  const svgStyle: React.CSSProperties = {
    fill: 'none',
    stroke: '#000',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    strokeWidth: 2,
    ...props.lineStyle,
  };

  return (
    <svg
      id='layer_1'
      data-name='layer_1'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 16 16'
      aria-label='닫기 버튼'
      role='img'
      {...props.svgProps}
    >
      <g>
        <line x1='2.5' y1='2.5' x2='13.5' y2='13.5' style={svgStyle} />
        <line x1='13.5' y1='2.5' x2='2.5' y2='13.5' style={svgStyle} />
      </g>
    </svg>
  );
};
