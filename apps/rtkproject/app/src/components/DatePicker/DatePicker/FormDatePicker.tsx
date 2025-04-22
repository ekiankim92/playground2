import CalendarIcon from '@/../public/assets/icons/calendar.svg';
import { constZIndex } from '@/util/GlobalZIndex';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Calendar, CalendarProps } from '../datasheet/Calendar';
import { DatePickerInput, DatePickerInputProps, DatePickerLabel } from '../datepicker_input/DatePickerInput';

// 날짜 선택기 컴포넌트의 props 인터페이스 정의
export interface FormDatePickerProps {
  inputProps: Omit<DatePickerInputProps, 'height'>; // 입력 필드 props (height 제외)
  height?: DatePickerInputProps['height']; // 입력 필드 높이
  calendarProps?: Omit<CalendarProps, 'onChange' | 'value'>; // 캘린더 props (onChange, value 제외)
  isOpen?: boolean; // 캘린더 표시 여부 (외부 제어용)
  onOpen?: () => void; // 캘린더가 열릴 때 호출되는 콜백
  onClose?: () => void; // 캘린더가 닫힐 때 호출되는 콜백
  onFocusOut?: () => void; // 포커스가 벗어날 때 호출되는 콜백
  onChangeDate?: any; // 날짜 변경 시 호출되는 콜백
  value?: CalendarProps['value']; // 선택된 날짜 값
  disabled?: boolean; // 비활성화 여부
  placement?: 'top' | 'bottom'; // 캘린더 표시 위치
  isError?: boolean; // 오류 상태 여부
}

const FormDatePickerWrapper = styled.div<{ $isError?: boolean }>`
  position: relative;
  width: 100%;
  border: ${(props) => props.$isError && '1px solid #E66'};
  border-radius: ${(props) => props.$isError && '8px'};
`;

// 드롭다운 캘린더를 위한 래퍼 스타일 컴포넌트
const DropdownWrapper = styled.div<{
  label: {
    layout: DatePickerLabel['layout'];
    width: number;
  };
  $placement: 'top' | 'bottom';
  height: DatePickerInputProps['height'];
}>`
  width: fit-content;
  position: absolute;
  z-index: ${constZIndex['foreground-1']};

  // 라벨 레이아웃과 배치 위치에 따라 캘린더 위치 조정
  ${({ $placement, height, label }) => {
    if (label.layout === 'row' && $placement === 'bottom') {
      return `left: ${label.width}px;`;
    } else if (label.layout === 'column' && $placement === 'bottom') {
      return `left: 0px;`;
    } else if (label.layout === 'row' && $placement === 'top') {
      return `bottom: ${height}; left: ${label.width}px;`;
    } else if (label.layout === 'column' && $placement === 'top') {
      return `bottom: ${height}; left: 0px;`;
    }
  }}
`;

export const FormDatePicker = ({
  isOpen,
  onOpen,
  onChangeDate,
  onFocusOut,
  inputProps,
  calendarProps,
  value,
  disabled = false,
  height = '38px',
  placement = 'bottom',
  isError,
}: FormDatePickerProps) => {
  // 플레이스홀더 표시 여부 상태 (값이 없을 때만 표시)
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(!value);

  // 내부적으로 캘린더 열림 상태 관리
  const [isLocalOpen, setIsLocalOpen] = useState(false);
  // 내부적으로 선택된 날짜 값 관리
  const [localValue, setLocalValue] = useState(null);
  // 라벨 너비 상태 (캘린더 위치 계산에 사용)
  const [labelWidth, setLabelWidth] = useState(0);

  // 캘린더 열기 핸들러
  const handleOpen = () => {
    onOpen?.();
    setIsLocalOpen(true);
  };

  // 포커스 아웃 핸들러
  const handleFocusOut = () => {
    onFocusOut?.();
    setIsLocalOpen(false);
  };

  // 날짜 초기화 핸들러
  const handleClear = () => {
    setIsShowPlaceholder(true);
    setLocalValue(null);
    if (onChangeDate) {
      onChangeDate('');
    }
    setIsLocalOpen(false);
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: any) => {
    setLocalValue(date);
    if (onChangeDate) {
      onChangeDate(date);
    }
    setIsShowPlaceholder(false);
  };

  // 표시할 날짜 문자열 생성 (yyyy/MM/dd 형식)
  const date = useMemo(() => {
    return value ? format(value as Date, 'yyyy/MM/dd') : '';
  }, [value]);

  // 값이 있을 경우 플레이스홀더 숨김 처리
  useEffect(() => {
    if (value) {
      setIsShowPlaceholder(false);
    }
  }, [value]);

  return (
    <FormDatePickerWrapper $isError={isError}>
      <DatePickerInput
        {...inputProps}
        height={height}
        disabled={disabled}
        readOnly
        onClick={handleOpen}
        onBlur={handleFocusOut}
        onClear={handleClear}
        icon={() => <CalendarIcon width={20} height={20} />}
        value={isShowPlaceholder ? '' : date}
        parentLabel={{ labelWidth, setLabelWidth }} // 라벨 너비 정보 전달
        selected={isOpen || isLocalOpen} // 선택 상태 표시 (캘린더가 열려있을 때)
      />
      {/* 캘린더가 열려있을 때만 드롭다운 표시 */}
      {(isOpen || isLocalOpen) && (
        <DropdownWrapper
          $placement={placement}
          height={height}
          label={{ layout: inputProps.label?.layout || 'column', width: labelWidth }}
          onMouseDown={(e) => e.preventDefault()} // 클릭 시 입력 필드 blur 방지
        >
          <Calendar
            {...calendarProps}
            value={value || localValue}
            onChange={handleDateChange}
            width={inputProps.width}
            setIsLocalOpen={setIsLocalOpen}
          />
        </DropdownWrapper>
      )}
    </FormDatePickerWrapper>
  );
};

export default FormDatePicker;
