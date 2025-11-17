import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import TableSpinner from '../../templates/TableSpinner';

/**
 * 페이드 효과가 있는 로딩 오버레이 컴포넌트
 *
 * 로딩 상태일 때 반투명한 배경과 함께 스피너를 표시하고,
 * 로딩이 끝나면 페이드 아웃 효과와 함께 사라집니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.top='0'] - 오버레이의 상단 위치
 * @param {string} [props.height] - 오버레이의 높이
 * @param {boolean} props.isLoading - 로딩 상태 여부
 */
const FadeLoadingOverlay = ({
  isLoading,
  top = '0',
  height,
}: {
  top?: string;
  height?: string;
  isLoading: boolean;
}) => {
  /**
   * 컴포넌트 렌더링 여부를 관리하는 상태
   *
   * 로딩 시작 시 즉시 true로 설정되고,
   * 로딩 종료 후 페이드 아웃 애니메이션이 완료되면 false로 설정됩니다.
   */
  const [shouldRender, setShouldRender] = useState(isLoading);

  /**
   * 로딩 상태가 true로 변경될 때 컴포넌트를 렌더링합니다.
   */
  useEffect(() => {
    if (isLoading) setShouldRender(true);
  }, [isLoading]);

  /**
   * 트랜지션 종료 시 호출되는 핸들러
   *
   * 로딩이 끝나고 페이드 아웃 애니메이션이 완료되면
   * 컴포넌트를 DOM에서 제거합니다.
   */
  const handleTransitionEnd = () => {
    if (!isLoading) setShouldRender(false);
  };

  return shouldRender ? (
    <Box
      sx={{
        position: 'absolute',
        height,
        top: top,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.6)',
        opacity: isLoading ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <TableSpinner />
    </Box>
  ) : null;
};

export default FadeLoadingOverlay;
