import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Submenu, { SubmenuContainer } from "../Submenu";
import { SubmenuRenderer } from "components/Navigation/SubmenuRenderer";
import Flexbox from "components/UI/FlexBox";
import { Text } from "components/UI/Text";

export default function LearnToCodeSubmenu(): ReactElement {
  const { t } = useTranslation("navbar");
  return (
    <SubmenuRenderer
      icon="mdi mdi-school"
      badge="New!"
      title="School"
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
            <h2>School</h2>
          </div>

          <SubmenuContainer columns="3fr 4fr">
            <article>
              <nav>
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
              {/*          <nav>
                <article className="service">
                  <div
                    className="link"
                    onClick={() => redirectTo("/learning/youtube")}
                  >
                    Youtube Courses
                  </div>
                </article>
              </nav>*/}
              <Flexbox
                gap="1rem"
                alignItems="center"
                direction="column"
                justifyContent="center"
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  position: "relative",
                }}
                padding="1rem 0.5rem"
              >
                <img
                  alt="code"
                  src={import.meta.env.VITE_API_URL + "/uploads/school.png"}
                  style={{ height: 50, width: 50 }}
                />

                <Text
                  size="1.4rem"
                  style={{ fontFamily: "Bitrate" }}
                  block
                  center
                  color="black"
                >
                  As low as{" "}
                  <Text color="var(--primary)" size="1.75rem">
                    135 DKK
                  </Text>{" "}
                  an hour
                </Text>
              </Flexbox>
            </article>
          </SubmenuContainer>
        </Submenu>
      )}
    />
  );
}
