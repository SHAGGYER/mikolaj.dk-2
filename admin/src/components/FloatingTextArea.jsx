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
  textarea {
    transition: all 0.2s;
  }

  textarea {
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0.75rem 0.75rem;
    border-radius: 7px;
    z-index: 0;
    width: 100%;
  }

  textarea:focus {
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

  textarea:placeholder-shown + label {
    cursor: text;
  }

  textarea::placeholder {
    opacity: 0;
    transition: inherit;
  }

  textarea:not(:placeholder-shown) + label,
  textarea:focus + label {
    top: -0.7rem;
    color: #464dff;
    left: 0.3rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

function FloatingTextArea({ label, onChange, value, error, innerRef }) {
  const uuid = useId();

  return (
    <FloatingTextFieldStyled className="field">
      {!!error && <ErrorStyle>{error}</ErrorStyle>}
      <textarea
        ref={innerRef}
        rows={5}
        id={uuid}
        value={value}
        onChange={onChange}
        placeholder="Type here..."
      />
      <label htmlFor={uuid}>{label}</label>
    </FloatingTextFieldStyled>
  );
}

export default FloatingTextArea;
