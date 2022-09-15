import styled from "styled-components";

interface CardProps {
  width?: string;
  color?: string;
  minHeight?: string;
  padding?: string;
}
export const Card = styled.div<CardProps>`
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  background-color: ${(props) => (props.color ? props.color : "white")};
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.width ? props.width : "auto")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "auto")};
  position: relative;
  z-index: 0;
`;

export default Card;
