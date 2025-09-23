import { GpuVendor } from '@/api/projects/types';
import { calculateGpuTotal } from '@/util/calculateGpu';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '../button';
import { MinusIcon } from '../icon/MinusIcon';
import { PlusIcon } from '../icon/PlusIcon';
import { RightGreyArrowIcon } from '../icon/RightGreyArrowIcon';

const KUBE_GPU = [
  { gpu: 1, name: 'mig-1g' },
  { gpu: 2, name: 'mig-2g' },
  { gpu: 3, name: 'mig-3g' },
  { gpu: 7, name: 'mig-7g' },
];

interface GpuCalculatorProps {
  isEdit: boolean;
  resourceGpuType: string;
  gpuTotal?: GpuVendor;
  gpuRemaining?: GpuVendor;
}

//* 추후 GPU Vendor 개발 예정
export default function GpuCalculator({
  isEdit, //* 수정 여부 값
  resourceGpuType,
  gpuTotal, //* 현재 GPU 리소스 값
  gpuRemaining, //* 과제 잔여 리소스
}: GpuCalculatorProps) {
  const { control, getValues } = useFormContext();

  const requestGpu = useWatch({
    control,
    name: resourceGpuType,
    defaultValue: getValues(resourceGpuType) || {},
  });

  //* 과제 리소스 요청일때 화면 (분석과제 리소스 요청, 대시보드 리소스 요청)
  if (resourceGpuType === 'request_gpu') {
    return (
      <Wrapper>
        {KUBE_GPU.map((nvidia) => (
          <Controller
            name={`${resourceGpuType}.${nvidia.name}`}
            key={nvidia.name}
            control={control}
            render={({ field }) => {
              const currentValue = getValues(`${resourceGpuType}.${nvidia.name}`);

              const gpuNames = nvidia.name as keyof GpuVendor;
              const total = Number(gpuTotal?.[gpuNames] ?? 0);
              const remaining = Number(gpuRemaining?.[gpuNames] ?? 0);
              const localRemaining = remaining - (currentValue - total); //* 남음 - (현재 GPU 값 - 요청량)

              const isMinusDisabled = currentValue === 0;
              const isPlusDisabled = currentValue >= total + remaining;

              return (
                <ResourceGpuItem>
                  <CountWrapper>
                    <Gpu>{nvidia.gpu} EA</Gpu>
                    <RemainingGpu>{localRemaining} 남음</RemainingGpu>
                  </CountWrapper>

                  <CurrentValueWrapper>
                    <CurrentValue>{gpuTotal?.[gpuNames]}</CurrentValue>
                    <RightGreyArrowIcon />
                  </CurrentValueWrapper>

                  <ButtonWrapper>
                    <StyledButton
                      icon={
                        <MinusIcon
                          width={16}
                          height={16}
                          color={isMinusDisabled ? 'var(--Gray-G25)' : 'var(--KB-Gold)'}
                        />
                      }
                      variants='none'
                      onClick={() => field.onChange(Number(currentValue) - 1)}
                      disabled={isMinusDisabled}
                    />
                    <Count>{Number(currentValue)}</Count>
                    <StyledButton
                      icon={
                        <PlusIcon
                          width={16}
                          height={16}
                          color={isPlusDisabled ? 'var(--Gray-G25)' : 'var(--KB-Gold)'}
                        />
                      }
                      variants='none'
                      onClick={() => field.onChange(Number(currentValue) + 1)}
                      disabled={isPlusDisabled}
                    />
                  </ButtonWrapper>
                </ResourceGpuItem>
              );
            }}
          />
        ))}
        <Line />
        <SumWrapper>
          <Total>합계</Total>

          <CurrentValueWrapper>
            <CurrentValue>{calculateGpuTotal(gpuTotal)} EA</CurrentValue>
            <RightGreyArrowIcon />
          </CurrentValueWrapper>

          <GpuTotal>{calculateGpuTotal(requestGpu)} EA</GpuTotal>
        </SumWrapper>
      </Wrapper>
    );
  }

  //* 리소스 요청을 제외한 GPU 요청 화면
  return (
    <Wrapper>
      {KUBE_GPU.map((nvidia) => (
        <Controller
          name={`${resourceGpuType}.${nvidia.name}`}
          key={nvidia.name}
          control={control}
          render={({ field }) => {
            const currentValue = isEdit ? getValues(`${resourceGpuType}.${nvidia.name}`) : Number(field.value);

            return (
              <GpuItem>
                <CountWrapper>
                  <Gpu>{nvidia.gpu} EA</Gpu>
                </CountWrapper>
                <ButtonWrapper>
                  <StyledButton
                    icon={
                      <MinusIcon
                        width={16}
                        height={16}
                        color={Number(currentValue) === 0 ? 'var(--Gray-G25)' : 'var(--KB-Gold)'}
                      />
                    }
                    variants='none'
                    onClick={() => field.onChange(Number(currentValue) - 1)}
                    disabled={Number(currentValue) === 0}
                  />
                  <Count>{Number(currentValue)}</Count>
                  <StyledButton
                    icon={<PlusIcon width={16} height={16} color='var(--KB-Gold)' />}
                    variants='none'
                    onClick={() => field.onChange(Number(currentValue) + 1)}
                  />
                </ButtonWrapper>
              </GpuItem>
            );
          }}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 8px 0px 8px;
`;

const GpuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 80px;
`;

const Gpu = styled.div`
  color: var(--KB-Gray);
  font-size: 14px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  width: 76px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  background-color: var(--BG-Normal);
  border-radius: var(--Radius-Medium);
`;

const StyledButton = styled(Button)`
  width: 24px;
  height: 24px;
  background: var(--BG-KB-Gray);
  border: none;
  border-radius: var(--Radius-Small);

  &:disabled {
    background: var(--BG-Normal);
  }
`;

const Count = styled.div`
  color: var(--Gray-G90);
  font-size: 16px;
  font-weight: 500;
  user-select: none;
`;

const ResourceGpuItem = styled.div`
  height: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
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

const GpuTotal = styled.div`
  color: var(--Gray-G55);
  font-size: 14px;
  font-weight: 500;
  padding-left: 32px;
`;
