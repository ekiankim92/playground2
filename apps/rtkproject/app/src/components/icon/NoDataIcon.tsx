import { SVGProps } from 'react';

/**
 * NoDataIcon 컴포넌트
 * 데이터가 없음을 나타내는 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 데이터 없음 아이콘 SVG 요소
 */
export const NoDataIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='120' height='121' viewBox='0 0 120 121' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect y='0.5' width='120' height='120' rx='60' fill='#EDEDED' />
      <rect x='27' y='37' width='27' height='16' fill='#B9BABB' />
      <path d='M91 37H54V53H89C90.1046 53 91 52.1046 91 51V37Z' fill='white' />
      <rect x='27' y='53' width='27' height='16' fill='#A3A3A3' />
      <rect x='27' y='69' width='27' height='16' fill='#C6C7C8' />
      <rect width='37' height='14' rx='2' transform='matrix(-1 0 0 1 99 54)' fill='white' />
      <rect width='37' height='16' rx='2' transform='matrix(-1 0 0 1 95 69)' fill='white' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M75.5858 72.0858C76.3668 71.3047 77.6332 71.3047 78.4142 72.0858L96.4142 90.0858C97.1953 90.8668 97.1953 92.1332 96.4142 92.9142C95.6332 93.6953 94.3668 93.6953 93.5858 92.9142L75.5858 74.9142C74.8047 74.1332 74.8047 72.8668 75.5858 72.0858Z'
        fill='#A3A3A3'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M96.4142 72.0858C97.1953 72.8668 97.1953 74.1332 96.4142 74.9142L78.4142 92.9142C77.6332 93.6953 76.3668 93.6953 75.5858 92.9142C74.8047 92.1332 74.8047 90.8668 75.5858 90.0858L93.5858 72.0858C94.3668 71.3047 95.6332 71.3047 96.4142 72.0858Z'
        fill='#A3A3A3'
      />
    </svg>
  );
};
