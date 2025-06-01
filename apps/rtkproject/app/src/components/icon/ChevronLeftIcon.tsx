import { SVGProps } from 'react';

/**
 * 쉐브론 왼쪽 방향 아이콘 컴포넌트
 * 쉐브론 왼쪽 방향으로 주로 드롭다운 펼치기 상호작용에 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.5302 16.7803C13.2373 17.0732 12.7624 17.0732 12.4695 16.7803L8.46955 12.7803C8.17666 12.4874 8.17666 12.0126 8.46955 11.7197L12.4695 7.71967C12.7624 7.42678 13.2373 7.42678 13.5302 7.71967C13.8231 8.01256 13.8231 8.48744 13.5302 8.78033L10.0605 12.25L13.5302 15.7197C13.8231 16.0126 13.8231 16.4874 13.5302 16.7803Z'
        fill='currentColor'
      />
    </svg>

    // <svg width="current" height="current" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">
    //   <g id="Icon/Arrow">
    //     <path
    //       id="arrow_down (Stroke)"
    //       fillRule="evenodd"
    //       clipRule="evenodd"
    //       d="M8.00033 2.83331C8.27647 2.83331 8.50033 3.05717 8.50033 3.33331V11.3934L10.9673 8.73668C11.1552 8.53432 11.4715 8.5226 11.6739 8.71051C11.8762 8.89841 11.888 9.21477 11.7001 9.41713L8.36672 13.0069C8.27212 13.1088 8.13936 13.1666 8.00033 13.1666C7.86129 13.1666 7.72854 13.1088 7.63393 13.0069L4.3006 9.41713C4.1127 9.21477 4.12441 8.89841 4.32677 8.71051C4.52912 8.5226 4.84549 8.53432 5.03339 8.73668L7.50033 11.3934V3.33331C7.50033 3.05717 7.72419 2.83331 8.00033 2.83331Z"
    //       fill="currentColor"
    //     />
    //   </g>
    // </svg>
  );
};
