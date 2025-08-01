import { SVGProps } from 'react';

/**
 * 리소스 요청 아이콘 컴포넌트
 * 문서 형태와 화살표를 표시하는 아이콘입니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 리소스 요청 아이콘 SVG 요소
 */
export const ResourcesRequestIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 24 24' {...props}>
      <defs>
        <style>{`.st0 { fill: #6b7079; }`}</style>
      </defs>
      <g>
        <g>
          <path
            className='st0'
            d='M16.21,12.37H7.79c-.49,0-.88-.39-.88-.88s.39-.88.88-.88h8.41c.49,0,.88.39.88.88s-.39.88-.88.88Z'
          />
          <path
            className='st0'
            d='M9.38,13.98c-.22,0-.45-.09-.62-.26l-1.58-1.58c-.34-.34-.34-.9,0-1.24l1.64-1.64c.34-.34.9-.34,1.24,0,.34.34.34.9,0,1.24l-1.02,1.02.96.96c.34.34.34.9,0,1.24-.17.17-.4.26-.62.26Z'
          />
        </g>
        <g>
          <path
            className='st0'
            d='M16.21,17.26H7.79c-.49,0-.88-.39-.88-.88s.39-.88.88-.88h8.41c.49,0,.88.39.88.88s-.39.88-.88.88Z'
          />
          <path
            className='st0'
            d='M14.62,18.87c-.22,0-.45-.09-.62-.26-.34-.34-.34-.9,0-1.24l.96-.96-1.02-1.02c-.34-.34-.34-.9,0-1.24.34-.34.9-.34,1.24,0l1.64,1.64c.34.34.34.9,0,1.24l-1.58,1.58c-.17.17-.4.26-.62.26Z'
          />
        </g>
      </g>
      <g>
        <path
          className='st0'
          d='M19.65,23.5H4.35c-2.12,0-3.85-1.73-3.85-3.85V4.35C.5,2.23,2.23.5,4.35.5h10.95c.23,0,.46.09.62.26l7.33,7.33c.34.34.34.9,0,1.24-.34.34-.9.34-1.24,0l-7.07-7.07H4.35c-1.15,0-2.09.94-2.09,2.09v15.3c0,1.15.94,2.09,2.09,2.09h15.3c1.15,0,2.09-.94,2.09-2.09v-7.72c0-.49.39-.88.88-.88s.88.39.88.88v7.72c0,2.12-1.73,3.85-3.85,3.85Z'
        />
        <path
          className='st0'
          d='M22.62,9.58h-4.36c-2.12,0-3.85-1.73-3.85-3.85V1.38c0-.36.21-.68.54-.81.33-.14.71-.06.96.19l7.33,7.33c.25.25.33.63.19.96-.14.33-.46.54-.81.54ZM16.17,3.5v2.24c0,1.15.94,2.09,2.09,2.09h2.24l-4.33-4.33Z'
        />
      </g>
    </svg>
  );
};
