import { StatusTagKind } from '../StatusTag';

const TagStatusMap: Record<string, StatusTagKind> = {
  reject: 'fail',
  rejected: 'fail',
  approve: 'success',
  approved: 'success',
  pending: 'default',
};

export function convertStatusToTagStatus(status: string): StatusTagKind {
  return TagStatusMap[status] ?? 'none';
}

const StatusLabelMap: Record<string, string> = {
  approved: '요청',
  approve: '요청',
  rejected: '반려',
  reject: '반려',
  canceled: '요청 취소',
  cancel: '요청 취소',
  pending: '승인 대기',
};
/**
 * 요청 상태 변환 함수
 *
 * 특정 요청 상태 키워드('approved', 'rejected', 'canceled')를
 * 한국어 텍스트('승인', '반려', '취소')로 변환합니다.
 *
 * @param {string} status - 변환할 요청 상태 키워드
 * @returns {string} 변환된 상태 텍스트
 */
export const convertStatusToStatusLabel = (status: string): string => {
  return StatusLabelMap[status] ?? status;
};
