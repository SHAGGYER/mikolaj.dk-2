import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Submenu, { SubmenuContainer } from "../Submenu";
import { SubmenuRenderer } from "components/Navigation/SubmenuRenderer";
import Flexbox from "components/UI/FlexBox";
import { Text } from "components/UI/Text";

export default function ServicesSubmenu(): ReactElement {
  const redirect = (to) => {
    window.open(to, "_blank");
  };

  const { t } = useTranslation("navbar");
  return (
    <SubmenuRenderer
      icon="mdi mdi-school"
      title="Services"
      render={({ setOpen, redirectTo, ...props }) => (
        <Submenu
          width="500px"
          left={-100}
          color="var(--blue-primary)"
          {...props}
        >
          <div className="header">
            {props.isMobile && (
              <i
                onClick={() => setOpen(false)}
                className="toggler mdi mdi-subdirectory-arrow-right"
              />
            )}
            <h2>Services</h2>
          </div>

          <SubmenuContainer columns="3fr 4fr">
            <article>
              <nav>
                <h3>School</h3>
                <article className="service">
                  <div className="link" onClick={() => redirectTo("/learning")}>
                    {t("service1_link2")}
                  </div>
                </article>

                <article className="service">
                  <div
                    className="link"
                    onClick={() => redirectTo("/learning/pricing")}
                  >
                    {t("service1_link4")}
                  </div>
                </article>
                <article className="service">
                  <div
                    className="link"
                    onClick={() => redirectTo("/learning/order")}
                  >
                    {t("service1_link5")}
                  </div>
                </article>
              </nav>
            </article>
            <article>
              <nav>
                <h3>Online Courses</h3>
                <article className="service">
                  <div className="link" onClick={() => redirectTo("/courses")}>
                    View Courses
                  </div>
                </article>
              </nav>
            </article>
          </SubmenuContainer>
        </Submenu>
      )}
    />
  );
}
