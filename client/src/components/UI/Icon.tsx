import styled from "styled-components";

interface IconStyleProps {
  color?: string;
  size?: string;
}
export const Icon = styled.i<IconStyleProps>`
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.size ? props.size : "16px")};
`;
