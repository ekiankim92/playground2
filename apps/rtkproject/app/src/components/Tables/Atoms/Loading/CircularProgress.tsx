import styled, { keyframes } from 'styled-components';

/**
 * 원형 프로그레스 컴포넌트의 속성을 정의합니다.
 *
 * size - 컴포넌트의 크기(픽셀)
 * color - 프로그레스 원의 색상
 * strokeWidth - 원의 선 두께
 * backgroundColor - 배경 원의 색상
 * duration - 애니메이션 완료 시간(초)
 */
interface CircularProgressProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  duration?: number;
}

/**
 * 회전 애니메이션을 정의하는 키프레임
 *
 * 0도에서 360도까지 회전하는 애니메이션입니다.
 */
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

/**
 * 스피너 래퍼 스타일 컴포넌트
 *
 * 스피너의 크기를 지정하는 컨테이너입니다.
 *
 * $size - 컴포넌트의 크기(픽셀)
 */
const SpinnerWrapper = styled.div<{ $size: number }>`
  display: inline-flex;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

/**
 * 스피너 SVG 스타일 컴포넌트
 *
 * 회전 애니메이션이 적용된 SVG 요소입니다.
 *
 * $duration - 애니메이션 완료 시간(초)
 */
const Spinner = styled.svg<{ $duration: number }>`
  animation: ${spin} ${(props) => props.$duration}s linear infinite;
  width: 100%;
  height: 100%;
`;

/**
 * 원 스타일 컴포넌트
 *
 * 프로그레스를 표시하는 원형 요소입니다.
 *
 * $strokeWidth - 원의 선 두께
 * $radius - 원의 반지름
 */
const Circle = styled.circle<{
  $strokeWidth: number;
  $radius: number;
}>`
  fill: none;
  stroke: ${(props) => props.color || 'var(--KB-Yellow-Main)'};
  stroke-width: ${(props) => props.$strokeWidth};
  stroke-linecap: round;
  stroke-dasharray: ${(props) => {
    const circumference = 2 * Math.PI * props.$radius;
    return `${circumference * 0.15} ${circumference}`;
  }};
`;

/**
 * 배경 원 스타일 컴포넌트
 *
 * 프로그레스 원 뒤에 표시되는 배경 원입니다.
 */
const BackgroundCircle = styled(Circle)`
  stroke-dasharray: none;
`;

/**
 * 원형 프로그레스 컴포넌트
 *
 * 로딩 상태를 표시하는 회전하는 원형 프로그레스 인디케이터입니다.
 * 크기, 색상, 선 두께, 배경색, 애니메이션 속도를 커스터마이징할 수 있습니다.
 */
const CircularProgress = ({
  size = 52,
  color,
  strokeWidth = 2,
  backgroundColor = '#D3D3D3',
  duration = 1,
}: CircularProgressProps) => {
  /**
   * SVG 뷰박스 크기를 계산합니다.
   */
  const viewBoxSize = size;
  /**
   * 원의 중심 좌표를 계산합니다.
   */
  const center = viewBoxSize / 2;
  /**
   * 원의 반지름을 계산합니다.
   * 선 두께를 고려하여 원이 SVG 영역을 벗어나지 않도록 합니다.
   */
  const radius = (viewBoxSize - strokeWidth) / 2;

  return (
    <SpinnerWrapper $size={size}>
      <Spinner viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} $duration={duration}>
        <BackgroundCircle
          cx={center}
          cy={center}
          r={radius}
          color={backgroundColor}
          $radius={radius}
          $strokeWidth={strokeWidth}
        />
        <Circle cx={center} cy={center} r={radius} $radius={radius} color={color} $strokeWidth={strokeWidth} />
      </Spinner>
    </SpinnerWrapper>
  );
};

export default CircularProgress;
