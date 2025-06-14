import { SVGProps } from 'react';

/**
 * 닫힌 폴더 아이콘 컴포넌트
 * 닫힌 폴더 형태의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const CloseFolderIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      cursor='pointer'
      {...props}
    >
      <g id='Folder/Icon'>
        <path
          id='Rectangle 13'
          d='M2.08325 4.75C2.08325 4.19771 2.53097 3.75 3.08325 3.75H7.14058C7.49264 3.75 7.81877 3.93514 7.99923 4.23744L8.35479 4.83308C8.53524 5.13538 8.86137 5.32051 9.21344 5.32051H16.0833C16.6355 5.32051 17.0833 5.76823 17.0833 6.32051V14.4167C17.0833 14.969 16.6355 15.4167 16.0833 15.4167H3.08325C2.53097 15.4167 2.08325 14.969 2.08325 14.4167V4.75Z'
          fill='#E1E2E3'
          stroke='currentColor'
        />
        <path
          id='Rectangle 14'
          d='M2.08325 8.5C2.08325 7.94772 2.53097 7.5 3.08325 7.5H16.0833C16.6355 7.5 17.0833 7.94772 17.0833 8.5V14.4167C17.0833 14.969 16.6355 15.4167 16.0833 15.4167H3.08325C2.53097 15.4167 2.08325 14.969 2.08325 14.4167V8.5Z'
          fill='white'
          stroke='currentColor'
        />
      </g>
    </svg>
  );
};
