import * as React from 'react';
import styled from 'styled-components';

// 아이콘 기본 props 인터페이스 (HTML span 요소의 모든 props를 상속)
interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean; // 아이콘 회전 애니메이션 적용 여부
  rotate?: number; // 아이콘 회전 각도 (도 단위)
}

// 사용자 정의 아이콘 컴포넌트 props 인터페이스
interface CustomIconComponentProps {
  width?: string | number; // 아이콘 너비
  height?: string | number; // 아이콘 높이
  fill?: string; // 아이콘 채우기 색상
  viewBox?: string; // SVG viewBox 속성
  className?: string; // CSS 클래스명
  style?: React.CSSProperties; // 인라인 스타일
}

// 아이콘 컴포넌트 타입 정의 (일반 컴포넌트 또는 forwardRef 컴포넌트)
type IconComponent =
  | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
  | React.ForwardRefExoticComponent<CustomIconComponentProps>;

// 아이콘 컴포넌트 props 인터페이스 (기본 props 상속)
interface IconComponentProps extends IconBaseProps {
  viewBox?: string; // SVG viewBox 속성
  component?: IconComponent; // 렌더링할 아이콘 컴포넌트
  ariaLabel?: React.AriaAttributes['aria-label']; // 접근성을 위한 aria-label
  color?: string; // 아이콘 색상
}

// forwardRef를 사용하여 ref를 전달할 수 있는 Icon 컴포넌트 정의
const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) => {
  const {
    component: Component,
    width: propWidth,
    height: propHeight,
    spin,
    rotate,
    style,
    className,
    color: propColor,
    ...restProps
  } = props;

  // 너비, 높이, 색상 설정 (스타일 속성이 있으면 우선 적용)
  const width = style?.width || propWidth || '16px';
  const height = style?.height || propHeight || '16px';
  const fill = style?.fill || propColor || '#cdccd4';

  // 클래스명 설정 (spin 속성이 true면 icon-spin 클래스 추가)
  const iconClassName = `${className || ''} ${spin ? 'icon-spin' : ''}`;

  // 스타일 설정 (rotate 속성이 있으면 transform 추가)
  const iconStyle = {
    ...style,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };

  return (
    <IconWrapper ref={ref} className={iconClassName} style={iconStyle} {...restProps}>
      {/* 컴포넌트가 제공되면 해당 컴포넌트 렌더링 */}
      {Component ? <Component width={width} height={height} color={fill} /> : null}
    </IconWrapper>
  );
});

// 개발 모드에서 컴포넌트 이름 표시를 위한 displayName 설정
Icon.displayName = 'Icon';

// 컴포넌트와 타입 내보내기
export { Icon, type CustomIconComponentProps, type IconBaseProps, type IconComponent, type IconComponentProps };

// 아이콘 래퍼 스타일 컴포넌트
const IconWrapper = styled.span`
  display: inline-flex;
`;
