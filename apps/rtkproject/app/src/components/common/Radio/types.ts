import { CSSObject } from 'styled-components';

export interface RadioGroupProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  options: Array<{
    value: any;
    label: string;
  }>;
  $customStyles?: CSSObject;
}
