import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset as floatingOffset,
  FloatingPortal,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  type Placement,
} from '@floating-ui/react';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { Icon, type IconComponent } from '@/components/common/Icon';
import { CancelCircleIcon } from '../icon/CancelCircleIcon';
import { SearchIcon } from '../icon/SearchIcon';
import { Caption2 } from '../Typography';
import {
  DefaultMessage,
  DropdownMenu,
  DropdownMenuWrapper,
  DropdownOptionItemWrapper,
  DropdownWrapper,
  ErrorMessage,
  ExpandIcon,
  InfiniteScrollTarget,
  SearchInput,
  SearchInputWrapper,
  TextEllipsisLabelBody6,
} from './dropdown.style';

// 인터페이스 정의
interface DropdownOption {
  accessorKey: string;
  header: string;
  disabled?: boolean;
  invisible?: boolean;
  icon?: IconComponent;
  table_idx?: number;
  color?: string;
}

interface DropdownProps {
  valueAccessorKey: string | null;
  valueIcon?: IconComponent;
  customIcon?: React.ReactNode;
  valueComponent?: (props: { isOpen: boolean }) => React.ReactNode;
  menuItemComponent?: (props: { option: DropdownOption; isActive?: boolean; isSelected?: boolean }) => React.ReactNode;
  options: DropdownOption[];
  onSelect: (key: string | null) => void;
  hasSearch?: boolean;
  scrollable?: boolean;
  disabled?: boolean;
  offset?: number;
  placement?: Placement;
  placeholder?: string;
  showTooltip?: boolean;
  scrollMaxHeight?: string;
  dropdownStyle?: CSSProperties;
  optionListStyle?: CSSProperties;
  optionItemStyle?: CSSProperties;
  setSelectTableIdx?: Dispatch<SetStateAction<number>>;
  errorMessage?: string;
  defaultMessage?: string;
  // 드롭다운 무한 스크롤 옵션
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  isLoading?: boolean;
}

/** @description value 는 required
 * 상위 영역에서 selectedState.accessorKey 를 valueAccessorKey에 내려주면 됨
 * 선택된 값이 없을 경우 state 자체를 null로 관리하거나, selectedState?.accessorKey ?? null 로 내려주면 initialState의 역할을 함
 */
