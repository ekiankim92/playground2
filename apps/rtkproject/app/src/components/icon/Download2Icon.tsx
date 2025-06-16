import { SVGProps } from 'react';

/**
 * 다운로드 아이콘 컴포넌트
 * 받침이 직선 형태인 다운로드를 나타내는 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 다운로드 아이콘 SVG 요소
 */
export const DownloadIcon = ({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='Icon'>
        <path
          id='Vector 1 (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.3973 8.2275C12.6169 8.44717 12.6169 8.80332 12.3973 9.02299L9.39726 12.023C9.17758 12.2427 8.82143 12.2427 8.60176 12.023L5.60176 9.02299C5.38208 8.80332 5.38208 8.44717 5.60176 8.2275C5.82142 8.00783 6.17758 8.00783 6.39725 8.2275L8.99951 10.8298L11.6018 8.2275C11.8214 8.00783 12.1776 8.00783 12.3973 8.2275Z'
          fill={fill}
        />
        <path
          id='Vector 113 (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.99951 2.81274C9.31017 2.81274 9.56201 3.06458 9.56201 3.37524L9.56201 11.6253C9.56201 11.9359 9.31017 12.1878 8.99951 12.1878C8.68885 12.1878 8.43701 11.9359 8.43701 11.6253L8.43701 3.37524C8.43701 3.06458 8.68885 2.81274 8.99951 2.81274Z'
          fill={fill}
        />
        <path
          id='Vector 107 (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.812 14.6252C14.812 14.9359 14.5602 15.1877 14.2495 15.1877H3.7495C3.43884 15.1877 3.187 14.9359 3.187 14.6252C3.187 14.3146 3.43884 14.0627 3.7495 14.0627H14.2495C14.5602 14.0627 14.812 14.3146 14.812 14.6252Z'
          fill={fill}
        />
      </g>
    </svg>
  );
};
