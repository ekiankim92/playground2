import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { TrashIcon } from '../icon/TrashIcon';
import { EllipsisAndHoverTooltip } from '../tooltip/EllipsisAndHoverTooltip';

// 이미지 테이블 컴포넌트 props 인터페이스
interface ImageTableProps {
  recentProjectImages: {
    // 최근 프로젝트 이미지 목록
    name: string; // 이미지 이름
    short_name: string; // 슬래쉬로 가공된 이름
    tag: string; // 이미지 태그
    size: string; // 이미지 크기
  }[];
  prevProjectImages: {
    // 이전 프로젝트 이미지 목록
    name: string;
    short_name: string; // 슬래쉬로 가공된 이름
    tag: string;
    size: string;
  }[];
  setImagesCount: Dispatch<SetStateAction<number | null>>; // 이미지 개수 상태 설정 함수
}

// 테이블 헤더 정의
const TABLE_HEADER = [
  { header: 'No.', accessorKey: 'num' },
  { header: '이미지명', accessorKey: 'name' },
  { header: '버전', accessorKey: 'tag' },
  { header: '크기', accessorKey: 'size' },
];

export default function ImageTable({ recentProjectImages, prevProjectImages = [], setImagesCount }: ImageTableProps) {
  // 최근 이미지와 이전 이미지를 하나의 배열로 합침
  const projectImages = [...recentProjectImages, ...prevProjectImages];

  // 이미지 목록 처리 및 상태 표시 (추가/삭제/변경없음)
  const imageList = useMemo(() => {
    return projectImages?.reduce<{ name: string; tag: string; size: string; state: string }[]>((acc, cur, index) => {
      // 동일한 이름과 태그를 가진 이미지의 첫 번째 인덱스와 마지막 인덱스 찾기
      const firstIndex = projectImages.findIndex(
        (image) => image.short_name === cur.short_name && image.tag === cur.tag,
      );
      const lastIndex = projectImages.findLastIndex(
        (image) => image.short_name === cur.short_name && image.tag === cur.tag,
      );

      // 첫 번째와 마지막 인덱스가 같으면 추가되거나 삭제된 이미지
      if (firstIndex === lastIndex) {
        if (recentProjectImages.includes(cur))
          acc.push({ name: cur.short_name, tag: cur.tag, size: cur.size, state: 'add' }); // 추가된 이미지
        else acc.push({ name: cur.short_name, tag: cur.tag, size: cur.size, state: 'delete' }); // 삭제된 이미지
      } else {
        // 첫 번째 인덱스일 때만 추가 (중복 방지)
        if (index === firstIndex)
          acc.push({ name: cur.short_name, tag: cur.tag, size: cur.size, state: 'not-modified' }); // 기존 이미지
      }

      return acc;
    }, []);
  }, [projectImages]);

  // 삭제되지 않은 이미지의 총 개수 계산
  const totalImagesCount = useMemo(() => imageList.filter((image) => image.state !== 'delete').length, [projectImages]);

  // 이미지 개수 상태 업데이트
  useEffect(() => {
    setImagesCount(totalImagesCount);
  }, [projectImages]);

  return (
    <Wrapper>
      {/* 테이블 헤더 */}
      <HeaderWrapper>
        {TABLE_HEADER.map((head) => (
          <HeaderLabel key={head.accessorKey}>{head.header}</HeaderLabel>
        ))}
      </HeaderWrapper>

      {/* 이미지 목록 렌더링 */}
      {imageList.map((image, index) => (
        <BodyWrapper key={`${image.name}-${image.tag}`} $status={image.state}>
          {/* 인덱스 또는 삭제 아이콘 */}
          <Index $status={image.state}>{image.state === 'delete' ? <TrashIcon /> : index + 1}</Index>

          {/* 이미지 이름 (추가된 경우 파란 점 표시) */}
          <Image>
            {image.state === 'add' ? (
              <AddStatus>
                <BlueDot />
                <EllipsisAndHoverTooltip
                  width={240}
                  tooltipContent={<TooltipMessageWrapper>{image.name}</TooltipMessageWrapper>}
                >
                  {image.name}
                </EllipsisAndHoverTooltip>
              </AddStatus>
            ) : (
              image.name
            )}
          </Image>

          {/* 태그 */}
          <Tag>{image.tag}</Tag>

          {/* 크기 */}
          <Size>{image.size}</Size>
        </BodyWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: var(--Radius-Medium);
  border-top: 1px solid var(--Gray-G25);
  border-left: 1px solid var(--Gray-G25);
  border-right: 1px solid var(--Gray-G25);
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 64px 248px 80px 70px;
  align-items: center;
  background-color: var(--BG-KB-Gray);
  height: 36px;
  border-bottom: none;
`;

const HeaderLabel = styled.div`
  color: var(--Gray-G90);
  font-size: 14px;
  font-weight: 700;

  &:first-child {
    padding-left: 12px;
  }
`;

// 행 스타일 (삭제된 경우 배경색 변경)
const BodyWrapper = styled.div<{ $status?: string }>`
  display: grid;
  grid-template-columns: 64px 248px 70px 70px;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid var(--Gray-G10);
  width: 100%;
  background-color: ${(props) => (props.$status === 'delete' ? 'var(--BG-Depth1)' : 'var(--Gray-G0)')};
`;

// 인덱스 스타일 (삭제된 경우 패딩 조정)
const Index = styled.div<{ $status?: string }>`
  color: var(--Gray-G90);
  font-size: 14px;
  font-weight: 500;
  padding-left: ${(props) => (props.$status === 'delete' ? '6px' : '12px')};
`;

const Image = styled.div`
  color: var(--Gray-G90);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tag = styled.div`
  color: var(--Gray-G90);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Size = styled.div`
  color: var(--Gray-G90);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 추가된 이미지를 표시하는 파란색 점
const BlueDot = styled.div`
  width: 6px;
  min-width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: var(--System-Blue);
`;

// 추가된 이미지 상태 표시 래퍼
const AddStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TooltipMessageWrapper = styled.div`
  padding: 6px 8px;
  border-radius: var(--Radius-Small);
  background: var(--Gray-G90);
  box-shadow: 0px 2px 6px 0px rgba(27, 27, 85, 0.2);
  color: var(--Gray-G0);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
