import styled from "styled-components";

export const Title = styled.h1<any>`
  position: relative;
  font-family: "Bitrate", sans-serif;
  font-size: 5.5rem;
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: 9px;
  word-spacing: -15px;
  text-align: ${(props) => (!!props.left ? "left" : "center")};
  margin-bottom: 2rem;

  @media screen and (${(props) => props.theme.tabletLandscape}) {
    font-size: 4rem;
  }

  @media screen and (${(props) => props.theme.tabletPortrait}) {
    font-size: 3rem;
  }

  @media screen and (${(props) => props.theme.mobile}) {
    font-size: 2.5rem;
    line-height: 1.1;
  }
`;
