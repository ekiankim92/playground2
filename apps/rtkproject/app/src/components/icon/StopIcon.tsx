import { SVGProps } from 'react';

/**
 * 정지 아이콘 컴포넌트
 * 정지 모양의 아이콘 ㅁ을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 시작 아이콘 SVG 요소
 */
export const StopIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect
        x='3.6001'
        y='3.6001'
        width='8.8'
        height='8.8'
        rx='1'
        fill={props.color ? props.color : 'var(--Gray-G55)'}
      />
    </svg>
  );
};
