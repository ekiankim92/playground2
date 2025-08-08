import { SVGProps } from 'react';

/**
 * 정렬 아이콘의 기본 베이스 컴포넌트
 * 모든 정렬 아이콘(기본, 오름차순, 내림차순)의 기본 SVG 컨테이너입니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달될 props
 * @returns JSX.Element 정렬 아이콘의 기본 SVG 컨테이너
 */
const BaseSortIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='24'
    viewBox='0 0 20 24'
    fill='none'
    cursor={'pointer'}
    {...props}
  />
);

/**
 * 위쪽 삼각형 아이콘 컴포넌트
 * 주로 오름차순 정렬 상태를 표시하는 데 사용됩니다.
 *
 * @param Object props - 컴포넌트 props
 * @param string [props.fill=var(--Gray-G25)] - 삼각형의 채우기 색상
 * @returns JSX.Element 위쪽을 가리키는 삼각형 path 요소
 */
const TriangleUp = ({ fill = 'var(--Gray-G25)' }: { fill?: string }) => (
  <path d='M10 4.5L13.4641 10.5H6.5359L10 4.5Z' fill={fill} />
);

/**
 * 아래쪽 삼각형 아이콘 컴포넌트
 * 주로 내림차순 정렬 상태를 표시하는 데 사용됩니다.
 *
 * @param Object props - 컴포넌트 props
 * @param string [props.fill=var(--Gray-G25)] - 삼각형의 채우기 색상
 * @returns JSX.Element 아래쪽을 가리키는 삼각형 path 요소
 */
const TriangleDown = ({ fill = 'var(--Gray-G25)' }: { fill?: string }) => (
  <path d='M10 19.5L6.5359 13.5L13.4641 13.5L10 19.5Z' fill={fill} />
);

/**
 * 기본 정렬 아이콘 컴포넌트
 * 정렬되지 않은 상태를 나타내며, 위/아래 삼각형 모두 기본 색상으로 표시됩니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달될 props
 * @returns JSX.Element 기본 정렬 상태 아이콘
 */
export const SortDefaultIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSortIcon {...props}>
    <TriangleUp />
    <TriangleDown />
  </BaseSortIcon>
);

/**
 * 오름차순 정렬 아이콘 컴포넌트
 * 오름차순으로 정렬된 상태를 나타내며, 아래쪽 삼각형이 강조 색상으로 표시됩니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달될 props
 * @returns JSX.Element 오름차순 정렬 상태 아이콘
 */
export const SortAscendingIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSortIcon {...props}>
    <TriangleUp />
    <TriangleDown fill='var(--KB-Gray)' />
  </BaseSortIcon>
);

/**
 * 내림차순 정렬 아이콘 컴포넌트
 * 내림차순으로 정렬된 상태를 나타내며, 위쪽 삼각형이 강조 색상으로 표시됩니다.
 *
 * @param SVGProps<SVGSVGElement> props - SVG 요소에 전달될 props
 * @returns JSX.Element 내림차순 정렬 상태 아이콘
 */
export const SortDescendingIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSortIcon {...props}>
    <TriangleUp fill='var(--KB-Gray)' />
    <TriangleDown />
  </BaseSortIcon>
);
