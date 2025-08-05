import { SVGProps } from 'react';

/**
 * 오브젝트 스토리지 아이콘 컴포넌트
 * 오브젝트 스토리지 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element SnbObjectStorageBasicIcon SVG 요소
 */
export const SnbObjectStorageBasicIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      fill={'currentColor'}
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5 5.75C4.86193 5.75 4.75 5.86193 4.75 6V18C4.75 18.1381 4.86193 18.25 5 18.25H19C19.1381 18.25 19.25 18.1381 19.25 18V6C19.25 5.86193 19.1381 5.75 19 5.75H5ZM3.25 6C3.25 5.0335 4.0335 4.25 5 4.25H19C19.9665 4.25 20.75 5.0335 20.75 6V18C20.75 18.9665 19.9665 19.75 19 19.75H5C4.0335 19.75 3.25 18.9665 3.25 18V6Z'
      />
      <path fillRule='evenodd' clipRule='evenodd' d='M20 10.75H4V9.25H20V10.75Z' />
      <path fillRule='evenodd' clipRule='evenodd' d='M8.25 19L8.25 5L9.75 5L9.75 19L8.25 19Z' />
      <path fillRule='evenodd' clipRule='evenodd' d='M20 14.75H4V13.25H20V14.75Z' />
    </svg>
  );
};
