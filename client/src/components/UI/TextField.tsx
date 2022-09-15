import { useField } from "formik";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label<any>`
  font-family: Bitrate, sans-serif !important;
  font-size: 1.15rem;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.dark ? "white" : "black")};
`;

export const TextInput = styled.input<any>`
  border: 1px solid var(--secondary);
  padding: 0.5rem 1rem;
  width: 100%;
  color: ${(props) => (props.dark ? "white" : "black")};
  background-color: ${(props) => (props.dark ? "var(--light-green)" : "white")};
`;

const Error = styled.span`
  color: var(--red-primary);
  text-align: left;
  font-size: 12px;
`;

interface TextFieldProps {
  name: string;
  placeholder?: string;
  label: string;
  error?: string;
  type?: string;
}

export default function TextField(props: TextFieldProps) {
  const [field, meta] = useField(props.name);
  return (
    <Wrapper>
      {props.label && <Label>{props.label}</Label>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextInput {...field} {...props} />
      </div>
      {((meta.touched && meta.error) || props.error) && (
        <Error>{meta.error ? meta.error : props.error}</Error>
      )}
    </Wrapper>
  );
}
