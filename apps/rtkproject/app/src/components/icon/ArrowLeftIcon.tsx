import { SVGProps } from 'react';

/**
 * 왼쪽 화살표 아이콘 컴포넌트
 * 왼쪽 방향 화살표를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      cursor='pointer'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.1339 27.5509C16.6457 28.039 15.8542 28.039 15.3661 27.5509L8.69946 20.8842C8.21131 20.3961 8.21131 19.6046 8.69946 19.1165L15.3661 12.4499C15.8542 11.9617 16.6457 11.9617 17.1339 12.4499C17.622 12.938 17.622 13.7295 17.1339 14.2176L11.3511 20.0004L17.1339 25.7831C17.622 26.2713 17.622 27.0627 17.1339 27.5509Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.33331 20.0005C8.33331 19.3101 8.89296 18.7505 9.58331 18.7505L29.5833 18.7505C30.2736 18.7505 30.8333 19.3101 30.8333 20.0005C30.8333 20.6908 30.2736 21.2505 29.5833 21.2505L9.58331 21.2505C8.89296 21.2505 8.33331 20.6908 8.33331 20.0005Z'
        fill='currentColor'
      />
    </svg>
  );
};
