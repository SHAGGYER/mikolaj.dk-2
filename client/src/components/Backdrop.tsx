import React from "react";
import styled from "styled-components";

interface Interface {
    strength?: number
}

export const Backdrop = styled.div<Interface>`
  position: absolute;
  background-color: rgba(0, 0, 0, ${props => props.strength ?? "0.7"});
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
