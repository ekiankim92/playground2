}
};

const inputRef = useRef<HTMLInputElement>(null);
const labelRef = useRef<HTMLLabelElement>(null);

return (
  <DatePickerInputWrapper
    $disabled={disabled}
    $width={width}
    $layout={label?.layout}
    onMouseOver={() => {
      if (label && parentLabel && labelRef.current) {
        parentLabel.setLabelWidth(labelRef.current?.offsetWidth + 16 || 0);
      }
    }}
  >
    {label && (
      <StyledLabel $disabled={disabled} $layout={label.layout} $height={height}>
        <label htmlFor={id} onClick={handleLabelClick} ref={labelRef}>
          {label.text}
        </label>
      </StyledLabel>
    )}
    <InputWithIconWrapper selected={selected}>
      <StyledInput
        ref={inputRef}
        id={id}
        type="text"
        $width={width}
        $height={height}
        onClick={(e) => {
          !disabled && onClick && onClick(e);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e);
        }}
        disabled={disabled}
        $range={range}
        selected={selected}
        value={value}
        {...props}
      />
      {icon && (
        <StyledIcon
          tabIndex={0}
          $disabled={disabled}
          $height={height}
          onClick={(e) => !disabled && onClick && (onClick as MouseEventHandler<HTMLDivElement>)(e)}
          onBlur={(e) => {
            onBlur && (onBlur as FocusEventHandler<HTMLDivElement>)(e);
          }}
        >
          {value && <ClearSvg onClear={onClear} />}
          <CalendarSvg />
        </StyledIcon>
      )}
    </InputWithIconWrapper>
  </DatePickerInputWrapper>
);
};

export { DatePickerInput };

const CalendarSvg = () => {
return (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.24951 7.99995C4.24951 6.48117 5.48073 5.24995 6.99951 5.24995H16.9995C18.5183 5.24995 19.7495 6.48117 19.7495 7.99995V17C19.7495 18.5187 18.5183 19.75 16.9995 19.75H6.99951C5.48073 19.75 4.24951 18.5187 4.24951 17V7.99995ZM6.99951 6.74995C6.30916 6.74995 5.74951 7.3096 5.74951 7.99995V17C5.74951 17.6903 6.30916 18.25 6.99951 18.25H16.9995C17.6899 18.25 18.2495 17.6903 18.2495 17V7.99995C18.2495 7.3096 17.6899 6.74995 16.9995 6.74995H6.99951Z"
      fill="#7B7B7B"
    />
    <path
      d="M12.4995 14.5C12.4995 13.9477 12.9472 13.5 13.4995 13.5H15.4995C16.0518 13.5 16.4995 13.9477 16.4995 14.5V15.5C16.4995 16.0522 16.0518 16.5 15.4995 16.5H13.4995C12.9472 16.5 12.4995 16.0522 12.4995 15.5V14.5Z"
      fill="#7B7B7B"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.99951 9.24995H18.9995V10.75H4.99951V9.24995Z" fill="#7B7B7B" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.99951 3.74995C9.41373 3.74995 9.74951 4.08574 9.74951 4.49995L9.74951 7.49995C9.74951 7.91417 9.41373 8.24995 8.99951 8.24995C8.5853 8.24995 8.24951 7.91417 8.24951 7.49995L8.24951 4.49995C8.24951 4.08574 8.5853 3.74995 8.99951 3.74995Z"
      fill="#7B7B7B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9995 3.74995C15.4137 3.74995 15.7495 4.08574 15.7495 4.49995L15.7495 7.49995C15.7495 7.91417 15.4137 8.24995 14.9995 8.24995C14.5853 8.24995 14.2495 7.91417 14.2495 7.49995L14.2495 4.49995C14.2495 4.08574 14.5853 3.74995 14.9995 3.74995Z"
      fill="#7B7B7B"
    />
  </svg>
);
};

const ClearSvg = ({ onClear }: { onClear?: () => void }) => {
return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    onClick={(e) => {
      e.stopPropagation();
      onClear?.();
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6088 5.39136C14.8529 5.63543 14.8529 6.03116 14.6088 6.27524L6.27544 14.6086C6.03136 14.8527 5.63563 14.8527 5.39155 14.6086C5.14748 14.3645 5.14748 13.9688 5.39155 13.7247L13.7249 5.39136C13.969 5.14728 14.3647 5.14728 14.6088 5.39136Z"
      fill="#B4B4B4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6089 14.6086C14.3649 14.8527 13.9691 14.8527 13.725 14.6086L5.39171 6.27524C5.14763 6.03116 5.14763 5.63543 5.39171 5.39136C5.63579 5.14728 6.03152 5.14728 6.27559 5.39136L14.6089 13.7247C14.853 13.9688 14.853 14.3645 14.6089 14.6086Z"
      fill="#B4B4B4"
    />
  </svg>
);
};
