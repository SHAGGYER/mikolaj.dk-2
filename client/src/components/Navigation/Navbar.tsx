import React from "react";
import styled from "styled-components";
import Menu from "components/Navigation/Menu";
import { Logo } from "components/Navigation/Navigation";
import LogoImg from "../../public/logo.svg"

const NavbarElement = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--secondary);
  border-bottom: 1px solid var(--secondary);
  padding: 8px 0;
  position: relative;

  @media (${(props) => props.theme.tabletPortrait}) {
    display: none;
  }
`;

export default function Navbar() {
  return (
    <NavbarElement className="navbar">
      <Logo
        src={LogoImg}
        alt="logo"
      />
      {/*      <Text color="var(--primary)">Mikolaj Marciniak</Text>*/}
      <Menu />
    </NavbarElement>
  );
}
