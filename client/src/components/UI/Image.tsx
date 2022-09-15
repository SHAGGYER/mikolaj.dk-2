import styled from "styled-components";

interface ImageProps {
  height?: string;
  width?: string;
  fit?: "cover" | "contain";
  tabletHidden?: boolean;
  mobileHidden?: boolean;
}
export const Image = styled.img<ImageProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  object-fit: ${(props) => props.fit || "cover"};

  @media (max-width: 900px) {
    display: ${props => props.tabletHidden ? "none" : "initial"};
  }

  @media (max-width: 600px) {
    display: ${props => props.mobileHidden || props.tabletHidden ? "none" : "initial"};
  }
`;
