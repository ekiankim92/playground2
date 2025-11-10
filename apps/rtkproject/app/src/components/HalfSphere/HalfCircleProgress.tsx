import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import ArcGauge from './ArcGauge';

/**
 * 정렬 옵션을 정의하는 타입
 */
type Align = 'start' | 'center' | 'end';

/**
 * 반원형 진행 상태 컴포넌트의 속성을 정의합니다.
 *
 * progress - 진행률(백분율, 0-100)
 * currentValue - 현재 값(예: 92)
 * totalValue - 총 값(예: 100)
 * title - 상단에 표시되는 제목
 * unit - 값의 단위
 * size - SVG 크기
 * strokeWidth - 선 두께
 * color - 진행 상태 색상
 * trackColor - 배경 트랙 색상
 * align - 제목 정렬 방식
 * isShowBottom - 하단 텍스트 표시 여부
 * bottomValue - 하단에 표시할 값(사용 가능한 값)
 * customStyles - 추가 스타일 속성
 */
interface HalfCircleProgressProps {
  progress: number; // Progress percentage (0 - 100)
  currentValue: number; // Current value (e.g., 92)
  totalValue?: number; // Total value (e.g., 100)
  title: string; // 위에 들어가는 타이틀
  unit: string;
  size?: number; // SVG size
  strokeWidth?: number; // Stroke width
  color?: string; // Progress color
  trackColor?: string; // Background track color
  align?: Align;
  isShowBottom?: boolean;
  bottomValue?: number;
  customStyles?: CSSProperties;
}

/**
 * 반원형 진행 상태 컴포넌트
 *
 * 제목과 함께 반원형 게이지를 표시하는 카드 형태의 컴포넌트입니다.
 * 진행률, 현재 값, 총 값 등을 시각적으로 표현합니다.
 */
const HalfCircleProgress: React.FC<HalfCircleProgressProps> = ({
  progress,
  currentValue,
  totalValue = 100,
  title,
  unit,
  size = 200,
  strokeWidth = 12,
  color = 'var(--KB-Yellow-Main)',
  trackColor = 'var(--BG-Depth1)',
  align = 'center',
  isShowBottom = false,
  bottomValue,
  customStyles,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half-circle circumference
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <Wrapper style={{ ...customStyles }}>
      <Title $align={align}>{title}</Title>
      <ArcGauge percent={progress}>
        {/* Display Text */}
        <text
          x='50%'
          y='60%'
          dy={isShowBottom ? '3px' : '10px'}
          textAnchor='middle'
          fontSize={'28px'}
          fontWeight='700'
          fill='var(--Gray-G90)'
        >
          {progress}%
        </text>
        <text
          x='50%'
          y={isShowBottom ? '75%' : '80%'}
          dy={isShowBottom ? '8px' : '14px'}
          textAnchor='middle'
          fontSize={'16px'}
          fill='var(--Gray-G55)'
        >
          {currentValue} {unit} / 총 {totalValue} {unit}
        </text>
        {isShowBottom && (
          <text x='50%' y='90%' dy='8px' textAnchor='middle' fontSize={'14px'} fill='var(--Gray-G55)'>
            {bottomValue} {unit} 사용 가능
          </text>
        )}
      </ArcGauge>
    </Wrapper>
  );
};

export default HalfCircleProgress;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: var(--Radius-X-Large);
  border: 1px solid var(--Gray-G10);
  background-color: var(--BG-Normal);
  padding: 24px 16px 28px 16px;
`;

const Title = styled.div<{ $align?: Align }>`
  width: 100%;
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 700;
  text-align: ${(props) => props.$align};
`;
