import React, { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset as floatingOffset,
  FloatingPortal,
  type Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import styled from 'styled-components';

import { Icon, type IconComponent } from '@/components/common/Icon';
import { Body3 } from '@/components/common/Typography';
import {
  DropdownMenu,
  DropdownMenuWrapper,
  DropdownOptionItemWrapper,
  DropdownWrapper,
  ExpandIcon,
  SearchInput,
  SearchInputWrapper,
  TextEllipsisLabelBody6,
} from './dropdown.style';

import { CancelCircleIcon } from '../icon/CancelCircleIcon';

/**
 * 다중 선택 드롭다운 옵션 항목의 인터페이스를 정의합니다.
 *
 * accessorKey - 옵션의 고유 식별자
 * header - 옵션의 표시 텍스트
 * disabled - 옵션의 비활성화 여부
 * icon - 옵션에 표시될 아이콘 컴포넌트
 */
interface MultiSelectDropdownOption {
  accessorKey: string;
  header: string;
  disabled?: boolean;
  icon?: IconComponent;
}

/**
 * 다중 선택 드롭다운 컴포넌트의 속성을 정의합니다.
 *
 * valueAccessorKeys - 현재 선택된 옵션들의 키 값 배열
 * options - 드롭다운에 표시될 옵션 목록
 * onSelect - 옵션 선택 시 호출될 콜백 함수
 * hasSearch - 검색 기능 사용 여부
 * scrollable - 스크롤 가능 여부
 * disabled - 드롭다운 비활성화 여부
 * offset - 드롭다운 메뉴의 오프셋
 * placement - 드롭다운 메뉴의 위치
 * placeholder - 선택된 값이 없을 때 표시될 텍스트
 * showTooltip - 툴팁 표시 여부
 * scrollMaxHeight - 스크롤 최대 높이
 * dropdownStyle - 드롭다운 컨테이너 스타일
 * optionListStyle - 옵션 목록 스타일
 * optionItemStyle - 옵션 항목 스타일
 */
interface MultiSelectDropdownProps {
  valueAccessorKeys: string[];
  options: MultiSelectDropdownOption[];
  onSelect: (keys: string[]) => void;
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
}

/**
 * 다중 선택 드롭다운 컴포넌트
 *
 * 여러 옵션을 동시에 선택할 수 있는 드롭다운 컴포넌트입니다.
 * 선택된 항목은 태그 형태로 표시되며, 개별적으로 제거할 수 있습니다.
 * 검색 기능을 통해 옵션을 필터링할 수 있습니다.
 */
const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  valueAccessorKeys = [],
  options,
  onSelect,
  hasSearch = true,
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(valueAccessorKeys);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const selectWrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options.map((option) => option.header));
  const isTypingRef = useRef(false);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement,
    open: isOpen && !disabled,
    onOpenChange: (open: boolean) => !disabled && setIsOpen(open),
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableWidth, availableHeight }) {
          const width = optionListStyle?.width || `${rects.reference.width}px`;
          Object.assign(elements.floating.style, {
            width,
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setReference(node);
      selectWrapperRef.current = node;
    },
    [refs],
  );

  const click = useClick(context, { event: 'mousedown' });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex: -1,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex: -1,
    onMatch: isOpen ? setActiveIndex : undefined,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    dismiss,
    role,
    listNav,
    typeahead,
    click,
  ]);

  const handleSelect = (key: string) => {
    setSelectedKeys((prevSelectedKeys) =>
      prevSelectedKeys.includes(key)
        ? prevSelectedKeys.filter((selectedKey) => selectedKey !== key)
        : [...prevSelectedKeys, key],
    );
  };

  const handleRemove = (key: string) => {
    setSelectedKeys((prevSelectedKeys) => prevSelectedKeys.filter((selectedKey) => selectedKey !== key));
  };

  const filteredOptions = options.filter((option) => option.header.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleClearSearch = useCallback(() => setSearchTerm(''), []);

  const selectedItemsLabel = selectedKeys.map((key) => {
    const option = options.find((option) => option.accessorKey === key);
    return (
      option && (
        <SelectedItemLabel key={key}>
          <Body3 color={disabled ? '#cdccd4' : '#000'}>{option.header}</Body3>
          <CancelCircleIcon width={24} height={24} color={'#747881'} onClick={() => handleRemove(key)} />
        </SelectedItemLabel>
      )
    );
  });

  useEffect(() => {
    onSelect(selectedKeys);
  }, [selectedKeys, onSelect]);

  return (
    <div style={{ ...dropdownStyle }}>
      <DropdownWrapper
        ref={setRefs}
        tabIndex={0}
        aria-labelledby='multi-select-label'
        aria-autocomplete='none'
        {...getReferenceProps()}
        $isOpen={isOpen}
        $offset={offset}
        $disabled={disabled}
        $placement={context.placement}
        style={{ ...dropdownStyle, minHeight: '40px', height: 'auto' }}
      >
        <SelectedItemsContainer>
          {selectedItemsLabel.length > 0 ? (
            selectedItemsLabel
          ) : (
            <Body3 color={disabled ? '#cdccd4' : '#000'}>{placeholder || '선택해주세요'}</Body3>
          )}
        </SelectedItemsContainer>

        <ExpandIcon $isOpen={isOpen} />
      </DropdownWrapper>
      {isOpen && !disabled && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
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
              {hasSearch && (
                <SearchInputWrapper>
                  <SearchInput
                    placeholder='검색어로 찾기'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CancelCircleIcon width={24} height={24} color={'#747881'} onClick={handleClearSearch} />
                </SearchInputWrapper>
              )}
              <DropdownMenu $scrollable={scrollable} $scrollMaxHeight={scrollMaxHeight} {...getFloatingProps()}>
                {filteredOptions.map((option, i) => (
                  <DropdownOptionItemWrapper
                    key={option.accessorKey}
                    title={showTooltip ? option.header : undefined}
                    $disabled={option.disabled}
                    $isActive={i === activeIndex}
                    $isSelected={selectedKeys.includes(option.accessorKey)}
                    style={optionItemStyle}
                    $hasIcon={Boolean(option.icon)}
                    {...getItemProps({
                      onClick: () => !option.disabled && handleSelect(option.accessorKey),
                      onKeyDown: (event) => {
                        if (option.disabled) {
                          return;
                        }
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
                    {option.icon && <Icon component={option.icon} width={16} height={16} color='#000' />}
                    <TextEllipsisLabelBody6 color={option.disabled ? '#000' : '#cdccd4'}>
                      {option.header}
                    </TextEllipsisLabelBody6>
                  </DropdownOptionItemWrapper>
                ))}
              </DropdownMenu>
            </DropdownMenuWrapper>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};

/**
 * 선택된 항목들을 담는 컨테이너의 스타일을 정의합니다.
 */
const SelectedItemsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 3px;
  gap: 4px;
`;

/**
 * 선택된 개별 항목의 라벨 스타일을 정의합니다.
 */
const SelectedItemLabel = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #ddd;
  background-color: #eeeae5;
  padding: 3px 6px;
  border-radius: 4px;
`;

export { MultiSelectDropdown, type MultiSelectDropdownOption, type MultiSelectDropdownProps };
