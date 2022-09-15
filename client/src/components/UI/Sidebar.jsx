import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "contexts/AppContext";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 98;
  height: calc(100% - 56px);
  width: 300px;
  left: 0;
  top: 56px;
  padding: 1rem 2rem;
  background-color: #37394b;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-300px)"};
  transition: all 0.3s ease-in-out;
`;

const CloseButton = styled.i`
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Links = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-top: 3rem;
`;

const Link = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & i {
    color: white;
    margin-right: 1rem;
  }

  & span {
    color: white;
  }
`;

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const { redirect, logout } = useContext(AppContext);

  return (
    <Wrapper isOpen={isSidebarOpen}>
      <CloseButton
        className="fas fa-times"
        onClick={() => setSidebarOpen(false)}
      />

      <Links>
        <Link>
          <i className="fas fa-newspaper" />
          <span>Nyheder</span>
        </Link>

        <Link onClick={() => redirect("/posts/active")}>
          <i className="fas fa-list" />
          <span>Aktive / Inaktive</span>
        </Link>

        <Link>
          <i className="fas fa-calendar-alt" />
          <span>Planlægning</span>
        </Link>

        <Link>
          <i className="far fa-sticky-note" />
          <span>Noter</span>
        </Link>

        <Link>
          <i className="fas fa-th-large" />
          <span>Services</span>
        </Link>

        <Link onClick={() => redirect("/teams")}>
          <i className="fas fa-users" />
          <span>Teams</span>
        </Link>

        <Link>
          <i className="fas fa-building" />
          <span>Virksomhedsside</span>
        </Link>

        <Link onClick={() => redirect("/account/user")}>
          <i className="fas fa-user" />
          <span>Konto</span>
        </Link>

        <Link onClick={() => redirect("/settings")}>
          <i className="fas fa-cog" />
          <span>Indstillinger</span>
        </Link>

        <Link>
          <i className="fas fa-comments" />
          <span>Support</span>
        </Link>

        <Link onClick={() => logout()}>
          <i className="fas fa-sign-out-alt" />
          <span>Logout</span>
        </Link>
      </Links>
    </Wrapper>
  );
}
