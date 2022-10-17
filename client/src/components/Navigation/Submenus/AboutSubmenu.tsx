import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Submenu, { SubmenuContainer } from "../Submenu";
import { SubmenuRenderer } from "components/Navigation/SubmenuRenderer";
import Flexbox from "components/UI/FlexBox";

/*const AboutSubmenuElement = styled(Submenu)`
  width: 500px;
  left: 0;

  & ${SubmenuContainer} {
    grid-template-columns: 3fr 3fr;
  }
`;*/

export default function AboutSubmenu(): ReactElement {
  const { t } = useTranslation("navbar");

  return (
    <SubmenuRenderer
      icon="mdi mdi-human-greeting"
      title="About Me"
      render={({ setOpen, redirectTo, ...props }) => (
        <Submenu left={-100} width="500px" color="var(--primary)" {...props}>
          <div className="header">
            {props.isMobile && (
              <i
                onClick={() => setOpen(false)}
                className="toggler mdi mdi-subdirectory-arrow-right"
              />
            )}
            <h2>About Me</h2>
          </div>

          <SubmenuContainer columns="3fr 3fr">
            <article>
              <nav>
                <article>
                  <div
                    className="link"
                    onClick={() => redirectTo("/about/projects")}
                  >
                    Projects
                  </div>
                </article>
                <article>
                  <div
                    className="link"
                    onClick={() => redirectTo("/about/hobbies")}
                  >
                    Hobbies
                  </div>
                </article>
                <article>
                  <div
                    className="link"
                    onClick={() => redirectTo("/about/gallery")}
                  >
                    Gallery
                  </div>
                </article>
                <article>
                  <div
                    className="link"
                    onClick={() => redirectTo("/about/certificates")}
                  >
                    {t("pro_life_link4")}
                  </div>
                </article>
              </nav>
              {/*                            <Flexbox gap="1rem"
                                     alignItems="center"
                                     direction="column"
                                     justifyContent="flex-start"
                                     style={{
                                         backgroundColor: "white",
                                         flex: 1,
                                         marginTop: props.isMobile ? "2rem" : "1rem",
                                         zIndex: 0
                                     }}
                                     padding="1rem 0.5rem">
                                <Text size="0.8rem" block center>
                                    Take a second to get to know me if you wish :)
                                </Text>
                            </Flexbox>*/}
            </article>
            <article>
              <Flexbox
                gap="1rem"
                alignItems="center"
                direction="column"
                justifyContent="flex-start"
                style={{ height: "100%", position: "relative" }}
              >
                <img
                  src={
                    import.meta.env.VITE_API_URL +
                    "/uploads" +
                    "/mikolaj_cartoon4.jpg"
                  }
                  alt="mikolaj"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Flexbox>
            </article>
          </SubmenuContainer>
        </Submenu>
      )}
    />
  );
}
