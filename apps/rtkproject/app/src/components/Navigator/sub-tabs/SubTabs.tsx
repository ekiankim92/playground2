import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationData } from '../types';

export default function SubTabs({ navigationData }: { navigationData: NavigationData[] }) {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return null;
  }

  const getCurrentGroupItems = (navigationData: NavigationData[], currentPath: string): NavigationData[] => {
    for (const group of navigationData) {
      if (group.items) {
        const matchingItem = group.items.find((item) => item.path === currentPath);
        if (matchingItem) {
          //  return group.items; // 여러개 리턴
          return [matchingItem]; // 하나만 리턴
        }
      }
    }
    return [];
  };

  const currentPathItems = getCurrentGroupItems(navigationData, pathname);

  return (
    <SubTabsContainer>
      {currentPathItems.map((tab) => (
        <StyledLink key={tab.path} to={tab.path || '#'}>
          <SubTabItem $isActive={pathname === tab.path}>
            <SubTabContent>
              <SubTabTitle>{tab.title}</SubTabTitle>
            </SubTabContent>
          </SubTabItem>
        </StyledLink>
      ))}
    </SubTabsContainer>
  );
}

const SubTabsContainer = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 3px);
    background-color: var(--BG-Normal);
    border-radius: 3px 3px 0 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const SubTabItem = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding: 10px 17px 6px;
  width: fit-content;
  background: var(--BG-Normal);
  border-right: 1px solid #c8ccd4;
  border-radius: 3px 3px 0 0;

  ${({ $isActive }) =>
    $isActive &&
    `
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--KB-Yellow-Main);
    border: 1px solid #c8ccd4;
    border-bottom: none;
    border-radius: 3px 3px 0 0;
  }
`;

const SubTabContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubTabTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #495057;
  white-space: nowrap;
`;
