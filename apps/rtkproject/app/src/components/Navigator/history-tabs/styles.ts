import styled from 'styled-components';

// 탭 컨테이너: 모든 탭을 감싸는 최상위 컨테이너
export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 8px 4px;
  border-bottom: 1px solid #dee2e6;
`;

// 개별 탭: 각 탭의 스타일 정의
export const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  // 활성 탭과 비활성 탭의 배경색 구분
  background-color: ${(props) => (props.isActive ? 'var(--Gray-G0)' : '#f8f9fa')};
  border: 1px solid #dee2e6;
  // 상단 노란색 보더로 탭 강조
  border-top: 3px solid var(--KB-Yellow-Main);
  border-radius: var(--Radius-Small);
  margin-right: 4px;
  padding: 6px 12px;
  cursor: pointer;

  // 호버 시 배경색 변경
  &:hover {
    background-color: var(--BG-Normal);
  }
`;

// 탭 내용 래퍼: 탭 내부의 콘텐츠를 감싸는 컨테이너
export const TabContentWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  // 활성 탭과 비활성 탭의 텍스트 색상 구분
  color: ${(props) => (props.isActive ? '#000' : '#495057')};
`;

// 닫기 버튼: 각 탭의 닫기 버튼 스타일
export const CloseButton = styled.button`
  border: none;
  background: none;
  color: #adb5bd;
  font-size: 16px;
  padding: 0 4px;
  cursor: pointer;

  // 호버 시 색상 변경으로 상호작용 표시
  &:hover {
    color: #495057;
  }
`;
