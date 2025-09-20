import styled from 'styled-components';
import { Body3 } from '../Typography';

/**
 * 옵션 아이템 컴포넌트의 속성을 정의합니다.
 *
 * content - 옵션 아이템에 표시될 내용
 * onClick - 옵션 아이템 클릭 시 호출될 함수
 * disabled - 옵션 아이템의 비활성화 여부
 * preContent - 내용 앞에 표시될 요소
 * optionItemStyle - 옵션 아이템 컨테이너의 스타일
 * optionItemContentStyle - 옵션 아이템 내용의 스타일
 * icon - 옵션 아이템에 표시될 아이콘
 * iconShowing - 아이콘 표시 여부
 */
interface OptionItemProps {
  content: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  preContent?: React.ReactNode;
  optionItemStyle?: React.CSSProperties;
  optionItemContentStyle?: React.CSSProperties;
  icon?: React.ReactNode;
  iconShowing?: boolean;
}

/**
 * 옵션 아이템 컴포넌트
 *
 * 드롭다운이나 메뉴 등에서 사용되는 선택 가능한 항목을 표시합니다.
 * 문자열 또는 React 노드를 내용으로 받을 수 있으며, 아이콘 및 추가 콘텐츠를 포함할 수 있습니다.
 */
const OptionItem = ({
  content,
  disabled = false,
  icon,
  iconShowing,
  onClick,
  optionItemContentStyle,
  optionItemStyle,
  preContent,
}: OptionItemProps) => {
  /**
   * 내용이 문자열인 경우 Typography 컴포넌트로 감싸고, 그렇지 않은 경우 그대로 사용합니다.
   */
  const typeParsedContent =
    typeof content === 'string' ? (
      <Body3 color={'#000'} style={optionItemContentStyle}>
        {content}
      </Body3>
    ) : (
      content
    );

  return (
    <OptionItemWrapper onClick={onClick} $disabled={disabled} style={optionItemStyle}>
      {preContent}
      <OptionItemContent style={optionItemContentStyle}>{typeParsedContent}</OptionItemContent>
      {iconShowing && icon}
    </OptionItemWrapper>
  );
};

export default OptionItem;

/**
 * 옵션 아이템의 외부 래퍼 스타일 컴포넌트
 *
 * $disabled - 비활성화 상태 여부에 따라 스타일이 변경됩니다.
 */
const OptionItemWrapper = styled.li<{ $disabled: boolean }>`
  list-style-type: none;
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: '100%';
  gap: 4px;
  background: var(--BG-Normal);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  /* hover 상태 */
  &:hover {
    background: #f3f4f4;
  }

  /* pressed 상태 */
  &:active {
    background: '#eaeef4';
  }

  /* disabled 상태 */
  ${({ $disabled }) =>
    $disabled &&
    `
    background: #eaeef4;
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

/**
 * 옵션 아이템 내용의 스타일 컴포넌트
 *
 * 내용의 최대 너비를 제한하고 남은 공간을 채우도록 설정합니다.
 */
const OptionItemContent = styled.div`
  max-width: 168px;
  flex-grow: 1;
`;
