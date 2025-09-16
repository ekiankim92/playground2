import { useAuth } from '@/contexts/AuthContext';
import { useMemo } from 'react';
import { ObjectStorageIcon } from '../icon/ObjectStorageIcon';
import { RequestIcon } from '../icon/RequestIcon';
import { SnbAnalyzeBasicIcon } from '../icon/SnbAnalyzeBasicIcon';
import { SnbDashboardBasicIcon } from '../icon/SnbDashboardBasicIcon';
import { SnbManagerBasicIcon } from '../icon/SnbManagerBasicIcon';
import { NavigationData } from './types';

export function useFilteredNavigationData() {
  const { user } = useAuth();

  /**
   * 네비게이션 데이터
   *
   * 사이드바 및 브레드크럼에서 사용되는 네비게이션 구조를 정의합니다.
   * 각 항목은 제목, 아이콘, 경로 및 하위 항목을 포함할 수 있습니다.
   */
  const navigationData: NavigationData[] = useMemo(
    () => [
      {
        level: 1,
        title: '대시보드',
        icon: <SnbDashboardBasicIcon width={32} height={32} />,
        path: '/',
      },
      {
        level: 1,
        title: '분석 관리',
        icon: <SnbAnalyzeBasicIcon width={32} height={32} />,
        items: [
          {
            level: 2,
            title: '분석 과제',
            path: '/analysis/tasks',
          },
          {
            level: 2,
            title: '분석 환경',
            path: '/analysis/environment',
          },
          {
            level: 2,
            title: '분석 모델',
            path: '/analysis/models',
          },
          {
            level: 2,
            title: 'ML Ops',
            path: '/analysis/mlops',
            isMLOps: true,
          },
        ],
      },
      {
        level: 1,
        title: '요청 관리',
        icon: <RequestIcon width={32} height={32} />,
        items: [
          {
            level: 2,
            title: '과제 요청 관리',
            path: '/admin/requests',
          },
          {
            level: 2,
            title: '리소스 요청 관리',
            path: '/analysis/resource-requests',
          },
          {
            level: 3,
            title: '모델 요청 관리',
            path: '/model/requests',
          },
        ],
      },
      {
        level: 1,
        title: '오브젝트스토리지',
        icon: <ObjectStorageIcon width={32} height={32} />,
        path: '/object-storage/buckets',
      },
      ...(user?.role === 'portal_admin'
        ? [
            {
              level: 1,
              title: '관리자 기능',
              icon: <SnbManagerBasicIcon width={32} height={32} />,
              items: [
                {
                  level: 2,
                  title: '사용자 관리',
                  path: '/admin/users',
                },
                {
                  level: 2,
                  title: '이미지 관리',
                  path: '/admin/images',
                },
                {
                  level: 2,
                  title: '시스템 설정',
                  path: '/admin/settings',
                },
                {
                  level: 2,
                  title: '과제 삭제 내역',
                  path: '/admin/deletedAnalysis',
                },
              ],
            },
          ]
        : []),
    ],
    [user],
  );

  return navigationData;
}
