import { SVGProps } from 'react';

/**
 * 체크 아이콘 컴포넌트
 * 체크 기호를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const CheckThickIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='current' height='current' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        id='check'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z'
        fill='currentColor'
      />
    </svg>
  );
};
