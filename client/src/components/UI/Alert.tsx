import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<any>`
  width: 100%;
  background-color: ${(props) =>
    props.success
      ? props.theme.green
      : props.primary
      ? "var(--blue-primary)"
      : props.error
      ? "var(--red-primary)"
      : "black"};

  padding: 0.5rem 1rem;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 10px;
  color: white;
`;

export default function ({ success, primary, error, children }: any) {
  return (
    <Wrapper success={success} primary={primary} error={error} role="alert">
      {children}
    </Wrapper>
  );
}
