import { Button, Input } from '@/components/common';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';
import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import {
  SimpleTable,
  SimpleTableData,
  SimpleTableHead,
  SimpleTableRow,
  SimpleTbody,
} from '../Table/SimpleTable/SimpleTable';

export type InputType = 'text' | 'password';

export interface Field {
  key: string;
  label: string;
  type?: InputType;
  placeholder?: string;
}

interface ConfigTableProps<T extends Record<string, string>, F> {
  fields: Field[];
  section: keyof F;
  values: Partial<T>;
  onChange: (key: string, value: string) => void;
  useIsEdit?: [boolean, Dispatch<SetStateAction<boolean>>];
}

const INPUT_STYLES = {
  width: '100%',
  height: '40px',
  customStyles: {
    color: 'black',
    height: '40px',
  },
  customInputStyles: {
    color: 'black',
    height: '28px',
    fontSize: '14px',
    marginLeft: '3px',
    paddingLeft: '5px',
    background: 'none',
  },
} as const;

const MAX_LENGTHS: Record<string, number> = {
  ldap_url: 100,
  bind_dn: 100,
  bind_pwd: 100,
};

const ConfigTableRow = memo(
  ({
    field: { key, label, type = 'text', placeholder = '' },
    value,
    onChange,
    isEdit,
  }: {
    field: Field;
    value: string;
    onChange: (key: string, value: string) => void;
    isEdit?: boolean;
  }) => {
    const { control } = useFormContext();

    return (
      <SimpleTableRow key={key}>
        <SimpleTableHead>{label}</SimpleTableHead>
        <SimpleTableData>
          <Controller
            name={key}
            control={control}
            render={({ field, fieldState }) => {
              const maxLengths = MAX_LENGTHS[key] || 100;

              return (
                <>
                  <Input
                    {...field}
                    type={type}
                    value={value || ''}
                    {...INPUT_STYLES}
                    onChange={(event) => {
                      if (event.target.value.length > maxLengths) return;

                      field.onChange(event);
                      onChange(key, event.target.value);
                    }}
                    error={!!fieldState.error}
                    placeholder={placeholder}
                    disabled={!isEdit ? true : false}
                  />
                </>
              );
            }}
          />
        </SimpleTableData>
      </SimpleTableRow>
    );
  },
);

ConfigTableRow.displayName = 'ConfigTableRow';

const ConfigTable = <T extends Record<string, string>, F>({
  fields,
  values,
  onChange,
  useIsEdit,
}: ConfigTableProps<T, F>) => {
  const [isEdit, setIsEdit] = useIsEdit || [];

  // prettier-ignore
  const { formState: { isDirty } } = useFormContext();

  const { confirm } = useNavigationGuard({
    shouldBlock: isDirty,
  });

  const onClickCancel = useCallback(() => {
    confirm({
      onConfirm: () => {
        if (setIsEdit) {
          setIsEdit(false);
        }
      },
    });
  }, [isEdit, confirm]);

  return (
    <>
      <SimpleTable style={{ height: 'fit-content' }}>
        <SimpleTbody>
          {fields.map((field) => (
            <ConfigTableRow
              key={field.key}
              field={field}
              value={values[field.key] || ''}
              onChange={onChange}
              isEdit={isEdit}
            />
          ))}
        </SimpleTbody>
      </SimpleTable>
      {isEdit && (
        <Wrapper>
          <DescriptionWrapper>
            <Description>현재 비밀번호는 보안을 위해 저장 후 표시되지 않습니다.</Description>
          </DescriptionWrapper>
          <ButtonWrapper>
            <Button variants='white' size='medium' width={120} height={40} onClick={onClickCancel}>
              취소
            </Button>
            <Button width={616} height={40} type='submit'>
              인증 정보 저장
            </Button>
          </ButtonWrapper>
        </Wrapper>
      )}
    </>
  );
};

const MemoizedConfigTable = memo(ConfigTable) as <T extends Record<string, string>, F>(
  props: ConfigTableProps<T, F>,
) => JSX.Element;

export default MemoizedConfigTable;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Description = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
