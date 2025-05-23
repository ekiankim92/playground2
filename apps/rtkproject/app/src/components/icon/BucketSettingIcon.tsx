import { SVGProps } from 'react';

/**
 * 설정 아이콘 컴포넌트
 * 톱니바퀴 모양으로 설정임을 알 수 있도록 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const BucketSettingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24} fill='none' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M16,12c0,2.21-1.79,4-4,4s-4-1.79-4-4,1.79-4,4-4,4,1.79,4,4Z'
      />
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M19.71,12c0-.62-.08-1.21-.22-1.79l2.5-1.82-1.87-3.24-2.83,1.26c-.87-.82-1.92-1.44-3.1-1.79l-.33-3.07h-3.74l-.33,3.07c-1.18.35-2.23.97-3.1,1.79l-2.83-1.26-1.87,3.24,2.5,1.82c-.14.57-.22,1.17-.22,1.79s.08,1.21.22,1.79l-2.5,1.82,1.87,3.24,2.83-1.26c.87.82,1.92,1.44,3.1,1.79l.33,3.07h3.74l.33-3.07c1.18-.35,2.23-.97,3.1-1.79l2.83,1.26,1.87-3.24-2.5-1.82c.14-.57.22-1.17.22-1.79Z'
      />
    </svg>
  );
};
