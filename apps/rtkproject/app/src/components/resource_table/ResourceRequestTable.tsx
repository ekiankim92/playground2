import { GpuVendor } from '@/api/projects/types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import CircleInfoIcon from '../icon/CircleInfoIcon';
import { RightGreyArrowIcon } from '../icon/RightGreyArrowIcon';
import { Input, InputVariants } from '../input';
import { Tooltip } from '../tooltip';
import GpuCalculator from './GpuCalculator';

// 리소스 키 타입 정의
type ResourceKey = 'cpu' | 'memory' | 'disk';

// 리소스 객체 인터페이스
export interface Resources {
  [key: string]: string | number;
}

// 리소스 테이블 컴포넌트 props 인터페이스
interface ResourceTableProps {
  useInputs?: [Resources, Dispatch<SetStateAction<Resources>>]; // 리소스 상태와 설정 함수
  total?: {
    cpu: number; //* 현재 cpu 리소스 값
    memory: number; //* 현재 ram 리소스 값
    disk: number; //* 현재 disk 리소스 값
  };
  gpuTotal?: GpuVendor; //* 현재 GPU 값
  isEdit?: boolean; //* 수정 모드 여부
  isDisabled?: boolean; //* 비활성화 여부 (요청 내역 조회 시)
  gpuRemaining?: GpuVendor; //* 과제 잔여 GPU 값
}

// 리소스 항목 정의
const RESOURCE_CONTENTS = [
  {
    label: 'CPU',
    unit: 'Core',
    name: 'request_cpu',
    style: { width: 62, height: 28, variants: 'underline' },
    isShowIcon: false,
  },
  {
    label: 'RAM',
    unit: 'GB',
    name: 'request_memory',
    style: { width: 62, height: 28, variants: 'underline' },
    isShowIcon: false,
  },
  {
    label: 'DISK',
    unit: 'GB',
    name: 'request_disk',
    style: { width: 62, height: 28, variants: 'underline' },
    isShowIcon: false,
  },
  {
    label: 'GPU',
    unit: 'EA',
    name: 'request_gpu',
    style: { width: 62, height: 28, variants: 'underline' },
    isShowIcon: false,
    children: ['mig-1g', 'mig-2g', 'mig-3g', 'mig-7g'],
  },
];

