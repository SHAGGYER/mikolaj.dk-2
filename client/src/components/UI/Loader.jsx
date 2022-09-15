import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function () {
  return (
    <Wrapper>
      <i className="fa-3x fas fa-spinner fa-spin"></i>
    </Wrapper>
  );
}
