import { SVGProps } from 'react';

/**
 * 오른쪽 화살표 아이콘 컴포넌트
 * 오른쪽 방향 화살표를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.74654 5.47991C9.94181 5.28465 10.2584 5.28465 10.4537 5.47991L13.1203 8.14656C13.3156 8.34182 13.3156 8.6584 13.1203 8.85366L10.4537 11.5203C10.2584 11.7156 9.94181 11.7156 9.74654 11.5203C9.55128 11.325 9.55128 11.0085 9.74654 10.8132L12.0596 8.50011L9.74654 6.18702C9.55128 5.99175 9.55128 5.67517 9.74654 5.47991Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.2666 8.50012C13.2666 8.77626 13.0427 9.00012 12.7666 9.00012L4.7666 9.00012C4.49046 9.00012 4.2666 8.77626 4.2666 8.50012C4.2666 8.22398 4.49046 8.00012 4.7666 8.00012L12.7666 8.00012C13.0427 8.00012 13.2666 8.22398 13.2666 8.50012Z'
        fill='currentColor'
      />
    </svg>
  );
};
