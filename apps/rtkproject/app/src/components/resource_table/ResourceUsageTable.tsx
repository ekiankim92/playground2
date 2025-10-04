import { calculateGpuTotal } from '@/util/calculateGpu';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CustomFormControlLabel, CustomSwitch } from '../switch/Switch';

// 학습(Training) 리소스 사용량 항목 정의
const TRAINING_RESOURCE_USAGES = [
  { label: 'CPU', unit: 'Core', recent_name: 'recent_request_training_cpu', prev_name: 'prev_request_training_cpu' },
  {
    label: 'RAM',
    unit: 'GB',
    recent_name: 'recent_request_training_memory',
    prev_name: 'prev_request_training_memory',
  },
  { label: 'DISK', unit: 'GB', recent_name: 'recent_request_training_disk', prev_name: 'prev_request_training_disk' },
  {
    label: 'GPU',
    unit: 'EA',
    recent_name: 'recent_request_training_gpu',
    prev_name: 'prev_request_training_gpu',
    children: [
      { label: '1 EA', name: 'mig-1g' },
      { label: '2 EA', name: 'mig-2g' },
      { label: '3 EA', name: 'mig-3g' },
      { label: '7 EA', name: 'mig-7g' },
    ],
  },
];

// 추론(Inference) 리소스 사용량 항목 정의
const INFERENCE_RESOURCE_USAGES = [
  { label: 'CPU', unit: 'Core', recent_name: 'recent_request_inference_cpu', prev_name: 'prev_request_inference_cpu' },
  {
    label: 'RAM',
    unit: 'GB',
    recent_name: 'recent_request_inference_memory',
    prev_name: 'prev_request_inference_memory',
  },
  { label: 'DISK', unit: 'GB', recent_name: 'recent_request_inference_disk', prev_name: 'prev_request_inference_disk' },
  {
    label: 'GPU',
    unit: 'EA',
    recent_name: 'recent_request_inference_gpu',
    prev_name: 'prev_request_inference_gpu',
    children: [
      { label: '1 EA', name: 'mig-1g' },
      { label: '2 EA', name: 'mig-2g' },
      { label: '3 EA', name: 'mig-3g' },
      { label: '7 EA', name: 'mig-7g' },
    ],
  },
];

// 리소스 사용량 테이블 컴포넌트 props 인터페이스
interface ResourceUsageTableProps {
  inferenceUsage: boolean; // inference 사용/미사용 여부
  recentTrainingUsages: Array<number>; // 최근 학습 리소스 사용량
  prevTrainingUsages: Array<number>; // 이전 학습 리소스 사용량
  recentInferenceUsages: Array<number>; // 최근 추론 리소스 사용량
  prevInferenceUsages: Array<number>; // 이전 추론 리소스 사용량
}

// 이전 데이터 표시 여부 확인 함수
const checkPrevData = (prevData: number | undefined | null, recentData: number, unit: string) => {
  if (prevData === recentData || prevData === undefined || prevData === null) return null; // 이전 값이 현재 값과 동일하거나 없으면 표시하지 않음
  return `${prevData} ${unit}`;
};

