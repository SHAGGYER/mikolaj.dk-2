import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "error"
      ? "var(--red-primary)"
      : props.variant === "success"
      ? "var(--green-primary)"
      : props.variant === "primary"
      ? "var(--blue-primary)"
      : "var(--blue-primary)"};
  color: white;
  padding: ${(props) => (props.$mini ? "0.25rem 0.75rem" : "0.5rem 1.5rem")};
  transition: all 0.5s ease-in-out;
  border-radius: 7px;

  &:hover {
    background-color: #2a4365;
  }
`;

export default Button;
