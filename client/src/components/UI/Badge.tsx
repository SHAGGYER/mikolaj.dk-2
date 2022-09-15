import React from "react";
import styled, { css } from "styled-components";

interface BadgeProps {
  color: string;
  textColor: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  absolute?: boolean;
}

export const Badge = styled.div<BadgeProps>`
  font-family: Bitrate, sans-serif !important;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background: ${(props) => props.color};
  color: ${(props) => props.textColor};
  border-radius: 12px;
  padding: ${(props) =>
    props.small
      ? "0.25rem 0.5rem 0.25rem"
      : props.medium
      ? "0.5rem 0.75rem 0.5rem"
      : props.large && "0.75rem 1rem 0.75rem"};
  font-size: ${(props) =>
    props.small ? "15px" : props.medium ? "17px" : props.large && "19px"};

  ${(props) =>
    props.absolute &&
    css`
      position: absolute;
    `}
`;
