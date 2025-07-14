import { SVGProps } from 'react';

/**
 * 일시 정지 아이콘 컴포넌트
 * 정사각형 형태의 정지 아이콘 ㅁ을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 일시 정지 아이콘 SVG 요소
 */
export const PauseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='State/Icon'>
        <rect id='Icon' x='3.6001' y='3.60059' width='8.8' height='8.8' rx='1' fill='currentColor' />
      </g>
    </svg>
  );
};
