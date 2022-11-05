import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Logo from "../assets/logo.svg";
import LogoWhite from "../assets/logo_white.svg";
import { AppContext } from "../AppContext";

const NavbarStyled = styled.div`
  position: relative;
  z-index: 12;
  padding: 1rem 1rem;

  .container {
    margin: 0 auto;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .toggler {
    display: none;
    i {
      font-size: 25px;
      color: white;
      cursor: pointer;
    }
  }

  ${(props) =>
    props.$fixed &&
    css`
      position: fixed;
      width: 100%;
      height: 5.5rem;
      background: var(--primary);
    `};

  .logo {
    img {
      height: 50px;
    }
  }

  ul {
    list-style: none;
    display: flex;
    gap: 1rem;

    a {
      color: white;
      text-decoration: none;

      &[href$=${(props) => props.currentComponent}] {
        color: red;
      }

      &:hover {
        color: ${(props) => (props.$fixed ? "black" : "var(--primary)")};
      }
    }
  }

  @media (max-width: 767px) {
    .toggler {
      display: block;
    }

    ul {
      position: absolute;
      right: 10px;
      top: 70px;
      min-width: 300px;
      padding: 1rem;
      background-color: white;
      li a {
        color: black;
      }
      flex-direction: column;
    }
  }
`;

function Navbar({ fixed }) {
  const { navbarOpen, setNavbarOpen, isMobile, currentComponent } =
    useContext(AppContext);

  /*   useEffect(() => {
    console.log(isMobile);
  }, [isMobile]); */

  return (
    <NavbarStyled $fixed={fixed} currentComponent={currentComponent}>
      <div className="container">
        <div className="logo">
          <img src={fixed ? LogoWhite : Logo} alt="logo" />
        </div>
        <div className="toggler" onClick={() => setNavbarOpen(!navbarOpen)}>
          <i className="fa-solid fa-bars"></i>
        </div>
        {((isMobile && navbarOpen) || !isMobile) && (
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#resume">Resume</a>
            </li>
            <li>
              <a href="#code-school">Code School</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        )}
      </div>
    </NavbarStyled>
  );
}

export default Navbar;
