import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #1d5d90;
  color: white;
  padding: 0.5rem 1.5rem;
  transition: all 0.5s ease-in-out;
  border-radius: 10px;

  &:hover {
    background-color: #2a4365;
  }
`;

export default Button;
