import React, { useRef, useState } from "react";
import styled from "styled-components";
import { HelpQuestion } from "./Common";
import Button from "./Button";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.dark ? "white" : "black")};
`;

export const RangeInput = styled.input`
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

export default function Range({
  label,
  value,
  onChange,
  error,
  dark,
  disabled,
  min,
  max,
}) {
  return (
    <Wrapper>
      {label && <Label dark={dark}>{label}</Label>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <RangeInput
          type="range"
          value={value}
          onChange={!disabled ? onChange : () => {}}
          dark={dark}
          disabled={disabled}
          min={min}
          max={max}
        />
      </div>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}
