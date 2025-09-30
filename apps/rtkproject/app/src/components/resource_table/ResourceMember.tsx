import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { StarIcon } from '../icon/StarIcon';
import { TrashIcon } from '../icon/TrashIcon';

// 리소스 멤버 컴포넌트 props 인터페이스
interface ResourceMembersProps {
  projectManager: string; // 프로젝트 관리자 이름
  recentProjectMembers: {
    // 현재 프로젝트 멤버 목록
    name: string; // 멤버 ID
    role_name: string; // 역할 이름
    display_name: string; // 표시 이름
  }[];
  prevProjectMembers: {
    // 이전 프로젝트 멤버 목록
    name: string;
    role_name: string;
    display_name: string;
  }[];
  setMembersCount: Dispatch<SetStateAction<number | null>>; // 멤버 수 상태 설정 함수
}

// 멤버 상태에 따른 아이콘 표시 함수
const displayIcon = (state: string) => {
  if (state === 'delete') return <TrashIcon />; // 삭제된 멤버는 휴지통 아이콘
  if (state === 'add') return <BlueDot />; // 추가된 멤버는 파란 점
};

export default function ResourceMembers({
  projectManager,
  recentProjectMembers,
  prevProjectMembers = [], // 기본값을 빈 배열로 설정
  setMembersCount,
}: ResourceMembersProps) {
  // 현재 멤버와 이전 멤버를 하나의 배열로 합침
  const projectMembers = [...recentProjectMembers, ...prevProjectMembers];

  // 프로젝트 관리자 이름, 관리자 사번
  const [name, idNum] = projectManager.split(' ');

  // 멤버 목록 처리 및 상태 표시 (추가/삭제/변경없음)
  const memberList = useMemo(() => {
    return projectMembers?.reduce<{ name: string; displayName: string; state: string }[]>((acc, cur, index) => {
      // 동일한 이름을 가진 멤버의 첫 번째 인덱스와 마지막 인덱스 찾기
      const firstIndex = projectMembers.findIndex((member) => member.name === cur.name);
      const lastIndex = projectMembers.findLastIndex((member) => member.name === cur.name);

      // 첫 번째와 마지막 인덱스가 같으면 추가되거나 삭제된 멤버
      if (firstIndex === lastIndex) {
        if (recentProjectMembers.includes(cur))
          acc.push({ name: cur.name, displayName: cur.display_name, state: 'add' }); // 추가된 멤버
        else acc.push({ name: cur.name, displayName: cur.display_name, state: 'delete' }); // 삭제된 멤버
      } else {
        // 첫 번째 인덱스일 때만 추가 (중복 방지)
        if (index === firstIndex) acc.push({ name: cur.name, displayName: cur.display_name, state: 'not-modified' }); // 기존 멤버
      }

      return acc;
    }, []);
  }, [projectMembers]);

  // 삭제되지 않은 멤버의 총 개수 계산 (프로젝트 관리자 포함 +1)
  const totalMembersCount = useMemo(
    () => memberList.filter((member) => member.state !== 'delete').length + 1,
    [projectMembers],
  );

  // 멤버 수 상태 업데이트
  useEffect(() => {
    setMembersCount(totalMembersCount);
  }, [projectMembers]);

  return (
    <Wrapper>
      {/* 프로젝트 관리자 표시 (별 아이콘과 함께) */}
      <ItemWrapper $state={'manager'}>
        {name} {idNum?.toUpperCase()}
        <StarIcon />
      </ItemWrapper>

      {/* 멤버 목록 렌더링 */}
      {memberList.map((member) => (
        <ItemWrapper key={member.name} $state={member.state}>
          {member.displayName} {`(${member?.name?.toUpperCase()})`}
          {displayIcon(member.state)}
        </ItemWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-self: stretch;
`;

// 멤버 아이템 스타일 (상태에 따라 너비와 배경색 변경)
const ItemWrapper = styled.div<{ $state?: string }>`
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 500;
  padding: 4px 12px 4px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 16px;
  border: 1px solid var(--Gray-G10);

  // 상태에 따른 배경색 설정
  background-color: ${({ $state }) => {
    switch ($state) {
      case 'manager':
        return 'var(--KB-Yellow-Main)'; // 관리자는 노란색
      case 'not-modified':
      case 'add':
        return 'var(--Gray-G0)'; // 기존/추가 멤버는 흰색
      case 'delete':
        return 'var(--BG-Depth1)'; // 삭제된 멤버는 연한 회색
      default:
        return '#FFF';
    }
  }};

  // 텍스트 오버플로우 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 추가된 멤버를 표시하는 파란색 점
const BlueDot = styled.div`
  width: 6px;
  min-width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: var(--System-Blue);
`;
