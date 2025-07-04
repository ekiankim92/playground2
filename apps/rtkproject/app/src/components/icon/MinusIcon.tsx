import { SVGProps } from 'react';

/**
 * 빼기 아이콘 컴포넌트
 * 직선 형태의 빼기 기호(-) 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 빼기 아이콘 SVG 요소
 */
export const MinusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='Icon'>
        <path
          id='Vector 107 (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.5415 10C3.5415 9.65482 3.82133 9.375 4.1665 9.375L15.8332 9.375C16.1784 9.375 16.4582 9.65482 16.4582 10C16.4582 10.3452 16.1784 10.625 15.8332 10.625L4.1665 10.625C3.82133 10.625 3.5415 10.3452 3.5415 10Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};
