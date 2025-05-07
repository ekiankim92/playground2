import { useLayoutEffect } from 'react';
/**
 * disabled 처리가 되어 event가 발생하지 않는 상황을 방지하기 위해 disabled 속성을 제거하고 data-disabled 속성을 추가합니다.
 */
export const useRemoveDisabled = (disableSwitch: boolean) => {
  useLayoutEffect(() => {
    // 1. React Calendar 버튼 클래스 이름으로 모든 버튼 요소를 선택합니다.
    const dateButtons = Array.from(document.querySelectorAll('.react-calendar__month-view__days__day'));
    const prev2Arrows = Array.from(document.querySelectorAll('.react-calendar__navigation__prev2-button'));
    const prevArrows = Array.from(document.querySelectorAll('.react-calendar__navigation__prev-button'));
    const next2Arrows = Array.from(document.querySelectorAll('.react-calendar__navigation__next2-button'));
    const nextArrows = Array.from(document.querySelectorAll('.react-calendar__navigation__next-button'));

    // 2. disabled 속성이 있는 모든 버튼을 찾습니다.
    const disabledButtons = [...dateButtons, ...prev2Arrows, ...prevArrows, ...next2Arrows, ...nextArrows].filter(
      (button) => button.hasAttribute('disabled'),
    );

    // 3. 선택된 각 버튼에 대해 disabled 속성을 제거하고 data-disabled 속성을 추가합니다.
    disabledButtons.forEach((button) => {
      button.removeAttribute('disabled');
      button.setAttribute('data-disabled', 'true');
    });
  }, [disableSwitch]);
};
