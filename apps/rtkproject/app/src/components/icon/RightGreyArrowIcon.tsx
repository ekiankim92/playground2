import { SVGProps } from 'react';

/**
 * 오른쪽 화살표 아이콘 컴포넌트
 * 오른쪽 방향의 화살표 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const RightGreyArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.14645 4.97994C9.34171 4.78468 9.65829 4.78468 9.85356 4.97994L12.5202 7.6466C12.7155 7.84187 12.7155 8.15845 12.5202 8.35371L9.85355 11.0204C9.65829 11.2156 9.34171 11.2156 9.14645 11.0204C8.95118 10.8251 8.95118 10.5085 9.14645 10.3133L11.4596 8.00016L9.14645 5.68705C8.95118 5.49179 8.95118 5.17521 9.14645 4.97994Z'
        fill='var(--Gray-G25)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.667 8C12.667 8.27614 12.4431 8.5 12.167 8.5L4.16697 8.5C3.89083 8.5 3.66697 8.27614 3.66697 8C3.66697 7.72386 3.89083 7.5 4.16697 7.5L12.167 7.5C12.4431 7.5 12.667 7.72386 12.667 8Z'
        fill='var(--Gray-G25)'
      />
    </svg>
  );
};
