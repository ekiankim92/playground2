import { Dispatch, SetStateAction, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { CancelCircleIcon } from '../icon/CancelCircleIcon';

// 테이블에 표시할 데이터 타입 정의 (문자열 또는 숫자 값을 가진 객체)
interface CustomTableProps<T extends { [key: string]: string | number }> {
  headers?: { label: string; key: string }[]; // 테이블 헤더 정보 (표시 라벨과 데이터 키)
  tableData: T[]; // 테이블에 표시할 데이터 배열
  setTableData?: Dispatch<SetStateAction<T[]>>; // 테이블 데이터 상태 업데이트 함수
  formName?: string; // react-hook-form에서 사용할 필드 이름
  isEdit?: boolean; // 편집 모드 여부 (삭제 버튼 표시 결정)
}

export default function CustomTable<T extends { [key: string]: string | number }>({
  headers,
  tableData,
  setTableData,
  isEdit = false,
  formName,
}: CustomTableProps<T>) {
  // react-hook-form의 setValue 함수 가져오기 (formName이 있을 경우 사용)
  const { setValue } = useFormContext() || {};

  // 테이블 행 삭제 처리 함수
  const onClickRemoveTableData = useCallback(
    (index: number) => () => {
      // 기존 데이터 복사 후 해당 인덱스 항목 제거
      const updatedData = [...tableData];
      updatedData.splice(index, 1);

      // 상태 업데이트 방식에 따라 처리
      if (setTableData) {
        // props로 전달된 setter 함수가 있으면 사용
        setTableData([...updatedData]);
      } else {
        // 없으면 react-hook-form의 setValue 사용
        setValue(String(formName), updatedData);
      }
    },
    [tableData, setValue],
  );

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell $widths='10%'>No</TableHeadCell>
            {headers?.map((header, index) => {
              const widths = ['40%', '40%']; // 헤더 셀 너비 설정
              return (
                <TableHeadCell key={uuidv4()} $widths={widths[index]}>
                  {header.label}
                </TableHeadCell>
              );
            })}
            {!isEdit && <TableHeadCell $widths='10%'>삭제</TableHeadCell>}
          </tr>
        </TableHead>
      </Table>

      <TableBodyWrapper>
        <Table>
          <TableBody>
            {/* 테이블 데이터가 5개 미만이어도 최소 5행을 표시하기 위한 처리 */}
            {Array.from({ length: Math.max(tableData.length, 5) }).map((_, index) => {
              const data = tableData[index];

              return (
                <TableRow key={uuidv4()}>
                  <TableDataIndex>{data ? index + 1 : ''}</TableDataIndex>
                  {headers?.map((col) => <TableData key={uuidv4()}>{data?.[col?.key]}</TableData>)}
                  {!isEdit && (
                    <TableDataDelete>
                      <IconWrapper>
                        {/* 실제 데이터가 있는 행에만 삭제 아이콘 표시 */}
                        {data && <CancelCircleIcon width={22} height={20} onClick={onClickRemoveTableData(index)} />}
                      </IconWrapper>
                    </TableDataDelete>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableBodyWrapper>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  /* padding-right: 14px;
  margin-top: 8px; */
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  width: 100%;
  height: 30px;
  background-color: #eeeae5;
`;

const TableHeadCell = styled.th<{ $widths?: string }>`
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  width: ${({ $widths }) => $widths || 'auto'};
`;

const TableBodyWrapper = styled.div`
  max-height: calc(100% - 150px);
  height: 150px;
  overflow-y: auto;
  display: flex;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  height: 30px;
  width: 100%;
  display: table;
  table-layout: fixed;
`;

const TableDataIndex = styled.td`
  width: 10%;
  text-align: center;
`;

const TableData = styled.td`
  text-align: center;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableDataDelete = styled.td`
  width: 10%;
`;
