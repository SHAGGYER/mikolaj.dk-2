import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container, Spacer } from "../UI";
import { Wrapper } from "../UI/Wrapper";
import { useTranslation } from "react-i18next";
import { Text } from "components/UI/Text";
import gsap from "gsap";
import PublicContext from "contexts/PublicContext";

const ContentContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  margin: 0 auto 0;
  justify-items: center;

  & .about-mikolaj-img-trigger {
    width: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 3rem 0;

    & .about-mikolaj-img-trigger {
      grid-row: 2;
      width: 400px;
    }
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;

    & .about-mikolaj-img-trigger {
      width: 100%;
    }
  }
`;

const LogoStyle = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  height: 100%;
  max-height: 500px;
`;

interface ContentProps {
  inView?: boolean;
}

const Content = styled.article<ContentProps>`
  & h2 {
    font-family: Bitrate, sans-serif !important;
    color: black;
    font-size: 2.8rem;
    line-height: 1;
    margin-bottom: 2rem;
    /*    transform: ${(props) =>
      props.inView ? "translateX(0)" : "translate(-150px)"};
    opacity: ${(props) => (props.inView ? 1 : 0)};*/
    transition: all 1s ease-in-out;
  }

  & h2 span {
    color: var(--primary);
  }
`;

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;

  & aside {
    display: flex;
    align-items: center;

    & i {
      font-size: 35px;
      color: var(--primary);
      margin-right: 1rem;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function AboutPlatform() {
  const { t } = useTranslation("home");
  const { appSettings } = useContext(PublicContext);

  useEffect(() => {
    gsap.from(".about-platform-card", {
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      scrollTrigger: {
        trigger: "#about-platform-section",
        toggleActions: "play",
        start: "center-=50px bottom-=50px",
        end: "bottom top+=200px",
        //markers: true,
      },
    });

    gsap.from(".about-mikolaj-img", {
      x: "2000px",
      duration: 1,
      scrollTrigger: {
        trigger: ".about-mikolaj-img-trigger",
        toggleActions: "play",
        start: "top bottom-=100px",
        end: "bottom top+=100px",
        //markers: true,
      },
    });
  }, []);

  return (
    <Wrapper white>
      <Container id="about-platform">
        <ContentContainer>
          <Content>
            <h2>
              What kind of <span>platform</span> is this?
            </h2>

            <Text block color="black" size="18px">
              I created this website for various reasons. It is my business card
              and my code teaching area. It is possible for you to order 1-on-1
              sessions and learn code from an expert.
            </Text>

            <Spacer bottom="2rem" />
            <div id="about-platform-section">
              <Card className="about-platform-card">
                <aside>
                  <i className="mdi mdi-check-bold" />
                  <p>{t("platform_info4")}</p>
                </aside>
              </Card>
              <Card className="about-platform-card">
                <aside id="about-platform-trigger-1">
                  <i className="mdi mdi-check-bold" />
                  <p>I provide great goodies for you to explore</p>
                </aside>
              </Card>
              <Card className="about-platform-card">
                <aside>
                  <i className="mdi mdi-check-bold" />
                  <p>You can learn more about me</p>
                </aside>
              </Card>
            </div>
          </Content>
          <div className="about-mikolaj-img-trigger">
            <LogoStyle
              className="about-mikolaj-img"
              src={
                import.meta.env.VITE_API_URL +
                appSettings?.homepageAboutPlatformImage
              }
              alt="logo"
            />
          </div>
        </ContentContainer>
      </Container>
    </Wrapper>
  );
}
