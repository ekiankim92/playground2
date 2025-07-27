import { SVGProps } from 'react';

/**
 * 검색 아이콘 컴포넌트
 * 돋보기 모양의 검색 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props RSVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 검색 아이콘 SVG 요소
 */
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='current'
      height='current'
      viewBox='0 0 20 20'
      fill='currentColor'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.75 4.375C6.33375 4.375 4.375 6.33375 4.375 8.75C4.375 11.1662 6.33375 13.125 8.75 13.125C11.1662 13.125 13.125 11.1662 13.125 8.75C13.125 6.33375 11.1662 4.375 8.75 4.375ZM3.125 8.75C3.125 5.6434 5.6434 3.125 8.75 3.125C11.8566 3.125 14.375 5.6434 14.375 8.75C14.375 11.8566 11.8566 14.375 8.75 14.375C5.6434 14.375 3.125 11.8566 3.125 8.75Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.8083 16.692L11.6416 12.5253L12.5255 11.6414L16.6921 15.8081C16.9362 16.0522 16.9362 16.4479 16.6921 16.692C16.4481 16.936 16.0523 16.936 15.8083 16.692Z'
        fill='currentColor'
      />
    </svg>
  );
};
