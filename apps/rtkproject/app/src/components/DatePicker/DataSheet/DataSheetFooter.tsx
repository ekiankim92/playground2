/**
 * @file DataSheetFooter.tsx
 * @description 데이터 시트의 하단 푸터 컴포넌트
 */
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/**
 * @component DataSheetFooterWrapper
 * @description 데이터 시트 푸터의 스타일을 정의하는 스타일드 컴포넌트
 *
 * 푸터 내 요소들을 오른쪽 정렬하고 간격을 설정하며, 테두리와 배경색을 적용합니다.
 */
const DataSheetFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 0 0 6px 6px;
  border: 1px solid #ddd;
  border-top: none;
`;

/**
 * @component DataSheetFooter
 * @description 데이터 시트의 하단 푸터 영역을 표시하는 컴포넌트
 *
 * 주로 버튼이나 액션 요소들을 포함하는 데이터 시트의 하단 영역입니다.
 */
const DataSheetFooter = ({ children }: PropsWithChildren) => {
  return <DataSheetFooterWrapper>{children}</DataSheetFooterWrapper>;
};

export { DataSheetFooter };
