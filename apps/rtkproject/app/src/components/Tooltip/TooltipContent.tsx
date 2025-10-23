import styled from 'styled-components';
import { Body3, Caption1 } from '../Typography';

/**
 * 툴팁 콘텐츠 본문의 기본 속성을 정의합니다.
 *
 * labelText - 라벨 텍스트
 * valueText - 값 텍스트
 */
interface ToolTipContentBodyProps {
  labelText: string;
  valueText: string;
}

/**
 * 툴팁 콘텐츠 본문의 태그 텍스트 래퍼 스타일 컴포넌트
 */
const ToolTipContentBodyTagTextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

/**
 * 툴팁 콘텐츠 본문의 태그 불릿 스타일 컴포넌트
 */
const ToolTipContentBodyTagBullet = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--Chart-C-01);
`;

/**
 * 커스텀 툴팁 본문 텍스트 스타일 컴포넌트
 *
 * $color - 텍스트 색상
 * $paddingLeft - 왼쪽 패딩
 */
const CustomizedTooltipBody6 = styled(Body3)<{
  $color: string;
  $paddingLeft?: string;
}>`
  white-space: nowrap;
  color: ${({ $color }) => $color};
  padding-left: ${({ $paddingLeft }) => $paddingLeft ?? 0};
`;

/**
 * 툴팁 콘텐츠 본문의 태그 텍스트 컴포넌트
 *
 * 불릿과 텍스트를 함께 표시합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.text - 표시할 텍스트
 */
const ToolTipContentBodyTagText = ({ text }: { text: string }) => (
  <ToolTipContentBodyTagTextWrapper>
    <ToolTipContentBodyTagBullet />
    <CustomizedTooltipBody6 $color='var(--Grey-G-0)'>{text}</CustomizedTooltipBody6>
  </ToolTipContentBodyTagTextWrapper>
);

/**
 * 툴팁 콘텐츠 본문의 단일 항목 래퍼 스타일 컴포넌트
 *
 * direction - 레이아웃 방향 ('row' 또는 'column')
 */
const ToolTipContentBodySingleItemWrapper = styled.div<{
  direction: 'row' | 'column';
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => (props.direction === 'column' ? 'center' : 'space-between')};
  align-items: center;
  gap: ${(props) => (props.direction === 'column' ? '4px' : '12px')};
`;

/**
 * 툴팁 콘텐츠 본문의 단일 항목 값 래퍼 스타일 컴포넌트
 */
const ToolTipContentBodySingleItemValueWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  justify-content: flex-end;
  align-items: center;
`;

/**
 * 툴팁 콘텐츠 본문의 단일 항목 속성을 정의합니다.
 *
 * labelText - 라벨 텍스트
 * valueText - 값 텍스트
 * direction - 레이아웃 방향 ('row' 또는 'column')
 */
interface ToolTipContentBodySingleItemProps extends ToolTipContentBodyProps {
  direction?: 'row' | 'column';
}

/**
 * 툴팁 콘텐츠 본문의 단일 항목 컴포넌트
 *
 * 라벨과 값을 지정된 방향으로 표시합니다.
 *
 * @param {ToolTipContentBodySingleItemProps} props - 컴포넌트 속성
 */
const ToolTipContentBodySingleItem = ({
  labelText,
  valueText,
  direction = 'column',
}: ToolTipContentBodySingleItemProps) => {
  return (
    <ToolTipContentBodySingleItemWrapper direction={direction}>
      <ToolTipContentBodyTagText text={labelText} />
      <ToolTipContentBodySingleItemValueWrapper>
        <CustomizedTooltipBody6 $color='var(--Grey-G-10)' $paddingLeft='16px'>
          {valueText}
        </CustomizedTooltipBody6>
      </ToolTipContentBodySingleItemValueWrapper>
    </ToolTipContentBodySingleItemWrapper>
  );
};

/**
 * 툴팁 콘텐츠 본문의 목록 항목 속성을 정의합니다.
 *
 * data - 표시할 데이터 배열
 */
interface ToolTipContentBodyListItemProps {
  data: ToolTipContentBodyProps[];
}

/**
 * 툴팁 콘텐츠 본문의 목록 항목 래퍼 스타일 컴포넌트
 */
const ToolTipContentBodyListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

/**
 * 툴팁 콘텐츠 본문의 목록 항목 컴포넌트
 *
 * 여러 항목을 세로로 나열합니다.
 */
const ToolTipContentBodyListItem = ({ data }: ToolTipContentBodyListItemProps) => (
  <ToolTipContentBodyListItemWrapper>
    {data.map((ele, index) => (
      <ToolTipContentBodySingleItem key={index} direction='row' labelText={ele.labelText} valueText={ele.valueText} />
    ))}
  </ToolTipContentBodyListItemWrapper>
);

/**
 * 툴팁 콘텐츠 본문의 라벨 컴포넌트
 */
const ToolTipContentBodyLabel = ({ labelText }: { labelText: string }) => (
  <ToolTipContentBodyTagText text={labelText} />
);

/**
 * 툴팁 콘텐츠 본문의 값 컴포넌트
 */
const ToolTipContentBodyValue = ({ value }: { value: string }) => (
  <CustomizedTooltipBody6 $color='var(--Grey-G-10)'>{value}</CustomizedTooltipBody6>
);

/**
 * 툴팁 콘텐츠 본문의 강조 텍스트 컴포넌트
 */
const ToolTipContentBodyCallout = ({ value }: { value: string }) => (
  <Caption1 color='var(--Static-White)'>{value}</Caption1>
);

export {
  ToolTipContentBodyCallout,
  ToolTipContentBodyLabel,
  ToolTipContentBodyListItem,
  ToolTipContentBodySingleItem,
  ToolTipContentBodyValue,
  type ToolTipContentBodyListItemProps,
  type ToolTipContentBodyProps,
  type ToolTipContentBodySingleItemProps,
};
