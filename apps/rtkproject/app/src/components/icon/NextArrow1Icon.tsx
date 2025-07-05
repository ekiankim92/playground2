import { SVGProps } from 'react';

/**
 * 다음 화살표 아이콘 컴포넌트
 * 오른쪽 방향 화살표 아이콘 >을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 오른쪽 화살표 아이콘 SVG 요소
 */
export const NextArrow1Icon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      width='current'
      height='current'
      fill='currentColor'
      aria-label='다음 화살표'
      role='img'
      {...props}
    >
      <path d='M5.64645 13.5202C5.84171 13.7154 6.15829 13.7154 6.35355 13.5202L11.0202 8.85351C11.114 8.75974 11.1667 8.63257 11.1667 8.49996C11.1667 8.36735 11.114 8.24017 11.0202 8.14641L6.35355 3.47974C6.15829 3.28448 5.84171 3.28448 5.64645 3.47974C5.45118 3.675 5.45118 3.99158 5.64645 4.18685L9.95956 8.49996L5.64645 12.8131C5.45118 13.0083 5.45118 13.3249 5.64645 13.5202Z' />
    </svg>
  );
};
