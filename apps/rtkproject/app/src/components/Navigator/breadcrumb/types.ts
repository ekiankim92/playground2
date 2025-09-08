export interface BreadcrumbItem {
  text: string; // 표시될 텍스트
  path?: string; // 링크 주소 (선택적)
  to?: string | object; // 라우터 링크용 경로 (선택적)
  active?: boolean; // 현재 활성화된 항목인지 여부 (선택적)
  isCurrentPage?: boolean; // 현재 페이지인지 여부 (선택적)
}
