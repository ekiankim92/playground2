/**
 * @file DatePicker.tsx
 * @description 날짜 선택을 위한 데이트피커 컴포넌트
 */

import CalendarIcon from '@/../public/assets/icons/calendar.svg';
import { constZIndex } from '@/util/GlobalZIndex';
import { format } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Calendar, CalendarProps, DateValue } from '../datasheet/Calendar';
import { DatePickerInput, DatePickerInputProps, DatePickerLabel } from '../datepicker_input/DatePickerInput';

/**
 * @interface DatePickerProps
 * @description 데이트피커 컴포넌트의 속성
 */
export interface DatePickerProps {
  /** 입력 필드 관련 속성 (높이 제외) */
  inputProps: Omit<DatePickerInputProps, 'height'>;
  /** 입력 필드의 높이 */
  height?: DatePickerInputProps['height'];
  /** 캘린더 관련 속성 (onChange와 value 제외) */
  calendarProps?: Omit<CalendarProps, 'onChange' | 'value'>;
  /** 캘린더 열림 상태 */
  isOpen?: boolean;
  /** 캘린더가 열릴 때 호출되는 함수 */
  onOpen?: () => void;
  /** 캘린더가 닫힐 때 호출되는 함수 */
  onClose?: () => void;
  /** 포커스가 벗어날 때 호출되는 함수 */
  onFocusOut?: () => void;
  /** 날짜가 변경될 때 호출되는 함수 */
  onChangeDate?: CalendarProps['onChange'];
  /** 선택된 날짜 값 */
  value?: CalendarProps['value'];
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 캘린더 표시 위치 (상단 또는 하단) */
  placement?: 'top' | 'bottom';
  /** 날짜 타일 크기 고정 여부 */
  fixedTileSize?: boolean;
}

/**
 * @component DatePickerWrapper
 * @description 데이트피커의 기본 래퍼 컴포넌트
 */
const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * @component DropdownWrapper
 * @description 캘린더 드롭다운을 위한 래퍼 컴포넌트
 */
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

/**
 * @component DatePicker
 * @description 날짜를 선택할 수 있는 데이트피커 컴포넌트
 *
 * 입력 필드와 캘린더로 구성되며, 날짜를 선택하거나 직접 입력할 수 있습니다.
 */
export const DatePicker = ({
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
  fixedTileSize = true,
}: DatePickerProps) => {
  const isShowPlaceholder = useRef(!value);

  const [isLocalOpen, setIsLocalOpen] = useState(false);
  const [localValue, setLocalValue] = useState<DateValue>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const handleOpen = () => {
    onOpen?.();
    setIsLocalOpen(true);
  };

  const handleFocusOut = () => {
    onFocusOut?.();
    setIsLocalOpen(false);
  };

  const handleClear = () => {
    isShowPlaceholder.current = true;
    setLocalValue(null);
    if (onChangeDate) {
      onChangeDate(null);
    }
    setIsLocalOpen(false);
  };

  const handleDateChange = (date: DateValue) => {
    setLocalValue(date);
    if (onChangeDate) {
      onChangeDate(date);
    }
    isShowPlaceholder.current = false;
  };

  const date = useMemo(() => {
    return value ? format(value as Date, 'yyyy/MM/dd') : '';
  }, [value]);

  useEffect(() => {
    if (value) {
      isShowPlaceholder.current = false;
    }
  }, [value]);

  return (
    <DatePickerWrapper>
      <DatePickerInput
        {...inputProps}
        height={height}
        disabled={disabled}
        readOnly
        onClick={handleOpen}
        onBlur={handleFocusOut}
        onClear={handleClear}
        icon={() => <CalendarIcon width={20} height={20} />}
        value={isShowPlaceholder.current ? '' : date}
        parentLabel={{ labelWidth, setLabelWidth }}
        selected={isOpen || isLocalOpen}
      />
      {(isOpen || isLocalOpen) && (
        <DropdownWrapper
          $placement={placement}
          height={height}
          label={{ layout: inputProps.label?.layout || 'column', width: labelWidth }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Calendar
            {...calendarProps}
            value={value || localValue}
            onChange={handleDateChange}
            width={inputProps.width}
            fixedTileSize={fixedTileSize}
            setIsLocalOpen={setIsLocalOpen}
          />
        </DropdownWrapper>
      )}
    </DatePickerWrapper>
  );
};

export default DatePicker;
