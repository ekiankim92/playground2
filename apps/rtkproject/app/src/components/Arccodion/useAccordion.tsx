import { useCallback, useEffect, useId, useState } from 'react';
import { InternalAccordionItemType, UseAccordionProps } from './types';

export const useAccordion = ({
  data,
  initialExpandedIds = [],
  expandable = false,
  mode = 'single',
  onChangeToggle,
}: UseAccordionProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(
    mode === 'single' && initialExpandedIds.length > 1 ? [initialExpandedIds[0]] : initialExpandedIds,
  );

  const baseId = useId();

  const isExpanded = useCallback(
    (id: string) => {
      if (!expandable) return false;
      return expandedIds.includes(id);
    },
    [expandable, expandedIds],
  );

  const accordionItems: InternalAccordionItemType[] = data.map((item, index) => {
    const id = `${baseId}-${index}`;
    return {
      id,
      isExpanded: isExpanded(id),
      original: {
        ...item,
      },
    };
  });

  useEffect(() => {
    if (mode === 'single' && expandedIds.length > 1) {
      setExpandedIds(expandedIds.length ? [expandedIds[0]] : []);
    }
  }, [mode, expandedIds]);

  const toggleExpand = useCallback(
    (id: string) => {
      if (!expandable) return;

      setExpandedIds((prevIds) => {
        let newIds;

        if (prevIds.includes(id)) {
          newIds = prevIds.filter((itemId) => itemId !== id);
        } else {
          if (mode === 'single') {
            newIds = [id];
          } else {
            newIds = [...prevIds, id];
          }
        }

        if (onChangeToggle) {
          const expandedItems = accordionItems
            .map((item) => ({
              ...item,
              isExpanded: newIds.includes(item.id),
            }))
            .filter((item) => newIds.includes(item.id));

          onChangeToggle(expandedItems);
        }

        return newIds;
      });
    },
    [expandable, mode, accordionItems, onChangeToggle],
  );

  return {
    accordionItems,
    expandedIds,
    toggleExpand,
    isExpanded,
  };
};
