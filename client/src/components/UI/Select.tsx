import { useField } from "formik";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
`;

const SelectElm = styled.select<any>`
  border: 1px solid var(--secondary);
  padding: ${(props) => (props.slim ? 0 : "0.5rem 1rem")};
  width: 100%;
  font-size: ${(props) => (props.slim ? "9px" : "auto")};
  color: ${(props) => (props.dark ? "white" : "black")};
  background-color: ${(props) => (props.dark ? "#37394B" : "white")};
`;

const Error = styled.span`
  color: var(--red-primary);
  text-align: left;
  font-size: 12px;
`;
interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
}
const Select: React.FC<SelectProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Wrapper>
      {props.label && <Label>{props.label}</Label>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <SelectElm {...props} {...field}>
          {props.children}
        </SelectElm>
      </div>

      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};

export default Select;
