import { SVGProps } from 'react';

/**
 * 쉐브론 왼쪽 방향 아이콘 컴포넌트
 * 쉐브론 왼쪽 방향으로 주로 드롭다운 펼치기 상호작용에 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ChevronSingleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='Icon/Chevron_Single_Left'>
        <path
          id='chevron_left (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.3536 13.0202C10.1583 13.2155 9.84171 13.2155 9.64645 13.0202L4.97978 8.35354C4.88601 8.25978 4.83333 8.1326 4.83333 7.99999C4.83333 7.86738 4.88601 7.7402 4.97978 7.64644L9.64645 2.97977C9.84171 2.78451 10.1583 2.78451 10.3536 2.97977C10.5488 3.17503 10.5488 3.49161 10.3536 3.68688L6.04044 7.99999L10.3536 12.3131C10.5488 12.5084 10.5488 12.8249 10.3536 13.0202Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};
