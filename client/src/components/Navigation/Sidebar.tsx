import React, { ReactElement, useContext } from "react";
import PublicContext from "contexts/PublicContext";
import styled from "styled-components";
import { Logo, NavigationDefaultProps } from "components/Navigation/Navigation";
import Menu from "components/Navigation/Menu";

const Backdrop = styled.div<NavigationDefaultProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: none;

  @media screen and (${(props) => props.theme.tabletPortrait}) {
    display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
  }
`;

const SidebarStyles = styled.section<NavigationDefaultProps>`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isSidebarOpen ? "0" : "-300px")};
  width: 300px;
  height: 100%;
  background-color: #2d3142;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  & .menu-container {
    padding: 1rem;
    position: relative;
    flex-grow: 1;
  }

  & .all-rights {
    text-align: center;
    color: white;
    padding: 1rem;
  }

  @media screen and (min-width: 900px) {
    left: -300px;
  }
`;

const SidebarHeader = styled.article<any>`
  background: #3a3f56;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
`;

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useContext(PublicContext);

  return (
    <React.Fragment>
      <Backdrop
        isSidebarOpen={isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <SidebarStyles isSidebarOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo src="/logo.svg" alt="logo" />
          <span>Mikolaj Marciniak</span>
        </SidebarHeader>

        <div className="menu-container">
          <Menu />
        </div>
        {/*       <div className="all-rights">All rights reserved. {new Date().getFullYear()}</div>*/}
      </SidebarStyles>
    </React.Fragment>
  );
}
