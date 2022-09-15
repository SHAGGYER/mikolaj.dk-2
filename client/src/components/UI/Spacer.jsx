import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  display: block;
  margin-bottom: ${(props) => props.bottom + "rem" || 0};
  margin-right: ${(props) => props.right + "rem" || 0};
`;

export default function Spacer({ bottom, right }) {
  return <Wrapper bottom={bottom} right={right}></Wrapper>;
}
