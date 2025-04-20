import { DatePicker } from '@/components/common';
import type { DateValue } from '@/components/common/datepicker/datasheet/Calendar';
import { Tilde } from '@/components/ui/Table/TablePage/TablePage.styles';
import styled from 'styled-components';

/**
 * DateRangePicker 컴포넌트의 속성을 정의합니다.
 *
 * @interface DateRangePickerProps
 * @property {DateValue} startDate - 시작 날짜 값
 * @property {DateValue} endDate - 종료 날짜 값
 * @property {function} onChangeStartDate - 시작 날짜가 변경될 때 호출되는 콜백 함수
 * @property {function} onChangeEndDate - 종료 날짜가 변경될 때 호출되는 콜백 함수
 * @property {string} [globalKey] - 컴포넌트의 전역 식별자 (선택 사항)
 * @property {string} [width] - 날짜 선택기의 너비 (선택 사항)
 * @property {boolean} [fixedTileSize=true] - 날짜 타일 크기 고정 여부 (기본값: true)
 */
interface DateRangePickerProps {
  startDate: DateValue;
  endDate: DateValue;
  onChangeStartDate: (date: DateValue) => void;
  onChangeEndDate: (date: DateValue) => void;
  globalKey?: string;
  width?: string;
  fixedTileSize?: boolean;
}

/**
 * 시작 날짜와 종료 날짜를 선택할 수 있는 범위 선택 컴포넌트입니다.
 */
const DateRangePicker = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  globalKey,
  width,
  fixedTileSize = true,
}: DateRangePickerProps) => {
  /**
   * 시작 날짜 변경 처리 함수
   *
   * @param {DateValue} date - 새로운 시작 날짜
   */
  const handleStartDateChange = (date: DateValue) => {
    if (!date || !endDate) {
      onChangeStartDate(date);
      return;
    }

    const newStartDate = date;
    const currentEndDate = endDate;

    if (newStartDate > currentEndDate) {
      //*시작일이 종료일보다 늦을 경우 두 날짜를 교체
      onChangeStartDate(currentEndDate);
      onChangeEndDate(newStartDate);
    } else {
      onChangeStartDate(newStartDate);
    }
  };

  /**
   * 종료 날짜 변경 처리 함수
   *
   * @param {DateValue} date - 새로운 종료 날짜
   */
  const handleEndDateChange = (date: DateValue) => {
    if (!date || !startDate) {
      onChangeEndDate(date);
      return;
    }

    const newEndDate = date as Date;
    const currentStartDate = startDate as Date;

    if (newEndDate < currentStartDate) {
      //*종료일이 시작일보다 빠를 경우 두 날짜를 교체
      onChangeEndDate(currentStartDate);
      onChangeStartDate(newEndDate);
    } else {
      onChangeEndDate(newEndDate);
    }
  };

  return (
    <DateRangePickerWrapper>
      <DatePicker
        inputProps={{
          width: width ?? (globalKey === '1' ? '240px' : '280px'),
          placeholder: '날짜 선택',
        }}
        value={startDate}
        onChangeDate={handleStartDateChange}
        fixedTileSize={fixedTileSize}
      />
      <Tilde>~</Tilde>
      <DatePicker
        inputProps={{
          width: width ?? (globalKey === '1' ? '240px' : '280px'),
          placeholder: '날짜 선택',
        }}
        value={endDate}
        onChangeDate={handleEndDateChange}
        fixedTileSize={fixedTileSize}
      />
    </DateRangePickerWrapper>
  );
};

export default DateRangePicker;

/**
 * DateRangePicker 컴포넌트의 스타일을 정의합니다.
 */
const DateRangePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
