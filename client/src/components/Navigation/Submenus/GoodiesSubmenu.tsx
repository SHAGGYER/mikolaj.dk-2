import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Submenu, { SubmenuContainer } from "../Submenu";
import { SubmenuRenderer } from "components/Navigation/SubmenuRenderer";
import { Text } from "components/UI/Text";
import Flexbox from "components/UI/FlexBox";
import { Badge } from "components/UI/Badge";
import Popover from "components/UI/Popover";

export default function GoodiesSubmenu(): ReactElement {
  const { t } = useTranslation("navbar");

  const [isIconClicked, setIconClicked] = useState(false);
  const iconRef = useRef<HTMLElement>();
  const differenceRef = useRef<number>();

  return (
    <SubmenuRenderer
      icon="mdi mdi-gift"
      title="Goodies"
      render={({ redirectTo, setOpen, ...props }) => {
        return (
          <Submenu
            width="500px"
            left={-150}
            color="var(--purple-primary)"
            {...props}
          >
            <div className="header">
              {props.isMobile && (
                <i
                  onClick={() => setOpen(false)}
                  className="toggler mdi mdi-subdirectory-arrow-right"
                />
              )}
              <h2>Goodies</h2>
            </div>
            <SubmenuContainer columns="1fr 1fr">
              <article>
                <nav>
                  <h3>Fitness</h3>
                  <article className="service">
                    <div
                      className="link"
                      onClick={() => redirectTo("/fitness/program")}
                    >
                      {t("fitness_link1")}
                    </div>
                  </article>
                  <article className="service">
                    <div
                      className="link"
                      onClick={() => redirectTo("/fitness/tdee")}
                    >
                      {t("fitness_link2")}
                    </div>
                  </article>
                  <article className="service">
                    <div
                      className="link"
                      onClick={() => redirectTo("/fitness/bmi")}
                    >
                      {t("fitness_link3")}
                    </div>
                  </article>
                  <article className="service">
                    <div
                      className="link"
                      onClick={() => redirectTo("/fitness/body-fat")}
                    >
                      {t("fitness_link4")}
                    </div>
                  </article>
                </nav>
              </article>
              <article>
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
                  <Flexbox
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    gap="1.3rem"
                    width="100%"
                    style={{ flex: 1, position: "relative" }}
                  >
                    <img
                      alt="time"
                      src={
                        import.meta.env.VITE_API_URL + "/uploads" + "/time.png"
                      }
                      style={{ height: 70, width: 70 }}
                    />
                    <Text
                      size="1.5rem"
                      style={{ fontFamily: "Bitrate" }}
                      block
                      center
                    >
                      New <Text color="var(--primary)">Goodies</Text> Coming
                      Soon!
                    </Text>

                    {/*<i
                                            style={{fontSize: "4rem"}}
                                            className="mdi mdi-clock-time-three-outline"/>*/}

                    {/*<Popover position="right"
                                                 content={() => (
                                                     <div style={{height: 500, width: 300, padding: "1rem"}}>Hello</div>
                                                 )}
                                                 trigger={({triggerRef, onClick}) => (
                                                     <i ref={triggerRef}
                                                        onClick={(e) => onClick(e)}
                                                        style={{fontSize: "4rem", color: "var(--purple-primary)"}}
                                                        className="mdi mdi-clock-time-three-outline"/>
                                                 )}>
                                            Hello
                                        </Popover>*/}
                  </Flexbox>
                </Flexbox>
              </article>
            </SubmenuContainer>
          </Submenu>
        );
      }}
    />
  );
}
