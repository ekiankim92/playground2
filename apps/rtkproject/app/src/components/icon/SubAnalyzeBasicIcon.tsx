import { SVGProps } from 'react';

/**
 * 분석 아이콘 컴포넌트
 * 분석 기호를 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 분석 아이콘 SVG 요소
 */
export const SnbAnalyzeBasicIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      aria-label='분석 아이콘'
      role='img'
      fill='currentColor'
      {...props}
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M26.6667 19.6667H5.33337V17.6667H26.6667V19.6667Z' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.66663 26.6667C9.66663 26.1145 10.1143 25.6667 10.6666 25.6667H21.3333C21.8856 25.6667 22.3333 26.1145 22.3333 26.6667C22.3333 27.219 21.8856 27.6667 21.3333 27.6667H10.6666C10.1143 27.6667 9.66663 27.219 9.66663 26.6667Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.2155 23.6667C14.0692 23.6667 13.9399 23.7622 13.8969 23.9021L12.9557 26.9608L11.0442 26.3727L11.9854 23.3139C12.2866 22.3348 13.1912 21.6667 14.2155 21.6667H17.7844C18.8088 21.6667 19.7133 22.3348 20.0146 23.3139L20.9557 26.3727L19.0442 26.9608L18.103 23.9021C18.06 23.7622 17.9308 23.6667 17.7844 23.6667H14.2155Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.00004 7.66675C7.07957 7.66675 6.33337 8.41294 6.33337 9.33341V20.0001C6.33337 20.9206 7.07957 21.6667 8.00004 21.6667H24C24.9205 21.6667 25.6667 20.9206 25.6667 20.0001V9.33342C25.6667 8.41294 24.9205 7.66675 24 7.66675H8.00004ZM4.33337 9.33341C4.33337 7.30837 5.975 5.66675 8.00004 5.66675H24C26.0251 5.66675 27.6667 7.30837 27.6667 9.33342V20.0001C27.6667 22.0251 26.0251 23.6667 24 23.6667H8.00004C5.975 23.6667 4.33337 22.0251 4.33337 20.0001V9.33341Z'
      />
    </svg>
  );
};