export default function ResourceRequestTable({ total, gpuTotal, gpuRemaining }: ResourceTableProps) {
  // react-hook-form의 필요한 함수들 가져오기
  const { control, reset } = useFormContext();

  // 입력값 변경 핸들러
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
    resourceName: string,
  ) => {
    let { value } = event.target;

    // 유효성 검사 정규식 패턴
    const isNonNegativeInteger = /^\d{0,4}$/; // 음수가 아닌 정수 (0-9999)
    const isNumberWithOneDecimal = /^-?\d{0,4}(\.\d?)?$/; // 소수점 한 자리까지 허용 (-9999.9 ~ 9999.9)

    // 리소스별 유효성 검사 규칙
    const validationRules: Record<string, RegExp> = {
      request_gpu: isNonNegativeInteger, // GPU는 정수만 허용
      request_disk: isNumberWithOneDecimal, // DISK는 소수점 허용
      default: isNumberWithOneDecimal, // 기본은 소수점 허용
    };

    // 첫 요청 시 음수 입력 방지
    if (value.startsWith('-')) return;

    // 앞에 오는 0 제거 (예: 01 -> 1)
    value = value.replace(/^0+(\d)/, '$1');

    // 해당 리소스에 맞는 검증 규칙 선택
    const validator = validationRules[resourceName] || validationRules.default;

    //* 요청량이 빈값일때, 지울수 있게
    if (!value) return field.onChange(value);

    // 유효한 값인 경우에만 필드 값 업데이트
    if (validator.test(value)) {
      // DISK의 경우 음수면 0으로 변환
      field.onChange(resourceName === 'request_disk' && Number(value) < 0 ? '0' : value);
    }
  };

  //* 백엔드에서 주는 데이터로 reset. (데이터는 무조건 백엔드에서 줌)
  useEffect(() => {
    if (total && gpuTotal) {
      reset({
        request_cpu: String(total?.cpu),
        request_memory: String(total?.memory),
        request_disk: String(total?.disk),
        request_gpu: {
          'mig-1g': gpuTotal?.['mig-1g'],
          'mig-2g': gpuTotal?.['mig-2g'],
          'mig-3g': gpuTotal?.['mig-3g'],
          'mig-7g': gpuTotal?.['mig-7g'],
        },
        description: '',
      });
    }
  }, [total, gpuTotal]);

  return (
    <ResourceContentWrapper>
      {/* 테이블 헤더 */}
      <ResourceHeaderWrapper>
        <TitleLabel />
        <Current>현재</Current>
        <Request>요청량</Request>
      </ResourceHeaderWrapper>

      {/* 리소스 항목 렌더링 */}
      {RESOURCE_CONTENTS.map((resource) => {
        // 리소스 키 추출 (request_cpu -> cpu)
        const key = resource.name.split('_')[1] as ResourceKey;

        if (resource.children) {
          return (
            <TrainingGpuWrapper key={resource.label}>
              <DotDivider />
              <TitleLabel>
                {/* // GPU에 대한 추가 정보 툴팁 */}
                <Tooltip
                  tooltipContent={
                    <TooltipWrapper>
                      GPU 1EA는 NVIDIA MIG(Multi-Instance GPU)를 사용하여 <br />
                      단일 물리 GPU의 1/7에 해당하는 크기를 제공합니다.
                    </TooltipWrapper>
                  }
                >
                  <IconWrapper>
                    GPU <CircleInfoIcon />
                  </IconWrapper>
                </Tooltip>
              </TitleLabel>
              <GpuCalculator
                isEdit={false} //* 수정 여부 값
                resourceGpuType='request_gpu'
                gpuTotal={gpuTotal} //* 현재 GPU 리소스 값
                gpuRemaining={gpuRemaining} //* 과제 잔여 리소스
              />
            </TrainingGpuWrapper>
          );
        }

        return (
          <ResourceDataRow key={resource.label}>
            {/* 리소스 라벨 */}
            <TitleLabel>{resource.label}</TitleLabel>

            {/* 현재 리소스 값 */}
            <CurrentValueWrapper>
              <CurrentValue>
                <div>{total?.[key] || 0}</div>
                <span>{resource.unit}</span>
              </CurrentValue>
              <RightGreyArrowIcon />
            </CurrentValueWrapper>

            {/* 요청량 입력 필드 */}
            <RequestAmtWrapper>
              <Controller
                name={resource.name}
                control={control}
                render={({ field, fieldState }) => {
                  const resourceName = resource.name;
                  return (
                    <Input
                      type='number'
                      onWheel={(event) => {
                        // 숫자 입력 필드에서 마우스 휠 이벤트 방지
                        (event.target as HTMLInputElement).blur();
                      }}
                      onChange={(event) => handleInputChange(event, field, resourceName)}
                      width={resource.style.width}
                      height={resource.style.height}
                      isShowIcon={false}
                      variants={resource.style.variants as InputVariants}
                      value={field.value}
                      error={!!fieldState.error?.message}
                    />
                  );
                }}
              />
              {resource.unit}
            </RequestAmtWrapper>
          </ResourceDataRow>
        );
      })}
    </ResourceContentWrapper>
  );
}

const ResourceContentWrapper = styled.div`
  background-color: var(--BG-KB-Yellow-L);
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: var(--Radius-Large);
  border: 1px solid var(--Gray-G10);
  width: 100%;
`;

const TitleLabel = styled.div`
  width: 120px;
`;

const Request = styled.div`
  width: 100px;
`;

const Current = styled.div`
  width: 56px;
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
  align-items: center;
  gap: 6px;
  color: var(--Gray-G90);
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

const TooltipWrapper = styled.div`
  position: relative;
  top: 80px;
  left: 140px;
  padding: 6px 8px;
  border-radius: var(--Radius-Small);
  background: var(--Gray-G90);
  box-shadow: 0px 2px 6px 0px rgba(27, 27, 85, 0.2);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const TrainingGpuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DotDivider = styled.div`
  border-top: 1px dashed var(--Gray-G10);
  margin: 8px 0px;
`;
