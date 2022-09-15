import styled from "styled-components";

interface Props {
  color: string;
}
export const Banner = styled.section<Props>`
  width: 100%;
  background-color: ${(props) => props.color};
`;
