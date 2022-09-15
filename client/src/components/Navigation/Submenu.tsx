import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Arrow } from "components/UI/Arrow";
import PublicContext from "contexts/PublicContext";

const SlideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.1);
  }

  to {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
`;

const SlideOut = keyframes`
  from {
    pointer-events: none;
    opacity: 1;
    visibility: visible;
  }

  to {
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.1);
  }
`;

interface SubmenuContainerProps {
  columns?: string;
}

export const SubmenuContainer = styled.div<SubmenuContainerProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns ?? "repeat(1, 1fr)"};
  gap: 1rem;
  padding: 0 !important;
  margin-top: 1rem;

  & > article {
    background: transparent;
    display: flex;
    flex-direction: column;

    & h3 {
      font-family: Bitrate, sans-serif !important;
      position: relative;
      padding-left: 1rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: white;
      font-size: 1.65rem;
      letter-spacing: 1px;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr !important;
    padding: 0 !important;
    background: transparent;
    margin-top: 0;
    gap: 2rem;

    & > article {
      padding: 0;

      & h3 {
        color: white;
      }
    }

    & > article .link {
      color: white !important;
      border-bottom: 2px solid white;
    }
  }
`;

export interface SubmenuElementProps {
  right?: number;
}

interface SubmenuStyleProps extends SubmenuElementProps {
  isOpen?: boolean;
  isSidebarOpen?: boolean;
  width?: string;
}

export const SubmenuElement = styled.article<SubmenuStyleProps>`
  position: absolute;
  width: ${(props) => props.width ?? "auto"};
  background: var(--primary);
  border-radius: 7px;
  padding: 1rem 1rem;
  cursor: initial;
  z-index: 10;
  right: ${(props) => (props.right ? props.right : "auto")};
  display: flex;
  flex-direction: column;
  min-height: 100px;

  & .header {
    margin: 0;
    text-align: center;
    position: relative;

    & h2 {
      font-family: Bitrate, sans-serif !important;
      letter-spacing: 2px;
      font-size: 2.2rem;
      text-transform: uppercase;
      color: white;
      font-weight: bold;
    }

    & .toggler {
      text-align: center;
      padding: 0.15rem 0.25rem;
      font-size: 23px;
      border: 2px solid white;
      color: white;
    }
  }

  & section {
    overflow-y: auto;
  }

  & .link {
    font-family: Bitrate, sans-serif !important;
    letter-spacing: 1px;
    cursor: pointer;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #e4e4e4;
      border-radius: 7px;
      color: black !important;
    }
  }

  @media (min-width: 600px) {
    ${(props) =>
      props.isOpen === undefined && !props.isSidebarOpen
        ? css`
            visibility: hidden;
            opacity: 0;
          `
        : props.isOpen === true && !props.isSidebarOpen
        ? css`
            animation: ${SlideIn} forwards 0.3s ease-in-out;
          `
        : props.isOpen === false && !props.isSidebarOpen
        ? css`
            animation: ${SlideOut} forwards 0.3s ease-in-out;
          `
        : ""}
  }

  @media (${(props) => props.theme.mobile}) {
    min-width: 100%;
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: ${(props) => (props.isSidebarOpen ? 0 : "1000px")};
    height: 100%;
    right: ${(props) => (props.isOpen ? 0 : "-300px")};
    left: auto !important;
    background: #383a42 !important;
    border-radius: 0 !important;

    ${(props) =>
      props.right !== undefined &&
      !props.isOpen &&
      css`
        right: -300px !important;
      `};

    & .link {
      &:hover {
        background-color: transparent;
      }
    }

    & .header {
      padding: 0.25rem;
    }

    & .header h2 {
      font-size: 1.7rem;
      padding: 0.5rem;
      display: block;
      color: white;
    }

    & section {
      grid-template-columns: 1fr;
    }
  }
`;

interface SubmenuProps {
  width?: string;
  color?: string;
  left?: number;
  right?: number | string;
  linkRef: any;
}

const Submenu: React.FC<SubmenuProps> = ({
  linkRef,
  width,
  color,
  left,
  right,
  children,
  ...props
}) => {
  const { isMobile } = useContext(PublicContext);
  const [currentLinkWidth, setCurrentLinkWidth] = useState(undefined);

  const currentLeft = left < 0 ? Math.abs(left) : left;

  useEffect(() => {
    if (linkRef.current) {
      const element = linkRef.current.getBoundingClientRect();
      setCurrentLinkWidth(element.width);
    }
  }, [linkRef.current]);

  return (
    <SubmenuElement
      width={width}
      style={{
        left: left && left,
        right: right && right,
        backgroundColor: color,
      }}
      {...props}
    >
      {!isMobile && (
        <Arrow
          color={color}
          position="bottom"
          style={{
            top: -5,
            left: currentLinkWidth
              ? currentLeft + currentLinkWidth / 2 - 10
              : 0,
          }}
        />
      )}
      {children}
    </SubmenuElement>
  );
};
export default Submenu;
