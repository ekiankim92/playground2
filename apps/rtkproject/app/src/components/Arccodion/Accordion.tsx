import DebouncedButton from '@/components/common/button/DebouncedButton/DebouncedButton';
import { ChevronRightIcon } from '@/components/common/icon/ChevronRightIcon';

import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  AccordionContent,
  AccordionExpandableContent,
  AccordionItem,
  AccordionItems,
  AccordionTitle,
} from './Accordion.styles';
import { AccordionProps, InternalAccordionItemType, UseAccordionProps } from './types';
import { useAccordion } from './useAccordion';

const renderContent = (item: InternalAccordionItemType): ReactNode => {
  if (typeof item?.original?.content === 'function') {
    return item?.original?.content(item);
  }
  return item?.original?.content;
};

export default function Accordion({
  data,
  expandable = false,
  mode,

  itemsClassName,
  itemClassName,
  titleClassName,
  expandableContentClassName,
  contentClassName,
}: AccordionProps & UseAccordionProps) {
  const { accordionItems, toggleExpand } = useAccordion({ data, expandable, mode });

  return (
    <AccordionItems className={clsx('accordion-items', itemsClassName)}>
      {accordionItems.map((item) => (
        <AccordionItem
          key={item.id}
          className={clsx('accordion-item', itemClassName, {
            'accordion-item--expandable': expandable,
            'accordion-item--active': item.isExpanded,
          })}
        >
          <AccordionTitle
            className={clsx('accordion-title', titleClassName, {
              'accordion-title--expandable': expandable,
              'accordion-title--active': item.isExpanded,
            })}
          >
            {expandable && (
              <DebouncedButton
                variants='none'
                style={{
                  width: '32px',
                  height: '32px',
                  color: 'var(--g55)',
                  marginRight: '8px',
                  transform: `rotate(${item.isExpanded ? '90deg' : '0deg'})`,
                  transition: 'transform 0.2s ease-in-out',
                }}
                icon={<ChevronRightIcon />}
                onClick={() => toggleExpand(item.id)}
                className={clsx('accordion-button', {
                  'accordion-button--active': item.isExpanded,
                })}
              />
            )}
            {item.original.title}
          </AccordionTitle>
          {expandable && (
            <AccordionExpandableContent
              className={clsx('accordion-expandable-content', expandableContentClassName, {
                'accordion-expandable-content--expandable': expandable,
                'accordion-expandable-content--active': item.isExpanded,
              })}
            >
              <AccordionContent
                className={clsx('accordion-inner-content', contentClassName, {
                  'accordion-inner-content--active': item.isExpanded,
                })}
              >
                {renderContent(item)}
              </AccordionContent>
            </AccordionExpandableContent>
          )}
        </AccordionItem>
      ))}
    </AccordionItems>
  );
}
