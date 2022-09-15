import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<any>`
  flex-grow: 1;
  height: 0;
  overflow-y: auto;
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  position: relative;
  background-color: ${(props) => (props.color ? props.color : "white")};
`;

interface Props {
  padding?: string;
  color?: string
}

export const Page: React.FC<Props> = ({children, padding, color}) => {
  return (
    <Wrapper padding={padding} color={color}>
      {children}
    </Wrapper>
  );
};
