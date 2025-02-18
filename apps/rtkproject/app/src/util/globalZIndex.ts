export const constZIndex = {
  // Background layers
  'background-0': 0, // 가장 낮은 레벨, 일반적인 배경
  'background-1': 10, // 컨텐츠 배경
  'background-2': 20, // 위젯 배경
  'background-3': 30, // 상단바 배경

  // Content layers
  'content-0': 100, // 기본 컨텐츠 레벨
  'content-1': 200, // 중요한 컨텐츠 레벨 (예: 카드)
  'content-2': 300, // 더 중요한 컨텐츠 레벨 (예: 모달 내부 컨텐츠)
  'content-3': 400, // 가장 중요한 컨텐츠 레벨 (예: 고정된 중요한 알림)

  // Foreground layers
  'foreground-0': 500, // 일반적인 포그라운드 요소 (예: 툴팁)
  'foreground-1': 600, // 더 중요한 포그라운드 요소 (예: 드롭다운 메뉴)
  'foreground-2': 700, // 매우 중요한 포그라운드 요소 (예: 팝업)
  'foreground-3': 800, // 가장 중요한 포그라운드 요소 (예: 고정된 대화상자)

  // Overlay layers
  'overlay-0': 900, // 일반적인 오버레이 (예: 모달 배경)
  'overlay-1': 950, // 중요한 오버레이 (예: 로딩 스피너)
  'overlay-2': 980, // 매우 중요한 오버레이 (예: 전체 화면 블록)
  'overlay-3': 990, // 가장 중요한 오버레이 (예: 경고창 배경)

  // Focus layers
  'focus-0': 1000, // 기본 포커스 요소 (예: 모달 창)
  'focus-1': 1010, // 중요한 포커스 요소 (예: 대화상자)
  'focus-2': 1020, // 매우 중요한 포커스 요소 (예: 알림창)
  'focus-3': 1030, // 가장 중요한 포커스 요소 (예: 긴급 알림)

  // Important
  'Important-0': 9990,
  'Important-1': 9991,
  'Important-2': 9992,
  'Important-3': 9993,
  'Important-4': 9994,
  'Important-5': 9995,
  'Important-6': 9996,
  'Important-7': 9997,
  'Important-8': 9998,
  'Important-9': 9999,
} as const;

export type ZIndexKeys = keyof typeof constZIndex;

export const getZIndex = ({ key, customZIndex }: { key?: ZIndexKeys; customZIndex?: number }): number => {
  if (customZIndex !== undefined) {
    return customZIndex;
  }
  if (key !== undefined) {
    return constZIndex[key];
  }

  return 0;
};
