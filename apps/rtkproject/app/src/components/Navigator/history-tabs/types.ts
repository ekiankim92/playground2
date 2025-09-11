// 탭 아이템 인터페이스: 개별 탭의 기본 속성 정의
export interface TabItem {
  id: string; // 탭의 고유 식별자
  title: string; // 탭의 표시 제목
  closeable?: boolean; // 탭 닫기 가능 여부 (옵션)
}

// 히스토리 탭 컴포넌트의 props 인터페이스
export interface HistoryTabsProps {
  tabs: TabItem[]; // 표시할 탭 목록
  onClose: (id: string) => void; // 탭 닫기 이벤트 핸들러
  onNavigate: (id: string) => void; // 탭 이동 이벤트 핸들러
}

// 탭 내용 컴포넌트의 props 인터페이스
export interface TabContentProps {
  title: string; // 탭 제목
  isActive?: boolean; // 활성화 상태 여부
  onClick?: () => void; // 클릭 이벤트 핸들러
}

// 히스토리 탭 확장 인터페이스: 기본 탭에 추가 속성 포함
export interface HistoryTab {
  id: string; // 탭의 고유 식별자
  title: string; // 탭의 표시 제목
  path: string; // 탭의 경로 (URL)
  isActive: boolean; // 현재 활성화된 탭 여부
}
