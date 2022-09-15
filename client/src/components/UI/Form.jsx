import React from "react";
import {
  TextAreaStyle,
  LabelStyle,
  ErrorStyle,
  TextFieldStyle,
  FormStyle,
  SwitchInputStyle,
  SwitchSliderStyle,
  SwitchWrapperStyle,
  SelectStyle,
} from "./FormStyles";

// Select

const Select = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  children,
  slim,
  dark,
}) => {
  return (
    <div>
      {label && <LabelStyle>{label}</LabelStyle>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <SelectStyle
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          slim={slim}
          dark={dark}
        >
          {children}
        </SelectStyle>
      </div>

      {error && <ErrorStyle>{error}</ErrorStyle>}
    </div>
  );
};

// Switch

const Switch = ({ checked, onChange }) => {
  return (
    <SwitchWrapperStyle>
      <SwitchInputStyle type="checkbox" checked={checked} onChange={onChange} />
      <SwitchSliderStyle />
    </SwitchWrapperStyle>
  );
};

// Text Area

const TextArea = ({
  label,
  value,
  onChange,
  onClick,
  error,
  placeholder,
  dark,
}) => {
  return (
    <div>
      {label && <LabelStyle dark={dark}>{label}</LabelStyle>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextAreaStyle
          value={value}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          rows={5}
          dark={dark}
        />
      </div>
      {error && <ErrorStyle>{error}</ErrorStyle>}
    </div>
  );
};

const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  onClick,
  error,
  type,
  placeholder,
  dark,
  disabled,
}) => {
  return (
    <div>
      {label && <LabelStyle dark={dark}>{label}</LabelStyle>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextFieldStyle
          value={value}
          onChange={!disabled ? onChange : () => {}}
          onClick={onClick}
          placeholder={placeholder}
          type={type}
          dark={dark}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>
      {error && <ErrorStyle>{error}</ErrorStyle>}
    </div>
  );
};

// Form

export const Form = ({ children, onSubmit, margin, padding, width }) => {
  return (
    <FormStyle
      width={width}
      onSubmit={onSubmit}
      margin={margin}
      padding={padding}
    >
      {children}
    </FormStyle>
  );
};

Form.TextArea = TextArea;
Form.TextField = TextField;
Form.Switch = Switch;
Form.Select = Select;
