import React, { useContext } from "react";
import Toolbar from "components/Navigation/Toolbar";
import Sidebar from "components/Navigation/Sidebar";
import styled, { css } from "styled-components";
import Navbar from "components/Navigation/Navbar";

export interface RenderProps {
  redirectTo: Function;
  isOpen: boolean;
  setOpen?: Function;
  isSidebarOpen?: boolean;
  isMobile?: boolean;
  right?: number;
  linkRef: any;
}

export interface NavigationDefaultProps {
  isSidebarOpen?: boolean;
  isMobile?: boolean;
}

interface LinkProps {
  isOpen?: boolean;
  isSidebarOpen?: boolean;
}

export const Link = styled.div<LinkProps>`
  font-family: Bitrate, sans-serif !important;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 2px;
  word-spacing: -3px;
  font-weight: normal;
  padding: 1rem 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  justify-content: center;

  &:hover {
    background-color: #e4e4e4;
    border-radius: 7px;
  }

  & i {
    color: var(--primary);
    font-size: 25px;
    line-height: 0.5;
  }

  @media (max-width: 1100px) {
    font-size: 14px;
    padding: 0.85rem 0.55rem;
  }

  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    letter-spacing: 2px;
  }

  @media (max-width: 600px) {
    color: white;

    &:hover {
      background-color: transparent;
      border-radius: 0;
    }

    & > i {
      color: white;
    }
  }
`;

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;

  @media (min-width: 900px) {
    position: absolute;
    left: 20px;
  }
`;

export const NavBox = styled.div<NavigationDefaultProps>`
  ${(props) =>
    !props.isMobile &&
    css`
      position: relative;
    `}

  margin-bottom: 1rem;
  border-bottom: 2px solid white;

  & > .badge-container {
    position: relative;

    & > .badge {
      position: absolute;
      top: -6px;
      right: 5px;
      background: var(--secondary);
      color: white;
      border-radius: 20px;
      padding: 0.25rem 0.5rem 0.15rem;
      line-height: 1;
      font-size: 12px;
    }
  }

  & .submenu-container {
    display: grid;
    gap: 1rem;
  }

  @media screen and (min-width: 900px) {
    border: none;
    margin-bottom: 0;
  }

  @media screen and (max-width: 900px) {
    width: 100%;

    &:hover {
      background-color: transparent;
    }
  }
`;

const NavigationWrapper = styled.nav`
  background-color: #f6f8f9;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (${(props) => props.theme.tabletPortrait}) {
    justify-content: space-between;
    padding: 0.25rem 1rem;
    min-height: 50px;
  }
`;

export default function Navigation() {
  return (
    <NavigationWrapper id="navbar">
      <Navbar />
      <Toolbar />
      <Sidebar />
    </NavigationWrapper>
  );
}
