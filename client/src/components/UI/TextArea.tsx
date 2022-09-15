import { useField } from "formik";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label<any>`
  font-family: Bitrate, sans-serif !important;
  font-size: 1.15rem;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.dark ? "white" : "black")};
`;

const Input = styled.textarea<any>`
  border: 1px solid var(--secondary);
  padding: 0.5rem 1rem;
  width: 100%;
  color: ${(props) => (props.dark ? "white" : "black")};
  background-color: ${(props) => (props.dark ? "var(--light-green)" : "white")};
  resize: none;
`;

const Error = styled.span`
  color: var(--red-primary);
  text-align: left;
  font-size: 12px;
`;

interface TextAreaProps {
  name: string;
  label: string;
  error?: string;
  rows?: number;
}

export default function TextArea(props: TextAreaProps) {
  const [field, meta] = useField(props.name);
  return (
    <Wrapper>
      {props.label && <Label>{props.label}</Label>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input {...props} {...field} />
      </div>
      {((meta.touched && meta.error) || props.error) && (
        <Error>{meta.error ? meta.error : props.error}</Error>
      )}
    </Wrapper>
  );
}
