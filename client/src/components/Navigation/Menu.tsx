import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import PublicContext from "contexts/PublicContext";
import AboutSubmenu from "components/Navigation/Submenus/AboutSubmenu";
import LearnToCodeSubmenu from "components/Navigation/Submenus/LearnToCodeSubmenu";
import GoodiesSubmenu from "components/Navigation/Submenus/GoodiesSubmenu";
import styled from "styled-components";
import { Link, NavBox } from "components/Navigation/Navigation";
import ConnectSubmenu from "./Submenus/ConnectSubmenu";
import ServicesSubmenu from "components/Navigation/Submenus/ServicesSubmenu";

const NavLinks = styled.nav<any>`
  list-style: none;
  display: flex;
  transition: all 0.3s ease-in-out;
  align-items: center;

  & article {
    @media (${(props) => props.theme.tabletPortrait}) {
      width: 100%;
      overflow-y: auto;
      text-align: left;
    }
  }

  @media screen and (min-width: 900px) {
    position: relative;
    top: 2px;
  }

  @media (${(props) => props.theme.tabletPortrait}) {
    flex-direction: column;
  }
`;

export default function Menu() {
  const { t } = useTranslation("navbar");
  const { redirect } = useContext(PublicContext);

  return (
    <NavLinks id="navlinks">
      <div id="mm-anchor"></div>
      <NavBox>
        <Link onClick={() => redirect("/")}>
          <i className="mdi mdi-home"></i>
          Home
        </Link>
      </NavBox>

      <AboutSubmenu />
      <ServicesSubmenu />
      <GoodiesSubmenu />

      <NavBox>
        <Link onClick={() => redirect("/contact")}>
          <i className="mdi mdi-at"></i>
          {t("contact")}
        </Link>
      </NavBox>

      <ConnectSubmenu />
    </NavLinks>
  );
}