const Dropdown: React.FC<DropdownProps> = ({
  valueAccessorKey = null,
  valueIcon,
  customIcon,
  valueComponent,
  menuItemComponent,
  options,
  onSelect,
  hasSearch = false,
  scrollable = false,
  disabled = false,
  scrollMaxHeight = '336px',
  offset = 0,
  placement = 'bottom',
  placeholder,
  showTooltip = false,
  dropdownStyle,
  optionListStyle,
  optionItemStyle,
  setSelectTableIdx,
  errorMessage,
  defaultMessage,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}) => {
  // 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && onLoadMore) {
            onLoadMore();
          }
        },
        { threshold: 0.5 },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, onLoadMore], // page 추가
  );

  useEffect(() => {
    const valueIndex = options.findIndex((ele) => ele.accessorKey === valueAccessorKey);

    if (setSelectTableIdx) {
      //* 테이블 리스트에 나오는 각 테이블 IDX 값
      setSelectTableIdx(valueIndex !== -1 ? Number(options[valueIndex]?.table_idx) : 0);
    }

    if (valueIndex !== -1) {
      setActiveIndex(valueIndex);
      setSelectedKey(options[valueIndex].accessorKey);
    }

    if (valueIndex === -1) {
      setActiveIndex(null);
      setSelectedKey(null);
    }
  }, [options, setSelectTableIdx, valueAccessorKey]);

  // Refs
  const selectWrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options.map((option) => option.header));
  const isTypingRef = useRef(false);

  // Floating UI 설정
  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement, // 드롭다운 위치 설정 (참조 요소의 아래쪽 시작 위치)
    open: isOpen && !disabled, // 드롭다운 열림 여부 상태
    onOpenChange: (open: boolean) => !disabled && setIsOpen(open), // 드롭다운 열림 여부 상태 변경 함수
    whileElementsMounted: autoUpdate, // 요소가 마운트되는 동안 자동 업데이트
    middleware: [
      floatingOffset(offset), // 드롭다운과 참조 요소 사이의 간격 설정
      flip({ padding: 10 }), // 드롭다운이 화면 경계를 넘을 경우 위치를 자동으로 변경하여 화면 내에 들어오도록 함. 드롭다운이 화면 경계에 닿기 전에 10px (padding) 간격을 두고 위치를 변경 시도
      size({
        // 드롭다운의 크기를 자동으로 조정하여 참조 요소의 너비에 맞추고 주어진 높이 제한 내에서 드롭다운의 최대 높이를 설정
        apply({ rects, elements, availableWidth, availableHeight }) {
          const width = optionListStyle?.width || `${rects.reference.width}px`;
          Object.assign(elements.floating.style, {
            width,
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10, // 드롭다운 내부 내용과 경계 사이의 간격을 설정. 예를 들어, padding: 10으로 설정하면 드롭다운 내용과 경계 사이에 10픽셀의 간격이 생김
      }),
    ],
  });

  // Ref 설정 함수
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setReference(node); // 참조 요소를 설정
      selectWrapperRef.current = node; // 참조 요소를 로컬 ref에 저장
    },
    [refs],
  );

  // 상호작용 훅 설정
  const click = useClick(context, { event: 'mousedown' }); // 클릭 이벤트 훅 설정
  const dismiss = useDismiss(context); // 드롭다운 닫기 훅 설정
  const role = useRole(context, { role: 'listbox' }); // ARIA 역할 설정 훅
  const selectedIndex = options.findIndex((option) => option.accessorKey === selectedKey); // 선택된 인덱스 찾기

  const listNav = useListNavigation(context, {
    listRef, // 드롭다운 항목들의 참조 배열
    activeIndex, // 활성화된 항목 인덱스
    selectedIndex, // 선택된 항목 인덱스
    onNavigate: setActiveIndex, // 탐색 시 활성화된 인덱스 업데이트
  });

  const typeahead = useTypeahead(context, {
    listRef: listContentRef, // 드롭다운 항목의 라벨 목록 참조
    activeIndex, // 활성화된 항목 인덱스
    selectedIndex, // 선택된 항목 인덱스
    onMatch: isOpen ? setActiveIndex : (index) => setSelectedKey(options[index].accessorKey), // 일치하는 항목을 찾았을 때 활성화 또는 선택 상태 업데이트
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping; // 타이핑 상태 업데이트
    },
  });

  // 상호작용 훅 통합
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    dismiss, // 드롭다운 닫기
    role, // ARIA 역할 설정
    listNav, // 리스트 내비게이션
    typeahead, // 타이핑 탐색
    click, // 클릭 이벤트
  ]);

  // 항목 선택 핸들러
  const handleSelect = (key: string) => {
    setSelectedKey(key);
    setIsOpen(false);
    onSelect(key);
  };

  // 옵션 필터링
  const filteredOptions = options
    .filter((option) => !option.invisible)
    .filter((option) => option.header.toLowerCase().includes(searchTerm.toLowerCase()));

  // 선택된 항목 라벨
  const selectedItemLabel = options.find((option) => option.accessorKey === selectedKey)?.header;

  const searchTextExist = useMemo(() => searchTerm.length > 0, [searchTerm.length]);
  const handleClearSearch = useCallback(() => setSearchTerm(''), []);

  useEffect(() => {
    if (errorMessage && refs.domReference.current !== null) {
      refs.domReference.current.focus();
    }
  }, [errorMessage, refs.domReference]);

  return (
    <>
      {/* 드롭다운 래퍼 */}
      <DropdownWrapper
        ref={setRefs} // DropdownWrapper 요소 참조 설정
        tabIndex={0} // 키보드 탐색을 위해 tabindex 설정
        aria-labelledby='select-label' // 접근성을 위한 aria 속성 설정
        aria-autocomplete='none' // 자동 완성 비활성화
        {...getReferenceProps()} // 상호작용 props 설정
        $isOpen={isOpen}
        $offset={offset}
        $disabled={disabled}
        $placement={context.placement}
        style={dropdownStyle}
      >
        {valueComponent ? (
          valueComponent({ isOpen })
        ) : (
          <>
            {valueIcon && <Icon color='#cdccd4' width={16} height={16} component={valueIcon} />}
            {customIcon && <span style={{ display: 'flex' }}>{customIcon}</span>}
            <Caption2
              style={{
                // textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              color={disabled ? '#73727e' : selectedItemLabel ? 'var(--g75)' : '#828095'}
            >
              {selectedItemLabel || placeholder || '선택하세요.'}
            </Caption2>
            <ExpandIcon $isOpen={isOpen} color={disabled ? '#73727e' : '#cdccd4'} />
          </>
        )}
      </DropdownWrapper>
      {!errorMessage && defaultMessage && <DefaultMessage>{defaultMessage}</DefaultMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {isOpen && !disabled && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            {/* 드롭다운 메뉴 래퍼 */}
            <DropdownMenuWrapper
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                ...optionListStyle,
                width: (optionListStyle?.width || dropdownStyle?.width) ?? '216px',
              }}
              $offset={offset}
              $placement={context.placement}
            >
              {/* 검색 입력 필드 */}
              {hasSearch && (
                <SearchInputWrapper>
                  <SearchInput
                    placeholder='검색어로 찾기'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTextExist ? (
                    <CancelCircleIcon width={24} height={24} color={'#747881'} onClick={handleClearSearch} />
                  ) : (
                    <SearchIcon width={24} height={24} color={'#747881'} style={{ cursor: 'default' }} />
                  )}
                </SearchInputWrapper>
              )}
              {/* 드롭다운 메뉴 아이템 */}
              <DropdownMenu $scrollable={scrollable} $scrollMaxHeight={scrollMaxHeight} {...getFloatingProps()}>
                {filteredOptions.map((option, i) => (
                  <DropdownOptionItemWrapper
                    key={option.accessorKey}
                    title={showTooltip ? option.header : undefined}
                    $disabled={option.disabled}
                    $isActive={i === activeIndex} // 현재 활성화된 항목 인덱스
                    $isSelected={option.accessorKey === selectedKey} // 현재 선택된 항목 인덱스
                    $hasIcon={Boolean(option.icon)}
                    style={optionItemStyle}
                    {...getItemProps({
                      onClick: () => !option.disabled && handleSelect(option.accessorKey), // 클릭 시 항목 선택
                      onKeyDown: (event) => {
                        if (option.disabled) return;
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          handleSelect(option.accessorKey);
                        }
                        if (event.key === ' ' && !isTypingRef.current) {
                          event.preventDefault();
                          handleSelect(option.accessorKey);
                        }
                      },
                    })}
                  >
                    {menuItemComponent ? (
                      menuItemComponent({
                        option,
                        isActive: i === activeIndex,
                        isSelected: option.accessorKey === selectedKey,
                      })
                    ) : (
                      <>
                        {option.icon && <Icon component={option.icon} width={16} height={16} color={'#cdccd4'} />}
                        {/* 드롭다운 항목 라벨 */}
                        <TextEllipsisLabelBody6 color={option.disabled ? '#73727e' : '#cdccd4'}>
                          {option.header}
                        </TextEllipsisLabelBody6>
                      </>
                    )}
                  </DropdownOptionItemWrapper>
                ))}
                <InfiniteScrollTarget hasMore={hasMore} lastItemRef={lastItemRef} isLoading={isLoading} />
              </DropdownMenu>
            </DropdownMenuWrapper>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export { Dropdown, type DropdownOption, type DropdownProps };
