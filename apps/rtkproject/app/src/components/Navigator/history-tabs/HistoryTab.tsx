import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { HistoryTabLeftBasicIcon } from '../../icon/HistoryTabLeftBasicIcon';
import { HistoryTabRightBasicIcon } from '../../icon/HistoryTabRightBasicIcon';

// 히스토리 탭 아이템의 인터페이스 정의
interface HistoryTabItem {
  id: string; // 탭의 고유 식별자
  title: ReactNode; // 탭 제목 (React 노드로 다양한 형태 지원)
  path: string; // 탭 경로 (URL)
  isActive: boolean; // 현재 활성화된 탭 여부
}

// 히스토리 탭 컴포넌트 props 인터페이스
interface HistoryTabsProps {
  tabs: HistoryTabItem[]; // 표시할 탭 목록
  onClose: (id: string) => void; // 탭 닫기 이벤트 핸들러
  onNavigate: (id: string) => void; // 탭 이동 이벤트 핸들러
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({ tabs, onClose, onNavigate }) => {
  // 탭 컨테이너 요소에 대한 참조
  const tabsRef = useRef<HTMLDivElement>(null);

  // 좌우 스크롤 버튼 클릭 시 처리 함수
  const handleScroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200; // 스크롤 이동 거리
      const newScrollPosition =
        direction === 'left' ? tabsRef.current.scrollLeft - scrollAmount : tabsRef.current.scrollLeft + scrollAmount;

      // 부드러운 스크롤 이동 처리
      tabsRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <HistoryTabsContainer>
      {/* 왼쪽 스크롤 버튼 */}
      <HistoryTabsScrollBtn direction='left' onClick={() => handleScroll('left')}>
        <HistoryTabLeftBasicIcon width={'15px'} stroke='#6F7075' />
      </HistoryTabsScrollBtn>

      {/* 탭 목록 컨테이너 */}
      <HistoryTabsWrapper ref={tabsRef}>
        {tabs.map((tab) => (
          <HistoryTabItem
            key={tab.id}
            $isActive={tab.isActive}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(tab.id); // 탭 클릭 시 해당 탭으로 이동
            }}
            href={tab.path}
            title={tab.path} // 툴팁으로 전체 경로 표시
          >
            <HistoryTabContent>
              <HistoryTabTitle>{tab.title}</HistoryTabTitle>
              {/* 탭 닫기 버튼 */}
              <HistoryTabCloseBtn
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // 탭 클릭 이벤트 전파 방지
                  onClose(tab.id); // 탭 닫기 이벤트 발생
                }}
              >
                ×
              </HistoryTabCloseBtn>
            </HistoryTabContent>
          </HistoryTabItem>
        ))}
      </HistoryTabsWrapper>

      {/* 오른쪽 스크롤 버튼 */}
      <HistoryTabsScrollBtn direction='right' onClick={() => handleScroll('right')}>
        <HistoryTabRightBasicIcon width={'15px'} stroke='#6F7075' />
      </HistoryTabsScrollBtn>
    </HistoryTabsContainer>
  );
};

// 전체 탭 컨테이너 스타일
export const HistoryTabsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  padding: 0px 8px 8px 15px;
`;

// 탭 목록 래퍼 스타일 (가로 스크롤 가능)
export const HistoryTabsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;

  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 4px;

  /* 스크롤바 숨김 처리 (크로스 브라우저 지원) */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 개별 탭 아이템 스타일
export const HistoryTabItem = styled.a<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  white-space: nowrap;

  // border-top: 4px solid ;
  border-left: 0 none;

  cursor: pointer;
  text-decoration: none;

  /* 탭 상단 색상 표시 (노란색 바) */
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 4px 0 0 0;
    background-color: var(--KB-Yellow-Light);
  }
`;

// 탭 내용 컨테이너 스타일
const HistoryTabContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 30px;
  background-color: var(--BG-Normal);
  border-radius: 0 0 4px 0;
`;

// 탭 제목 스타일 (긴 텍스트 처리)
export const HistoryTabTitle = styled.span`
  font-size: 13px;
  color: #495057;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.5px;
`;

// 탭 닫기 버튼 스타일
export const HistoryTabCloseBtn = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 0;

  border: none;
  border-radius: 99px;
  background: #e8e9ed;

  cursor: pointer;
`;

// 좌우 스크롤 버튼 스타일
export const HistoryTabsScrollBtn = styled.div<{ direction: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  flex-shrink: 0;

  border: none;
  border-radius: 300px;
  background: var(--BG-Normal);
  color: #000;
  font-size: 15px;

  cursor: pointer;
  margin-top: 4px;

  &:hover {
    filter: brightness(80%);
  }
`;
