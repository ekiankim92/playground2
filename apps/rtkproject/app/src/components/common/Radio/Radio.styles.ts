import styled, { CSSObject } from 'styled-components';

export const RadioGroupWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const RadioWrapper = styled.label<{ $customStyles?: CSSObject }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 96px;
  ${({ $customStyles }) => $customStyles}
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const RadioCircle = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? 'var(--yellow-main)' : 'var(--g25)')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const RadioDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--yellow-main);
`;

export const RadioLabel = styled.span`
  font-size: 14px;
  color: var(--g90);
`;
