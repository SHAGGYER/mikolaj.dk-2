import React from "react";
import styled, {CSSProperties} from "styled-components";

interface WrapperProps {
    color?: string;
    center?: boolean;
    right?: boolean;
    size?: string;
    block?: boolean;
    fontWeight?: string;
    margin?: string;
    tabletSize?: string;
    mobileCenter?: boolean;
    mobileSize?: string;
}

const Wrapper = styled.span<WrapperProps>`
  font-family: inherit;
  letter-spacing: inherit;
  color: ${(props) => props.color || "black"};
  text-align: ${(props) => props.center ? "center" : props.right ? "right" : "left"};
  font-size: ${(props) => props.size || "inherit"};
  display: ${(props) => (props.block ? "block" : "inline")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "inherit")};
  margin: ${props => props.margin ?? "initial"};

  @media (max-width: 900px) {
    font-size: ${props => props.tabletSize ?? props.size ?? "inherit"};
  }

  @media (max-width: 600px) {
    text-align: ${props => props.mobileCenter || props.center ? "center" : "left"};
    font-size: ${props => props.mobileSize ?? props.size ?? "inherit"};
  }
`;

export const Text: React.FC<WrapperProps & { style?: CSSProperties }> = (
    props
) => {
    return (
        <Wrapper style={props.style} {...props}>
            {props.children}
        </Wrapper>
    );
};
