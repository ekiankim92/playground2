import { SVGProps } from 'react';

/**
 * 복사 아이콘 컴포넌트
 * 겹쳐진 직사각형 형태로써 복사임을 알 수 있게 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 복사 아이콘 SVG 요소
 */
export const CopyIcon = ({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.25 5C4.25 4.0335 5.0335 3.25 6 3.25H14C14.9665 3.25 15.75 4.0335 15.75 5V7.6H14.25V5C14.25 4.86193 14.1381 4.75 14 4.75H6C5.86193 4.75 5.75 4.86193 5.75 5V15C5.75 15.1381 5.86193 15.25 6 15.25H8.75V16.75H6C5.0335 16.75 4.25 15.9665 4.25 15V5Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.25 9C8.25 8.0335 9.0335 7.25 10 7.25H18C18.9665 7.25 19.75 8.0335 19.75 9V19C19.75 19.9665 18.9665 20.75 18 20.75H10C9.0335 20.75 8.25 19.9665 8.25 19V9ZM10 8.75C9.86193 8.75 9.75 8.86193 9.75 9V19C9.75 19.1381 9.86193 19.25 10 19.25H18C18.1381 19.25 18.25 19.1381 18.25 19V9C18.25 8.86193 18.1381 8.75 18 8.75H10Z'
        fill={fill}
      />
    </svg>
  );
};
