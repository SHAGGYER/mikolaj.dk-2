import React from "react";
import styled from "styled-components";

interface ArrowProps {
    color: string;
    left?: string;
    top?: string;
    position?: "right" | "bottom" | "left" | "top";
}

export const Arrow = styled.div<ArrowProps>`
  position: absolute;
  border: solid ${props => props.color};
  border-width: 0 10px 10px 0;
  display: inline-block;
  padding: 10px;
  transform: ${props => props.position === "right" ? "rotate(135deg)"
    : props.position === "bottom"
        ? "rotate(-135deg)"
        : props.position === "top" ? "rotate(45deg)" : "rotate(-45deg)"};
  left: ${props => props.left ?? 0};
  top: ${props => props.top ?? "auto"};
  width: 20px;
`