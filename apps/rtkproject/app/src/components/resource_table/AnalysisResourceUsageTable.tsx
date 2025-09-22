import { calculateGpuTotal } from '@/util/calculateGpu';
import { ChangeEvent } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import CircleInfoIcon from '../icon/CircleInfoIcon';
import { Input } from '../input';
import { CustomFormControlLabel, CustomSwitch } from '../switch/Switch';
import { Tooltip } from '../tooltip';
import GpuCalculator from './GpuCalculator';

// 학습(Training) 리소스 사용량 항목 정의
const TRAINING_RESOURCE_USAGES = [
  { label: 'CPU', unit: 'Core', name: 'training_cpu' },
  { label: 'RAM', unit: 'GB', name: 'training_ram' },
  { label: 'DISK', unit: 'GB', name: 'training_disk' },
  { label: 'GPU', unit: 'EA', name: 'training_gpu', children: ['mig-1g', 'mig-2g', 'mig-3g', 'mig-7g'] },
];

// 추론(Inference) 리소스 사용량 항목 정의
const INFERENCE_RESOURCE_USAGES = [
  { label: 'CPU', unit: 'Core', name: 'inference_cpu' },
  { label: 'RAM', unit: 'GB', name: 'inference_ram' },
  { label: 'DISK', unit: 'GB', name: 'inference_disk' },
  { label: 'GPU', unit: 'EA', name: 'inference_gpu', children: ['mig-1g', 'mig-2g', 'mig-3g', 'mig-7g'] },
];

// 컴포넌트 props 인터페이스
interface AnalysisResourceUsageTableProps {
  isEdit?: boolean; // 편집 모드 여부
}

