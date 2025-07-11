import { SVGProps } from 'react';

/**
 * 닫기 아이콘 컴포넌트
 * 동그란 원 안에 X 모양으로 닫기임을 알 수 있도록 표시합니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달할 props (색상, 크기, 이벤트 핸들러 등)
 * @returns JSX.Element 화살표 아이콘 SVG 요소
 */
export const CancelCircleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      cursor='pointer'
      {...props}
    >
      <path
        d='M15.8702 8.47008C15.8702 8.37186 15.7899 8.2915 15.6917 8.2915L14.2184 8.2982L11.9997 10.9433L9.78317 8.30043L8.30772 8.29374C8.20951 8.29374 8.12915 8.37186 8.12915 8.47231C8.12915 8.51472 8.14477 8.5549 8.17156 8.58838L11.0756 12.0482L8.17156 15.5058C8.14459 15.5385 8.12962 15.5795 8.12915 15.6219C8.12915 15.7201 8.20951 15.8004 8.30772 15.8004L9.78317 15.7937L11.9997 13.1486L14.2162 15.7915L15.6894 15.7982C15.7876 15.7982 15.868 15.7201 15.868 15.6196C15.868 15.5772 15.8524 15.537 15.8256 15.5036L12.926 12.046L15.83 8.58615C15.8568 8.5549 15.8702 8.51249 15.8702 8.47008Z'
        fill={props.color || '#38383B'}
      />
      <path
        d='M12 2C6.47768 2 2 6.47768 2 12C2 17.5223 6.47768 22 12 22C17.5223 22 22 17.5223 22 12C22 6.47768 17.5223 2 12 2ZM12 20.3036C7.41518 20.3036 3.69643 16.5848 3.69643 12C3.69643 7.41518 7.41518 3.69643 12 3.69643C16.5848 3.69643 20.3036 7.41518 20.3036 12C20.3036 16.5848 16.5848 20.3036 12 20.3036Z'
        fill={props.color || '#38383B'}
      />
    </svg>
  );
};
