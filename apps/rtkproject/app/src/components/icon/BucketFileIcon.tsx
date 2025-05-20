import { SVGProps } from 'react';
/**
 * 파일 아이콘 컴포넌트
 * 파일 형태의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const BucketFileIcon = ({ width = '20', height = '20', ...props }: SVGProps<SVGSVGElement>) => {
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
      <path d='M17.93,7.58s-.01-.1-.03-.14c0-.02-.01-.03-.02-.05-.03-.06-.06-.11-.11-.16L11.43,1.15s-.1-.07-.15-.1c-.02,0-.03-.01-.05-.02-.04-.01-.08-.02-.13-.02-.01,0-.02,0-.03,0H2.59c-.29,0-.53.24-.53.53v16.94c0,.29.24.53.53.53h14.82c.29,0,.53-.24.53-.53V7.62s0-.02,0-.03ZM16.09,7.09h-4.51V2.77l4.51,4.32Z' />
    </svg>
  );
};
