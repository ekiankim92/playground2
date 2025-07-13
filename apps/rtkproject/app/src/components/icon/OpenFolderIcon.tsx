import { SVGProps } from 'react';

/**
 * 폴더 아이콘 컴포넌트
 * 열린 폴더 형태의 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 폴더 아이콘 SVG 요소
 */
export const OpenFolderIcon = (props: SVGProps<SVGSVGElement>) => {
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
          d='M2.0835 4.75C2.0835 4.19771 2.53121 3.75 3.0835 3.75H7.14082C7.49289 3.75 7.81902 3.93514 7.99947 4.23744L8.35503 4.83308C8.53549 5.13538 8.86161 5.32051 9.21368 5.32051H16.0835C16.6358 5.32051 17.0835 5.76823 17.0835 6.32051V13.4167C17.0835 14.5212 16.1881 15.4167 15.0835 15.4167H3.0835C2.53121 15.4167 2.0835 14.969 2.0835 14.4167V4.75Z'
          fill='var(--Gray-G10)'
          stroke='currentColor'
        />
        <path
          id='Rectangle 14'
          d='M5.5695 9.96887C5.73 9.60774 6.08813 9.375 6.48332 9.375H18.4069C19.1443 9.375 19.628 10.1457 19.3075 10.8097L17.6293 14.2861C17.2956 14.9773 16.5957 15.4166 15.8282 15.4166H3.0835C2.53121 15.4166 2.0835 14.9689 2.0835 14.4166V14.1667V14.2424C2.0835 14.6608 2.4227 15 2.84113 15C3.14054 15 3.41186 14.8237 3.53346 14.5501L5.5695 9.96887Z'
          fill='white'
          stroke='currentColor'
        />
      </g>
    </svg>
  );
};
