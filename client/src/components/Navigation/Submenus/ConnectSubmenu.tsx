import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import Submenu, { SubmenuContainer } from "../Submenu";
import { SubmenuRenderer } from "components/Navigation/SubmenuRenderer";
import Flexbox from "components/UI/FlexBox";
import PublicContext from "contexts/PublicContext";

export default function ConnectSubmenu(): ReactElement {
  const { user, logout } = useContext(PublicContext);

  return (
    <SubmenuRenderer
      icon="mdi mdi-account"
      title="Connect"
      render={({ setOpen, redirectTo, ...props }) => (
        <Submenu left={-20} width="250px" color="var(--red-primary)" {...props}>
          <div className="header">
            {props.isMobile && (
              <i
                onClick={() => setOpen(false)}
                className="toggler mdi mdi-satellite"
              />
            )}
            <h2>Connect</h2>
          </div>

          <SubmenuContainer columns="1fr">
            <article>
              {!user ? (
                <nav>
                  <article>
                    <div
                      className="link"
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => redirectTo("/login")}
                    >
                      <i
                        className="mdi mdi-login"
                        style={{ marginRight: 10 }}
                      ></i>
                      <span>Login</span>
                    </div>
                  </article>
                  <article>
                    <div
                      className="link"
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => redirectTo("/register")}
                    >
                      <i
                        className="mdi mdi-account-plus"
                        style={{ marginRight: 10 }}
                      ></i>
                      <span>New Account</span>
                    </div>
                  </article>
                </nav>
              ) : (
                <nav>
                  <article>
                    <div
                      className="link"
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={logout}
                    >
                      <span>Logout</span>
                    </div>
                  </article>
                </nav>
              )}
            </article>
          </SubmenuContainer>
        </Submenu>
      )}
    />
  );
}
