import styled from "styled-components";

interface HeaderProps {
  color?: string;
  size: string;
}
export const Header = styled.h3<HeaderProps>`
  font-size: ${(props) => props.size};
  color: ${(props) => (props.color ? props.color : "black")};
  margin-bottom: 1rem;
`;