export default function ResourceUsageTable({
  inferenceUsage,
  recentTrainingUsages,
  prevTrainingUsages,
  recentInferenceUsages,
  prevInferenceUsages,
}: ResourceUsageTableProps) {
  const { getValues } = useFormContext();

  const recentTrainingRequestGpu = getValues('recent_request_training_gpu');
  const previousTrainingRequestGpu = getValues('prev_request_training_gpu');

  const recentInferenceRequestGpu = getValues('recent_request_inference_gpu');
  const previousInferenceRequestGpu = getValues('prev_request_inference_gpu');

  //* 총 Training GPU 값
  const isTrainingGpuSame = useMemo(() => {
    if (
      !previousTrainingRequestGpu ||
      Object.values(previousTrainingRequestGpu).every((value) => value === undefined)
    ) {
      return false; //* 기존 GPU 값이 없으면 false
    }

    if (calculateGpuTotal(previousTrainingRequestGpu) === calculateGpuTotal(recentTrainingRequestGpu)) {
      return false; //* 기존 GPU 값과 현재 GPU 값이 동일하다면 false
    } else {
      return true; //* 기존 GPU 값과 현재 GPU 값이 동일 하지 않다면 true (변경이 있다는 의미)
    }
  }, []);

  //* 총 Inference GPU 값
  const isInferenceGpuSame = useMemo(() => {
    if (
      !previousInferenceRequestGpu ||
      Object.values(previousInferenceRequestGpu).every((value) => value === undefined)
    ) {
      return false;
    }

    if (calculateGpuTotal(previousInferenceRequestGpu) === calculateGpuTotal(recentInferenceRequestGpu)) {
      return false;
    } else {
      return true;
    }
  }, []);

  return (
    <Wrapper>
      {/* 학습(Training) 리소스 섹션 */}
      <TrainingWrapper>
        <TitleWrapper>
          <Title>Training</Title>
        </TitleWrapper>
        {TRAINING_RESOURCE_USAGES.map((usage, index) => {
          const prevValue = prevTrainingUsages[index];
          const recentValue = recentTrainingUsages[index];

          if (usage.children) {
            return (
              <TrainingGpuWrapper key={usage.label}>
                <DotDivider />

                <GpuHeader>
                  <UsageLabel>{usage.label}</UsageLabel>
                  {isTrainingGpuSame && <PrevLabel>총 {calculateGpuTotal(previousTrainingRequestGpu)} EA</PrevLabel>}
                  <RecentLabel>총 {calculateGpuTotal(recentTrainingRequestGpu)} EA</RecentLabel>
                </GpuHeader>

                <GpuVendorGrid>
                  {usage.children.map((gpuVendor, index) => {
                    const names = gpuVendor.name;

                    return (
                      <GpuVendorWrapper key={index}>
                        <GpuVendor>{gpuVendor.label}</GpuVendor>
                        <PrevGpuLabel>
                          {checkPrevData(previousTrainingRequestGpu?.[names], recentTrainingRequestGpu?.[names], '')}
                        </PrevGpuLabel>
                        <RecentGpuLabel>{recentTrainingRequestGpu?.[names]}</RecentGpuLabel>
                      </GpuVendorWrapper>
                    );
                  })}
                </GpuVendorGrid>
              </TrainingGpuWrapper>
            );
          }

          return (
            <DataWrapper key={usage.label}>
              <UsageLabel>{usage.label}</UsageLabel>
              {/* 이전 값 (변경된 경우에만 취소선으로 표시) */}
              <PrevLabel>{checkPrevData(prevValue, recentValue, usage.unit)}</PrevLabel>
              {/* 현재 값 */}
              <RecentLabel>{recentValue !== undefined ? `${recentValue} ${usage.unit}` : null}</RecentLabel>
            </DataWrapper>
          );
        })}
      </TrainingWrapper>

      <Divider />

      {/* 추론(Inference) 리소스 섹션 */}
      <InferenceWrapper>
        <TitleWrapper>
          <Title>Inference</Title>
          {/* 추론 사용/미사용 스위치 (읽기 전용) */}
          <CustomFormControlLabel
            control={<CustomSwitch sx={{ m: 1 }} checked={inferenceUsage} />}
            label={inferenceUsage ? '사용' : '미사용'}
            disabled
            labelPlacement='start'
          />
        </TitleWrapper>
        {INFERENCE_RESOURCE_USAGES.map((usage, index) => {
          const prevValue = prevInferenceUsages[index];
          const recentValue = recentInferenceUsages[index];

          if (usage.children) {
            return (
              <TrainingGpuWrapper key={usage.label}>
                <DotDivider />

                <GpuHeader>
                  <UsageLabel>{usage.label}</UsageLabel>
                  {isInferenceGpuSame && <PrevLabel>총 {calculateGpuTotal(previousInferenceRequestGpu)} EA</PrevLabel>}
                  <RecentLabel>총 {calculateGpuTotal(recentInferenceRequestGpu)} EA</RecentLabel>
                </GpuHeader>

                <GpuVendorGrid>
                  {usage.children.map((gpuVendor, index) => {
                    const names = gpuVendor.name;

                    return (
                      <GpuVendorWrapper key={index}>
                        <GpuVendor>{gpuVendor.label}</GpuVendor>
                        <PrevGpuLabel>
                          {checkPrevData(previousInferenceRequestGpu?.[names], recentInferenceRequestGpu?.[names], '')}
                        </PrevGpuLabel>
                        <RecentGpuLabel>{recentInferenceRequestGpu?.[names]}</RecentGpuLabel>
                      </GpuVendorWrapper>
                    );
                  })}
                </GpuVendorGrid>
              </TrainingGpuWrapper>
            );
          }

          return (
            <DataWrapper key={usage.label}>
              <UsageLabel>{usage.label}</UsageLabel>
              {/* 이전 값 (변경된 경우에만 취소선으로 표시) */}
              <PrevLabel>{checkPrevData(prevValue, recentValue, usage.unit)}</PrevLabel>
              {/* 현재 값 */}
              <RecentLabel>{recentValue !== undefined ? `${recentValue} ${usage.unit}` : null}</RecentLabel>
            </DataWrapper>
          );
        })}
      </InferenceWrapper>
    </Wrapper>
  );
}

// 전체 컨테이너 스타일
const Wrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  gap: 20px;
  align-self: stretch;
  border-radius: var(--Radius-Large);
  border: 1px solid var(--Gray-G10);
  background-color: var(--BG-KB-Yellow-L);
`;

// 섹션 구분선 스타일
const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: var(--Gray-G25);
`;

// 학습 섹션 컨테이너 스타일
const TrainingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;

// 섹션 제목 래퍼 스타일
const TitleWrapper = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 섹션 제목 스타일
const Title = styled.div`
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 700;
`;

// 추론 섹션 컨테이너 스타일
const InferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;

// 리소스 라벨 스타일
const UsageLabel = styled.div`
  width: 80px;
`;

// 데이터 행 래퍼 스타일
const DataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// 현재 값 스타일
const RecentLabel = styled.div`
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 700;
  padding-left: 4px;
`;

// 이전 값 스타일 (취소선 표시)
const PrevLabel = styled.div`
  color: var(--System-Blue);
  font-size: 14px;
  font-weight: 500;
  text-decoration-line: line-through;
`;

const DotDivider = styled.div`
  border-top: 1px dashed var(--Gray-G10);
  margin: 8px 0px;
`;

const TrainingGpuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GpuHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const GpuVendorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const GpuVendorWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const GpuVendor = styled.div`
  color: var(--KB-Gray);
  font-size: 14px;
  font-weight: 700;
`;

const RecentGpuLabel = styled.div`
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 500;
`;

const PrevGpuLabel = styled.div`
  color: var(--System-Blue);
  font-size: 14px;
  font-weight: 700;
  text-decoration-line: line-through;
`;
