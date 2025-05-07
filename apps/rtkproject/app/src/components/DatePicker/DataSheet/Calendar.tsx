/**
 * @file Calendar.tsx
 * @description 날짜 선택을 위한 캘린더 컴포넌트
 */
import { formatDate } from 'date-fns';
import { useEffect, useState } from 'react';
import ReactCalendar, { CalendarProps as ReactCalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import NextIcon1 from '../../../../../public/assets/icons/next-arrow-1.svg';
import PrevIcon1 from '../../../../../public/assets/icons/prev-arrow-1.svg';
import { Icon } from '../../Icon';
import { useRemoveDisabled } from './hook/useRemoveDisabled';

export type DateValuePiece = Date | null;
/**
 * @description 단일 날짜 또는 날짜 범위
 */
export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

/**
 * @interface CalendarProps
 * @extends {ReactCalendarProps} - react-calendar 라이브러리의 기본 속성을 상속
 * @property {DateValue} [value] - 캘린더에 표시될 현재 선택된 날짜 값
 * @property {function} [onChange] - 날짜 선택 시 호출될 콜백 함수
 * @property {DateValue} [compositionValue] - 복합 선택 모드에서 사용되는 날짜 값
 * @property {React.Dispatch<React.SetStateAction<DateValue>>} [setCompositionValue] - 복합 선택 값을 설정하는 함수
 * @property {function} [onClear] - 선택된 날짜를 초기화하는 함수
 * @property {string} [width] - 캘린더의 너비
 * @property {boolean} [fixedTileSize] - 날짜 타일의 크기를 고정할지 여부
 */
export interface CalendarProps extends ReactCalendarProps {
  value?: DateValue;
  onChange?: (date: DateValue) => void;
  compositionValue?: DateValue;
  setCompositionValue?: React.Dispatch<React.SetStateAction<DateValue>>;
  onClear?: () => void;
  width?: string;
  fixedTileSize?: boolean;
  setIsLocalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @interface CalendarContainerProps
 * @property {boolean} $isComposited - 복합 선택 모드 여부
 * @property {string} [$width] - 캘린더 컨테이너의 너비
 * @property {boolean} [$fixedTileSize] - 날짜 타일의 크기를 고정할지 여부
 */
interface CalendarContainerProps {
  $isComposited: boolean;
  $width?: string;
  $fixedTileSize?: boolean;
}

/**
 * @component CalendarContainer
 * @description 캘린더 컴포넌트의 스타일을 정의하는 스타일드 컴포넌트
 */
const CalendarContainer = styled.div<CalendarContainerProps>`
  width: ${({ $width }) => $width || '240px'};

  .react-calendar {
    padding: 8px;
    width: 100%;
    border: 1px solid #d0d0d7;
    border-radius: ${({ $isComposited }) => ($isComposited ? '8px 0 0 0' : '8px 8px 0 0')};
    border-right-width: ${({ $isComposited }) => ($isComposited ? '0' : '1px')};
    background-color: #fff;
  }

  .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    width: 100%;
    margin-bottom: 8px;

    & > button {
      min-width: unset;
      background: none;

      &:enabled:hover {
        background-color: transparent;
      }

      &:disabled {
        background-color: transparent;
      }
    }

    & > .react-calendar__navigation__label {
      flex-grow: 1 !important;
      text-align: center;
      font-weight: 700;
    }

    & > .react-calendar__navigation__arrow {
      width: 32px;
      height: 32px;
      padding: 8px;
      flex: 0 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:enabled:hover {
        background-color: #f4f4f4;
        border-radius: 4px;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(7, 1fr) !important;
    padding-bottom: 4px;
    border-bottom: 1px solid #e1e2e3;

    .react-calendar__month-view__weekdays__weekday {
      height: 16px;
      text-align: center;
      padding: 0;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 15.6px */
      letter-spacing: -0.1px;
      text-transform: none;
      pointer-events: none; //* hover 효과 비활성화

      abbr {
        text-decoration: none;
        color: #7b7b7b;
      }

      &:hover {
        background-color: transparent;
      }
    }
  }

  .react-calendar__month-view__days {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(7, 1fr) !important;

    .react-calendar__tile {
      width: ${({ $fixedTileSize }) => ($fixedTileSize ? '32px' : 'auto')};
      height: ${({ $fixedTileSize }) => ($fixedTileSize ? '32px' : 'auto')};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      letter-spacing: -0.1px;
      color: #474747;
      font-family: 'KBFG Text';
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; /* 14px */

      &:enabled:hover:not(.react-calendar__tile--active) {
        background-color: #f4f4f4;
        border-radius: 4px;
      }

      &.react-calendar__tile--now {
        background-color: #e4ddd7;
        border-radius: 4px;
      }

      &.react-calendar__tile--active {
        background-color: #ffb800;
        border-radius: 4px;
      }

      &.react-calendar__month-view__days__day--neighboringMonth {
        color: #7b7b7b;
      }
    }
  }

  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
  }
`;

export const Calendar = ({
  value,
  onChange,
  compositionValue,
  setCompositionValue,
  onClear,
  width,
  fixedTileSize,
  setIsLocalOpen,
  ...props
}: CalendarProps) => {
  const [localValue, setLocalValue] = useState<DateValue>(null);
  const [disableSwitch, setDisableSwitch] = useState(false);

  useEffect(() => {
    value && setLocalValue(value);
  }, [value]);

  useRemoveDisabled(disableSwitch);

  const onActiveStartDateChangeHandler = () => {
    setDisableSwitch(!disableSwitch);
  };

  return (
    <CalendarContainer $isComposited={!!setCompositionValue} $width={width} $fixedTileSize={fixedTileSize}>
      <ReactCalendar
        value={compositionValue || localValue}
        onChange={(date) => {
          setCompositionValue?.(date) || onChange?.(date);
          setLocalValue(date);
          setIsLocalOpen(false); // 캘린더 날짜 선택 후 닫기
        }}
        formatShortWeekday={(_, date) => formatDate(date, 'eee')}
        formatMonthYear={(_, date) => formatDate(date, 'yyyy/MM')}
        formatDay={(_, date) => formatDate(date, 'd')}
        calendarType='gregory'
        nextLabel={<Icon component={NextIcon1} />}
        next2Label={null}
        prevLabel={<Icon component={PrevIcon1} />}
        prev2Label={null}
        onActiveStartDateChange={onActiveStartDateChangeHandler}
        {...props}
      />
    </CalendarContainer>
  );
};
