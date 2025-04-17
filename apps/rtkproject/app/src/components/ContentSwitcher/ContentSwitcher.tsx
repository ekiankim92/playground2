import React, { useEffect, useState } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import styled from 'styled-components';

import { Body2, Body3 } from '@/components/common/Typography';
import { getZIndex, TypePropertyPrefixInjector } from '@/util';

interface ContentSwitcherOptionObject {
  label: React.ReactNode;
  value: string;
  path?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

type ContentSwitcherOptionType = string | number | ContentSwitcherOptionObject;

export interface ContentSwitcherProps extends VariantProps<typeof contentSwitcherVariants> {
  options: ContentSwitcherOptionType[];
  initialValue?: ContentSwitcherOptionType;
  value?: ContentSwitcherOptionType;
  onChange?: (value: string | number) => void;
  style?: React.CSSProperties;
}

/**
 * ContentSwitcher
 *
 * @description 다양한 콘텐츠 세그먼트 간 전환을 지원하는 컴포넌트입니다. 'tab' 모드와 'button' 모드를 지원하며,
 * 옵션, 초기값, 활성값을 커스터마이징할 수 있고 값 변경 시 콜백을 제공합니다.
 */
const ContentSwitcher: React.FC<ContentSwitcherProps> = ({
  initialValue,
  value,
  options,
  onChange,
  mode,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = options.findIndex(
      (ele) => ele === initialValue || (typeof ele === 'object' && ele.value === initialValue),
    );
    return index === -1 ? 0 : index;
  });

  const handleClick = (index: number) => {
    if (value) {
      setActiveIndex(index);
    }

    const option = options[index];

    let selectedValue: string | number;

    if (typeof option === 'string' || typeof option === 'number') {
      selectedValue = option;
    } else {
      selectedValue = option.value;
      option.onClick?.();
    }

    onChange?.(selectedValue);
  };

  useEffect(() => {
    if (value) {
      const index = options.findIndex((ele) => ele === value || (typeof ele === 'object' && ele.value === value));
      const initialValueIndex = options.findIndex(
        (ele) => ele === initialValue || (typeof ele === 'object' && ele.value === initialValue),
      );

      const activeIndex = index === -1 ? (initialValueIndex === -1 ? 0 : initialValueIndex) : index;

      setActiveIndex(activeIndex);
    }
  }, [value, options, initialValue]);

  return (
    <Container className={contentSwitcherVariants({ mode })} {...props}>
      {options.map((option, index) => (
        <Segment
          className={contentSwitcherVariants({ mode })}
          key={index}
          $zIndex={getZIndex({ customZIndex: index === activeIndex ? 1 : 0 })}
          $active={index === activeIndex}
          $disabled={typeof option !== 'string' && typeof option !== 'number' && option.disabled}
          onClick={() => handleClick(index)}
          $index={index}
        >
          {mode === 'tab' && (
            <ContentsLabelBody6 $active={index === activeIndex}>
              {typeof option === 'string' || typeof option === 'number' ? option : option.label}
            </ContentsLabelBody6>
          )}
          {mode === 'button' && (
            <ContentsLabelBody5 $active={index === activeIndex}>
              {typeof option === 'string' || typeof option === 'number' ? option : option.label}
            </ContentsLabelBody5>
          )}
        </Segment>
      ))}
    </Container>
  );
};

export { ContentSwitcher };

const contentSwitcherVariants = cva('', {
  variants: {
    mode: {
      tab: 'tab',
      button: 'button',
    },
  },
  defaultVariants: {
    mode: 'tab',
  },
});

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  &.tab {
    border-radius: 6px;
    height: 30px;
    padding: 2px;
    background-color: #fff;
  }
  &.button {
    height: 32px;
    padding: 0px;
    background-color: transparent;
    gap: 4px;
  }
`;

interface SegmentProps {
  active: boolean;
  zIndex: number;
  disabled?: boolean;
  index?: number;
}

const Segment = styled.div<TypePropertyPrefixInjector<SegmentProps>>`
  flex: 1;
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;

  &.tab {
    width: 100px;
    height: 28px;
    border-right: ${({ $index }) => $index === 0 && 'none'};
    border-top-left-radius: ${({ $index }) => $index === 0 && '4px'};
    border-bottom-left-radius: ${({ $index }) => $index === 0 && '4px'};
    border-top-right-radius: ${({ $index }) => $index === 1 && '4px'};
    border-bottom-right-radius: ${({ $index }) => $index === 1 && '4px'};
    background-color: ${({ $active }) => ($active ? '#FFCC00' : '#fff')};
    color: #94989e;
  }

  &.button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    height: 32px;
    padding: 0 12px;
    background-color: ${({ $active }) => ($active ? '#FFCC00' : '#fff')};
    color: #94989e;
  }
`;

const ContentsLabelBody6 = styled(Body3)<TypePropertyPrefixInjector<SegmentProps>>`
  font-weight: ${({ $active }) => ($active ? 'bold' : '')};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsLabelBody5 = styled(Body2)<TypePropertyPrefixInjector<SegmentProps>>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
