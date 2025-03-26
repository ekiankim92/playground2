import { ForwardedRef, forwardRef } from 'react';
import { RadioCircle, RadioDot, RadioGroupWrapper, RadioInput, RadioLabel, RadioWrapper } from './Radio.styles';
import { RadioGroupProps } from './types';

const RadioGroup = forwardRef(
  (
    { name, value, onChange, options, $customStyles, ...rest }: RadioGroupProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (optionValue: boolean) => {
      if (onChange) {
        onChange(optionValue);
      }
    };

    return (
      <RadioGroupWrapper>
        {options.map((option) => (
          <RadioWrapper key={option.value} $customStyles={$customStyles}>
            <RadioInput
              {...rest}
              ref={ref}
              type='radio'
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
            />
            <RadioCircle checked={value === option.value}>{value === option.value && <RadioDot />}</RadioCircle>
            <RadioLabel>{option.label}</RadioLabel>
          </RadioWrapper>
        ))}
      </RadioGroupWrapper>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;

//  <Controller
//    name="is_bucket_lock"
//    control={control}
//    render={({ field }) => (
//      <RadioGroup
//        name="bucket_lock"
//        value={field.value}
//        onChange={(value) => {
//          field.onChange(value);
//        }}
//        options={[
//          { value: true, label: '사용 가능' },
//          { value: false, label: '제한됨' },
//        ]}
//      />
//    )}
//  />
