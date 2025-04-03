import { ReactNode } from 'react';

export interface AccordionItemType {
  title: ReactNode;
  content?: ReactNode | ((data: InternalAccordionItemType) => ReactNode);
}

export interface InternalAccordionItemType {
  id: string;
  isExpanded: boolean;
  original: AccordionItemType;
}

export interface AccordionProps {
  itemsClassName?: string;
  itemClassName?: string;
  titleClassName?: string;
  expandableContentClassName?: string;
  contentClassName?: string;
}

export interface UseAccordionProps {
  data: AccordionItemType[];
  initialExpandedId?: string | null;
  initialExpandedIds?: string[];
  expandable?: boolean;
  mode?: 'single' | 'multi';
  onChangeToggle?: (items: InternalAccordionItemType[]) => void;
}
