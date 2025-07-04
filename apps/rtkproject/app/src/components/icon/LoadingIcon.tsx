import { SVGProps } from 'react';

/**
 * 로딩 아이콘 컴포넌트
 * 로딩 중임을 나타내는 회전하는 원형 아이콘을 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 로딩 아이콘 SVG 요소
 */
export function LoadingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid'
      cursor={'pointer'}
      {...props}
    >
      <circle cx='12' cy='12' fill='none' stroke='#60584C' strokeWidth='2' r='10' strokeDasharray='35 15'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 12 12;360 12 12'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
    </svg>
  );
}
