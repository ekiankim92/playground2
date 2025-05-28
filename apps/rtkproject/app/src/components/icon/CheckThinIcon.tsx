import { SVGProps } from 'react';

/**
 * 체크 아이콘 컴포넌트
 * 체크 기호를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const CheckThinIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g id='!con/Check'>
        <path
          id='Check (Stroke)'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.3536 4.14645C14.5488 4.34171 14.5488 4.65829 14.3536 4.85355L6.35355 12.8536C6.15829 13.0488 5.84171 13.0488 5.64645 12.8536L1.64645 8.85355C1.45118 8.65829 1.45118 8.34171 1.64645 8.14645C1.84171 7.95118 2.15829 7.95118 2.35355 8.14645L6 11.7929L13.6464 4.14645C13.8417 3.95118 14.1583 3.95118 14.3536 4.14645Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};
