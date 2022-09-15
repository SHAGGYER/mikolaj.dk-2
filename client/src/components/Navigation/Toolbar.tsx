import styled from "styled-components";
import React, { useContext } from "react";
import PublicContext from "contexts/PublicContext";
import { Logo } from "components/Navigation/Navigation";

const Bars = styled.i`
  cursor: pointer;
  font-size: 26px;
  display: none;

  @media screen and (${(props) => props.theme.tabletPortrait}) {
    display: inline-block;
  }
`;

const MobileTitle = styled.p`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (${(props) => props.theme.tabletPortrait}) {
    display: inline-block;
  }
`;

const ToolbarStyle = styled.section<any>`
  display: none;
  align-items: center;

  & i {
    font-size: 25px;
    cursor: pointer;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    transition: all 0.3s ease-in-out;
    opacity: ${(props) => (props.showLogo ? 1 : 0)};
  }
`;

export default function Toolbar() {
  const { isSidebarOpen, meta, setSidebarOpen } = useContext(PublicContext);
  return (
    <ToolbarStyle showLogo={!isSidebarOpen}>
      <MobileTitle>{meta ? meta.title : "mikolaj.dk"}</MobileTitle>
      <Bars
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="mdi mdi-menu"
      />
      <Logo src="/logo.svg" alt="logo" />
    </ToolbarStyle>
  );
}
