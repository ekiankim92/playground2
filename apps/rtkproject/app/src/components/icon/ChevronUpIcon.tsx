import { SVGProps } from 'react';

/**
 * 쉐브론 위 방향 아이콘 컴포넌트
 * 쉐브론 위 방향으로 주로 드롭다운 닫기 상호작용에 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ChevronUpIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.46955 13.5303C7.17665 13.2374 7.17665 12.7626 7.46955 12.4697L11.4695 8.46967C11.7624 8.17678 12.2373 8.17678 12.5302 8.46967L16.5302 12.4697C16.8231 12.7626 16.8231 13.2374 16.5302 13.5303C16.2373 13.8232 15.7624 13.8232 15.4695 13.5303L11.9999 10.0607L8.53021 13.5303C8.23731 13.8232 7.76244 13.8232 7.46955 13.5303Z'
        fill='currentColor'
      />
    </svg>
  );
};
