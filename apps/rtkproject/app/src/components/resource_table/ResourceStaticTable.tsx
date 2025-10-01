import { calculateGpuTotal } from '@/util/calculateGpu';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { RightGreyArrowIcon } from '../icon/RightGreyArrowIcon';

// 리소스 객체 인터페이스
export interface Resources {
  [key: string]: string | number;
}

// 리소스 테이블 컴포넌트 props 인터페이스
interface ResourceTableProps {
  useInputs?: [Resources, Dispatch<SetStateAction<Resources>>]; // 리소스 상태와 설정 함수
  preRequestNames: Array<string>; //* 리소스 현재 이름
  requestNames: Array<string>; //* 리소스 요청량 이름
  isEdit?: boolean; // 수정 모드 여부
  isDisabled?: boolean; // 비활성화 여부 (요청 내역 조회 시)
}

// 리소스 항목 정의
const RESOURCE_CONTENTS = [
  {
    label: 'CPU',
    unit: 'Core',
    style: { width: 132, height: 32, background: 'var(--BG-KB-Yellow-L)', border: 'none' },
    isShowIcon: false,
  },
  {
    label: 'RAM',
    unit: 'GB',
    style: { width: 80, height: 32, background: 'var(--BG-KB-Yellow-L)', border: 'none' },
    isShowIcon: false,
  },
  {
    label: 'DISK',
    unit: 'GB',
    style: { width: 80, height: 32, background: 'var(--BG-KB-Yellow-L)', border: 'none' },
    isShowIcon: false,
  },
  {
    label: 'GPU',
    unit: 'EA',
    style: { width: 80, height: 32, background: 'var(--BG-KB-Yellow-L)', border: 'none' },
    isShowIcon: false,
    children: [
      { label: '1 EA', name: 'mig-1g' },
      { label: '2 EA', name: 'mig-2g' },
      { label: '3 EA', name: 'mig-3g' },
      { label: '7 EA', name: 'mig-7g' },
    ],
  },
];

// useForm 대신 setState 값을 사용해야 할 때의 컴포넌트
export default function ResourceStaticTable({ preRequestNames, requestNames }: ResourceTableProps) {
  const { getValues } = useFormContext();

  const remainingGpu = getValues('remaining_gpu') || {}; //* 잔여 GPU
  const preRequestGpu = getValues('pre_request_gpu') || {}; //* 현재 GPU
  const requestGpu = getValues('request_gpu') || {}; //* 승인 후 GPU

  return (
    <ResourceContentWrapper>
      {/* 테이블 헤더 */}
      <ResourceHeaderWrapper>
        <TitleLabel />
        <Current>현재</Current>
        <Request>요청량</Request>
      </ResourceHeaderWrapper>

      {/* 리소스 항목 렌더링 */}
      {RESOURCE_CONTENTS.map((resource, index) => {
        if (resource.children) {
          return (
            <GpuWrapper key={resource.label}>
              <DotDivider />

              <TitleLabel>GPU</TitleLabel>

              {resource.children.map((gpuVendor, index) => {
                const name = gpuVendor.name;

                return (
                  <ResourceGpuItem key={index}>
                    <CountWrapper>
                      <Gpu>{gpuVendor.label}</Gpu>
                      <RemainingGpu>{remainingGpu?.[name] ?? 0} 남음</RemainingGpu>
                    </CountWrapper>

                    <CurrentValueWrapper>
                      <CurrentValue>{preRequestGpu?.[name] ?? 0}</CurrentValue>
                      <RightGreyArrowIcon />
                    </CurrentValueWrapper>

                    <RequestAmtWrapper>{requestGpu?.[name] ?? 0} EA</RequestAmtWrapper>
                  </ResourceGpuItem>
                );
              })}
            </GpuWrapper>
          );
        }

        return (
          <ResourceDataRow key={resource.label}>
            <TitleLabel>{resource.label}</TitleLabel>

            {/* 현재 값 */}
            <CurrentValueWrapper>
              <CurrentValue>
                <div>{getValues(preRequestNames[index])}</div>
                <span>{resource.unit}</span>
              </CurrentValue>
              <RightGreyArrowIcon />
            </CurrentValueWrapper>

            {/* 요청량 (변경량) */}
            <RequestAmtWrapper>
              {getValues(requestNames[index])}
              <span>{resource.unit}</span>
            </RequestAmtWrapper>
          </ResourceDataRow>
        );
      })}
      <Line />
      <SumWrapper>
        <Total>합계</Total>
        <CurrentValueWrapper>
          <CurrentValue>{calculateGpuTotal(getValues('pre_request_gpu'))} EA</CurrentValue>
          <RightGreyArrowIcon />
        </CurrentValueWrapper>

        <GpuTotal>{calculateGpuTotal(requestGpu) ?? 0} EA</GpuTotal>
      </SumWrapper>
    </ResourceContentWrapper>
  );
}

// 스타일 컴포넌트 정의
const ResourceContentWrapper = styled.div`
  background-color: var(--BG-KB-Yellow-L);
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: var(--Radius-Large);
  border: 1px solid var(--Gray-G10);
`;

const TitleLabel = styled.div`
  width: 120px;
`;

const Request = styled.div`
  width: 100px;
  color: var(--KB-Gold);
  font-size: 14px;
  font-weight: 700;
`;

const Current = styled.div`
  width: 56px;
  color: var(--KB-Gold);
  font-size: 14px;
  font-weight: 700;
`;

const ResourceHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: var(--KB-Gold);
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 8px;
`;

const ResourceDataRow = styled.div`
  height: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const RequestAmtWrapper = styled.div`
  width: 100px;
  display: flex;
  gap: 6px;
  color: var(--Gray-G90, #1f1f1f);
  font-size: 16px;
  font-weight: 700;
`;

const CurrentValueWrapper = styled.div`
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentValue = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 500;
`;

const GpuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DotDivider = styled.div`
  border-top: 1px dashed var(--Gray-G10);
  margin: 8px 0px;
`;

const ResourceGpuItem = styled.div`
  height: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 120px;
  padding-left: 8px;
`;

const Gpu = styled.div`
  color: var(--KB-Gray);
  font-size: 14px;
  font-weight: 700;
`;

const RemainingGpu = styled.div`
  color: var(--Gray-G25);
  font-size: 12px;
  font-weight: 500;
`;

const Line = styled.div`
  border-top: 1px solid var(--Gray-G25);
  margin: 8px 0px;
`;

const SumWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const Total = styled.div`
  color: var(--Gray-G55);
  font-size: 12px;
  font-weight: 700;
  width: 120px;
`;

const GpuTotal = styled.div`
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 700;
`;
