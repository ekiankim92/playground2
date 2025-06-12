import { SVGProps } from 'react';

/**
 * 원형 성공 아이콘 컴포넌트
 * 원형 성공(체크) 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 원형 성공 아이콘 SVG 요소
 */
export const CircleSuccessIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.45268 11.487C7.73598 11.1849 8.21061 11.1695 8.51279 11.4528L10.6665 13.472L15.4869 8.95285C15.7891 8.66955 16.2637 8.68486 16.547 8.98704C16.8303 9.28923 16.815 9.76385 16.5128 10.0472L11.1795 15.0472C10.891 15.3176 10.442 15.3176 10.1535 15.0472L7.48688 12.5472C7.1847 12.2639 7.16939 11.7892 7.45268 11.487ZM12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        fill='currentColor'
      />
    </svg>
  );
};
