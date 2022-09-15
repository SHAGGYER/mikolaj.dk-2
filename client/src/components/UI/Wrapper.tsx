import styled, { css } from "styled-components";

interface WrapperProps {
  color?: string;
  inset?: string;
  white?: boolean;
  image?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  padding: 4rem 0;
  flex-grow: 1;
  ${(props) =>
    !props.image
      ? css`
          background-color: ${() =>
            props.white ? "white" : props.color ? props.color : "#F6F8F9"};
        `
      : css`
          background: url(${() => props.image}) no-repeat center center / cover;
        `}
  margin-left: ${(props) => (props.inset ? props.inset : 0)};
  position: relative;

  @media (max-width: 650px) {
    padding: 2rem 0;
  }
`;
