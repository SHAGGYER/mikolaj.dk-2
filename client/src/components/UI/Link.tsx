import React from "react";
import styled from "styled-components";

interface Props {
  color?: string;
  hoverColor?: string;
}

export const Link = styled.a<Props>`
  color: ${(props) => (props.color ? props.color : "inherit")};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : "inherit")};
  }
`;
