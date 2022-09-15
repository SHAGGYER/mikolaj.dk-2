import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/Auth";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";

const StyledSidebar = styled.nav`
  min-width: 300px;
  width: 300px;
  background: #1d5d90;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 1rem;
    padding-right: 0;

    ul {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      li {
        padding-left: 1rem;

        a {
          color: white;
        }

        &:hover,
        &.active {
          background-color: #f0f2f5;

          a {
            color: black;
          }

          position: relative;

          a::before {
            content: "";
            position: absolute;
            right: 0;
            top: -50px;
            width: 50px;
            height: 50px;
            background-color: transparent;
            border-radius: 50%;
            box-shadow: 35px 35px 0 10px #f0f2f5;
            pointer-events: none;
          }

          a::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -50px;
            width: 50px;
            height: 50px;
            background-color: transparent;
            border-radius: 50%;
            box-shadow: 35px -35px 0 10px #f0f2f5;
            pointer-events: none;
          }
        }
      }

      li a {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        padding: 1rem;
      }
    }
  }
`;

const LogoutButton = styled.button`
  background: #94059e;
  color: white;
  padding: 0.5rem;
`;

function Sidebar(props) {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: "fa-solid fa-chart-line",
    },
    {
      label: "Visitors",
      to: "/visitors",
      icon: "fa-solid fa-users",
    },
    {
      label: "Mail",
      to: "/mail",
      icon: "fa-solid fa-envelope",
    },
    {
      label: "Page Builder",
      to: "/page-builder",
      icon: "fa-solid fa-paper",
    },
    {
      label: "Hobbies",
      to: "/hobbies",
      icon: "fa-solid fa-circle-nodes",
    },
    {
      label: "Courses",
      to: "/courses",
      icon: "fa-solid fa-circle-nodes",
    },
    {
      label: "Settings",
      to: "/settings",
      icon: "fa-solid fa-cog",
    },
  ];

  return (
    <StyledSidebar>
      <article className="content">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl text-white">Mikolaj.dk</span>
        </div>
        <div className="links">
          <ul>
            {links.map((link, index) => (
              <li
                key={index}
                className={location.pathname === link.to ? "active" : ""}
              >
                <Link to={link.to} className="text-gray-600">
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <LogoutButton onClick={() => dispatch(logout())}>Logout</LogoutButton>
    </StyledSidebar>
  );
}

export default Sidebar;
