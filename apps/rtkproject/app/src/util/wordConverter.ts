//* user, portal_admin => 일반 사용자, IT 관리자로 변경
export const wordConverter = (word: string) => {
  if (word === 'portal_admin') return 'IT 관리자';
  return '일반 사용자';
};

//* approved, rejected, cancel => 승인, 반려, 취소 로 변경
export const statusConverter = (status: string) => {
  if (status === 'approved') return '승인';
  if (status === 'canceled') return '요청 취소';
  if (status === 'rejected') return '반려';
  return status;
};

//* 버튼 타입에 따라 달라지는 모달 타이블 값
export const titleConverter = (status: string, title: string) => {
  switch (status) {
    case 'reject':
      return `${title} 요청 반려`;
    case 'approve':
      return `${title} 요청 승인`;
    case 'cancel':
      return `${title} 요청 취소`;
    default:
      return `${title}`;
  }
};

//* 리소스 요청 관리에서 어드민, 일반 유저가 모달 타이틀 여는 값
export const modalTitleConverter = (status: string) => {
  switch (status) {
    case 'reject':
      return '반려할까요?';
    case 'approve':
      return '승인할까요?';
    case 'cancel':
      return '취소할까요?';
    default:
      return '';
  }
};

//* 리소스 요청 관리에서 어드민, 일반 유저가 모달 내용 여는 값
export const modalDescConverter = (status: string) => {
  switch (status) {
    case 'reject':
      return '작성된 반려 사유가 함께 전송됩니다.';
    case 'approve':
      return '요청 승인 후 즉히 요청 리소스가 지급됩니다.';
    case 'cancel':
      return '작성된 취소 사유가 함께 전송됩니다.';
    default:
      return '';
  }
};
