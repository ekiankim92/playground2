import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Input, InputVariants } from '../input';

// 리소스 객체 인터페이스
export interface Resources {
  [key: string]: string | number;
}

// 리소스 테이블 컴포넌트 props 인터페이스
interface ResourceTableProps {
  useInputs?: [Resources, Dispatch<SetStateAction<Resources>>]; // 리소스 상태와 설정 함수 (옵션)
  names: Array<string>; // 폼 필드 이름 배열
  isEdit?: boolean; // 수정 모드 여부
  isDisabled?: boolean; // 비활성화 여부 (요청 내역 조회 시)
  original: {
    // 원래 리소스 값
    originalCpu: number;
    originalRam: number;
    originalDisk: number;
    originalGpu: number;
  };
}

// 리소스 항목 정의
const RESOURCE_CONTENTS = [
  {
    label: 'CPU',
    unit: 'Core',
    variants: 'underline',
    style: { width: 120, background: '#fffaf5' },
    isShowIcon: false,
  },
  { label: 'RAM', unit: 'GB', variants: 'underline', style: { width: 120, background: '#fffaf5' }, isShowIcon: false },
  { label: 'DISK', unit: 'GB', variants: 'underline', style: { width: 120, background: '#fffaf5' }, isShowIcon: false },
  { label: 'GPU', unit: 'EA', variants: 'underline', style: { width: 120, background: '#fffaf5' }, isShowIcon: false },
];

// useForm 대신 setState 값을 사용해야 할 때의 컴포넌트
export default function ResourceTableForm({ names, isDisabled, original }: ResourceTableProps) {
  const { control, watch } = useFormContext();

  // 입력값 변경 핸들러 (리소스 타입에 따라 다른 유효성 검사 적용)
  const onChangeInputs =
    (resourceName?: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, currentValue: string) => {
      const { value } = event.target;

      let isValid = value === '';

      if (!isValid) {
        if (resourceName === 'RAM' || resourceName === 'DISK') {
          isValid = /^[+]?\d+$/.test(value); // 양의 정수만 허용
        } else if (resourceName === 'CPU' || resourceName === 'GPU') {
          isValid = /^[+]?\d*\.?\d{0,1}$/.test(value); // 소수점 한 자리까지 허용
        }
      }

      return isValid ? value : currentValue;
    };

  // 원래 리소스 값을 배열로 변환
  const arrOriginal = Object.values(original);

  // CPU 증감량 계산
  const calculateCpu = useMemo(() => {
    const originalCpu = Number(original.originalCpu);
    const inputCpu = Number(watch(names[0]));
    const difference = inputCpu - originalCpu;
    return difference < 0 ? Number(difference.toFixed(1)) : difference || 0;
  }, [watch(names[0]), original.originalCpu]);

  // RAM 증감량 계산
  const calculateRam = useMemo(() => {
    const originalRam = Number(original.originalRam);
    const inputRam = Number(watch(names[1]));
    const difference = inputRam - originalRam;
    return difference || 0;
  }, [watch(names[1])]);

  // DISK 증감량 계산
  const calculateDisk = useMemo(() => {
    const originalDisk = Number(original.originalDisk);
    const inputDisk = Number(watch(names[2]));
    const difference = inputDisk - originalDisk;
    return difference < 0 ? Number(difference.toFixed(1)) : difference || 0;
  }, [watch(names[2])]);

  // GPU 증감량 계산
  const calculateGpu = useMemo(() => {
    const originalGpu = Number(original.originalGpu);
    const inputGpu = Number(watch(names[3]));
    const difference = inputGpu - originalGpu;
    return difference < 0 ? Number(difference.toFixed(1)) : difference || 0;
  }, [watch(names[3])]);

  return (
    <ResourceContentWrapper>
      {/* 테이블 헤더 */}
      <ResourceHeaderWrapper>
        <div>현재</div>
        <div>변경</div>
        <div>증감</div>
      </ResourceHeaderWrapper>

      {/* 리소스 항목 렌더링 */}
      {RESOURCE_CONTENTS.map((resource, index) => {
        const resourceName = RESOURCE_CONTENTS[index]?.label; // CPU, RAM, DISK, GPU

        return (
          <ResourceDataRow key={resource.label}>
            {/* 리소스 라벨 */}
            <div>{resource.label}</div>

            {/* 현재 값 (비활성화된 입력 필드) */}
            <Controller
              name={names[index]}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variants={resource.variants as InputVariants}
                  isShowIcon={resource.isShowIcon}
                  width={resource.style.width}
                  value={arrOriginal[index]}
                  customInputStyles={{ background: resource.style.background }}
                  customStyles={{ background: resource.style.background }}
                  unit={resource.unit}
                  disabled
                />
              )}
            />

            {/* 화살표 표시 */}
            <div>{'->'}</div>

            {/* 변경 값 입력 필드 */}
            <Controller
              name={names[index]}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(event) => {
                    const validatedValue = onChangeInputs(resourceName)(event, field.value);
                    field.onChange(validatedValue);
                  }}
                  variants={resource.variants as InputVariants}
                  isShowIcon={resource.isShowIcon}
                  width={resource.style.width}
                  customInputStyles={{ background: resource.style.background }}
                  customStyles={{ background: resource.style.background }}
                  unit={resource.unit}
                  disabled={isDisabled && true}
                />
              )}
            />

            {/* 증감량 표시 */}
            <div>
              {index === 0 && `${calculateCpu} ${resource.unit}`}
              {index === 1 && `${calculateRam} ${resource.unit}`}
              {index === 2 && `${calculateDisk} ${resource.unit}`}
              {index === 3 && `${calculateGpu} ${resource.unit}`}
            </div>
          </ResourceDataRow>
        );
      })}
    </ResourceContentWrapper>
  );
}

// 스타일 컴포넌트 정의
const ResourceContentWrapper = styled.div`
  height: 260px;
  background-color: #fffaf5;
  margin-right: 14px;
`;

const ResourceHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: 140px 200px 100px;
  text-align: end;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
  padding: 12px 0px;
  font-weight: 700;
`;

const ResourceDataRow = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 8px;
`;
