import { SVGProps } from 'react';

/**
 * 폴더 아이콘 컴포넌트
 * 폴더 형태의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const BucketBaseIcon = ({ width = '20', height = '20', ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 20 20'
      width={width}
      height={height}
      fill='currentColor'
      {...props}
    >
      <path d='M18.25,2.5h-7.22c-.23,0-.44.1-.58.28l-2.21,2.72H1.75c-.41,0-.75.34-.75.75v10.5c0,.41.34.75.75.75h16.5c.41,0,.75-.34.75-.75V3.25c0-.41-.34-.75-.75-.75Z' />
    </svg>
  );
};
