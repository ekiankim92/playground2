import { SVGProps } from 'react';

/**
 * 이전 화살표 아이콘 컴포넌트
 * 왼쪽 방향 화살표 아이콘 <을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 왼쪽 화살표 아이콘 SVG 요소
 */
export const PrevArrow1Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      width='current'
      height='current'
      fill='currentColor'
      aria-label='이전 화살표'
      role='img'
      {...props}
    >
      <path d='M10.3536 13.5202C10.1583 13.7154 9.84171 13.7154 9.64645 13.5202L4.97978 8.85351C4.88601 8.75974 4.83333 8.63257 4.83333 8.49996C4.83333 8.36735 4.88601 8.24017 4.97978 8.14641L9.64645 3.47974C9.84171 3.28448 10.1583 3.28448 10.3536 3.47974C10.5488 3.675 10.5488 3.99158 10.3536 4.18685L6.04044 8.49996L10.3536 12.8131C10.5488 13.0083 10.5488 13.3249 10.3536 13.5202Z' />
    </svg>
  );
};
