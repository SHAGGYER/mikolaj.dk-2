import React from "react";
import styled from "styled-components";

export interface FlexboxProps {
    direction?: "column" | "row";
    alignItems?: string;
    justifyContent?: string;
    padding?: string;
    gap?: string;
    wrap?: string;
    width?: string;
    manualMobile?: boolean;
}

const Flexbox = styled.div<FlexboxProps>`
  display: flex;
  font-family: inherit;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  flex-wrap: ${(props) => (props.wrap ? props.wrap : "nowrap")};
  gap: ${(props) => (!!props.gap ? props.gap : 0)};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 956px) {
    width: 100%;
  }

  @media (${(props) => props.theme.mobile}) {
    flex-wrap: ${props => props.wrap ? props.wrap === "nowrap" ? "nowrap" : props.wrap : "wrap"};
    justify-content: ${(props) =>
            !props.manualMobile ? "center" : props.justifyContent};
  }
`;

export default Flexbox;
