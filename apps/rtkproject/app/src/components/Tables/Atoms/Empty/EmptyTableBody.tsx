import { Body2 } from '@/components/common';
import { CircleFailIcon } from '@/components/common/icon/CircleFailIcon';
import { MRT_RowData } from 'material-react-table';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CombinedFieldDefArray } from '../../types/types';

/**
 * 빈 테이블 컴포넌트의 속성을 정의합니다.
 *
 * isLoading - 데이터 로딩 중 여부
 * hasRowFetchError - 데이터 가져오기 실패 여부
 * showCustomEmptyBody - 사용자 정의 빈 테이블 본문 표시 여부
 * CustomEmptyBody - 사용자 정의 빈 테이블 본문 컴포넌트
 * fields - 테이블 헤더 컬럼 및 본문 데이터 정의
 * tableRef - 테이블 컨테이너 요소 참조
 * tableComponentRef - 테이블 요소 참조
 * height - 테이블 높이
 */
interface EmptyTableProps<TData extends MRT_RowData> {
  isLoading?: boolean;
  hasRowFetchError?: boolean; //* 실제 DB 에서 데이터 fetch 를 실패한 값
  showCustomEmptyBody?: boolean; //* 내가 만든 EmptyTableBody 로 보여주는 여부 값
  CustomEmptyBody?: React.ReactNode; //* 실제 EmptyTableBody 컴포넌트
  fields: CombinedFieldDefArray<TData>; //* 헤더에 들어가는 컬럼 및 바디에 들어가는 실제 데이터
  tableRef: React.RefObject<HTMLDivElement>;
  tableComponentRef: React.RefObject<HTMLTableSectionElement>;
  height?: string;
}

/**
 * 빈 테이블 본문 컴포넌트
 *
 * 테이블에 데이터가 없거나 오류가 발생했을 때 표시되는 컴포넌트입니다.
 * 사용자 정의 컴포넌트를 표시하거나 기본 오류 메시지를 표시합니다.
 * 테이블 크기에 맞게 자동으로 조정됩니다.
 */
const EmptyTableBody = <T extends MRT_RowData>({
  isLoading = false,
  hasRowFetchError = false,
  showCustomEmptyBody,
  CustomEmptyBody,
  height = '240px',
  fields,
  tableRef,
  tableComponentRef,
}: EmptyTableProps<T>) => {
  /**
   * 테이블 크기 상태
   * 테이블 컨테이너의 너비와 높이를 추적합니다.
   */
  const [tableDimensions, setTableDimensions] = useState<{ width: string; height: string }>({
    width: '100%',
    height,
  });

  /**
   * 테이블 크기 업데이트 효과
   *
   * 테이블 컨테이너 크기가 변경될 때마다 빈 테이블 본문의 크기를 조정합니다.
   */
  useEffect(() => {
    const updateTableDimensions = () => {
      if (tableRef.current && tableComponentRef.current) {
        const adjustedWidth = `${tableComponentRef.current.clientWidth - 2}px`;
        const adjustedHeight = `${tableComponentRef.current.clientHeight - 32}px`;

        setTableDimensions({
          width: adjustedWidth,
          height: adjustedHeight,
        });
      }
    };

    updateTableDimensions();
    window.addEventListener('resize', updateTableDimensions);
    return () => window.removeEventListener('resize', updateTableDimensions);
  }, [tableRef?.current?.clientWidth, tableRef?.current?.clientHeight, fields]);

  /**
   * 빈 테이블 내용을 가져옵니다.
   * 오류 상태에 따라 적절한 메시지와 아이콘을 반환합니다.
   */
  const { text, icon } = getEmptyTableContent({ hasRowFetchError }) || { text: '', icon: null };

  return (
    <EmptyTableWrapper $width={tableDimensions.width} $height={tableDimensions.height}>
      {showCustomEmptyBody && CustomEmptyBody
        ? CustomEmptyBody
        : !isLoading && (
            <>
              <span>{icon}</span>
              <Body2 color='#EA4310'>{text}</Body2>
            </>
          )}
    </EmptyTableWrapper>
  );
};

export default EmptyTableBody;

/**
 * 빈 테이블 내용을 가져오는 함수
 *
 * 오류 상태에 따라 적절한 메시지와 아이콘을 반환합니다.
 */
const getEmptyTableContent = ({ hasRowFetchError }: { hasRowFetchError: boolean }) => {
  if (hasRowFetchError) {
    return {
      text: `데이터를 불러오는데 실패하였습니다.\n페이지를 새로고침 해주세요.`,
      icon: <CircleFailIcon width={40} height={40} color='#EA4310' />,
    };
  }
};

/**
 * 빈 테이블 래퍼 스타일 컴포넌트
 *
 * 빈 테이블 내용을 중앙에 배치하고 테이블 크기에 맞게 조정합니다.
 *
 * $width - 컨테이너 너비
 * $height - 컨테이너 높이
 */
const EmptyTableWrapper = styled.div<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: break-spaces;
  text-align: center;
  gap: 1;
`;
