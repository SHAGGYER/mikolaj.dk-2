import React, {MouseEventHandler} from "react";
import styled from "styled-components";

const ListWrapper = styled.ul`
  list-style: none;
  color: black;
  padding-left: 0;
`;

interface ListItemWrapperProps {
  margin?: boolean;
  shadow?: boolean;
  border?: boolean;
  paddingBottom?: string;
  style?: React.CSSProperties,
  hand?: boolean
  onClick?: MouseEventHandler
}

const ListItemWrapper = styled.li<ListItemWrapperProps>`
  padding-bottom: ${props => props.paddingBottom ?? "1rem"};
  border: ${(props) => (props.border ? "1px solid #ccc" : "none")};
  border-bottom: none;
  background-color: white;
  margin-bottom: ${(props) => (props.margin ? "1rem" : 0)};
  color: black;
  box-shadow: ${(props) =>
          props.shadow ? "0 1px 3px 0 rgba(0, 0, 0, 0.2)" : "none"};

  cursor: ${props => props.hand ? "pointer" : "initial"};
  display: flex;
  gap: 1rem;
  align-items: center;

  &:last-child {
    border-bottom: ${(props) => (props.border ? "1px solid #ccc" : "none")};
    padding-bottom: 0;
  }
`;

export const List = ({children}: any) => {
  return <ListWrapper>{children}</ListWrapper>;
};

export const ListItem: React.FC<ListItemWrapperProps> = (props) => {
  return <ListItemWrapper {...props}>{props.children}</ListItemWrapper>;
};
