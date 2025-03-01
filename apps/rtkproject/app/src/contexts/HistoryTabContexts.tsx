import { HistoryTab } from '@/components/common/navigator/history-tabs/types';
import { createContext, useContext } from 'react';

interface HistoryTabsContextType {
  tabs: HistoryTab[];
  addTab: (path: string, title: string) => void;
  removeTab: (id: string) => void;
  activateTab: (id: string) => void;
}

export const HistoryTabsContext = createContext<HistoryTabsContextType | undefined>(undefined);

export const useHistoryTabs = () => {
  const context = useContext(HistoryTabsContext);
  if (!context) {
    throw new Error('useHistoryTabs must be used within HistoryTabsProvider');
  }
  return context;
};
