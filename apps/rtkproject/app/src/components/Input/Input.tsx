import { InVisiblePasswordIcon, VisiblePasswordIcon } from '@/components/common/icon/index';
import { ChangeEvent, forwardRef, KeyboardEventHandler, ReactNode, useCallback, useRef, useState } from 'react';
import { CSSObject } from 'styled-components';
import { composeRefs } from '../ComposeRefs';
import { SearchIcon } from '../icon/SearchIcon';
import { XmarkIcon } from '../icon/XmarkIcon';
import * as S from './Input.styles';

export type InputVariants = 'border' | 'underline';
export type InputType = 'text' | 'number' | 'password';
export type InputWidthVariants = 'lg' | 'md';
export type InputHeightVariants = 'lg' | 'md' | 'sm';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 넓이를 지정합니다. "lg" | "md" */
  widthVariants?: InputWidthVariants;
  /** 높이를 지정합니다. "lg" | "md" | "sm" */
  heightVariants?: InputHeightVariants;
  variants?: InputVariants;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClickSearchIcon?: () => void;

  disabled?: boolean;

  /** error를 지정합니다. errorMessage과 같이 사용됩니다. */
  error?: boolean;
  errorMessage?: string;
  defaultMessage?: string;

  /** input의 넓이를 지정합니다. */
  width?: string | number;
  /** input의 높이를 지정합니다. */
  height?: string | number;
  /** input html name */
  name?: string;
  /** "text" | "number" | "password" */
  type?: InputType;

  allowClear?: boolean;

  customStyles?: CSSObject;

  customInputStyles?: CSSObject;

  isShowIcon?: boolean;

  id?: string;

  hasSearch?: boolean; //* 검색 찾기 아이콘 보여주는 값

  unit?: string;
  isShowSearch?: boolean; //* 검색창 밑 데이터 보여주는 값
  searchWidth?: string;
  searchHeight?: string;
  searchPadding?: string;
  scrollMaxHeight?: string;
  offset?: string;
  customSearchStyles?: CSSObject;
  customWrapperStyles?: CSSObject;
  searchIconWrapperStyles?: CSSObject;
  searchIconStyles?: CSSObject;
  searchListData?: {
    name: string;
    accessorKey: string | number;
  }[];
  onClickSearchDrop?: (key: string) => () => void;
  leftIcon?: ReactNode;
  refetch?: () => void;

  leftIconBox?: ReactNode; //* 왼쪽 영역의 아이콘 박스
  customLeftIconStyle?: CSSObject;
  customLeftIconWrapperStyle?: CSSObject;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variants = 'border',
      widthVariants = 'lg',
      heightVariants = 'lg',
      placeholder = '',
      value,
      onChange,
      onKeyDown,
      onClickSearchIcon,
      disabled = false,
      error = false,
      errorMessage,
      defaultMessage,
      width,
      height,
      name,
      type = 'text',
      customStyles,
      customInputStyles,
      isShowIcon = true,
      id,
      hasSearch = false,
      unit,
      isShowSearch = false,
      searchWidth,
      searchHeight,
      searchPadding,
      scrollMaxHeight,
      offset,
      customSearchStyles,
      customWrapperStyles,
      searchIconWrapperStyles,
      searchIconStyles,
      searchListData,
      onClickSearchDrop,
      leftIcon,
      refetch,
      leftIconBox,
      customLeftIconStyle,
      customLeftIconWrapperStyle,
      ...props
    },
    ref,
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [inputType, setInputType] = useState<InputType>(type);
    const [showXmarkIcon, setShowXmarkIcon] = useState(false);
    const [isShowPasswordIcon, setIsShowPasswordIcon] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onClear = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      event.stopPropagation();
      setShowXmarkIcon(false);
      setIsShowPasswordIcon(false);

      if (onChange) {
        const event = {
          target: {
            name,
            value: type === 'number' ? 0 : '',
          } as HTMLInputElement,
        };
        onChange(event as ChangeEvent<HTMLInputElement>);
      }

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }

      if (refetch) {
        refetch();
      }
    };

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      const isInputFilled = inputRef.current && inputRef.current?.value.length > 0;
      setShowXmarkIcon(isInputFilled ?? false);
      setIsShowPasswordIcon(isInputFilled ?? false);
      onChange && onChange(event);
    };

    const toggleShowPassword = () => {
      setInputType((currentType) => (currentType === 'password' ? 'text' : 'password'));
      setIsShowPassword((currentShow) => !currentShow);
    };

    const onClickSearchContent = useCallback(
      (value: string) => () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }

        if (onClickSearchDrop) {
          onClickSearchDrop(value)();
        }
      },
      [isShowSearch],
    );

    return (
      <S.Wrapper $customStyles={customWrapperStyles}>
        <S.Container
          ref={containerRef}
          $variants={variants}
          $widthVariants={widthVariants}
          $heightVariants={heightVariants}
          $disabled={disabled}
          $error={error}
          width={width}
          height={height}
          $customStyles={customStyles}
          $hasLeftIconBox={!!leftIconBox}
        >
          {leftIconBox && (
            <S.LeftIconBox $heightVariants={heightVariants} $customStyles={customLeftIconStyle}>
              {leftIconBox}
            </S.LeftIconBox>
          )}

          {leftIcon && leftIcon}
          <S.InputContainer>
            <S.Inputs
              id={id}
              ref={composeRefs(inputRef, ref)}
              spellCheck={false}
              type={inputType}
              placeholder={placeholder}
              onChange={onChangeInput}
              disabled={disabled}
              autoComplete='off'
              name={name}
              {...props}
              onKeyDown={onKeyDown}
              $heightVariants={heightVariants}
              style={customInputStyles}
              value={value}
              $unit={unit || ''}
              $hasLeftIconBox={!!leftIconBox}
            />
            <S.IconWrapper>
              {hasSearch ? (
                <SearchIcon width={24} height={24} color={'#747881'} onClick={onClickSearchIcon} />
              ) : (
                <>
                  {type === 'password' && isShowIcon && isShowPasswordIcon && isShowPasswordIcon && (
                    <>
                      {isShowPassword ? (
                        <VisiblePasswordIcon width={28} height={28} onClick={toggleShowPassword} />
                      ) : (
                        <InVisiblePasswordIcon width={28} height={28} onClick={toggleShowPassword} />
                      )}
                    </>
                  )}
                  {!disabled && !inputRef.current?.readOnly && isShowIcon && showXmarkIcon && (
                    <XmarkIcon width={20} height={20} fill='var(--Gray-G25)' onClick={onClear} />
                  )}
                </>
              )}
              <div style={{ cursor: 'default' }}>{unit && unit}</div>
            </S.IconWrapper>
          </S.InputContainer>
        </S.Container>

        {!errorMessage && defaultMessage && <S.DefaultMessage>{defaultMessage}</S.DefaultMessage>}
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

        {isShowSearch && (
          <S.SearchContainer>
            <S.SearchWrapper
              $searchWidth={searchWidth}
              $searchHeight={searchHeight}
              $searchPadding={searchPadding}
              $customSearchStyles={customSearchStyles}
            >
              <S.SearchContent $scrollMaxHeight={scrollMaxHeight} $offset={offset}>
                {searchListData?.map((search) => (
                  <S.Content key={search.accessorKey} onClick={onClickSearchContent(search.accessorKey as string)}>
                    {search.name}
                  </S.Content>
                ))}
              </S.SearchContent>
            </S.SearchWrapper>
          </S.SearchContainer>
        )}
      </S.Wrapper>
    );
  },
);