export default function AnalysisResourceUsageTable({ isEdit = false }: AnalysisResourceUsageTableProps) {
  // react-hook-form의 필요한 함수들 가져오기
  // prettier-ignore
  const { control, getValues, watch, formState: { errors } } = useFormContext();

  const { training_cpu, training_disk, training_ram, inference_cpu, inference_disk, inference_ram } = errors || {};

  // 입력값 변경 핸들러
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    let { value } = event.target;

    // 소수점으로 시작하는 경우 앞에 0 추가
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    // 앞에 오는 0 제거 (예: 01 -> 1)
    value = value.replace(/^0+(\d)/, '$1');

    // 정수 및 소수점 한 자리까지 허용하는 정규식 패턴
    const isNonNegativeInteger = /^\d{0,4}$/; // 정수만 허용 (0-9999)
    const isNumberWithOneDecimal = /^\d{0,4}(\.\d?)?$/; // 소수점 한 자리까지 허용 (0-9999.9)

    // 필드별 유효성 검사 규칙
    const validationRules: Record<string, RegExp> = {
      training_gpu: isNonNegativeInteger, // GPU는 정수만 허용
      inference_gpu: isNonNegativeInteger, // GPU는 정수만 허용
      default: isNumberWithOneDecimal, // 기본은 소수점 한 자리까지 허용
    };

    // 해당 필드에 맞는 검증 규칙 선택
    const validator = validationRules[field.name] || validationRules.default;

    // 유효한 값인 경우에만 필드 값 업데이트
    if (validator.test(value)) {
      field.onChange(value);
    }
  };

  return (
    <>
      <Wrapper>
        {/* 학습(Training) 리소스 섹션 */}
        <TrainingWrapper>
          <TitleWrapper>
            <Title>Training</Title>
          </TitleWrapper>
          {TRAINING_RESOURCE_USAGES.map((usage) => {
            if (usage.children) {
              return (
                <TrainingGpuWrapper key={usage.label}>
                  <DotDivider />
                  <UsageLabel>
                    <Tooltip
                      tooltipContent={
                        <TooltipWrapper>
                          GPU 1EA는 NVIDIA MIG(Multi-Instance GPU)를 사용하여 <br />
                          단일 물리 GPU의 1/7에 해당하는 크기를 제공합니다.
                        </TooltipWrapper>
                      }
                    >
                      <IconWrapper>
                        <GpuName>
                          GPU <CircleInfoIcon />
                        </GpuName>
                        <GpuTotal>총 {calculateGpuTotal(watch('training_gpu'))} EA</GpuTotal>
                      </IconWrapper>
                    </Tooltip>
                  </UsageLabel>
                  <GpuCalculator isEdit={isEdit} resourceGpuType='training_gpu' />
                </TrainingGpuWrapper>
              );
            }

            return (
              <DataWrapper key={usage.label}>
                <UsageLabel>{usage.label}</UsageLabel>
                {/* 리소스 입력 필드 */}
                <Controller
                  name={usage.name}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <Input
                        onChange={(event) => handleInputChange(event, field)}
                        value={isEdit ? getValues(usage.name) : field.value}
                        variants='underline'
                        width={62}
                        height={28}
                        isShowIcon={false}
                        error={!!fieldState.error}
                        customInputStyles={{
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      />
                    );
                  }}
                />
                <Unit>{usage.unit}</Unit>
              </DataWrapper>
            );
          })}
        </TrainingWrapper>

        <Divider />

        {/* 추론(Inference) 리소스 섹션 */}
        <InferenceWrapper>
          <TitleWrapper>
            <Title>Inference</Title>
            {/* 추론 사용/미사용 토글 스위치 */}
            <Controller
              name='is_inference'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CustomFormControlLabel
                  control={
                    <CustomSwitch
                      sx={{ m: 1 }}
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                    />
                  }
                  label={field.value ? '사용' : '미사용'}
                  labelPlacement='start'
                />
              )}
            />
          </TitleWrapper>
          {INFERENCE_RESOURCE_USAGES.map((usage) => {
            if (usage.children) {
              return (
                <InferenceGpuWrapper key={usage.label} $inferenceUsage={watch('is_inference')}>
                  <DotDivider />
                  <IconWrapper>
                    <UsageLabel>{usage.label}</UsageLabel>
                    <GpuTotal>총 {calculateGpuTotal(watch('inference_gpu'))} EA</GpuTotal>
                  </IconWrapper>
                  <GpuCalculator isEdit={isEdit} resourceGpuType='inference_gpu' />
                </InferenceGpuWrapper>
              );
            }

            return (
              <InferenceDataWrapper key={usage.label} $inferenceUsage={watch('is_inference')}>
                <UsageLabel>{usage.label}</UsageLabel>
                <Controller
                  name={usage.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      onChange={(event) => handleInputChange(event, field)}
                      value={isEdit ? getValues(usage.name) : field.value}
                      variants='underline'
                      width={62}
                      height={28}
                      isShowIcon={false}
                      disabled={!watch('is_inference')}
                      error={watch('is_inference') && !!fieldState.error}
                      customInputStyles={{
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    />
                  )}
                />
                <Unit>{usage.unit}</Unit>
              </InferenceDataWrapper>
            );
          })}
        </InferenceWrapper>
      </Wrapper>
      {/* 오류 메시지 표시 영역 */}
      <ErrorWrapper>
        {(training_cpu || training_disk || training_ram || inference_cpu || inference_disk || inference_ram) &&
          'CPU는 4 Core 이상, RAM은 8 GB 이상, DISK는 0보다 큰 값을 입력해야 합니다.'}
      </ErrorWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  gap: 16px;
  align-items: flex-start;
  align-self: stretch;
  border-radius: var(--Radius-Large);
  border: 1px solid var(--Gray-G10);
  background-color: var(--BG-KB-Yellow-L);
`;

const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: var(--Gray-G25);
`;

const TrainingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;

const TitleWrapper = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 700;
`;

const InferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;

const UsageLabel = styled.div`
  width: 80px;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 700;
`;

// 추론 사용 여부에 따라 투명도 조절
const InferenceDataWrapper = styled.div<{ $inferenceUsage?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 700;
  opacity: ${(props) => (props.$inferenceUsage ? '1' : '0.2')};
`;

const ErrorWrapper = styled.div`
  color: var(--System-Red-Text);
  font-size: 14px;
  font-weight: 500;
`;

const TooltipWrapper = styled.div`
  position: relative;
  top: 80px;
  left: 68px;
  padding: 6px 8px;
  border-radius: var(--Radius-Small);
  background: var(--Gray-G90);
  box-shadow: 0px 2px 6px 0px rgba(27, 27, 85, 0.2);
  color: var(--Gray-G0);
  font-size: 14px;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 190px;
`;

const DotDivider = styled.div`
  border-top: 1px dashed var(--Gray-G10);
  margin: 8px 0px;
`;

const TrainingGpuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InferenceGpuWrapper = styled.div<{ $inferenceUsage?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.$inferenceUsage ? '1' : '0.2')};

  &::after {
    content: '';
    display: ${(props) => (props.$inferenceUsage ? 'none' : 'block')};
    position: absolute;
    inset: 0;
    z-index: 1;
    background: transparent;
  }
`;

const GpuTotal = styled.div`
  color: var(--KB-Gold);
  font-size: 12px;
  font-weight: 700;
`;

const GpuName = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Unit = styled.div`
  color: var(--Gray-G75);
  font-size: 14px;
  font-weight: 700;
`;
