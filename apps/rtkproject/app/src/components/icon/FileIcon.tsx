import { SVGProps } from 'react';

/**
 * 파일 아이콘 컴포넌트
 * 파일 형태의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const FileIcon = ({ fill = 'currentColor', stroke = '#474747', ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M5 3.80005C5 3.24776 5.44772 2.80005 6 2.80005H14L19 8.80005V19.8C19 20.3523 18.5523 20.8 18 20.8H6C5.44772 20.8 5 20.3523 5 19.8V3.80005Z'
        fill={fill}
        stroke={stroke}
        strokeLinejoin='round'
      />
      <path
        d='M19 8.80005L14 2.80005L14 7.80005C14 8.35233 14.4477 8.80005 15 8.80005L19 8.80005Z'
        fill={fill}
        stroke={stroke}
        strokeLinejoin='round'
      />
    </svg>
  );
};
