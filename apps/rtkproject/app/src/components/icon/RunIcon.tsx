import { SVGProps } from 'react';

/**
 * 실행 아이콘 컴포넌트
 * 재생 모양의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 실행 아이콘 SVG 요소
 */
export const RunIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='State/Icon'>
        <path
          id='Icon'
          d='M11.8999 7.13407C12.5666 7.51897 12.5666 8.48122 11.8999 8.86612L5.29991 12.6766C4.63324 13.0615 3.7999 12.5804 3.7999 11.8106L3.7999 4.18959C3.7999 3.41979 4.63324 2.93866 5.2999 3.32356L11.8999 7.13407Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};
