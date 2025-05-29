import { SVGProps } from 'react';

/**
 * 쉐브론 아래 방향 아이콘 컴포넌트
 * 쉐브론 아래 방향으로 주로 드롭다운 펼치기 상호작용에 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.5302 10.4697C16.8231 10.7626 16.8231 11.2374 16.5302 11.5303L12.5302 15.5303C12.2373 15.8232 11.7624 15.8232 11.4695 15.5303L7.46955 11.5303C7.17665 11.2374 7.17665 10.7626 7.46955 10.4697C7.76244 10.1768 8.23732 10.1768 8.53021 10.4697L11.9999 13.9393L15.4695 10.4697C15.7624 10.1768 16.2373 10.1768 16.5302 10.4697Z'
        fill='currentColor'
      />
    </svg>
  );
};
