import React, { useId } from "react";
import styled from "styled-components";

const ErrorStyle = styled.span`
  color: #de1511;
  text-align: left;
`;

const FloatingTextFieldStyled = styled.div`
  &.field {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
  }

  label,
  input {
    transition: all 0.2s;
  }

  input {
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0.75rem 0.75rem;
    border-radius: 7px;
    z-index: 0;
    width: 100%;
  }

  input:focus {
    outline: 0;
    border: 1px solid #3d5471;
  }

  label {
    color: #3d5471;
    background: white;
    position: absolute;
    left: 0.5rem;
    top: 0.7rem;
  }

  input:placeholder-shown + label {
    cursor: text;
  }

  input::placeholder {
    opacity: 0;
    transition: inherit;
  }

  input:not(:placeholder-shown) + label,
  input:focus + label {
    top: -0.7rem;
    color: #464dff;
    left: 0.3rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

function FloatingTextField({ label, onChange, value, type, error, innerRef }) {
  const uuid = useId();

  return (
    <FloatingTextFieldStyled className="field">
      {!!error && <ErrorStyle>{error}</ErrorStyle>}
      <input
        ref={innerRef}
        id={uuid}
        type={type}
        value={value}
        onChange={onChange}
        placeholder="Type here..."
      />
      <label htmlFor={uuid}>{label}</label>
    </FloatingTextFieldStyled>
  );
}

export default FloatingTextField;
